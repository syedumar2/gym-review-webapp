"use client";

import SearchSection from "./SearchSection";

const HeroSearchBar = () => {
  return (
    <section className=
    "min-h-[100vh] bg-[url('https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 dark:bg-overlay/40  "></div>

      <div className="relative z-50 flex flex-col items-center justify-center py-20">
        <h1 className="hero-heading">
          Looking for a good gym
        </h1>
        <p className="hero-text">
          Find the best gyms in your city with real reviews from members like you.
        </p>
       <SearchSection/>
      </div>
    </section>
  );
};

export default HeroSearchBar;
