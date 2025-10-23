"use client";

import { handleSignOut } from "@/actions/userActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "../Buttons/DarkModeToggle";

const UserLoggedInClient = ({ user }: { user: any }) => {
  return (
    <div className="flex items-center gap-4 ">
      <div className="flex items-center gap-2.5 w-full">
        <Avatar className="w-9 h-9">
          {" "}
          {/* size-9 → ensure w/h */}
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
          <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
            {user?.name?.charAt(0) ?? "?"}
          </AvatarFallback>
        </Avatar>
        <span className="whitespace-nowrap text-base ">{user?.name}</span>
        
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className=" rounded hover:bg-gray-100 ">
            <ChevronDown className="size-4 " />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-primary">
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/reviews">My Reviews</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/requests">My Gym Requests</Link>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuItem>
              <Link href="/admin/users">Admin Panel</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <form action={handleSignOut}>
              <button type="submit" className="text-red">
                Log Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      
        <DarkModeToggle />
      
    </div>
  );
};

export default UserLoggedInClient;
