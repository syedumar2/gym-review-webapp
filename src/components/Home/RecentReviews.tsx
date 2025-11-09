import { DummyReview } from "@/types/review";
import "./RecentReviews.css";
import StarRating from "../RatingStars/RatingStars";
type RecentReviewsProps = {
  reviews: DummyReview[];
};

const RecentReviews = ({ reviews }: RecentReviewsProps) => {
  const displayReviews = [...reviews, ...reviews];
  return (
    <section className="py-8 px-4 bg-primary">
      <h1 className="section-heading  ">Recent Reviews</h1>
      <div className="review-ticker ">
        <div className="track">
          {displayReviews.map((review) => (
            <div key={review.id + Math.random()} className="card">
              <div className="flex items-center gap-3 ">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium mt-1">{review.userName}</p>
                  <StarRating rating={review.rating} />
                </div>
              </div>

              {review.images && review.images.length > 0 && (
                <img
                  src={review.images[0]}
                  alt="review"
                  className="w-full h-36 my-2 object-cover rounded-md"
                />
              )}

              <p className="text-md text-justify text-gray mt-3 tracking-tight px-1">
                {review.body.length > 80
                  ? review.body.slice(0, 80) + "..."
                  : review.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentReviews;
