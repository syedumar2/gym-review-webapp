"use client"
import { cn } from "@/lib/utils";
import { Page } from "@/types/api";
import { ReviewWithUserAndVotes } from "@/types/review";
import { Dot, ThumbsDown, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import StarRating from "../RatingStars/RatingStars";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type GymReviewsListProps = {
  reviews: Page<ReviewWithUserAndVotes>;
  className?: string;
  userAlreadyReviewed: boolean;
};
const GymReviewsList = ({
  reviews,
  className,
  userAlreadyReviewed,
}: GymReviewsListProps) => {
  const {data: session} = useSession();
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {reviews.data.map((review) => (
        <Card
          className={cn(
            "bg-primary/50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 h-full  ",
            { "border-secondary": review.userId === session?.user?.id,  }
          )}
          key={review.id}
        >
          <CardHeader className="">
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

          <CardContent className="space-y-3">
            <p className={review.title ? "text-base font-semibold text-black":"hidden"}>{review.title}</p>
            <p className="text-sm leading-relaxed text-gray">{review.body}</p>
            {review.images?.length > 0 && (
              <section
                className={
                  !review.images &&
                  (review.images.length === 0 || review.images === null)
                    ? "hidden"
                    : "block"
                }
              >
                <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2 mb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {review.images &&
                    review?.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        alt={`   ${i + 1}`}
                        className="w-full h-52 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                      />
                    ))}
                </div>
              </section>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray">
              Rated <StarRating size={16} rating={review.rating} />
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
    </div>
  );
};

export default GymReviewsList;
//TODO (MODERATE): Implement like/dislike system
