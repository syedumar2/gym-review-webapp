"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchFilters = "gymName" | "city" | "description";

const SearchSection = () => {
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState<SearchFilters>("gymName");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchText.trim()) return;
    router.push(`/listings?search=${encodeURIComponent(searchText)}&by=${searchBy}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-5xl mx-auto bg-accent/10 p-6 rounded-lg"
    >
      {/* Tag buttons */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <span className="text-lg font-semibold text-white">Search By:</span>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "Gym Name", value: "gymName" },
            { label: "Location", value: "city" },
            { label: "Description", value: "description" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSearchBy(option.value as SearchFilters)}
              className={cn(
                "px-4 py-2 text-black rounded-full transition",
                searchBy === option.value
                  ? "bg-secondary !text-white dark:bg-secondary-dark/85 hover:bg-secondary/80 "
                  : "bg-primary dark:bg-secondary-dark/85 hover:bg-secondary/80 "
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search input with ring on focus */}
      <div
        className={cn(
          "flex w-full border rounded-full transition-all",
          isFocused
            ? "ring-2 ring-blue-500 border-blue-400"
            : "border-black/25"
        )}
      >
        <input
          type="search"
          placeholder="Search gyms, locations..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          className="flex-1 p-4 rounded-l-full bg-primary dark:bg-secondary-dark/85 placeholder-gray focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-6 bg-primary dark:bg-secondary-dark/85 rounded-r-full"
        >
          <div className="p-2 bg-secondary rounded-full">
            <Search className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchSection;
  