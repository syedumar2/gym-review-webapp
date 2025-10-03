import { AdminDashboardNav, BlacklistedUsersList, Footer, Header } from '@/components'

const page = () => {
  return (
    <>
    <Header/>
    <AdminDashboardNav/>
    <BlacklistedUsersList/>
    <Footer/>
    </>
  )
}

export default page