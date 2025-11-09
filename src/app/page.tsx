
import { FeaturedGyms, Footer, Header, HeroSearchBar, RecentReviews, RequestGymCTA } from "@/components";
import ServerHeader from "@/components/Header";
import { dummyGyms } from "@/types/gym";
import { dummyReviews } from "@/types/review";

export default function Home() {
  const featuredGyms = dummyGyms.slice(0, 4);
  const recentReviews = dummyReviews.slice(0, 4);

  return (
    <div>
      <ServerHeader/>
      <HeroSearchBar />
      <FeaturedGyms listings={featuredGyms} />
      <RecentReviews reviews={recentReviews} />
      <RequestGymCTA />
      <Footer />
    </div>
  );
}
//TODO (MODERATE): Update the details page to show description
//TODO(HIGH) : Work on reviews frontend