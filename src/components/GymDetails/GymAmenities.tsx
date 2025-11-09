import { AMENITY_LABELS } from "@/types/gym";
import { ParsedGym } from "./GymDetails";

const GymAmenities = ({ gym }: { gym: ParsedGym }) => {
  return (
    <>
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
    </>
  );
};

export default GymAmenities;
