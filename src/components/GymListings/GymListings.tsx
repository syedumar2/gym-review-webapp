import { dummyGyms, Gym } from "@/types/gym";
import StarRating from "../RatingStars/RatingStars";
import PaginationStatic from "../Pagination/PaginationStatic";

const listings = dummyGyms;
const GymListings = () => {
  return (
    <>
      <section className="py-4 px-4 md:px-8 lg:px-12">
        <h1 className="section-heading text-xl md:text-2xl mb-4">
          Showing results for
        </h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-items-center">
          {listings.map((gym: Gym) => (
            <div
              key={gym.id}
              className="w-full max-w-sm bg-primary border border-accent rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <img
                src={gym.images[0]}
                alt={gym.name}
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-5 ">
                {/* Title + Rating */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold  text-black truncate">
                    {gym.name}
                  </h2>
                  <StarRating rating={gym.avgRating} />
                </div>

                {/* Location */}
                <p className="text-sm text-gray  flex items-center gap-1 mt-1">
                  {gym.address.city}
                </p>

                {/* Gym Type */}
                <p className="text-sm text-gray ">
                  {gym.type}
                </p>

                {/* Gender Segregation */}
                <p className="text-sm text-gray ">
                  {gym.genderSegregated}
                </p>

                {/* Review Count */}
                <p className="text-sm font-medium text-gray mt-2 ">
                  {gym.reviewCount} review{gym.reviewCount !== 1 ? "s" : ""}
                </p>

                {/* CTA */}
                <a
                  href={`/gyms/${gym.id}`}
                  className="block w-full mt-4 text-center bg-secondary text-white font-medium py-2 px-4 rounded-lg hover:bg-secondary/90 transition"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex w-full items-center justify-center py-4">
        <PaginationStatic />
      </section>
    </>
  );
};

export default GymListings;
