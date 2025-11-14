import { useState } from "react";
import { HalfStar } from "../RatingStars/HalfStar";
const RatingInput = ({
  rating,
  onRatingChange,
  loading,
}: {
  rating:number;
  onRatingChange: (rating: number) => void;
  loading: boolean;
}) => {
  const handleRating = (idx: number, half: "left" | "right") => {
    const newRating = idx + (half === "left" ? 0.5 : 1);
    onRatingChange(newRating);
  };

  return (
    <>
      <div className="flex gap-1 cursor-pointer">
        {[0, 1, 2, 3, 4].map((i) => {
          let filled = "none";
          if (rating >= i + 1) filled = "full";
          else if (rating >= i + 0.5) filled = "half";
          return (
            <div key={i} className="relative w-12 h-12">
              <div
                onClick={() => handleRating(i, "left")}
                className="absolute inset-y-0 left-0 w-1/2 z-10 "
              />
              <div
                onClick={() => handleRating(i, "right")}
                className="absolute inset-y-0 right-0 w-1/2 z-10"
              />
              <HalfStar filled={filled} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RatingInput;
