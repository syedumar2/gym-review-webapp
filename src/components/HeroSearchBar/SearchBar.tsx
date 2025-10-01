"use client";

import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <form className="w-full max-w-5xl mx-auto bg-accent/10 p-6 rounded-lg">
      {/* Tag buttons */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <span className="text-lg font-semibold text-white">Search By:</span>
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-primary dark:bg-secondary-dark/85 text-black rounded-full hover:bg-secondary/80 transition">
            Gym Name
          </button>
          <button className="px-4 py-2 bg-primary dark:bg-secondary-dark/85 text-black rounded-full hover:bg-secondary/80 transition">
            Location
          </button>
          <button className="px-4 py-2 bg-primary dark:bg-secondary-dark/85 text-black rounded-full hover:bg-secondary/80 transition">
            Type
          </button>
        </div>
      </div>

      {/* Search input with button */}
      <div className="flex w-full">
        <input
          type="search"
          placeholder="  Search gyms, locations..."
          className="flex-1 p-4 rounded-l-full bg-primary dark:bg-secondary-dark/85   placeholder-black dark:placeholder-white-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="flex items-center justify-center px-6 bg-primary dark:bg-secondary-dark/85 rounded-r-full "
        >
          <Search className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Static suggestions */}
      <div className="hidden absolute top-full mt-2 left-0 w-full bg-primary dark:bg-secondary-dark/85 text-black rounded-xl shadow-lg p-4 space-y-2">
        <span className="hover:bg-secondary px-2 py-1 rounded cursor-pointer block">
          Gold's Gym
        </span>
        <span className="hover:bg-secondary px-2 py-1 rounded cursor-pointer block">
          Anytime Fitness
        </span>
        <span className="hover:bg-secondary px-2 py-1 rounded cursor-pointer block">
          CrossFit Bangalore
        </span>
        <span className="hover:bg-secondary px-2 py-1 rounded cursor-pointer block">
          Fitness World
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
