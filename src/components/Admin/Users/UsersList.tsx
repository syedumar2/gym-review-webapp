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

// Mock Data
const mockUsers = [
  {
    id: 1,
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice@example.com",
    location: "Bangalore",
    role: "ADMIN",
    profileImageUrl: "",
    createdAt: "2024-07-12T12:00:00Z",
  },
  {
    id: 2,
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@example.com",
    location: "Mumbai",
    role: "USER",
    profileImageUrl: "",
    createdAt: "2024-06-10T12:00:00Z",
  },
  {
    id: 3,
    firstname: "Charlie",
    lastname: "Khan",
    email: "charlie@example.com",
    location: "Delhi",
    role: "USER",
    profileImageUrl: "",
    createdAt: "2024-05-22T12:00:00Z",
  },
];

const UsersList = () => {
  const [blacklistDialogOpen, setBlacklistDialogOpen] = useState(false);
  const [blackListData, setBlackListData] = useState({ userId: 0, reason: "" });

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-black p-6 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        {/* Fake Sort Dropdown */}
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
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray  bg-accent hover:bg-primary hover:text-black transition`}
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">
                  <img
                    src={
                      user.profileImageUrl ||
                      "https://www.svgrepo.com/show/109737/profile-user.svg"
                    }
                    alt={`${user.firstname} ${user.lastname}`}
                    className="w-10 h-10 rounded-full object-cover border border-gray"
                  />
                </td>
                <td className="p-3 font-medium">{`${user.firstname} ${user.lastname}`}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.location}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-yellow text-overlay border"
                        : "bg-secondary text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3">
                  <Dialog
                    open={blacklistDialogOpen}
                    onOpenChange={setBlacklistDialogOpen}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="bg-secondary hover:bg-secondary/50">
                        <Button className="bg-secondary text-white rounded-full text-xs md:text-sm px-2 py-1 hover:bg-secondary/50">
                          Actions{" "}
                          <ChevronDown className="inline w-4 h-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white text-black">
                        <DropdownMenuItem>✅ Whitelist</DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="text-red">
                            ❌ Blacklist
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Blacklist Dialog */}
                    <DialogContent className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-black">
                          Blacklist User:{" "}
                          <span className="font-bold text-red">
                            {user.firstname} {user.lastname}
                          </span>
                        </DialogTitle>
                        <p className="text-sm text-gray mt-1">
                          Please provide a reason for blacklisting this user.
                        </p>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setBlacklistDialogOpen(false);
                          setBlackListData({ userId: 0, reason: "" });
                        }}
                      >
                        <div className="grid gap-3 pb-3">
                          <Label htmlFor="reason">Reason</Label>
                          <Textarea
                            id="reason"
                            name="reason"
                            value={blackListData.reason}
                            onChange={(e) =>
                              setBlackListData({
                                ...blackListData,
                                reason: e.target.value,
                              })
                            }
                            placeholder="Enter reason for ban"
                            className="min-h-[100px] rounded-lg border-gray"
                          />
                        </div>
                        <DialogFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="rounded-lg border border-gray text-black"
                            onClick={() => setBlacklistDialogOpen(false)}
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

export default UsersList;
