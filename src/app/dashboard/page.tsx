
import { Footer, UserDashboardNav } from "@/components";
import ServerHeader from "@/components/Header";
import ServerUserProfile from "@/components/User/UserProfile/ServerUserProfile";

const page = () => {
  return (
    <>
      <ServerHeader />
      <UserDashboardNav />
      <ServerUserProfile/>
      <Footer />
    </>
  );
};

export default page;
//TODO: Complete authentication (LEFT HALFWAY)