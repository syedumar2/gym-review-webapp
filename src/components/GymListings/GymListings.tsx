"use client";
import { useGyms, usePagination, useSort } from "@/hooks";
import { ApiResponse, Page } from "@/types/api";
import { GENDER_SEGREGATION_LABELS, GYM_TYPE_LABELS } from "@/types/gym";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { GymFilters, SafeParsedGym } from "../../../services/publicService";
import FilterMenu from "../Buttons/Filter/FilterMenu";
import SortMenu from "../Buttons/SortMenu";
import { EmptyPage } from "../Error/EmptyPage";
import Pagination from "../Pagination/Pagination";
import StarRating from "../RatingStars/RatingStars";
import GymSkeletonList from "./GymSkeletonList";

export const GYM_SORT_LABELS: Record<string, string> = {
  gymName: "Gym Name",
  createdAt: "Date Added",
  updatedAt: "Last Updated",
  city: "City",
  state: "State",
  gymType: "Type",
  rating: "Rating",
  genderSegregation: "Gender Segregation",
};

const GymListings = ({
  response,
  searchText,
  searchBy,
}: {
  response: ApiResponse<Page<SafeParsedGym>>;
  searchText: string;
  searchBy: string;
}) => {
  const { page, setPage } = usePagination(1);
  const { sort, handleSortChange } = useSort([
    { field: "createdAt", order: "desc" },
  ]);

  const [filters, setFilters] = useState<GymFilters>({});
  const handleFilterChange = (filter: GymFilters) => {
    setFilters(filter);
  };

  const { data, isPending, error, isFetching } = useGyms(
    page,
    20,
    { searchText, searchBy },
    sort,
    filters
  );
  const gyms = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  if (isPending)
    return (
      <section className="wrapper">
        <div className="flex items-center gap-2 justify-between mb-4">
          <FilterMenu filters={filters} onFilterChange={handleFilterChange} />
          <SortMenu
            fields={Object.keys(GYM_SORT_LABELS)}
            labels={GYM_SORT_LABELS}
            activeSorts={sort}
            onSortChange={handleSortChange}
          />
        </div>{" "}
        <GymSkeletonList />;
      </section>
    );

  if (error)
    return (
      <EmptyPage
        heading="Something went wrong"
        subHeading="Failed to fetch gyms"
        Icon={AlertCircle}
      />
    );

  const renderGyms = (gyms: SafeParsedGym[]) => {
    return gyms.map((gym) => (
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
          <p className="text-sm text-gray">{GYM_TYPE_LABELS[gym.gymType]}</p>
          <p className="text-sm text-gray">
            {GENDER_SEGREGATION_LABELS[gym.genderSegregation]}
          </p>

          <p className="text-sm font-medium text-gray mt-2">
            {" "}
            {gym.reviewCount > 0
              ? `${gym.reviewCount} review${gym.reviewCount > 1 ? "s" : ""}`
              : "No Reviews yet"}
          </p>

          <a
            href={`/gyms/${gym.slug}`}
            className="block w-full mt-4 text-center bg-secondary text-white font-medium py-2 px-4 rounded-lg hover:bg-secondary/90 transition"
          >
            View Details
          </a>
        </div>
      </div>
    ));
  };

  if (gyms.length === 0)
    return (
      <section className="wrapper">
        <div className="flex items-center gap-2 justify-between mb-4">
          <FilterMenu filters={filters} onFilterChange={handleFilterChange} />
          <SortMenu
            fields={Object.keys(GYM_SORT_LABELS)}
            labels={GYM_SORT_LABELS}
            activeSorts={sort}
            onSortChange={handleSortChange}
          />
        </div>
        <EmptyPage
          heading="No Gyms Found"
          subHeading="Try adjusting your filters or come back later."
          Icon={AlertCircle}
        />
      </section>
    );

  return (
    <>
      <section className="wrapper">
        <div className="flex items-center gap-2 justify-between mb-4">
          <FilterMenu filters={filters} onFilterChange={handleFilterChange} />
          <SortMenu
            fields={Object.keys(GYM_SORT_LABELS)}
            labels={GYM_SORT_LABELS}
            activeSorts={sort}
            onSortChange={handleSortChange}
          />
        </div>

        {isFetching ? (
          <GymSkeletonList />
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-items-center">
            {renderGyms(gyms)}
          </div>
        )}
      </section>

      <section className="flex w-full items-center justify-center py-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className={""}
        />
      </section>
    </>
  );
};

export default GymListings;
