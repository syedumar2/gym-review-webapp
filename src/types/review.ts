export interface Review {
  id: string;          // changed to string to match gym IDs if needed
  gymId: string;       // gym ID to associate review with a gym
  userName: string;
  userAvatar: string;  // URL to avatar image
  rating: number;      // 0-5
  body: string;        // review text
  createdAt: string;   // ISO string
  images?: string[];   // optional images attached to review
}

export const dummyReviews: Review[] = [
  {
    id: "r1",
    gymId: "g1",
    userName: "Amit Sharma",
    userAvatar: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 4.5,
    body: "Great gym with lots of equipment and very friendly trainers.",
    createdAt: "2025-09-29T10:30:00Z",
    images: [
      "https://www.workoutforless.co.uk/cdn/shop/articles/luis-reyes-mTorQ9gFfOg-unsplash_2_640x.jpg?v=1657122621"

    ],
  },
  {
    id: "r2",
    gymId: "g2",
    userName: "Priya Singh",
    userAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.2,
    body: "Clean studio, nice yoga classes, but can get crowded in evenings.",
    createdAt: "2025-09-28T14:15:00Z",
    images:[
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs_W7f7LzDkgRmO2nZVpWw3GgMmzN_r3t79A&s"

    ]
  },
  {
    id: "r3",
    gymId: "g3",
    userName: "Rahul Verma",
    userAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
    rating: 4.8,
    body: "24/7 access is amazing! Perfect for powerlifting enthusiasts.",
    createdAt: "2025-09-27T18:00:00Z",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs_W7f7LzDkgRmO2nZVpWw3GgMmzN_r3t79A&s"

    ],
  },
  {
    id: "r4",
    gymId: "g4",
    userName: "Neha Kapoor",
    userAvatar: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 4.3,
    body: "Zen and calm environment. Great for pilates and meditation.",
    createdAt: "2025-09-26T09:45:00Z",
    images:[
            "https://powerliftingshop.com/cdn/shop/articles/20231114_162403-scaled.webp?v=1741340142"

    ]
  },
];
