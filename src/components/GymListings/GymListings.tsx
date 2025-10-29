"use client";

import { Gym } from "@/generated/prisma";
import { ApiResponse, Page, SortParam } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { EmptyPage } from "../Error/EmptyPage";
import { Loading } from "../Overlays/Loading";
import Pagination from "../Pagination/Pagination";
import StarRating from "../RatingStars/RatingStars";
import { GENDER_SEGREGATION_LABELS, GYM_TYPE_LABELS } from "@/types/gym";
import { SafeParsedGym } from "../../../services/publicService";

type GymFetchParams = {
  page: number;
  pageSize: number;
  sort?: SortParam[];
};

const fetchGyms = async (
  params: GymFetchParams
): Promise<ApiResponse<Page<SafeParsedGym>>> => {
  const safeSort = (params.sort || [])
    .filter(
      (s) =>
        typeof s.field === "string" && (s.order === "asc" || s.order === "desc")
    )
    .map((s) => ({ field: s.field.trim(), order: s.order }));

  const resp = await fetch(`/api/public/gyms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page: params.page,
      pageSize: params.pageSize,
      sort: safeSort.length
        ? safeSort
        : [{ field: "createdAt", order: "desc" }],
    }),
  });

  if (!resp.ok) throw new Error("Failed to fetch gyms");
  console.log(resp);
  return resp.json();
};

const GymListings = ({
  response,
}: {
  response: ApiResponse<Page<SafeParsedGym>>;
}) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortParam[]>([
    { field: "createdAt", order: "desc" },
  ]);

  const { data, isPending, error } = useQuery({
    queryKey: ["gyms", page, sort],
    queryFn: () => fetchGyms({ page, pageSize: 3, sort }),
    placeholderData: response, // shows SSR data, then refetches
      staleTime: 60_000, // optional: cache for 1 min
  });

  const gyms = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  if (isPending) return <Loading />;

  if (error)
    return (
      <EmptyPage
        heading="Something went wrong"
        subHeading="Failed to fetch gyms"
        Icon={AlertCircle}
      />
    );

  if (gyms && gyms.length === 0)
    return (
      <EmptyPage
        heading="No Gyms Found"
        subHeading="Try adjusting your filters or come back later."
        Icon={AlertCircle}
      />
    );

  return (
    <>
      <section className="wrapper">
        <div className="flex items-center justify-between mb-4">
          <h1 className="section-heading !text-xl">
            Showing results for page {page}
          </h1>

          {/* Example sorting control */}
          <select
            value={sort[0]?.order}
            onChange={(e) =>
              setSort([
                { field: "createdAt", order: e.target.value as "asc" | "desc" },
              ])
            }
            className="border px-2 py-1 rounded"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Gym Cards */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-items-center">
          {gyms.map((gym: SafeParsedGym) => (
            <div
              key={gym.id}
              className="w-full max-w-sm bg-primary border border-accent rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={
                  Array.isArray(gym?.images)
                    ? (gym.images as { url?: string }[])[0]?.url
                    : undefined
                }
                alt={gym.gymName}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-black truncate">
                    {gym.gymName}
                  </h2>
                  <StarRating rating={gym.rating ?? 0} />
                </div>

                <p className="text-sm text-gray mt-1">{gym.city}</p>
                <p className="text-sm text-gray">
                  {GYM_TYPE_LABELS[gym.gymType]}
                </p>
                <p className="text-sm text-gray">
                  {GENDER_SEGREGATION_LABELS[gym.genderSegregation]}
                </p>

                <p className="text-sm font-medium text-gray mt-2">10 reviews</p>

                <a
                  href={`/gyms/${gym.id}`}
                  className="block w-full mt-4 text-center bg-secondary text-white font-medium py-2 px-4 rounded-lg hover:bg-secondary/90 transition"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section className="flex w-full items-center justify-center py-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className=""
        />
      </section>
    </>
  );
};

export default GymListings;
//TODO (HIGH): Complete Sorting and Search
//TODO (MEDIUM): Show user logged in at home page and create a shortcut to get to listings page
//TODO: Review Section and Rating calc