import { Page } from "@/types/api";
import { ReviewWithUserAndVotes } from "@/types/review";
import { Trash } from "lucide-react";
import { SafeParsedGym } from "../../../services/publicService";
import { EmptyPage } from "../Error/EmptyPage";
import AddReview from "./AddReview";
import GymCardAside from "./GymCardAside";
import GymReviewsList from "./GymReviewsList";

type GymReviewsDisplayProps = {
  reviews: Page<ReviewWithUserAndVotes>;
  gym: SafeParsedGym;
  userAlreadyReviewed: boolean;
};
const GymReviewsDisplay = ({
  reviews,
  gym,
  userAlreadyReviewed,
}: GymReviewsDisplayProps) => {
  if (!reviews || reviews.data.length === 0) {
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
          <h1 className="text-2xl font-semibold text-shadow-black">Reviews</h1></div>
          <GymReviewsList reviews={reviews} className="p-6" userAlreadyReviewed={userAlreadyReviewed}/>
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
//TODO(HIGH) : Keep safeguards to allow one review per user only.
//TODO (MEDIUM) : Allow users to edit/delete reviews. use flags
//TODO(MEDIUM): Let users and public read,filter,sort and search reviews
//TODO(MEDIUM): Update surface display reviews to read db
