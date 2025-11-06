import { ApiResponse, Page } from "@/types/api";
import { publicService } from "../../../services";
import { SafeParsedGym } from "../../../services/publicService";
import GymListings from "./GymListings";
import { Footer } from "../Footer/Footer";
import ServerHeader from "../Header";

export const revalidate = 0;

export default async function GymListingsPage({
  searchText,
  searchBy,
}: {
  searchText: string;
  searchBy: string;
}) {
  const res = await publicService.getAllGyms(
    1,
    20,
    { searchText, searchBy },
    [],
    {}
  );

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
      <GymListings
        response={response}
        searchText={searchText}
        searchBy={searchBy}
      />
      <Footer />
    </>
  );
}
