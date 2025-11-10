import ServerHeader from "@/components/Header";
import { publicService } from "../../../../../services";
import { Footer } from "@/components";
import GymReviewsDisplay from "@/components/GymReviews/GymReviewsDisplay";

const page = async ({ params }: { params: { slug: string } }) => {
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

  return (
    <>
      <ServerHeader />
      <GymReviewsDisplay reviews={resp} gym={gym} />
      <Footer />
    </>
  );
};

export default page;
