"use client";

import {
  Ban,
  Dumbbell,
  Menu,
  MessageCircleWarning,
  Star,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminDashboardNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      href: "/admin/users",
      label: "User List",
      icon: <User className="w-4 h-4" />,
    },
    {
      href: "/admin/submissions",
      label: "Submissions List",
      icon: <Star className="w-4 h-4" />,
    },
    {
      href: "/admin/blacklisted",
      label: "Black List",
      icon: <Ban className="w-4 h-4" />,
    },
    {
      href: "/admin/reported",
      label: "Reported Reviews",
      icon: <MessageCircleWarning className="w-4 h-4" />,
    },
    {
      href: "/admin/gyms",
      label: "Active Gyms",
      icon: <Dumbbell className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="bg-primary border-b-black/50 border-b px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="section-heading !my-2">Welcome Admin</h1>

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
