import { AdminDashboardNav, BlacklistedUsersList, Footer } from '@/components'
import ServerHeader from '@/components/Header'

const page = () => {
  return (
    <>
    <ServerHeader/>
    <AdminDashboardNav/>
    <BlacklistedUsersList/>
    <Footer/>
    </>
  )
}

export default page