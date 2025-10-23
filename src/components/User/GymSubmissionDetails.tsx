"use client";

import { GymRequest } from "@/generated/prisma";
import { AMENITY_LABELS, GENDER_SEGREGATION_LABELS } from "@/types/gym";

export type ParsedGymRequest = GymRequest & {
  address: {
    address?: string;
    city?: string;
    state?: string;
  };
  timings: {
    morningEnd?: string;
    eveningEnd?: string;
    morningStart?: string;
    eveningStart?: string;
  };
  images: { url: string }[];
  membershipPlans: {
    type: string;
    pricePerMonth: number;
    perks: string[];
  }[];
};

const renderAmenities = (
  enumObj: string[],
  labelMap: Record<string, string>
) => {
  return enumObj.map((amenity, idx) => (
    <li
      key={idx}
      className="bg-secondary text-white text-center px-2 py-2 rounded-full  text-md"
    >
      {labelMap[amenity]}
    </li>
  ));
};

const GymSubmissionDetails = ({ gym }: { gym: ParsedGymRequest }) => {
  return (
    <section className="p-4 md:p-8 bg-primary min-h-screen">
      {/* Title */}
      <h1 className="dashboard-title">Gym Submission Details</h1>

      {/* Status Badge */}
      <div className="mb-6">
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-yellow text-black">
          {gym?.status}
        </span>
      </div>

      {/* Basic Information */}
      <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-medium">Name:</span> {gym.gymName}
          </p>
          <p>
            <span className="font-medium">Type:</span> {gym.gymType}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {gym.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Morning Hours:</span>{" "}
            {gym.timings?.morningStart || "N/A"} -{" "}
            {gym.timings?.morningEnd || "N/A"}
          </p>
          <p>
            <span className="font-medium">Evening Hours:</span>{" "}
            {gym.timings?.eveningStart || "N/A"} -{" "}
            {gym.timings?.eveningEnd || "N/A"}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <p>{gym.address?.address}</p>
        <p>
          {gym.address?.city}, {gym.address?.state}
        </p>
      </div>

      {/* Images */}
      {gym.images?.length > 0 && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gym.images.map((src, idx) => (
              <div
                key={idx}
                className="relative h-40 w-full rounded-lg overflow-hidden"
              >
                <img
                  src={src.url}
                  alt={`Gym img ${idx}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gym.amenities.length > 0 &&
            renderAmenities(gym.amenities, AMENITY_LABELS)}
        </ul>
      </section>

      {/* Membership Plans */}
      {gym.membershipPlans?.length > 0 && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Membership Plans</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {gym.membershipPlans.map((plan, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg shadow-sm bg-accent/40 dark:bg-black/20"
              >
                <p className="font-medium text-lg">{plan.planName}</p>
                <p className="text-sm text-gray-500">{plan.planType}</p>
                <p className="text-secondary font-semibold mt-1">
                  ₹{plan.price}/month
                </p>

                {plan.perks?.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray space-y-1 mt-2">
                    {plan.perks.map((perk, j) => (
                      <li key={j}>{perk}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gender Segregation */}
      {gym.genderSegregation && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gender Policy</h2>
          <p>{GENDER_SEGREGATION_LABELS[gym.genderSegregation]}</p>
        </div>
      )}
    </section>
  );
};

export default GymSubmissionDetails;
