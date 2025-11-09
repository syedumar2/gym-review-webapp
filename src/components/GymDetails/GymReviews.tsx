import PaginationStatic from "../Pagination/PaginationStatic";
import { ParsedGym } from "./GymDetails";

const GymReviews = ({ gym }: { gym: ParsedGym }) => {
  return (
    <>
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
    </>
  );
};

export default GymReviews;
