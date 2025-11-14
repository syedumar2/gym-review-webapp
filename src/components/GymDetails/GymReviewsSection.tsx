import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dummyReviews } from "@/types/review";
import { ParsedGym } from "./GymDetails";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dot } from "lucide-react";
import StarRating from "../RatingStars/RatingStars";
import Link from "next/link";

const GymReviewsSection = ({ gym }: { gym: ParsedGym }) => {
  const recentReviews = dummyReviews;
  return (
    <>
      {/* REVIEWS */}
      <section className="space-y-8 py-8">
        <div className="flex flex-col items-start gap-6">
          <h2 className="text-3xl font-bold border-b-4 border-secondary pb-3">
            Positive Reviews
          </h2>
          <div className="w-full">
            <Carousel className="w-full max-w-7xl">
              <CarouselContent className="-ml-4">
                {recentReviews.map((review) => (
                  <CarouselItem
                    key={review.id + Math.random()}
                    className="md:basis-1/2 pl-4"
                  >
                    <Card className="bg-primary/50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold shadow-md">
                              {review.userName.charAt(0).toUpperCase()}
                            </div>
                            <CardTitle className="font-semibold text-lg">
                              {review.userName}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-base font-semibold text-black">
                          Sample Title
                        </p>
                        <p className="text-sm leading-relaxed text-gray">
                          {review.body.length > 80
                            ? review.body.slice(0, 80) + "..."
                            : review.body}
                        </p>
                        {review.images && review.images.length > 0 && (
                          <img
                            src={review.images[0]}
                            alt="review"
                            className="w-full h-48 object-cover rounded-lg shadow-sm"
                          />
                        )}
                      </CardContent>

                      <CardFooter className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray">
                          Rated <StarRating size={16} rating={review.rating} />
                        </div>
                        <p className="flex items-center text-sm text-gray">
                          <Dot className="text-gray" /> Feb 3, 2007
                        </p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant={"default"} className="shadow-lg" />
              <CarouselNext variant={"default"} className="shadow-lg" />
            </Carousel>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <h2 className="text-3xl font-bold border-b-4 border-secondary pb-3">
            Critical Reviews
          </h2>
          <div className="w-full">
            <Carousel className="w-full max-w-7xl">
              <CarouselContent className="-ml-4">
                {recentReviews.map((review) => (
                  <CarouselItem
                    key={review.id + Math.random()}
                    className="md:basis-1/2 pl-4"
                  >
                    <Card className="bg-primary/50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold shadow-md">
                              {review.userName.charAt(0).toUpperCase()}
                            </div>
                            <CardTitle className="font-semibold text-lg">
                              {review.userName}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-base font-semibold text-black">
                          Sample Title
                        </p>
                        <p className="text-sm leading-relaxed text-gray">
                          {review.body.length > 80
                            ? review.body.slice(0, 80) + "..."
                            : review.body}
                        </p>
                        {review.images && review.images.length > 0 && (
                          <img
                            src={review.images[0]}
                            alt="review"
                            className="w-full h-48 object-cover rounded-lg shadow-sm"
                          />
                        )}
                      </CardContent>

                      <CardFooter className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray">
                          Rated <StarRating size={16} rating={review.rating} />
                        </div>
                        <p className="flex items-center text-sm text-gray">
                          <Dot className="text-gray" /> Feb 3, 2007
                        </p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious variant={"default"} className="shadow-lg" />
              <CarouselNext variant={"default"} className="shadow-lg" />
            </Carousel>
          </div>
        </div>
        <h2 className="section-text text-end  mt-8 ">
          <Link href={`/gyms/${gym.id}/reviews`}>See all Reviews</Link>
        </h2>
      </section>
    </>
  );
};

export default GymReviewsSection;
