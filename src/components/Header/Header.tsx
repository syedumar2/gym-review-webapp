"use client";
import { useState } from "react";
import LandingPageNav from "../NavBars/LandingPageNav";
import { usePathname } from "next/navigation";
import ListingPageNav from "../NavBars/ListingPageNav";

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header>
      {pathname?.includes("/listings") ||
      pathname?.includes("/details") ||
      pathname?.includes("/dashboard") ? (
        <ListingPageNav isOpen={isOpen} setIsOpen={setIsOpen} session={session} />
      ) : (
        <LandingPageNav isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </header>
  );
};

export default Navbar;
