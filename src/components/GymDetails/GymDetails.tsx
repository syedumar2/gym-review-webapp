import { Gym } from "@/generated/prisma";
import { Review } from "@/types/review";
import {
  Clock,
  Dumbbell,
  Icon,
  MapPin,
  PersonStanding,
  Phone,
  Settings,
  Settings2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import PaginationStatic from "../Pagination/PaginationStatic";
import StarRating from "../RatingStars/RatingStars";
import {
  AMENITY_LABELS,
  CARDIO_EQUIPMENT_LABELS,
  FUNCTIONAL_EQUIPMENT_LABELS,
  GENDER_SEGREGATION_LABELS,
  GYM_TYPE_LABELS,
  MISC_EQUIPMENT_LABELS,
  STRENGTH_EQUIPMENT_LABELS,
} from "@/types/gym";

const formatTime = (time: string) => {
  try {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return time;
  }
};

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
      {/* HEADER */}
      <section className="space-y-6">
        <img
          src={gym?.images?.[0]?.url || "https://via.placeholder.com/600x300"}
          alt={gym?.gymName}
          className="w-full h-80 object-cover rounded-2xl shadow-md"
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold ">
              {gym.gymName}
            </h1>
            <p className="flex gap-2 items-center text-gray-600">
              <MapPin className="text-secondary" size={20} />
              {gym.address?.address || "Address not provided"},{" "}
              {gym.address?.city}, {gym.address?.state} - {gym.address?.pincode}
            </p>
            <p className="flex gap-2 items-center text-gray-600">
              <Dumbbell className="text-secondary" size={20} />
              {GYM_TYPE_LABELS[gym.gymType]} •{" "}
              {GENDER_SEGREGATION_LABELS[gym.genderSegregation]}
            </p>
            <p className="flex gap-2 items-center text-gray-600">
              <Phone className="text-secondary" size={20} /> {gym.phoneNumber}
            </p>
            <p className="flex gap-2 items-center text-gray-600">
              <Clock className="text-secondary" size={20} />
              {gym.timings.morningStart &&
                gym.timings.morningEnd &&
                (gym.timings.eveningStart && gym.timings.eveningEnd ? (
                  <span>
                    {formatTime(gym.timings.morningStart)} –{" "}
                    {formatTime(gym.timings.morningEnd)} &{" "}
                    {formatTime(gym.timings.eveningStart)} –{" "}
                    {formatTime(gym.timings.eveningEnd)}
                  </span>
                ) : (
                  <span>
                    {formatTime(gym.timings.morningStart)} –{" "}
                    {formatTime(gym.timings.morningEnd)}
                  </span>
                ))}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <StarRating rating={Number(gym.rating || 0)} />
            <span className="text-sm text-gray-500">(No reviews yet)</span>
          </div>
        </div>

        <button className=" bg-secondary text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium shadow-md">
          Post a Review
        </button>
      </section>

      {/* AMENITIES */}
      {gym.amenities?.length > 0 && (
        <section className="bg-accent/50 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2 mb-4">
            Amenities
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {gym.amenities.map((amenity, i) => (
              <li
                key={i}
                className="bg-secondary text-white text-center px-3 py-2 rounded-full text-sm font-medium"
              >
                {AMENITY_LABELS[amenity]}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* MEMBERSHIP PLANS */}
      {gym.membershipPlans?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2">
            Membership Plans
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gym.membershipPlans.map((plan, i) => (
              <div
                key={i}
                className="bg-accent/60 rounded-xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition"
              >
                <h3 className="font-bold text-lg ">
                  {plan.planType}
                </h3>
                <p className="text-secondary font-semibold mt-1">
                  ₹{plan.price} / month
                </p>
                <ul className="mt-3 list-disc list-inside text-gray-700 text-sm space-y-1">
                  {plan.perks.map((perk, j) => (
                    <li key={j}>{perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gym.images?.length > 1 && (
        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2 mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gym.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`${gym.gymName} ${i + 1}`}
                className="w-full h-52 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </section>
      )}

      {/* EQUIPMENT */}
      {(gym.cardioEquipment?.length ||
        gym.strengthEquipment?.length ||
        gym.functionalEquipment?.length ||
        gym.miscEquipment?.length) && (
        <section className="bg-primary rounded-xl p-6 shadow-md space-y-6">
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2">
            Equipment
          </h2>

          {[
            { title: "Cardio Equipment", list: gym.cardioEquipment, labels: CARDIO_EQUIPMENT_LABELS, Icon: PersonStanding },
            { title: "Strength Equipment", list: gym.strengthEquipment, labels: STRENGTH_EQUIPMENT_LABELS, Icon: Dumbbell },
            { title: "Functional Equipment", list: gym.functionalEquipment, labels: FUNCTIONAL_EQUIPMENT_LABELS, Icon: Settings },
            { title: "Miscellaneous Equipment", list: gym.miscEquipment, labels: MISC_EQUIPMENT_LABELS, Icon: Settings2  },
          ].map(
            (section, i) =>
              section.list?.length > 0 && (
                <div key={i}>
                  <h3 className="text-xl  font-semibold text-secondary flex items-center gap-2 mb-3">
                    <section.Icon size={20} /> {section.title}
                  </h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {section.list.map((eq, j) => (
                      <li
                        key={j}
                        className="bg-accent rounded-lg p-3 text-center text-sm font-medium shadow-sm"
                      >
                        {section.labels[eq]}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </section>
      )}

      {/* REVIEWS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold border-b-2 border-secondary/60 pb-2">
            User Reviews
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition">
              Filter
            </button>
            <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition">
              Sort
            </button>
          </div>
        </div>

        {/* Replace with actual reviews */}
        <p className="text-gray-600 italic">
          No reviews yet. Be the first to share your experience!
        </p>  

        <div className="flex justify-center py-6">
          <PaginationStatic />
        </div>
      </section>
    </div>
  );
}
