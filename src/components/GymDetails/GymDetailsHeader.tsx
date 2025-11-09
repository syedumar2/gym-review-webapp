import {
  GENDER_SEGREGATION_LABELS,
  GYM_TYPE_LABELS
} from "@/types/gym";
import { Clock, Dumbbell, MapPin, Phone } from "lucide-react";
import StarRating from "../RatingStars/RatingStars";
import { ParsedGym } from "./GymDetails";

const GymDetailsHeader = ({ gym }: { gym: ParsedGym }) => {
  const formatTime = (time: string) => {
    try {
      const [hour, minute] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hour), parseInt(minute));
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return time;
    }
  };
  return (
    <>
      {/* HEADER */}
      <section className="space-y-6">
        <img
          src={gym?.images?.[0]?.url || "https://via.placeholder.com/600x300"}
          alt={gym?.gymName}
          className="w-full h-80 object-cover rounded-2xl shadow-md"
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold ">{gym.gymName}</h1>
            <p className="flex gap-2 items-center text-gray">
              <MapPin className="text-secondary" size={20} />
              {gym.address?.address || "Address not provided"},{" "}
              {gym.address?.city}, {gym.address?.state} - {gym.address?.pincode}
            </p>
            <p className="flex gap-2 items-center text-gray">
              <Dumbbell className="text-secondary" size={20} />
              {GYM_TYPE_LABELS[gym.gymType]} •{" "}
              {GENDER_SEGREGATION_LABELS[gym.genderSegregation]}
            </p>
            <p className="flex gap-2 items-center text-gray">
              <Phone className="text-secondary" size={20} /> {gym.phoneNumber}
            </p>
            <p className="flex gap-2 items-center text-gray">
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
            <span className="text-sm text-gray">(No reviews yet)</span>
          </div>
        </div>

        <button className=" bg-secondary text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium shadow-md">
          Post a Review
        </button>
      </section>
    </>
  );
};

export default GymDetailsHeader;
