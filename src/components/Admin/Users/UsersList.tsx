"use client";
import { EmptyPage, Loading } from "@/components";
import Pagination from "@/components/Pagination/Pagination";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/generated/prisma";
import { ApiResponse, Page, SortParam } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Annoyed,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type UsersFetchParams = {
  page: number;
  pageSize: number;
  sort?: SortParam[];
};


const UsersList = () => {
  const [blacklistDialogOpen, setBlacklistDialogOpen] = useState(false);
  const [blackListData, setBlackListData] = useState({ userId: 0, reason: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortParams, setSortParams] = useState<SortParam[]>([
    { field: "createdAt", order: "asc" }, // default
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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  async function fetchUsers(
    params: UsersFetchParams
  ): Promise<ApiResponse<Page<User>>> {
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
    const resp = await fetch(`/api/admin/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: params.page,
        pageSize: params.pageSize,
        sort: safeSort.length
          ? safeSort
          : [{ field: "createdAt", order: "asc" }], // default sort
      }),
    });
    const result = await resp.json();

    return result;
  }

  const { data, error, isPending } = useQuery({
    queryKey: ["users", currentPage, sortParams],
    queryFn: () =>
      fetchUsers({
        page: currentPage,
        pageSize: 20,
        sort: sortParams,
      }),
  });

  if (isPending) {
    return <Loading />;
  }
  if (!data?.data?.data || data.data.data.length === 0)
    return (
      <section className="relative">
        <EmptyPage
          heading="No Users available"
          subHeading="Looks like nobody has registered on you website"
          Icon={Annoyed}
        />
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
    <div className="min-h-screen bg-[var(--color-primary)] text-black p-6 transition-colors">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray rounded-lg">
          <thead className="bg-secondary text-white text-xs md:text-sm uppercase tracking-wider sticky top-0">
            <tr>
              <th className="p-3 text-left">Profile</th>

              {["name", "email", "role", "createdAt"].map((field) => {
                const activeSort = sortParams.find((s) => s.field === field);
                const isAsc = activeSort?.order === "asc";
                const isDesc = activeSort?.order === "desc";

                const labelMap: Record<string, string> = {
                  name: "Name",
                  email: "Email",
                  role: "Role",
                  createdAt: "Created At",
                };

                return (
                  <th key={field} className="p-3 text-left border-gray-300">
                    <button
                      onClick={() => toggleSort(field)}
                      className={`
              flex items-center gap-1 w-full font-medium 
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

              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data.data.map((user, index) => (
              <tr
                key={index}
                className={`border-b border-gray  bg-accent hover:bg-primary hover:text-black transition`}
              >
                <td className="p-3">
                  <img
                    src={
                      user.image ||
                      "https://www.svgrepo.com/show/109737/profile-user.svg"
                    }
                    alt={`${user.name} `}
                    className="w-10 h-10 rounded-full object-cover border border-gray"
                  />
                </td>
                <td className="p-3 font-medium">{`${user.name}`}</td>
                <td className="p-3">{user.email}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-yellow text-overlay border"
                        : "bg-secondary text-white"
                    }`}
                  >
                    {user.role === "admin" ? "ADMIN" : "USER"}
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
                  {user?.location?.set?.state ?? "Not Provided"}
                </td>
                <td className="p-3">
                  <Dialog
                    open={blacklistDialogOpen}
                    onOpenChange={setBlacklistDialogOpen}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="bg-secondary hover:bg-secondary/50"
                      >
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
                            {user.name}
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
        currentPage={currentPage}
        totalPages={data.data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersList;
//TODO: Add actions to black list users
