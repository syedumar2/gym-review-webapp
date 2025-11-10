"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type SearchFilters = "gymName" | "city" | "description";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState<string>(
    searchParams?.get("search")?.toString() ?? ""
  );
  const [searchBy, setSearchBy] = useState<SearchFilters>(
    (searchParams?.get("by")?.toString() as SearchFilters) ?? "gymName"
  );

  const [isFocused, setIsFocused] = useState(false); // 👈 universal focus state
  const { replace } = useRouter();

  function handleSearch(): void {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (searchBy.length > 0 && searchText.length > 0) {
      params.set("search", searchText);
      params.set("by", searchBy);
    } else {
      params.delete("search");
      params.delete("by");
    }
    replace(`${"/listings"}?${params.toString()}`);
  }

  return (
    <div
      className={cn(
        "flex w-11/12 md:w-[65vw] border rounded-full border-black/25 transition-all duration-200",
        isFocused && "ring-2 ring-blue-500 border-transparent" // 👈 full container ring
      )}
    >
      <input
        type="search"
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        className="flex-1 px-4 py-3 rounded-l-full bg-primary dark:bg-secondary-dark/85 placeholder-gray focus:outline-none"
      />

      <div className="flex items-center justify-center px-2.5 bg-primary dark:bg-secondary-dark/85 gap-2 overflow-x-auto no-scrollbar pr-4">
        <button
          className={cn(
            "flex-shrink-0 px-2 py-1 md:px-3 md:py-1 text-white rounded-full hover:bg-secondary/80 transition text-xs sm:text-sm",
            searchBy === "gymName"
              ? "bg-secondary dark:bg-secondary-dark/85"
              : "bg-secondary/50 dark:bg-secondary-dark/85"
          )}
          onClick={() => setSearchBy("gymName")}
        >
          Gym Name
        </button>
        <button
          className={cn(
            "flex-shrink-0 px-2 py-1 md:px-3 md:py-1 text-white rounded-full hover:bg-secondary/80 transition text-xs sm:text-sm",
            searchBy === "city"
              ? "bg-secondary dark:bg-secondary-dark/85"
              : "bg-secondary/50 dark:bg-secondary-dark/85"
          )}
          onClick={() => setSearchBy("city")}
        >
          City
        </button>
        <button
          className={cn(
            "flex-shrink-0 px-2 py-1 md:px-3 md:py-1 text-white rounded-full hover:bg-secondary/80 transition text-xs sm:text-sm",
            searchBy === "description"
              ? "bg-secondary dark:bg-secondary-dark/85"
              : "bg-secondary/50 dark:bg-secondary-dark/85"
          )}
          onClick={() => setSearchBy("description")}
        >
          Description
        </button>
      </div>

      <button
        type="button"
        onClick={() => handleSearch()}
        className="flex items-center justify-center px-2.5 bg-primary dark:bg-secondary-dark/85 rounded-r-full"
      >
        <div className="p-2 bg-secondary rounded-full">
          <Search className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  );
};

export default SearchBar;
