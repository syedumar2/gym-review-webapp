import { Footer, Header, UserDashboardNav, UserReviews } from '@/components'
import { myDummyReviews } from '@/components/User/UserReviews'
import { Review } from '@/types/review';

const page = () => {
const reviews:Review[] = myDummyReviews;
  return (
  <>
    <Header/>
    <UserDashboardNav/>
    <UserReviews reviews={myDummyReviews} />
    <Footer/>
    </>
  )
}

export default page