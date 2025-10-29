import { EmptyPage, Footer } from "@/components";
import ServerHeader from "@/components/Header";
import { AlertCircle } from "lucide-react";
import { publicService } from "../../../../services";
import GymDetails, { ParsedGym } from "@/components/GymDetails/GymDetails";





const page = async ({ params }: { params: { id: string } }) => {
    const resp = await publicService.getGymById(Number(params.id));

     if (!resp) {
    return (
      <>
        <ServerHeader />
        <EmptyPage
          heading="Oops, Something went wrong! "
          subHeading={"No such Gym found! "}
          Icon={AlertCircle}
        />
        <Footer />
      </>
    );
  }
   return (
    <>
      <ServerHeader />
      <GymDetails gym={resp as ParsedGym} />
      <Footer />
    </>
  );
};

export default page;
