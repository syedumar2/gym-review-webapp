import { AdminDashboardNav, Footer, GymSubmissionsList, Header } from '@/components'

const page = () => {
  return (
    <>
    <Header/>
    <AdminDashboardNav/>
        <GymSubmissionsList/>
    <Footer/>
    </>
  )
}

export default page