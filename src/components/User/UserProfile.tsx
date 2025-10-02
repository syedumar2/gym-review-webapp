import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { User } from "@/types/user";
import { UpdateUserDialog } from "./UpdateUserDialog";

const mockUser: User = {
  id: "u1",
  name: "Amit Sharma",
  username: "amitsharma",
  email: "amit@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=3",
  bio: "Fitness enthusiast and amateur powerlifter.",
  location: {
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
  },
  gender: "Male",
  role: "user",
  reviewCount: 12,
  gymRequestsCount: 3,
  avgRatingGiven: 4.3,
  favorites: ["g1", "g2"],
  isVerified: true,
  lastLogin: new Date("2025-09-15T12:30:00Z"),
  createdAt: new Date("2025-01-10T10:00:00Z"),
  updatedAt: new Date("2025-09-20T08:00:00Z"),
};

const UserProfile = () => {
  const user = mockUser;

  return (
    <section className="max-w-4xl my-6 min-h-screen mx-auto bg-accent p-6 sm:p-8 border border-gray/50 rounded-xl shadow mt-4">
      <h2 className="dashboard-title">My Profile</h2>

      {/* Top Section */}
      <div className="flex flex-col p-4 rounded-2xl sm:flex-row items-center sm:items-start gap-6 mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-cyan-700 text-2xl text-white">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left ">
          <p className="text-xl font-medium">{user.name}</p>
          {user.username && (
            <p className="text-sm text-gray">@{user.username}</p>
          )}
          <p className="text-sm text-gray">{user.email}</p>
          <p className="text-sm text-gray capitalize">Role: {user.role}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid gap-4 sm:grid-cols-1">
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <p className="text-black bg-primary p-2 border rounded">
            {user.bio ?? "No bio provided"}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <p className="text-black bg-primary p-2 border rounded">
            {user.location
              ? `${user.location.city}, ${user.location.state} (${user.location.pincode})`
              : "Not specified"}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Joined</label>
          <p className="text-black bg-primary p-2 border rounded">
            {user.createdAt.toDateString()}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Login</label>
          <p className="text-black bg-primary p-2 border rounded">
            {user.lastLogin ? user.lastLogin.toDateString() : "Never"}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="p-4 rounded bg-primary">
          <p className="text-lg font-semibold">{user.reviewCount}</p>
          <p className="text-xs text-gray-500">Reviews</p>
        </div>
        <div className="p-4 rounded bg-primary">
          <p className="text-lg font-semibold">{user.gymRequestsCount}</p>
          <p className="text-xs text-gray-500">Gym Requests</p>
        </div>
        <div className="p-4 rounded bg-primary">
          <p className="text-lg font-semibold">{user.avgRatingGiven ?? "—"}</p>
          <p className="text-xs text-gray-500">Avg Rating</p>
        </div>
      </div>
       <div className="flex justify-end mt-4">
        <UpdateUserDialog user={user}/>
        </div>
    </section>
  );
};

export default UserProfile;
