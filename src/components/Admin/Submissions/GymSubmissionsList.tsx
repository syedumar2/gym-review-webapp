"use client";
import Pagination from "@/components/Pagination/Pagination";
import { AlertCircle, ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { EmptyPage, Loading } from "@/components";
import GymSubmissionActionDialog from "../Dialog/GymSubmissionActionDialog";
import Link from "next/link";
import { ApiResponse, SortParam } from "@/types/api";
import { useGymRequests } from "@/hooks/useGymRequests";
import { Gym, GymRequest } from "@/generated/prisma";
import { approveGymRequest } from "@/actions/gymApproveAction";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { rejectGymRequest } from "@/actions/gymRejectAction";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const statusColors = {
  APPROVED: "bg-green-100 text-green-700 border-green-400",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-400",
  REJECTED: "bg-red-100 text-red-700 border-red-400",
};

const GymSubmissionsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleApprove = async (
    gym: GymRequest,
    adminId: string
  ): Promise<ApiResponse<Gym | null>> => {
    console.log("Approved gym:", gym.gymName);
    return await approveGymRequest(gym, adminId);
  };
  const handleReject = async (
    gym: GymRequest,
    adminId: string,
    reason: string
  ): Promise<ApiResponse<GymRequest | null>> => {
    console.log(
      `Rejected gym: ${gym.gymName}, Reason: ${reason},AdminId: ${adminId}`
    );

    return await rejectGymRequest(gym, adminId, reason);
  };
  const { data, error, isPending } = useGymRequests(currentPage, sortParams);
  const requests = data?.data?.data ?? [];

  if (isPending) return <Loading />;

  if (error)
    return (
      <EmptyPage
        heading="Something went wrong"
        subHeading="Failed to fetch gym submissions"
        Icon={AlertCircle}
      />
    );

  if (requests.length === 0)
    return (
      <EmptyPage
        heading="No Submissions Found"
        subHeading="No pending gym submissions yet."
        Icon={AlertCircle}
      />
    );

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-black p-6 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gym Requests (Admin)</h1>
      </div>

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
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          statusColors[gym.status]
                        }`}
                      >
                        {gym.status}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-accent/80 backdrop-blur-md border border-accent-foreground/10 shadow-md p-4 rounded-2xl">
                      {gym.status === "APPROVED" ? (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                            ✅ Approved
                          </h4>
                          <div className="text-sm">
                            <span className="font-medium text-muted-foreground">
                              Date:
                            </span>{" "}
                            {gym?.approvedAt
                              ? new Date(gym.approvedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "—"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Approved by{" "}
                            <span className="font-medium text-foreground">
                              {gym?.approvedByAdminId || "Unknown"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-red-600 flex items-center gap-1">
                            ❌ Rejected
                          </h4>
                          <div className="text-sm">
                            <span className="font-medium text-muted-foreground">
                              Date:
                            </span>{" "}
                            {gym?.rejectedAt
                              ? new Date(gym.rejectedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "—"}
                          </div>
                          {gym?.reason && (
                            <div className="text-sm text-muted-foreground border-l-2 border-red-400 pl-2">
                              <span className="font-medium text-foreground">
                                Reason:
                              </span>{" "}
                              {gym.reason}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Rejected by{" "}
                            <span className="font-medium text-foreground">
                              {gym?.rejectedByAdminId || "Unknown"}
                            </span>
                          </div>
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                </td>
                <td className="p-3 font-medium">{gym.phoneNumber}</td>
                <td className="p-3 font-medium">
                  {gym?.address?.city ?? "Not Provided"}
                </td>
                <td className="p-3">
                  <GymSubmissionActionDialog
                    gym={gym}
                    key={gym.id}
                    onApprove={handleApprove}
                    onReject={handleReject}
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
