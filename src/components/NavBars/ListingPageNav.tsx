"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Logo from "../Buttons/Logo";
import { Button } from "../ui/button";
import LoginOrRegisterButtons from "./LoginOrRegisterButtons";
import SearchBar from "./SearchBar";
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
            <SearchBar />
          </div>
          {/* Desktop Buttons */}
          <div className="mr-2">
            {isLoggedIn && session?.user ? (
              <UserLoggedInClient user={session.user} />
            ) : (
              <LoginOrRegisterButtons />
            )}
          </div>

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
