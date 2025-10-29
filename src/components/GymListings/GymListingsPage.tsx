import { ApiResponse, Page } from "@/types/api";
import { publicService } from "../../../services";
import GymListings from "./GymListings";
import { Gym } from "@/generated/prisma";
import { SafeParsedGym } from "../../../services/publicService";

export const revalidate = 0;

export default async function GymListingsPage() {
  const res = await publicService.getAllGyms(1, 3, undefined, []);

  if (!res) {
    console.error("Failed to fetch gyms:", res);
    throw new Error("Failed to fetch gyms");
  }
  const response: ApiResponse<Page<SafeParsedGym>> = {
    success: true,
    data: res,
    message: "Retrieved initial data successfully",
  };

  return <GymListings response={response} />;
}
