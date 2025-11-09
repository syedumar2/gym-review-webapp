import { DummyReview } from "@/types/review";
import StarRating from "../RatingStars/RatingStars";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import PaginationStatic from "../Pagination/PaginationStatic";

export const myDummyReviews: DummyReview[] = [
  {
    id: "r1",
    gymId: "g1",
    gymName: "FitLife Gym",
    userName: "Current User",
    userAvatar: "https://randomuser.me/api/portraits/men/99.jpg",
    rating: 4.5,
    body: "Great gym! Clean, friendly trainers, and well-maintained equipment.",
    createdAt: "2025-09-25T12:00:00Z",
    images: [
      "https://www.workoutforless.co.uk/cdn/shop/articles/luis-reyes-mTorQ9gFfOg-unsplash_2_640x.jpg?v=1657122621",
    ],
  },
  {
    id: "r2",
    gymId: "g2",
    gymName: "Urban Strength Studio",
    userName: "Current User",
    userAvatar: "https://randomuser.me/api/portraits/men/99.jpg",
    rating: 4.0,
    body: "Nice ambiance, good for cardio, but can get crowded on weekends.",
    createdAt: "2025-09-20T16:30:00Z",
  },
  {
    id: "r3",
    gymId: "g3",
    gymName: "Iron Temple 24/7",
    userName: "Current User",
    userAvatar: "https://randomuser.me/api/portraits/men/99.jpg",
    rating: 5.0,
    body: "Excellent 24/7 access, perfect for late-night workouts!",
    createdAt: "2025-09-18T08:45:00Z",
  },
];

type MyReviewsProps = {
  reviews: DummyReview[];
};

export const UserReviews = ({ reviews }: MyReviewsProps) => {
  return (
    <section className="p-4 bg-accent">
          <h1 className="text-2xl font-semibold ml-4 mb-4">My Reviews</h1>

      <section className="py-4  grid grid-cols-1 md:grid-cols-2 overflow-y-auto gap-2 ">
        
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="w-max-2xl my-2 p-4 h-full mx-2 text-center bg-primary border border-gray/50 rounded-lg shadow-sm sm:p-8 relative"
          >
            <div className="flex items-center gap-3 ">
              <img
                src={rev.userAvatar}
                alt={rev.userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex items-center justify-between w-full">
                <p className="font-medium mt-1">{rev.userName}</p>
                <StarRating rating={rev.rating} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-start mt-3 ml-1 text-gray truncate">
              {rev.gymName}
            </h2>
            {rev.images && rev.images.length > 0 && (
              <img
                src={rev.images[0]}
                alt="review"
                className="w-full h-36 my-2 object-cover rounded-md"
              />
            )}

            <p className="text-md text-justify text-gray mt-3 tracking-tight px-1">
              {rev.body}
            </p>
            <div className="w-full h-7"></div>
            <div className="absolute bottom-5 right-6 flex items-center gap-2 ">
              <Button variant={"secondary"}>
                <Edit />
              </Button>
              <Button variant={"destructive"}>
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </section>
      <section className="flex w-full items-center justify-center py-4">
        <PaginationStatic />
      </section>
    </section>
  );
};
