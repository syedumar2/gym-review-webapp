import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { User } from "@/types/user";

interface Props {
  user: User;
}

export const UpdateUserDialog = ({ user }: Props) => {
  // Safely extract city and state from location
  const city = (() => {
    if (
      user.location &&
      typeof user.location === "object" &&
      !Array.isArray(user.location)
    ) {
      return (user.location as Record<string, any>).city ?? "";
    }
    return "";
  })();

  const state = (() => {
    if (
      user.location &&
      typeof user.location === "object" &&
      !Array.isArray(user.location)
    ) {
      return (user.location as Record<string, any>).state ?? "";
    }
    return "";
  })();

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-secondary text-white rounded-full px-6 pt-2 text-sm font-medium shadow hover:bg-secondary/80 active:scale-95">
          Update Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-lg p-6 no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Profile
          </DialogTitle>
          <DialogDescription>
            Update your personal information and preferences
          </DialogDescription>
        </DialogHeader>

        {/* Avatar + Basic Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 my-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={user && user.image ? user?.image : undefined}
                alt={user.name}
              />

              <AvatarFallback className="bg-cyan-700 text-4xl text-white">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1 text-sm"
            >
              <Upload size={16} /> Change
            </Button>
          </div>

          <div className="flex-1 w-full space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full border rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Email + Gender */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              defaultValue={user.gender ?? ""}
              className="w-full border rounded px-3 py-2 bg-gray-100"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              defaultValue={city}
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              defaultValue={state}
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            defaultValue={user.bio ?? ""}
            className="w-full border rounded px-3 py-2 bg-gray-100"
            rows={3}
          />
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-secondary text-white hover:bg-secondary/90">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
