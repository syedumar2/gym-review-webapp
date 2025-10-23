"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Logo from "../Buttons/Logo";
import { Button } from "../ui/button";
import LoginOrRegisterButtons from "./LoginOrRegisterButtons";
import UserLoggedInClient from "./UserLoggedInClient";
const ListingPageNav = ({
  isOpen,
  setIsOpen,
  session,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  session: any;
}) => {
  const pathname = usePathname();
  const isLoggedIn = !!session?.user;
  return (
    <>
      <nav className="bg-accent">
        <div className="max-w-full px-3 mx-auto  py-4 flex justify-between items-center border-b border-b-black/25">
          {/* Left: Logo / Brand */}
          <div className="flex items-center justify-between gap-6">
            <Logo />
            <div className="flex  w-11/12 md:w-[65vw] border rounded-full border-black/25">
              <input
                type="search"
                placeholder="Search gyms, locations..."
                className="flex-1 p-4  rounded-l-full  bg-primary dark:bg-secondary-dark/85   placeholder-black dark:placeholder-white-dark focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />

              <div className="flex items-center justify-center px-2.5 bg-primary dark:bg-secondary-dark/85  gap-2 overflow-x-auto no-scrollbar  pr-4">
                <button className="flex-shrink-0 px-2 py-1 md:px-3 md:py-1 bg-secondary dark:bg-secondary-dark/85 text-white rounded-full hover:bg-secondary/80 transition text-xs sm:text-sm">
                  Gym Name
                </button>
                <button className="flex-shrink-0 px-2 py-1 md:px-3 md:py-1 bg-secondary/50 dark:bg-secondary-dark/85 text-white rounded-full hover:bg-secondary/80 transition text-xs sm:text-sm">
                  Location
                </button>
                <button className="flex-shrink-0 px-2 py-1 md:px-3 md:py-1 bg-secondary/50 dark:bg-secondary-dark/85 text-white rounded-full hover:bg-secondary/80 transition text-xs sm:text-sm">
                  Type
                </button>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center px-2.5 bg-primary dark:bg-secondary-dark/85 rounded-r-full "
              >
                <div className="p-2 bg-secondary rounded-full">
                  <Search className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
       
          </div>
          {/* Desktop Buttons */}
          {pathname?.includes("/dashboard") || pathname?.includes("/admin") ? (
            isLoggedIn ? (
              <UserLoggedInClient user={session.user} />
            ) : (
              <LoginOrRegisterButtons />
            )
          ) : (
            <LoginOrRegisterButtons />
          )}
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="flex flex-col px-4 py-2 space-y-2">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Button
                className="bg-blue-600 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-blue-700 active:scale-95 w-full"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/signup" className="w-full text-center">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default ListingPageNav;
