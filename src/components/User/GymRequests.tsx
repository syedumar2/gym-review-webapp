"use client";

import { GymRequest } from "@/generated/prisma";
import { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Dumbbell, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Page } from "../../../services/userService";
import { EmptyPage } from "../Error/EmptyPage";
import { Loading } from "../Overlays/Loading";
import Pagination from "../Pagination/Pagination";
import { Button } from "../ui/button";

type GymRequestsFetchParams = {
  userId: string;
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};

const statusColors = {
  APPROVED: "bg-green-100 text-green-700 border-green-400",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-400",
  REJECTED: "bg-red-100 text-red-700 border-red-400",
};

const GymRequests = () => {
  const [requests, setRequests] = useState<GymRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { data: session } = useSession();


  async function fetchGymRequests(
    params: GymRequestsFetchParams
  ): Promise<ApiResponse<Page<GymRequest>>> {
    if (!params.userId) return { success: false, error: "No userId provided" };

    const paramsToPass = new URLSearchParams({
      userId: params.userId,
      page: String(params.page),
      pageSize: String(params.pageSize),
      sortField: params.sortField ?? "gymName",
      sortOrder: params.sortOrder ?? "asc",
    }).toString();

    const resp = await fetch(`/api/user/gym-requests?${paramsToPass}`);
    const result = await resp.json();

    // Convert createdAt strings to Date objects
    if (result?.data?.data) {
      result.data.data = result.data.data.map((req: any) => ({
        ...req,
        createdAt: new Date(req.createdAt),
      }));
    }

    return result;
  }

  const { data, error, isPending } = useQuery({
    queryKey: ["gymRequests"],
    queryFn: () =>
      fetchGymRequests({
        page: currentPage,
        pageSize: 10,
        userId: session?.user?.id ?? "",
      }),
    enabled: !!session?.user?.id,
  });

  // Update requests when query data changes
  useEffect(() => {
    if (data?.data?.data) setRequests(data.data.data);
  }, [data]);
  if (isPending) {
    return <Loading />;
  }
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
  if (error) {
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
    </section>;
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-semibold ml-4 mb-4">My Gym Requests</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto max-w-6xl mx-auto rounded-xl border border-gray/50">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="text-left p-3 border-b">Gym Name</th>
              <th className="text-left p-3 border-b">Submitted On</th>
              <th className="text-left p-3 border-b">Status</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-accent">
                <td className="p-3 border-b">{req.gymName}</td>
                <td className="p-3 border-b">
                  {req.createdAt.toLocaleDateString()}
                </td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-sm border ${
                      statusColors[req.status]
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="p-3 border-b">
                  <button className="text-secondary hover:underline">
                    <Link href={`/dashboard/requests/${req.id}`}>View</Link>
                  </button>
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
              <button className="text-blue-600 hover:underline">
                View Details
              </button>
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
          className={
            data?.data
              ? `flex justify-center items-center gap-3 my-6`
              : `hidden`
          }
          currentPage={data.data.page ?? 1}
          totalPages={data.data.totalPages ?? 1}
          onPageChange={(page) => handlePageChange(page)}
        />
      )}
      <section className="flex w-full items-center justify-center mt-4 py-4"></section>
    </section>
  );
};

export default GymRequests;
//TODO: Add sorting buttons and test pagination
//TODO: Try and condense some of this logic into a custom reusable hook
//TODO: Tell reactquery to invalidate the gymRequest key on new gymRequest submission
//TODO: Create a way to read submission details in detail
