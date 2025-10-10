import { AdminDashboardNav, Footer, UsersList } from "@/components"
import ServerHeader from "@/components/Header"

const page = () => {
  return (
    <>
    <ServerHeader/>
    <AdminDashboardNav/>
    <UsersList/>
    <Footer/>
    </>
  )
}

export default page