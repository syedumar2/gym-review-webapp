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
export type ImageData = {
  public_id: string;
  url: string;
};


export const GYM_TYPE_LABELS = {
  COMMERCIAL: "Commercial Gym (Large Fitness Center)",
  CROSSFIT: "CrossFit / Functional Training Gym",
  POWERLIFTING: "Powerlifting & Strength Gym",
  YOGA: "Yoga / Wellness Studio",
  MIXED: "Mixed Training Gym",
};
export const GENDER_SEGREGATION_LABELS = {
  MALE_ONLY: "Male Only",
  FEMALE_ONLY: "Female Only",
  UNISEX: "Unisex (Shared Space)",
  TIME_BASED: "Time-Based (Separate Timings)",
};

export const AMENITY_LABELS = {
  CARDIO_EQUIPMENT: "Cardio Equipment",
  WEIGHTLIFTING_ZONE: "Weightlifting Zone",
  FREE_WEIGHTS: "Free Weights Area",
  PERSONAL_TRAINING: "Personal Training",
  GROUP_CLASSES: "Group Classes",
  YOGA_STUDIO: "Yoga Studio",
  STEAM_ROOM: "Steam Room",
  SAUNA: "Sauna",
  LOCKER_ROOM: "Locker Room",
  SHOWER_FACILITY: "Shower Facility",
  PARKING: "Parking",
  NUTRITION_CONSULTATION: "Nutrition Consultation",
};

export const CARDIO_EQUIPMENT_LABELS = {
  TREADMILL: "Treadmill",
  ELLIPTICAL: "Elliptical Trainer",
  ROWING_MACHINE: "Rowing Machine",
};
export const STRENGTH_EQUIPMENT_LABELS = {
  BENCH_PRESS: "Bench Press",
  SQUAT_RACK: "Squat Rack",
  DUMBBELLS_2_50KG: "Dumbbells (2–50 kg)",
  DUMBBELLS_2_40KG: "Dumbbells (2–40 kg)",
  DUMBBELLS_2_30KG: "Dumbbells (2–30 kg)",
  DUMBBELLS_2_20KG: "Dumbbells (2–20 kg)",
  DUMBBELLS_2_10KG: "Dumbbells (2–10 kg)",
  LEG_PRESS: "Leg Press Machine",
  LEG_CURL_MACHINE: "Leg Curl Machine",
  ABDUCTOR_MACHINE: "Abductor Machine",
  CALVE_RAISE_MACHINE: "Calf Raise Machine",
  LAT_PULLDOWN: "Lat Pulldown Machine",
  CHEST_FLY_MACHINE: "Chest Fly Machine",
  CABLE_MACHINE: "Cable Machine",
  SMITH_MACHINE: "Smith Machine",
  HAMMER_STRENGTH_MACHINE: "Hammer Strength Machine",
  BARBELL: "Barbell",
  PREACHER_CURL_BENCH: "Preacher Curl Bench",
  TRICEP_DIP_MACHINE: "Tricep Dip Machine",
  LEVER_ROW_MACHINE: "Lever Row Machine",
};
export const FUNCTIONAL_EQUIPMENT_LABELS = {
  BATTLE_ROPES: "Battle Ropes",
  KETTLEBELLS: "Kettlebells",
  MEDICINE_BALLS: "Medicine Balls",
  SANDBAGS: "Sandbags",
  BOSU_BALL: "Bosu Ball",
  TRX_SUSPENSION_TRAINER: "TRX Suspension Trainer",
  SLAM_BALLS: "Slam Balls",
  AGILITY_LADDERS: "Agility Ladders",
  PLYO_BOXES: "Plyometric Boxes",
};
export const MISC_EQUIPMENT_LABELS = {
  MAT: "Exercise Mat",
  RESISTANCE_BAND: "Resistance Band",
  FOAM_ROLLER: "Foam Roller",
  JUMP_ROPE: "Jump Rope",
  AB_WHEEL: "Ab Wheel",
  STABILITY_BALL: "Stability Ball",
  WEIGHT_VEST: "Weight Vest",
  HAND_GRIPPER: "Hand Gripper",
  PULLUP_BAR: "Pull-Up Bar",
};

export interface Gym {
  id: string; // unique identifier
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
  equipment: EquipmentCategory[]; // new field
}
export interface EquipmentCategory {
  category: string; // e.g., "Cardio", "Strength"
  items: string[];  // e.g., ["Treadmills", "Dumbbells", "Rowing Machines"]
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
    equipment: [
      { category: "Cardio", items: ["Treadmills", "Ellipticals", "Rowing Machines"] },
      { category: "Strength", items: ["Bench Press", "Squat Rack", "Dumbbells (2kg–50kg)"] },
      { category: "Functional Training", items: ["Battle Ropes", "Kettlebells", "Medicine Balls"] },
      { category: "Machines", items: ["Leg Press", "Lat Pulldown", "Chest Fly Machine"] },
    ],
    images: [
      "https://www.workoutforless.co.uk/cdn/shop/articles/luis-reyes-mTorQ9gFfOg-unsplash_2_640x.jpg?v=1657122621",
      "https://youfit.com/wp-content/uploads/2022/09/cardio-workouts-at-the-gym.png",
    ],
    avgRating: 4.5,
    reviewCount: 3,
    type: "Gym",
    genderSegregated: "Co-ed",
  }
  ,
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs_W7f7LzDkgRmO2nZVpWw3GgMmzN_r3t79A&s",

      "https://source.unsplash.com/800x600/?crossfit,gym",
    ],
    avgRating: 4.2,
    reviewCount: 2,
    type: "Yoga/CrossFit",
    genderSegregated: "Co-ed",
    equipment: []
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
      "https://powerliftingshop.com/cdn/shop/articles/20231114_162403-scaled.webp?v=1741340142",

      "https://source.unsplash.com/800x600/?barbell,weights",
    ],
    avgRating: 4.8,
    reviewCount: 4,
    type: "Gym",
    genderSegregated: "Male",
    equipment: []
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
      "https://source.unsplash.com/800x600/?pilates,fitness",

      "https://source.unsplash.com/800x600/?meditation,wellness",
    ],
    avgRating: 4.3,
    reviewCount: 3,
    type: "Wellness/Pilates",
    genderSegregated: "Female",
    equipment: []
  },
];

import {
  Amenity,
  CardioEquipment,
  FunctionalEquipment,
  GenderSegregation,
  GymType,
  MiscEquipment,
  Prisma,
  Status,
  StrengthEquipment,
} from "@/generated/prisma/client";


export type GymRequestObjectCreationInput = {
  gymName: string;
  description: string;
  address: {
    address: string;
    city?: string;
    state?: string;
  };
  gymType: GymType;
  genderSegregation: GenderSegregation;
  phoneNumber: string; // empty string allowed if needed
  timings: {
    morningStart: string;
    morningEnd: string;
    eveningStart?: string;
    eveningEnd?: string;
  };
  amenities?: Amenity[];
  membershipPlans: Prisma.InputJsonValue;
  cardioEquipment?: CardioEquipment[];
  strengthEquipment?: StrengthEquipment[];
  functionalEquipment?: FunctionalEquipment[];
  miscEquipment?: MiscEquipment[];
  images: Prisma.InputJsonValue;
  requestingUser: string; // or string, depending on your userId type
  status: Status;
};



