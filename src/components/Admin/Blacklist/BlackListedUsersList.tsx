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

// Mock Blacklisted Users
const mockBlacklistedUsers = [
  {
    id: 10,
    firstname: "David",
    lastname: "Roy",
    email: "david@example.com",
    location: "Chennai",
    role: "USER",
    profileImageUrl: "",
    createdAt: "2024-04-15T12:00:00Z",
    reason: "Spamming reviews",
  },
  {
    id: 11,
    firstname: "Esha",
    lastname: "Patel",
    email: "esha@example.com",
    location: "Pune",
    role: "USER",
    profileImageUrl: "",
    createdAt: "2024-03-20T12:00:00Z",
    reason: "Fake information",
  },
];

const BlacklistedUsersList = () => {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeData, setRemoveData] = useState({ userId: 0, note: "" });

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-black p-6 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Blacklisted Users</h1>
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
              <th className="p-3 text-left">Blacklisted On</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockBlacklistedUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray bg-accent hover:bg-primary hover:text-black transition"
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
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red text-white">
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
                <td className="p-3 text-sm text-red">{user.reason}</td>
                <td className="p-3">
                  <Dialog
                    open={removeDialogOpen}
                    onOpenChange={setRemoveDialogOpen}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-red text-white rounded-full text-xs md:text-sm px-2 py-1 hover:opacity-90">
                          Actions <ChevronDown className="inline w-4 h-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white text-black">
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="text-secondary">
                            ✅ Remove from Blacklist
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Remove Dialog */}
                    <DialogContent className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-black">
                          Remove from Blacklist:{" "}
                          <span className="font-bold text-red">
                            {user.firstname} {user.lastname}
                          </span>
                        </DialogTitle>
                        <p className="text-sm text-gray mt-1">
                          Optionally add a note for removing this user from
                          blacklist.
                        </p>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setRemoveDialogOpen(false);
                          setRemoveData({ userId: 0, note: "" });
                        }}
                      >
                        <div className="grid gap-3 pb-3">
                          <Label htmlFor="note">Note</Label>
                          <Textarea
                            id="note"
                            name="note"
                            value={removeData.note}
                            onChange={(e) =>
                              setRemoveData({
                                ...removeData,
                                note: e.target.value,
                              })
                            }
                            placeholder="Optional reason"
                            className="min-h-[100px] rounded-lg border-gray"
                          />
                        </div>
                        <DialogFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="rounded-lg border border-gray text-black"
                            onClick={() => setRemoveDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button className="bg-secondary hover:opacity-90 text-white rounded-lg">
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

      {/* Pagination */}
      <Pagination
        className="flex justify-center items-center gap-3 my-6"
        currentPage={1}
        totalPages={2}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default BlacklistedUsersList;
