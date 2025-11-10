import { Review } from "@/generated/prisma";
import { Page } from "@/types/api";
import React from "react";

type GymReviewsListProps = {
  reviews: Page<Review>;
};
const GymReviewsList = ({ reviews }: GymReviewsListProps) => {
  return <div>GymReviewsList</div>;
};

export default GymReviewsList;
