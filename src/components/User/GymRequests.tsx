"use client";

import { useState } from "react";
import PaginationStatic from "../Pagination/PaginationStatic";
import { EmptyPage } from "../Error/EmptyPage";
import { Dumbbell, Icon, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type GymRequest = {
  id: string;
  gymName: string;
  submittedOn: string;
  status: "Approved" | "Pending" | "Rejected";
};

const dummyRequests: GymRequest[] = [
  {
    id: "1",
    gymName: "Iron Paradise",
    submittedOn: "2025-09-25",
    status: "Approved",
  },
  {
    id: "2",
    gymName: "FitHub 24/7",
    submittedOn: "2025-09-20",
    status: "Pending",
  },
  {
    id: "3",
    gymName: "Muscle World",
    submittedOn: "2025-09-10",
    status: "Rejected",
  },
];

const statusColors: Record<GymRequest["status"], string> = {
  Approved: "bg-green-100 text-green-700 border-green-400",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
  Rejected: "bg-red-100 text-red-700 border-red-400",
};

const GymRequests = () => {
  const [requests] = useState<GymRequest[]>(dummyRequests);
  if (!dummyRequests || dummyRequests.length === 0)
    return (
      <section className="relative">
        <EmptyPage
          heading="No Gym Requests Yet"
          subHeading="Looks like you haven’t requested any gyms. Submit a request to see your favorite gyms listed here!"
          Icon={Dumbbell}
        />
        <Button className="absolute  bottom-6 right-6" variant={"secondary"}>
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
      <div className="hidden  md:block overflow-x-auto max-w-6xl mx-auto rounded-xl border border-gray/50">
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
                <td className="p-3 border-b">{req.submittedOn}</td>
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
                    View
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
              Submitted: {req.submittedOn}
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
      <section className="flex w-full items-center justify-center mt-4 py-4">
        <PaginationStatic />
      </section>
    </section>
  );
};

export default GymRequests;
