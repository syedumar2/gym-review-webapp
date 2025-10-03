"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Pagination from "@/components/Pagination/Pagination";

// Mock Gym Submissions
const mockGyms = [
  {
    id: 1,
    name: "Iron Paradise",
    location: "Mumbai",
    owner: "Alice Johnson",
    phone: "+91 9876543210",
    submittedAt: "2024-07-15T12:00:00Z",
    status: "PENDING",
  },
  {
    id: 2,
    name: "Beast Mode Fitness",
    location: "Delhi",
    owner: "Bob Smith",
    phone: "+91 9988776655",
    submittedAt: "2024-06-18T09:30:00Z",
    status: "PENDING",
  },
  {
    id: 3,
    name: "Fit & Fine Hub",
    location: "Bangalore",
    owner: "Charlie Khan",
    phone: "+91 9123456789",
    submittedAt: "2024-05-22T16:45:00Z",
    status: "PENDING",
  },
];

const GymSubmissionsList = () => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectData, setRejectData] = useState({ gymId: 0, reason: "" });

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-black p-6 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gym Requests</h1>
        <Button className="bg-secondary text-white rounded-lg px-3 py-1 text-sm hover:bg-secondary/80">
          Sort <ChevronDown className="inline w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray rounded-lg">
          <thead className="bg-secondary text-white text-xs md:text-sm uppercase tracking-wider sticky top-0">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Submitted At</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockGyms.map((gym) => (
              <tr
                key={gym.id}
                className="border-b border-gray bg-accent hover:bg-primary hover:text-black transition"
              >
                <td className="p-3">{gym.id}</td>
                <td className="p-3 font-medium">{gym.name}</td>
                <td className="p-3">{gym.owner}</td>
                <td className="p-3">{gym.phone}</td>
                <td className="p-3">{gym.location}</td>
                <td className="p-3 text-sm">
                  {new Date(gym.submittedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow text-black">
                    {gym.status}
                  </span>
                </td>
                <td className="p-3">
                  <Dialog
                    open={rejectDialogOpen}
                    onOpenChange={setRejectDialogOpen}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-secondary text-white rounded-full text-xs md:text-sm px-2 py-1 hover:bg-secondary/50">
                          Actions <ChevronDown className="inline w-4 h-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white text-black">
                        <DropdownMenuItem className="text-green-600">
                          ✅ Approve
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="text-red">
                            ❌ Reject
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Reject Dialog */}
                    <DialogContent className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-black">
                          Reject Gym Submission:{" "}
                          <span className="font-bold text-red">
                            {gym.name}
                          </span>
                        </DialogTitle>
                        <p className="text-sm text-gray mt-1">
                          Please provide a reason for rejecting this gym
                          submission.
                        </p>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setRejectDialogOpen(false);
                          setRejectData({ gymId: 0, reason: "" });
                        }}
                      >
                        <div className="grid gap-3 pb-3">
                          <Label htmlFor="reason">Reason</Label>
                          <Textarea
                            id="reason"
                            name="reason"
                            value={rejectData.reason}
                            onChange={(e) =>
                              setRejectData({
                                ...rejectData,
                                reason: e.target.value,
                              })
                            }
                            placeholder="Enter rejection reason"
                            className="min-h-[100px] rounded-lg border-gray"
                          />
                        </div>
                        <DialogFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="rounded-lg border border-gray text-black"
                            onClick={() => setRejectDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="bg-red hover:opacity-90 text-white rounded-lg">
                            Confirm
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Static Pagination */}
      <Pagination
        className="flex justify-center items-center gap-3 my-6"
        currentPage={1}
        totalPages={3}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default GymSubmissionsList;
