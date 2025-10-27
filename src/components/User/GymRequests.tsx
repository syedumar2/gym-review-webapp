"use client";

import { GymRequest } from "@/generated/prisma";
import { ApiResponse, Page, SortParam } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowDown, ArrowUp, ArrowUpDown, Dumbbell, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyPage } from "../Error/EmptyPage";
import { Loading } from "../Overlays/Loading";
import Pagination from "../Pagination/Pagination";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";



type GymRequestsFetchParams = {
  userId: string;
  page: number;
  pageSize: number;
  sort?: SortParam[];
};

const statusColors = {
  APPROVED: "bg-green-100 text-green-700 border-green-400",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-400",
  REJECTED: "bg-red-100 text-red-700 border-red-400",
};

const GymRequests = () => {
  const [requests, setRequests] = useState<GymRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();

  const [sortParams, setSortParams] = useState<SortParam[]>([
    { field: "gymName", order: "asc" }, // default
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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

  async function fetchGymRequests(
    params: GymRequestsFetchParams
  ): Promise<ApiResponse<Page<GymRequest>>> {
    if (!params.userId) return { success: false, error: "No userId provided" };

    const safeSort = (params.sort || [])
      .filter(
        (s) =>
          typeof s.field === "string" &&
          (s.order === "asc" || s.order === "desc")
      )
      .map((s) => ({
        field: s.field.trim(),
        order: s.order,
      }));

    const resp = await fetch(`/api/user/gym-requests`,
       {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: params.userId,
        page: params.page,
        pageSize: params.pageSize,
        sort: safeSort.length ? safeSort : [{ field: "gymName", order: "asc" }], // default sort
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

  const { data, error, isPending } = useQuery({
    queryKey: ["gymRequests", currentPage,sortParams],
    queryFn: () =>
      fetchGymRequests({
        page: currentPage,
        pageSize: 10,
        userId: session?.user?.id ?? "",
        sort: sortParams,
      }),
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (data?.data?.data) setRequests(data.data.data);
  }, [data]);

  if (isPending) return <Loading />;

  if (error)
    return (
      <section className="relative">
        <EmptyPage
          heading="Oops, Something went wrong!"
          subHeading="Internal Server Error. Apologies for the inconvenience"
          Icon={AlertCircle}
        />
        <Button className="absolute bottom-6 right-6" variant={"secondary"}>
          <Link href="/" className="flex items-center gap-2">
            Back to Home
          </Link>
        </Button>
      </section>
    );

  if (!requests || requests.length === 0)
    return (
      <section className="relative">
        <EmptyPage
          heading="No Gym Requests Yet"
          subHeading="Looks like you haven’t requested any gyms. Submit a request to see your favorite gyms listed here!"
          Icon={Dumbbell}
        />
        <Button className="absolute bottom-6 right-6" variant={"secondary"}>
          <Link href="requests/new" className="flex items-center gap-2">
            <PlusCircle /> Submit a Gym Request
          </Link>
        </Button>
      </section>
    );

  return (
    <section className="p-4">
      <h1 className="text-2xl font-semibold ml-4 mb-4">My Gym Requests</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto max-w-6xl mx-auto rounded-xl border border-gray/50">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary text-white">
              {["gymName", "createdAt", "status"].map((field) => {
                const activeSort = sortParams.find((s) => s.field === field);
                const isAsc = activeSort?.order === "asc";
                const isDesc = activeSort?.order === "desc";

                const labelMap: Record<string, string> = {
                  gymName: "Gym Name",
                  createdAt: "Submitted On",
                  status: "Status",
                };

                return (
                  <th
                    key={field}
                    className="text-left p-3 border-b border-gray-300"
                  >
                    <button
                      onClick={() => toggleSort(field)}
                      className={`
              flex items-center gap-1 font-medium w-full 
              ${activeSort ? "text-yellow-300" : "text-white/80"} 
              hover:text-yellow-200 transition-colors duration-150
            `}
                    >
                      <span>{labelMap[field]}</span>
                      {isAsc ? (
                        <ArrowUp className="h-4 w-4 opacity-90" />
                      ) : isDesc ? (
                        <ArrowDown className="h-4 w-4 opacity-90" />
                      ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-60 group-hover:opacity-90" />
                      )}
                    </button>
                  </th>
                );
              })}
              <th className="text-left p-3 border-b border-gray-300 font-medium text-white/80">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-accent">
                <td className="p-3 border-b">{req.gymName}</td>
                <td className="p-3 border-b">
                  {req.createdAt.toLocaleDateString()}
                </td>
            <td className="p-3">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          statusColors[req.status]
                        }`}
                      >
                        {req.status}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-accent/80 backdrop-blur-md border border-accent-foreground/10 shadow-md p-4 rounded-2xl">
                      {req.status === "APPROVED" ? (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                            ✅ Approved
                          </h4>
                          <div className="text-sm">
                            <span className="font-medium text-muted-foreground">
                              Date:
                            </span>{" "}
                            {req?.approvedAt
                              ? new Date(req.approvedAt).toLocaleDateString(
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
                              {req?.approvedByAdminId || "Unknown"}
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
                            {req?.rejectedAt
                              ? new Date(req.rejectedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "—"}
                          </div>
                          {req?.reason && (
                            <div className="text-sm text-muted-foreground border-l-2 border-red-400 pl-2">
                              <span className="font-medium text-foreground">
                                Reason:
                              </span>{" "}
                              {req.reason}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Rejected by{" "}
                            <span className="font-medium text-foreground">
                              {req?.rejectedByAdminId || "Unknown"}
                            </span>
                          </div>
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                </td>
                <td className="p-3 border-b">
                  <Link
                    href={`/dashboard/requests/${req.id}`}
                    className="text-secondary hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-4 border rounded-lg shadow-sm bg-secondary"
          >
            <h2 className="text-lg font-medium">{req.gymName}</h2>
            <p className="text-sm text-gray-600">
              Submitted: {req.createdAt.toLocaleDateString()}
            </p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded-full text-sm border ${
                statusColors[req.status]
              }`}
            >
              {req.status}
            </span>
            <div className="mt-3">
              <Link
                href={`/dashboard/requests/${req.id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end w-6xl ml-5 py-2">
        <Button variant={"secondary"}>
          <Link href="requests/new" className="flex items-center gap-2">
            <PlusCircle /> Submit a Gym Request
          </Link>
        </Button>
      </div>

      {data?.data && (
        <Pagination
          className="flex justify-center items-center gap-3 my-6"
          currentPage={data.data.page ?? 1}
          totalPages={data.data.totalPages ?? 1}
          onPageChange={(page) => handlePageChange(page)}
        />
      )}
    </section>
  );
};

export default GymRequests;
