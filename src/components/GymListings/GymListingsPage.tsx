import { ApiResponse, Page } from "@/types/api";
import { publicService } from "../../../services";
import { SafeParsedGym } from "../../../services/publicService";
import GymListings from "./GymListings";
import { Footer } from "../Footer/Footer";
import ServerHeader from "../Header";

export const revalidate = 0;

export default async function GymListingsPage() {
  const res = await publicService.getAllGyms(1, 20, undefined, [], {});

  if (!res) {
    console.error("Failed to fetch gyms:", res);
    throw new Error("Failed to fetch gyms");
  }
  const response: ApiResponse<Page<SafeParsedGym>> = {
    success: true,
    data: res,
    message: "Retrieved initial data successfully",
  };

  return (
    <>
      <ServerHeader />
      <GymListings response={response} />
      <Footer />
    </>
  );
}
//TODO: Find a way to integrate search bar with header. Most likely we have to lift the search param prop from the header, might need to make it a client component completely
