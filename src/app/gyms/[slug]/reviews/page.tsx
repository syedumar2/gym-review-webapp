import ServerHeader from "@/components/Header";
import { publicService } from "../../../../../services";
import { Footer } from "@/components";
import GymReviewsDisplay from "@/components/GymReviews/GymReviewsDisplay";
import { SafeParsedGym } from "../../../../../services/publicService";
import { auth } from "../../../../../auth";
import { ApiResponse, Page } from "@/types/api";
import { ReviewWithUserAndVotes } from "@/types/review";

const page = async ({ params }: { params: { slug: string } }) => {
  const session = await auth();
  const { slug } = await params;
  const gymId = slug;
  const resp = await publicService.getAllReviews(
    Number(gymId),
    1,
    2,
    undefined,
    undefined,
    undefined
  );

  const gym = await publicService.getGymById(Number(gymId));
  const userAlreadyReviewed = resp.data.some(
    (r) => r.userId === session?.user.id
  );
  const resultWithWrapper: ApiResponse<Page<ReviewWithUserAndVotes>> = {
    success: true,
    data: resp,
    message: "Initial Render successfull",
  };

  return (
    <>
      <ServerHeader />
      <GymReviewsDisplay
        reviews={resultWithWrapper}
        gym={gym as unknown as SafeParsedGym}
        userAlreadyReviewed={userAlreadyReviewed}
      />
      <Footer />
    </>
  );
};

export default page;
