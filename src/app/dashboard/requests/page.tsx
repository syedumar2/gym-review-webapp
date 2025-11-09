import { Footer, GymRequests, UserDashboardNav } from '@/components'
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
