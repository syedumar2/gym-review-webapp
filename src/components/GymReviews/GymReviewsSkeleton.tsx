import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const GymReviewsSkeleton = () => {
  return (
    <Card className="bg-primary/20 border-2 border-gray-200 h-full animate-pulse">
      {/* Header */}
      <CardHeader>
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Skeleton className="w-10 h-10 rounded-full" />
            {/* Username */}
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        {/* Title */}
        <Skeleton className="h-4 w-48" />

        {/* Body text */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Skeleton className="w-full h-32 rounded-lg" />
          <Skeleton className="w-full h-32 rounded-lg" />
          <Skeleton className="w-full h-32 rounded-lg hidden sm:block" />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
        {/* Rating */}
        <Skeleton className="h-4 w-32" />

        {/* Votes + Date */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default GymReviewsSkeleton;
