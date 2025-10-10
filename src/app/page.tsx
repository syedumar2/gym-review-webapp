
import { FeaturedGyms, Footer, Header, HeroSearchBar, RecentReviews, RequestGymCTA } from "@/components";
import { dummyGyms } from "@/types/gym";
import { dummyReviews } from "@/types/review";

export default function Home() {
  const featuredGyms = dummyGyms.slice(0, 4);
  const recentReviews = dummyReviews.slice(0, 4);

  return (
    <div>
      <Header />
      <HeroSearchBar />
      <FeaturedGyms listings={featuredGyms} />
      <RecentReviews reviews={recentReviews} />
      <RequestGymCTA />
      <Footer />
    </div>
  );
}
