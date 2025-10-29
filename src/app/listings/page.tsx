import { Footer, GymListings, Header } from "@/components";
import GymListingsPage from "@/components/GymListings/GymListingsPage";
import ServerHeader from "@/components/Header";

const page = () => {
  return (
    <>
      <ServerHeader />
      <GymListingsPage/>
      <Footer />
    </>
  );
};

export default page;
