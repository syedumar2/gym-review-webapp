"use client";
import { useState } from "react";
import LandingPageNav from "../NavBars/LandingPageNav";
import { usePathname } from "next/navigation";
import ListingPageNav from "../NavBars/ListingPageNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header>
      {pathname?.includes("/listings") || pathname?.includes("/details") ? (
        <ListingPageNav isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <LandingPageNav isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </header>
  );
};

export default Navbar;
