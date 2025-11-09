import { Footer, Header, UserDashboardNav, UserReviews } from "@/components";
import ServerHeader from "@/components/Header";
import { myDummyReviews } from "@/components/User/UserReviews";
import { DummyReview } from "@/types/review";

const page = () => {
  const reviews: DummyReview[] = myDummyReviews;
  return (
    <>
      <ServerHeader />
      <UserDashboardNav />
      <UserReviews reviews={myDummyReviews} />
      <Footer />
    </>
  );
};

export default page;
