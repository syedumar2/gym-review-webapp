import { Gym } from "@/generated/prisma";
import GymDescription from "./GymDescription";
import GymDetailsHeader from "./GymDetailsHeader";
import GymEquipment from "./GymEquipment";
import GymGallery from "./GymGallery";
import GymMembershipPlans from "./GymMembershipPlans";
import GymReviewsSection from "./GymReviewsSection";

export type ParsedGym = Gym & {
  address: {
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  timings: {
    morningEnd?: string;
    eveningEnd?: string;
    morningStart?: string;
    eveningStart?: string;
  };
  images: { url: string }[];
  membershipPlans: {
    planName: string;
    planType: string;
    price: number;
    perks: string[];
  }[];
};

export default function GymDetails({ gym }: { gym: ParsedGym }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <GymDetailsHeader gym={gym} />

      <GymDescription gym={gym} />

      <GymMembershipPlans gym={gym} />

      <GymGallery gym={gym} />

      <GymEquipment gym={gym} />
      <GymReviewsSection gym={gym} />
    </div>
  );
}
