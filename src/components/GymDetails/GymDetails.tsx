import { dummyGyms } from "@/types/gym";
import { Clock, Dumbbell, MapPin, Phone, ThumbsDown, ThumbsUp } from "lucide-react";
import PaginationStatic from "../Pagination/PaginationStatic";
import StarRating from "../RatingStars/RatingStars";
import { Review } from "@/types/review";
const dummyReviews: Review[] = [
  {
    id: "1",
    gymId: "101",
    gymName: "FitPro Gym",
    userName: "Amit",
    userAvatar: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 4,
    body: "Spacious and clean. Trainers are helpful.",
    createdAt: "2025-09-20T10:30:00Z",
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    approved: true,
    likes: 12,
    dislikes: 1,
  },
  {
    id: "2",
    gymId: "101",
    gymName: "FitPro Gym",
    userName: "Sara",
    userAvatar: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5,
    body: "Great vibe! Love the equipment quality.",
    createdAt: "2025-09-25T15:45:00Z",
    images: ["https://via.placeholder.com/150"],
    approved: false,
    likes: 20,
    dislikes: 0,
  },
  {
    id: "3",
    gymId: "102",
    gymName: "PowerHouse Fitness",
    userName: "Rohan",
    userAvatar: "https://randomuser.me/api/portraits/men/31.jpg",
    rating: 3,
    body: "Good equipment but can be crowded during evenings.",
    createdAt: "2025-09-22T12:00:00Z",
    approved: true,
    likes: 5,
    dislikes: 2,
  },
  {
    id: "4",
    gymId: "103",
    gymName: "Urban Gym",
    userName: "Neha",
    userAvatar: "https://randomuser.me/api/portraits/women/41.jpg",
    rating: 4,
    body: "Friendly staff and clean environment.",
    createdAt: "2025-09-24T09:15:00Z",
    images: [],
    approved: true,
    likes: 8,
    dislikes: 0,
  },
];

export default function GymDetails() {
  const gym = dummyGyms.slice(0, 1)[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <section className="space-y-4">
        <img
          src={gym.images[0]}
          alt={gym.name}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2 ">
            <h1 className="text-3xl font-bold">{gym.name}</h1>
            <p className="flex gap-1 items-center text-gray mt-4">
              <MapPin className="text-black" size={20} /> {gym.address.line1},{" "}
              {gym.address.city}
            </p>
            <p className="flex gap-1 items-center text-gray">
              <Dumbbell className="text-black" size={20} />
              {gym.type} • {gym.genderSegregated}
            </p>
            <p className="flex gap-1 items-center text-gray">
              <Phone className="text-black" size={20} /> {gym.phone}
            </p>
            <p className="flex gap-2 items-center text-gray">
              <Clock className="text-black" size={20} /> {gym.hours}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-12">
            <StarRating rating={gym.avgRating} />
            <span className="text-sm text-gray-500">
              ({gym.reviewCount} reviews)
            </span>
          </div>
        </div>
        <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition">
          Post a Review
        </button>
      </section>

      {/* Amenities */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gym.amenities.map((amenity, idx) => (
            <li
              key={idx}
              className="bg-secondary text-white text-center px-2 py-2 rounded-full  text-md"
            >
              {amenity}
            </li>
          ))}
        </ul>
      </section>

      {/* Membership Plans */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Membership Plans</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {gym.membershipPlans.map((plan, idx) => (
            <div
              key={idx}
              className="border border-accent rounded-lg p-4 bg-accent dark:bg-accent   shadow-sm"
            >
              <h3 className="font-bold text-lg">{plan.type}</h3>
              <p className="text-secondary font-semibold">
                ₹{plan.pricePerMonth} / month
              </p>
              <ul className="mt-2 list-disc list-inside text-black text-sm space-y-1">
                {plan.perks.map((perk, i) => (
                  <li key={i}>{perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Machines & Equipment */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Machines & Equipment</h2>
        <div className="grid grid-cols-2 gap-8  items-stretch space-y-6 shadow-sm">
          {gym.equipment.map((eq, idx) => (
            <div
              key={idx}
              className="border border-accent  p-4 rounded-lg bg-primary/50 h-full"
            >
              <h3 className="font-semibold text-lg mb-2">{eq.category}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                {eq.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          {gym.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${gym.name} photo ${idx + 1}`}
              className="w-full h-52 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">User Reviews</h2>

          {/* Filter + Sort Buttons */}
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-secondary text-white rounded hover:bg-secondary/80 transition">
              Filter
            </button>
            <button className="px-3 py-1 bg-secondary text-white rounded hover:bg-secondary/80 transition">
              Sort
            </button>
          </div>
        </div>

        {dummyReviews.length > 0 ? (
          <div className="space-y-6 flex flex-col">
            {dummyReviews.map((review: Review) => (
              <div
                key={review.id}
                className="p-4 border border-black/25 rounded-lg bg-accent shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <h3 className="font-semibold text-black">
                      {review.userName}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <StarRating rating={review.rating} />
             
                </div>

                <p className="text-gray">{review.body}</p>

                {/* Optional Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`review-${idx}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                {/* Optional Approval Status */}
                <div className="flex items-center justify-between w-full">
                  {review.approved !== undefined && (
                    <span
                      className={`inline-block mt-2 text-sm font-medium ${
                        review.approved ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {review.approved ? "Approved" : "Pending"}
                    </span>
                  
                  )}
                       <span className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                      {review.likes || 0} <ThumbsUp size={18} className="mb-1"/> • {review.dislikes || 0} <ThumbsDown className="mt-0.5" size={18}/>
                    </span>
                </div>
                
              </div>
            ))}

            <section className="flex w-full items-center justify-center py-4">
              <PaginationStatic />
            </section>
          </div>
        ) : (
          <p className="text-gray-600">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </section>
    </div>
  );
}
