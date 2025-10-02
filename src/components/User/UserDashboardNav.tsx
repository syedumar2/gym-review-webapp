"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { User, Star, Dumbbell, Menu, X } from "lucide-react";

export default function UserDashboardNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      href: "/dashboard/profile",
      label: "My Profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      href: "/dashboard/reviews",
      label: "My Reviews",
      icon: <Star className="w-4 h-4" />,
    },
    {
      href: "/dashboard/requests",
      label: "My Gym Requests",
      icon: <Dumbbell className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="bg-primary border-b-black/50 border-b px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-semibold text-shadow-black">Dashboard</h1>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm py-2 border-b-2 transition-colors
                  ${
                    isActive
                      ? "border-secondary text-secondary"
                      : "border-transparent text-black hover:text-secondary hover:border-secondary  "
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="flex flex-col mt-3 md:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm py-3 border-b-2 transition-colors
                  ${
                    isActive
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-700 hover:text-teal-600 hover:border-teal-600"
                  }`}
                onClick={() => setIsOpen(false)} // close menu after click
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
