"use client";


import { Gym } from "@/types/gym";
import { EmptyPage } from "..";

// Dummy data
const dummyGym: Gym = {
  id: "g1",
  name: "Iron Paradise",
  slug: "iron-paradise",
  address: { line1: "123 Main St", city: "Mumbai", state: "MH", pincode: "400001" },
  phone: "+91 9876543210",
  hours: "Mon-Sun: 5 AM - 11 PM",
  amenities: ["Showers", "Lockers", "Parking"],
  membershipPlans: [
    { type: "Monthly", pricePerMonth: 2000, perks: ["Unlimited access", "1 PT session"] },
    { type: "Yearly", pricePerMonth: 18000, perks: ["Unlimited access", "5 PT sessions", "Diet Plan"] },
  ],
  images: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1583454110550-21e0a1b3a5a8",
  ],
  avgRating: 0,
  reviewCount: 0,
  type: "Gym",
  genderSegregated: "Co-ed",
  equipment: [
    { category: "Cardio", items: ["Treadmills", "Rowing Machines"] },
    { category: "Strength", items: ["Dumbbells", "Bench Press"] },
  ],
};

const GymSubmissionDetails = () => {
  const gym = dummyGym;


  return (
    <section className="p-4 md:p-8 bg-primary min-h-screen">
      {/* Title */}
      <h1 className="dashboard-title">Gym Submission Details</h1>

      {/* Status Badge */}
      <div className="mb-6">
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-yellow text-black">
          Pending Approval
        </span>
      </div>

      {/* Basic Information */}
      <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Name:</span> {gym.name}</p>
          <p><span className="font-medium">Type:</span> {gym.type}</p>
          <p><span className="font-medium">Phone:</span> {gym.phone}</p>
          <p><span className="font-medium">Hours:</span> {gym.hours}</p>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <p>{gym.address.line1}</p>
        <p>{gym.address.city}, {gym.address.state} - {gym.address.pincode}</p>
      </div>

      {/* Images */}
      {gym.images?.length > 0 && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gym.images.map((src, idx) => (
              <div key={idx} className="relative h-40 w-full rounded-lg overflow-hidden">
                <img src={src} alt={`Gym img ${idx}`}  className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {gym.amenities?.length > 0 && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {gym.amenities.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      )}

      {/* Membership Plans */}
      {gym.membershipPlans?.length > 0 && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Membership Plans</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {gym.membershipPlans.map((plan, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm bg-accent/40 dark:bg-black/20">
                <p className="font-medium">{plan.type}</p>
                <p className="text-secondary font-semibold">₹{plan.pricePerMonth}/month</p>
                {plan.perks.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray space-y-1 mt-2">
                    {plan.perks.map((perk, j) => <li key={j}>{perk}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Equipment */}
      {gym.equipment?.length > 0 && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Equipment</h2>
          {gym.equipment.map((eq, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">{eq.category}</p>
              <ul className="list-disc list-inside text-sm text-gray space-y-1">
                {eq.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Gender Segregation */}
      {gym.genderSegregated && (
        <div className="bg-white dark:bg-accent p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gender Policy</h2>
          <p>{gym.genderSegregated}</p>
        </div>
      )}
    </section>
  );
};

export default GymSubmissionDetails;
