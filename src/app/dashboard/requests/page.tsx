import { Footer, GymRequests, Header, UserDashboardNav } from '@/components'
import ServerHeader from '@/components/Header'

const page = () => {
  return (
    <>
    <ServerHeader/>
    <UserDashboardNav/>
    <GymRequests/>
    <Footer/>
    </>
  )
}

export default page
//TODO: In the future try adding a search bar