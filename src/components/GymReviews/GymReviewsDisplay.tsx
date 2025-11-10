import { Page } from "@/types/api";
import { JsonValue } from "@prisma/client/runtime/library";
import { EmptyPage } from "../Error/EmptyPage";
import { AlertCircle, PlusCircle, Trash } from "lucide-react";
import GymCardAside from "./GymCardAside";
import { Gym } from "@/generated/prisma";
import { SafeParsedGym } from "../../../services/publicService";
import { Button } from "../ui/button";
import GymReviewsList from "./GymReviewsList";

type GymReviewsDisplayProps = {
  reviews: Page<{
    id: number;
    images: JsonValue | null;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    title: string | null;
    isFlagged: boolean;
    reportReason: string | null;
    hasMedia: boolean;
    userId: string;
    gymId: number;
    isDeleted: boolean;
  }>;
  gym: Gym;
};
const GymReviewsDisplay = ({ reviews, gym }: GymReviewsDisplayProps) => {
  if (!reviews || reviews.data.length === 0) {
    return (
      <>
        <section className="flex min-h-screen">
          <GymCardAside gym={gym as unknown as SafeParsedGym} />{" "}
          <main className="flex-1 p-6 bg-accent">
            <EmptyPage
              heading="Oops, Theres nothing here! "
              subHeading={"Be the first to review this gym! "}
              Icon={Trash}
              className="bg-accent"
            />
            <div className="flex justify-end w-full">
              <Button variant={"constructive"}>
                <PlusCircle />
                Add a Review
              </Button>
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
      <GymReviewsList reviews={reviews}/>
      </section>
    </>
  );
};

export default GymReviewsDisplay;
//TODO(HIGH) : Create a function to allow user to add a review. Add options to upload images, rate gym and post review. Keep safeguards to allow one review per user only.
//TODO (MEDIUM) : Allow users to edit/delete reviews. use flags
//TODO(MEDIUM): Let users and public read,filter,sort and search reviews
//TODO(MEDIUM): Update surface display reviews to read db 