import {
  EmptyPage,
  Footer,
  GymSubmissionDetails,
  UserDashboardNav,
} from "@/components";
import ServerHeader from "@/components/Header";
import { ParsedGymRequest } from "@/components/User/GymSubmissionDetails";
import { AlertCircle } from "lucide-react";
import { userService } from "../../../../../services";

const page = async ({ params }: { params: { id: string } }) => {
  const resp = await userService.getGymSubmissionDetailsById(Number(params.id));

  if (!resp) {
    return (
      <>
        <ServerHeader />
        <EmptyPage
          heading="Oops, Something went wrong! "
          subHeading={"No such Gym request found! "}
          Icon={AlertCircle}
        />
        <Footer />
      </>
    );
  }
  return (
    <>
      <ServerHeader />
      <UserDashboardNav />
      <GymSubmissionDetails gym={resp as ParsedGymRequest} />
      <Footer />
    </>
  );
};

export default page;
