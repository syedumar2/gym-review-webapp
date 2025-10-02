import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { DarkModeToggle } from "../Buttons/DarkModeToggle";

const UserLoggedInButtons = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link
        href="/login"
        className="text-textColor hover:text-secondary text-sm"
      >
        Login
      </Link>
      <Button
        variant="secondary"
        className="  rounded-full px-6 py-2 text-sm font-medium shadow text-white  active:scale-95"
      >
        <Link href="/signup">Get Started</Link>
      </Button>
      <DarkModeToggle />
    </div>
  );
};

export default UserLoggedInButtons;
