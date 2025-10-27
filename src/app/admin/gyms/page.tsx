import { AdminDashboardNav, Footer } from "@/components";
import GymsList from "@/components/Admin/GymsList/GymsList";
import ServerHeader from "@/components/Header";

const page = () => {
  return (
    <>
      <ServerHeader />
      <AdminDashboardNav />
      <GymsList />
      <Footer />
    </>
  );
};

export default page;
