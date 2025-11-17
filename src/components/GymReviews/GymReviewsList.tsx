"use client";
import { cn } from "@/lib/utils";
import { ApiResponse, Page } from "@/types/api";
import { ReviewWithUserAndVotes } from "@/types/review";
import { InfiniteData } from "@tanstack/react-query";
import { Dot, ThumbsDown, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { forwardRef } from "react";
import StarRating from "../RatingStars/RatingStars";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";

type GymReviewsListProps = {
  reviews: InfiniteData<
    ApiResponse<Page<ReviewWithUserAndVotes>> | undefined,
    unknown
  >;
  className?: string;
};

const GymReviewsList = forwardRef<HTMLDivElement, GymReviewsListProps>(
  ({ reviews, className }, ref) => {
    const { data: session } = useSession();
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {reviews.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.data?.data.map((review) => (
              <Card
                className={cn(
                  "relative bg-primary/50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 h-full  ",
                  { "border-secondary": review.userId === session?.user?.id }
                )}
                key={review.id}
              >
                <CardHeader className="relative">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold shadow-md">
                        {review.user.name?.charAt(0)}{" "}
                      </div>
                      <CardTitle className="font-semibold text-lg">
                        {review.user.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <div
                  className={
                    review.userId === session?.user?.id
                      ? "absolute top-4 right-4 flex gap-2"
                      : "hidden"
                  }
                >
                  <EditReview review={review} />
                  <DeleteReview review={review} />
                </div>

                <CardContent className="space-y-3">
                  <p
                    className={
                      review.title
                        ? "text-base font-semibold text-black"
                        : "hidden"
                    }
                  >
                    {review.title}
                  </p>
                  <p className="text-sm leading-relaxed text-gray">
                    {review.body}
                  </p>
                  {review.images && review.images.length > 0 && (
                    <section>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {review.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            alt={`Image ${i + 1}`}
                            className="w-full h-52 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray">
                    Rated <StarRating size={16} rating={review.rating} />{" "}
                    {+new Date(review.createdAt) !== +new Date(review.updatedAt)
                      ? "Edited"
                      : ""}
                  </div>
                  <div className="flex items-center text-sm text-gray">
                    <div className="flex gap-2 items-center text-sm text-gray">
                      <p className="flex gap-1 items-center">
                        <ThumbsUp size={16} className="mb-0.5" /> 12
                      </p>
                      <p className="flex gap-1 items-center">
                        <ThumbsDown size={16} className="mt-1" /> 1
                      </p>
                    </div>
                    <p className="flex items-center text-sm text-gray">
                      <Dot className="text-gray" />{" "}
                      {new Date(review.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </React.Fragment>
        ))}
        <div ref={ref as any} className=""></div>
      </div>
    );
  }
);
export default GymReviewsList;
