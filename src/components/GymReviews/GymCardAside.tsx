import React from "react";

import { SafeParsedGym } from "../../../services/publicService";
import {
  GYM_TYPE_LABELS,
  GENDER_SEGREGATION_LABELS,
  AMENITY_LABELS,
} from "@/types/gym";
import StarRating from "../RatingStars/RatingStars";

interface GymCardAsideProps {
  gym: SafeParsedGym;
}

const GymCardAside: React.FC<GymCardAsideProps> = ({ gym }) => {
  const imageUrl = Array.isArray(gym?.images)
    ? (gym.images as { url?: string }[])[0]?.url
    : undefined;

  return (
    <aside className="w-full lg:w-[40%] bg-primary border border-accent  shadow-md overflow-hidden sticky top-4 h-[calc(100vh-2rem)] flex flex-col">
      {/* Hero Image */}
      <div className="relative h-64 flex-shrink-0">
        <img
          src={imageUrl}
          alt={gym.gymName}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-overlay/60 to-transparent p-4">
          <h1 className="text-2xl font-bold text-white">{gym.gymName}</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar ">
        {/* Rating Overview */}
        <div className="flex items-center justify-between pb-4 border-b border-accent">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl font-bold text-black">
                {gym.rating?.toFixed(1) ?? "0.0"}
              </span>
              <StarRating rating={gym.rating ?? 0} />
            </div>
            <p className="text-sm text-gray">
              Based on {gym.reviewCount ?? "0"} reviews
            </p>
          </div>
        </div>

        {/* Gym Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
              Description
            </h3>
            <p className="text-base text-black">{gym.description}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
              State
            </h3>
            <p className="text-base text-black">{gym.state}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
              City
            </h3>
            <p className="text-base text-black">{gym.city}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
              Gym Type
            </h3>
            <p className="text-base text-black">
              {GYM_TYPE_LABELS[gym.gymType]}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
              Gender Segregation
            </h3>
            <p className="text-base text-black">
              {GENDER_SEGREGATION_LABELS[gym.genderSegregation]}
            </p>
          </div>

          {gym.address && (
            <div>
              <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
                Address
              </h3>
              <p className="text-sm text-black leading-relaxed">
                {gym?.address?.address?.toString()}
              </p>
            </div>
          )}

          {gym.amenities && gym.amenities.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray uppercase tracking-wide mb-2">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {gym.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent text-black text-xs rounded-full"
                  >
                    {AMENITY_LABELS[amenity]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="flex-shrink-0 p-4 border-t border-accent bg-primary">
        <a
          href={`/gyms/${gym.slug}`}
          className="block w-full text-center bg-secondary text-white font-medium py-3 px-4 rounded-lg hover:bg-secondary/90 transition"
        >
          View Full Details
        </a>
      </div>
    </aside>
  );
};

export default GymCardAside;
