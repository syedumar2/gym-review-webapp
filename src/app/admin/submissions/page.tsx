import { AdminDashboardNav, Footer, GymSubmissionsList } from '@/components'
import ServerHeader from '@/components/Header'

const page = () => {
  return (
    <>
    <ServerHeader/>
    <AdminDashboardNav/>
        <GymSubmissionsList/>
    <Footer/>
    </>
  )
}

export default page