import {
  Footer,
  GymRequestFormComponent,
  UserDashboardNav,
} from "@/components";
import ServerHeader from "@/components/Header";

const page = () => {
  return (
    <>
      <ServerHeader />
      <UserDashboardNav />
      <GymRequestFormComponent />
      <Footer />
    </>
  );
};

export default page;
