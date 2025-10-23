"use client";
import Pagination from "@/components/Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,

} from "lucide-react";
import { useEffect, useState } from "react";

import { EmptyPage, Loading } from "@/components";
import { GymRequest } from "@/generated/prisma";
import { ApiResponse, Page, SortParam } from "@/types/api";
import GymSubmissionActionDialog from "../Dialog/GymSubmissionActionDialog";
import Link from "next/link";

const statusColors = {
  APPROVED: "bg-green-100 text-green-700 border-green-400",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-400",
  REJECTED: "bg-red-100 text-red-700 border-red-400",
};

// Type for API call
type GymRequestsFetchParams = {
  page: number;
  pageSize: number;
  sort?: SortParam[];
};

async function fetchGymRequests(
  params: GymRequestsFetchParams
): Promise<ApiResponse<Page<GymRequest>>> {
  const safeSort = (params.sort || [])
    .filter(
      (s) =>
        typeof s.field === "string" && (s.order === "asc" || s.order === "desc")
    )
    .map((s) => ({ field: s.field.trim(), order: s.order }));

  const resp = await fetch(`/api/admin/gym-requests`, {
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

  const result = await resp.json();

  if (result?.data?.data) {
    result.data.data = result.data.data.map((req: any) => ({
      ...req,
      createdAt: new Date(req.createdAt),
    }));
  }

  return result;
}

const GymSubmissionsList = () => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectData, setRejectData] = useState({ gymId: 0, reason: "" });

  const [requests, setRequests] = useState<GymRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // sorting
  const [sortParams, setSortParams] = useState<SortParam[]>([
    { field: "createdAt", order: "desc" },
  ]);

  const toggleSort = (field: string) => {
    setSortParams((prev) => {
      const existing = prev.find((s) => s.field === field);
      let newSort: SortParam[];

      if (!existing) {
        newSort = [...prev, { field, order: "asc" }];
      } else if (existing.order === "asc") {
        newSort = prev.map((s) =>
          s.field === field ? { ...s, order: "desc" } : s
        );
      } else {
        newSort = prev.filter((s) => s.field !== field);
      }

      return newSort;
    });
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["adminGymRequests", currentPage, sortParams],
    queryFn: () =>
      fetchGymRequests({
        page: currentPage,
        pageSize: 10,
        sort: sortParams,
      }),
  });

  useEffect(() => {
    if (data?.data?.data) setRequests(data.data.data);
  }, [data]);

  if (isPending) return <Loading />;

  if (error)
    return (
      <EmptyPage
        heading="Something went wrong"
        subHeading="Failed to fetch gym submissions"
        Icon={AlertCircle}
      />
    );

  if (!requests || requests.length === 0)
    return (
      <EmptyPage
        heading="No Submissions Found"
        subHeading="No pending gym submissions yet."
        Icon={AlertCircle}
      />
    );

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-black p-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gym Requests (Admin)</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray rounded-lg">
          <thead className="bg-secondary text-white text-xs md:text-sm uppercase tracking-wider sticky top-0">
            <tr>
              {["gymName", "requestingUser", "createdAt", "status"].map(
                (field) => {
                  const activeSort = sortParams.find((s) => s.field === field);
                  const isAsc = activeSort?.order === "asc";
                  const isDesc = activeSort?.order === "desc";

                  const labelMap: Record<string, string> = {
                    gymName: "Gym Name",
                    requestingUser: "Owner/Requesting User",
                    createdAt: "Submitted At",
                    status: "Status",
                  };

                  return (
                    <th key={field} className="p-3 text-left">
                      <button
                        onClick={() => toggleSort(field)}
                        className={`flex items-center gap-1 font-medium w-full ${
                          activeSort ? "text-yellow-300" : "text-white/80"
                        } hover:text-yellow-200 transition-colors duration-150`}
                      >
                        {labelMap[field]}
                        {isAsc ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : isDesc ? (
                          <ArrowDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-70" />
                        )}
                      </button>
                    </th>
                  );
                }
              )}
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((gym) => (
              <tr
                key={gym.id}
                className="border-b border-gray bg-accent hover:bg-primary hover:text-black transition"
              >
                <td className="p-3 font-medium">
                  <Link
                    href={`/admin/submissions/${gym.id}`}
                    className="text-secondary hover:underline"
                  >
                    {gym.gymName}
                  </Link>
                </td>
                <td className="p-3 font-medium">{gym?.user?.name}</td>
                <td className="p-3 text-sm">
                  {gym.createdAt.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      statusColors[gym.status]
                    }`}
                  >
                    {gym.status}
                  </span>
                </td>
                <td className="p-3 font-medium">{gym.phoneNumber}</td>
                <td className="p-3 font-medium">
                  {gym?.address?.city ?? "Not Provided"}
                </td>
                <td className="p-3">
                  <GymSubmissionActionDialog
                    gym={gym}
                    rejectData={rejectData}
                    rejectDialogOpen={rejectDialogOpen}
                    setRejectData={setRejectData}
                    setRejectDialogOpen={setRejectDialogOpen}
                    key={gym.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.data && (
        <Pagination
          className="flex justify-center items-center gap-3 my-6"
          currentPage={data.data.page ?? 1}
          totalPages={data.data.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default GymSubmissionsList;
//TODO: Build a gym schema for public listing
//TODO: Build action for approving a gym Request and adding to Gym db
//TODO: Build listing page
//TODO: Build review schema
//TODO: Build review interface 
//TODO: Build blacklist
//TODO: Build Blacklist actions