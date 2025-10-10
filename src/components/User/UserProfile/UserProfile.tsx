import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/generated/prisma";
import { UpdateUserDialog } from "../UpdateUserDialog";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const locationString = (() => {
    if (!user.location) return "Not specified";
    const loc = user?.location;
    if (!loc) return "Not specified";
    if (typeof loc === "string") return loc;
    if (typeof loc === "object" && !Array.isArray(loc)) {
      const obj = loc as Record<string, any>;
      return `${obj.city ?? "Unknown"}, ${obj.state ?? "Unknown"} (${
        obj.pincode ?? "—"
      })`;
    }
    return "Not specified";
  })();

  return (
    <section className="max-w-4xl my-6 min-h-screen mx-auto bg-accent p-6 sm:p-8 border border-gray/50 rounded-xl shadow mt-4">
      <h2 className="dashboard-title">My Profile</h2>

      {/* Top Section */}
      <div className="flex flex-col p-4 rounded-2xl sm:flex-row items-center sm:items-start gap-6 mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={user && user.image ? user?.image : undefined}
            alt={user.name}
          />

          <AvatarFallback className="bg-cyan-700 text-4xl text-white">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <p className="text-xl font-medium">{user.name}</p>
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
            {locationString}
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
        <UpdateUserDialog user={user} />
      </div>
    </section>
  );
};

export default UserProfile;
