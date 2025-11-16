"use client";
import { usePagination, useSort } from "@/hooks";
import { ApiResponse, Page } from "@/types/api";
import {
  ReviewSearch,
  ReviewSortParams,
  ReviewWithUserAndVotes,
} from "@/types/review";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { ReviewFilters, SafeParsedGym } from "../../../services/publicService";
import SortMenu from "../Buttons/SortMenu";
import { EmptyPage } from "../Error/EmptyPage";
import ErrorPage from "../Error/ErrorCard";
import { Loading } from "../Overlays/Loading";
import AddReview from "./AddReview";
import GymCardAside from "./GymCardAside";
import GymReviewsList from "./GymReviewsList";
import ReviewFilterMenu from "./ReviewFilterMenu";
import { useInView } from "react-intersection-observer";
import GymReviewsSkeleton from "./GymReviewsSkeleton";
import { useInfiniteReviews } from "@/hooks/useInfiniteReviews";

type GymReviewsDisplayProps = {
  reviews: ApiResponse<Page<ReviewWithUserAndVotes>>;
  gym: SafeParsedGym;
  userAlreadyReviewed: boolean;
};

type ReviewsFetchParams = {
  gymId: number;
  page: number;
  pageSize: number;
  search?: ReviewSearch;
  sort?: ReviewSortParams[];
  filters?: ReviewFilters;
};

export const REVIEW_SORT_LABELS: Record<string, string> = {
  rating: "Rating",
  createdAt: "Date Added",
  votes: "Likes",
};

const GymReviewsDisplay = ({
  reviews,
  gym,
  userAlreadyReviewed,
}: GymReviewsDisplayProps) => {
  const { sort, handleSortChange } = useSort([
    { field: "createdAt", order: "desc" },
  ]);

  const [filters, setFilters] = useState<ReviewFilters>({});
  const handleFilterChange = (filter: ReviewFilters) => {
    setFilters(filter);
  };

  const { data, error, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteReviews(
      gym.id,
      5,
      sort as unknown as ReviewSortParams[],
      filters,
      reviews,
      undefined
    );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  //JSX
  if (!data || data.pages.length === 0) {
    return (
      <>
        <section className="flex min-h-screen">
          <GymCardAside gym={gym} />{" "}
          <main className="flex-1 p-6 bg-accent">
            <EmptyPage
              heading="Oops, Theres nothing here! "
              subHeading={"Be the first to review this gym! "}
              Icon={Trash}
              className="bg-accent"
            />
            <div className="fixed bottom-6 right-6">
              <AddReview
                gym={gym}
                className={userAlreadyReviewed ? "hidden" : ""}
              />
            </div>
          </main>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="flex min-h-screen">
        <GymCardAside gym={gym as unknown as SafeParsedGym} />
        <main className="flex-1  bg-accent">
          <div className="bg-primary border-b-black/50 border-b px-6 py-3 w-full shadow-md">
            <h1 className="text-2xl font-semibold text-shadow-black">
              Reviews
            </h1>
          </div>
          <div className="flex justify-between items-center px-6 pt-4 w-full ">
            <ReviewFilterMenu
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <SortMenu
              fields={Object.keys(REVIEW_SORT_LABELS)}
              labels={REVIEW_SORT_LABELS}
              activeSorts={sort}
              onSortChange={handleSortChange}
            />
          </div>
          {status === "pending" ? (
            <Loading />
          ) : status === "error" ? (
            <ErrorPage />
          ) : (
            <>
              <GymReviewsList reviews={data} className="p-6" ref={ref} />
              {isFetchingNextPage && (
                <div className="p-6 space-y-6">
                  <GymReviewsSkeleton />
                  <GymReviewsSkeleton />
                </div>
              )}
            </>
          )}
          <div className="fixed bottom-6 right-6">
            <AddReview
              gym={gym}
              className={userAlreadyReviewed ? "hidden" : ""}
            />
          </div>
        </main>
      </section>
    </>
  );
};

export default GymReviewsDisplay;

//TODO(HIGH) : Implement review seach functionality
//TODO (MEDIUM) : Allow users to edit/delete reviews.
//TODO(MEDIUM): Then implement like and dislike functionality
//TODO(MEDIUM): Update surface display reviews to read db
