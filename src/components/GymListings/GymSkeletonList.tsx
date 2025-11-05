"use client";

import { Skeleton } from "@/components/ui/skeleton";

const GymSkeletonCard = () => {
  return (
    <div className="w-full max-w-sm bg-primary border border-accent rounded-2xl shadow-md overflow-hidden">
      <Skeleton className="w-full h-56" /> {/* Image placeholder */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-1/2" /> {/* Gym name */}
          <Skeleton className="h-5 w-16" /> {/* Rating */}
        </div>
        <Skeleton className="h-4 w-24" /> {/* City */}
        <Skeleton className="h-4 w-20" /> {/* Gym type */}
        <Skeleton className="h-4 w-28" /> {/* Gender segregation */}
        <Skeleton className="h-4 w-16 mt-2" /> {/* Reviews */}
        <Skeleton className="h-9 w-full mt-4 rounded-lg" /> {/* Button */}
      </div>
    </div>
  );
};

const GymSkeletonList = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <GymSkeletonCard key={i} />
      ))}
    </div>
  );
};

export default GymSkeletonList;
