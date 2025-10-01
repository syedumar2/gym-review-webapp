export interface Address {
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface MembershipPlan {
  type: string;
  pricePerMonth: number;
  perks: string[];
}

export interface Gym {
  id: string; // changed to string to match your dummy data
  name: string;
  slug: string;
  address: Address;
  phone: string;
  hours: string;
  amenities: string[];
  membershipPlans: MembershipPlan[];
  images: string[];
  avgRating: number;
  reviewCount: number;
  type: string; // e.g., "Gym", "Yoga", "CrossFit"
  genderSegregated?: string; // e.g., "Male", "Female", "Co-ed"
}

export const dummyGyms: Gym[] = [
  {
    id: "g1",
    name: "Iron Paradise Fitness",
    slug: "iron-paradise-fitness",
    address: {
      line1: "23 MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
    },
    phone: "+91-9876543210",
    hours: "6:00 AM – 10:00 PM",
    amenities: [
      "Cardio Equipment",
      "Weightlifting Zone",
      "Personal Training",
      "Steam Room",
      "Nutrition Consultation",
    ],
    membershipPlans: [
      {
        type: "Monthly",
        pricePerMonth: 2500,
        perks: ["Unlimited access", "Locker", "1 PT session"],
      },
      {
        type: "Annual",
        pricePerMonth: 2000,
        perks: ["Unlimited access", "Free diet chart", "4 PT sessions"],
      },
    ],
    images: [
      "https://www.workoutforless.co.uk/cdn/shop/articles/luis-reyes-mTorQ9gFfOg-unsplash_2_640x.jpg?v=1657122621"
      ,
      "https://youfit.com/wp-content/uploads/2022/09/cardio-workouts-at-the-gym.png",
    ],
    avgRating: 4.5,
    reviewCount: 3,
    type: "Gym",
    genderSegregated: "Co-ed",
  },
  {
    id: "g2",
    name: "Flex & Flow Studio",
    slug: "flex-and-flow-studio",
    address: {
      line1: "14 Carter Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
    },
    phone: "+91-9988776655",
    hours: "5:30 AM – 9:00 PM",
    amenities: ["Yoga Studio", "CrossFit Area", "Showers", "Group Classes"],
    membershipPlans: [
      {
        type: "Monthly",
        pricePerMonth: 2200,
        perks: ["Unlimited yoga & group classes"],
      },
      {
        type: "Quarterly",
        pricePerMonth: 2000,
        perks: ["Priority class booking"],
      },
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs_W7f7LzDkgRmO2nZVpWw3GgMmzN_r3t79A&s"
      ,
      "https://source.unsplash.com/800x600/?crossfit,gym",
    ],
    avgRating: 4.2,
    reviewCount: 2,
    type: "Yoga/CrossFit",
    genderSegregated: "Co-ed",
  },
  {
    id: "g3",
    name: "Beast Mode Arena",
    slug: "beast-mode-arena",
    address: {
      line1: "7 Anna Salai",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600002",
    },
    phone: "+91-9123456780",
    hours: "24 Hours",
    amenities: ["24/7 Access", "Powerlifting Zone", "Olympic Lifting Platforms", "Smoothie Bar"],
    membershipPlans: [
      {
        type: "Monthly",
        pricePerMonth: 3000,
        perks: ["24/7 entry", "Access to smoothie bar"],
      },
      {
        type: "Annual",
        pricePerMonth: 2500,
        perks: ["Unlimited entry", "Free event passes"],
      },
    ],
    images: [
      "https://powerliftingshop.com/cdn/shop/articles/20231114_162403-scaled.webp?v=1741340142"
      ,
      "https://source.unsplash.com/800x600/?barbell,weights",
    ],
    avgRating: 4.8,
    reviewCount: 4,
    type: "Gym",
    genderSegregated: "Male",
  },
  {
    id: "g4",
    name: "ZenFit Wellness Hub",
    slug: "zenfit-wellness-hub",
    address: {
      line1: "88 Park Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700016",
    },
    phone: "+91-9012345678",
    hours: "6:30 AM – 8:30 PM",
    amenities: ["Pilates Studio", "Meditation Hall", "Dietician", "Spa", "Locker Rooms"],
    membershipPlans: [
      {
        type: "Monthly",
        pricePerMonth: 2800,
        perks: ["Unlimited spa access once a week", "Pilates classes"],
      },
      {
        type: "Annual",
        pricePerMonth: 2400,
        perks: ["Unlimited spa", "Free dietician consults"],
      },
    ],
    images: [
      "https://source.unsplash.com/800x600/?pilates,fitness"
      ,
      "https://source.unsplash.com/800x600/?meditation,wellness",
    ],
    avgRating: 4.3,
    reviewCount: 3,
    type: "Wellness/Pilates",
    genderSegregated: "Female",
  },
];
