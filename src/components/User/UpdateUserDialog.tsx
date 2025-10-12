"use client";
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
import { TriangleAlert, Upload } from "lucide-react";
import { User } from "@/types/user";
import {
  UserUpdateInput,
  updateUserDataSchema,
} from "@/schemas/UpdateUserDataScehma";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { updateUserData } from "@/actions/userActions";

interface Props {
  user: User;
}

export const UpdateUserDialog = ({ user }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateInput>({
    resolver: zodResolver(updateUserDataSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: UserUpdateInput) => {
    setLoading(true);
    try {
      const res = await updateUserData(user.id, data);
      if (!res.success) {
        toast.error(res.error || "Something went wrong! ");
        setError(res.error || "Something went wrong! ");
      } else {
        toast.success(res.message);
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-secondary text-white rounded-full px-6 pt-2 text-sm font-medium shadow hover:bg-secondary/80 active:scale-95 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-primary text-black rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto no-scrollbar border border-gray/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-gray">
            Update your personal information and preferences
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 my-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-16 h-16 border-2 border-secondary">
                <AvatarImage src={user?.image || undefined} alt={user?.name} />
                <AvatarFallback className="bg-secondary text-inverted text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                disabled={loading}
                className="flex items-center gap-2 border border-gray rounded-full px-4 py-1 text-sm text-black hover:bg-accent"
              >
                <Upload size={16} /> Change
              </Button>
            </div>

            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  placeholder="Full Name"
                  {...register("fullName")}
                  autoComplete="name"
                  disabled={loading}
                  className="w-full border border-gray rounded px-3 py-2 bg-accent text-black focus:outline-secondary disabled:opacity-70"
                />
                {errors.fullName && (
                  <p className="text-red text-sm pt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Email & Gender */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Email
              </label>
              <input
                type="email"
                defaultValue={user.email}
                placeholder="Email"
                {...register("email")}
                disabled={loading}
                className="w-full border border-gray rounded px-3 py-2 bg-accent text-black focus:outline-secondary disabled:opacity-70"
              />
              {errors.email && (
                <p className="text-red text-sm pt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Gender
              </label>
              <select
                defaultValue={user.gender ?? ""}
                {...register("gender")}
                disabled={loading}
                className="w-full border border-gray rounded px-3 py-2 bg-accent text-black focus:outline-secondary disabled:opacity-70"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red text-sm pt-1">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* City & State */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                City
              </label>
              <input
                type="text"
                defaultValue={user?.location?.set?.city ?? ""}
                {...register("city")}
                disabled={loading}
                className="w-full border border-gray rounded px-3 py-2 bg-accent text-black focus:outline-secondary disabled:opacity-70"
              />
              {errors.city && (
                <p className="text-red text-sm pt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                State
              </label>
              <input
                type="text"
                defaultValue={user?.location?.set?.state ?? ""}
                {...register("state")}
                disabled={loading}
                className="w-full border border-gray rounded px-3 py-2 bg-accent text-black focus:outline-secondary disabled:opacity-70"
              />
              {errors.state && (
                <p className="text-red text-sm pt-1">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mt-3">
            <label className="block text-sm font-medium mb-1 text-black">
              Bio
            </label>
            <textarea
              defaultValue={user.bio ?? ""}
              {...register("bio")}
              rows={3}
              disabled={loading}
              className="w-full border border-gray rounded px-3 py-2 bg-accent text-black focus:outline-secondary disabled:opacity-70"
            />
            {errors.bio && (
              <p className="text-red text-sm pt-1">{errors.bio.message}</p>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="flex justify-center items-center gap-3 mt-4 w-full max-w-sm rounded-md 
               bg-red-100 border border-red-300 text-red-700 
               dark:bg-red-950 dark:border-red-800 dark:text-red-200
               px-4 py-3 text-sm text-center shadow-sm transition-colors"
            >
              <TriangleAlert size={18} />
              {error}
            </div>
          )}

          {/* Footer Buttons */}
          <DialogFooter className="mt-6 flex justify-end gap-3">
            <Button
              variant="ghost"
              type="button"
              className="border border-gray text-black hover:bg-accent"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-secondary text-white hover:bg-secondary/90"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
