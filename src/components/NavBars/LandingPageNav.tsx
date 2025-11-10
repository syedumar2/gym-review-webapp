import { X, Menu } from "lucide-react";
import { DarkModeToggle } from "../Buttons/DarkModeToggle";
import Logo from "../Buttons/Logo";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import UserLoggedInClient from "./UserLoggedInClient";
import LoginOrRegisterButtons from "./LoginOrRegisterButtons";

const LandingPageNav = ({
  isOpen,
  setIsOpen,
  session,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  session: any;
}) => {
  const isLoggedIn = !!session?.user;
  return (
    <nav className="bg-accent">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Logo / Brand */}
        <div className="flex items-center justify-between gap-6">
          <Logo />
        </div>

        {isLoggedIn && session?.user ? (
          <UserLoggedInClient user={session.user} />
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
  );
};

export default LandingPageNav;
