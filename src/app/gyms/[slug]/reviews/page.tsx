import ServerHeader from "@/components/Header";
import { publicService } from "../../../../../services";
import { Footer } from "@/components";
import GymReviewsDisplay from "@/components/GymReviews/GymReviewsDisplay";
import { SafeParsedGym } from "../../../../../services/publicService";
import { auth } from "../../../../../auth";

const page = async ({ params }: { params: { slug: string } }) => {
  const session = await auth();
  const { slug } = await params;
  const gymId = slug;
  const resp = await publicService.getAllReviews(
    Number(gymId),
    1,
    20,
    undefined,
    undefined,
    undefined
  );

  const gym = await publicService.getGymById(Number(gymId));
  const userAlreadyReviewed = resp.data.some(
    (r) => r.userId === session?.user.id
  );

  return (
    <>
      <ServerHeader />
      <GymReviewsDisplay reviews={resp} gym={gym as unknown as SafeParsedGym} userAlreadyReviewed={userAlreadyReviewed} />
      <Footer />
    </>
  );
};

export default page;
