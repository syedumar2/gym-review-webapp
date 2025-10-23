import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { $Enums } from "@/generated/prisma";
import { JsonValue } from "@prisma/client/runtime/library";

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const GymSubmissionActionDialog = ({
  rejectDialogOpen,
  setRejectDialogOpen,
  gym,
  setRejectData,
  rejectData,
}: {
  gym: {
    createdAt: Date;
    id: number;
    requestingUser: string;
    gymName: string;
    description: string;
    address: JsonValue;
    gymType: $Enums.GymType;
    genderSegregation: $Enums.GenderSegregation;
    phoneNumber: string;
    timings: JsonValue;
    amenities: $Enums.Amenity[];
    membershipPlans: JsonValue;
    cardioEquipment: $Enums.CardioEquipment[];
    strengthEquipment: $Enums.StrengthEquipment[];
    functionalEquipment: $Enums.FunctionalEquipment[];
    miscEquipment: $Enums.MiscEquipment[];
    images: JsonValue;
    status: $Enums.Status;
  };
  rejectData: {
    gymId: number;
    reason: string;
  };
  rejectDialogOpen: boolean;
  setRejectData: Dispatch<
    SetStateAction<{
      gymId: number;
      reason: string;
    }>
  >;
  setRejectDialogOpen: Dispatch<SetStateAction<boolean>>;
  key: number;
}) => {
  return (
    <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-secondary text-white rounded-full text-xs md:text-sm px-2 py-1 hover:bg-secondary/50">
            Actions <ChevronDown className="inline w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-black">
          <DropdownMenuItem className="text-green-600">
            ✅ Approve
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-red">❌ Reject</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reject Dialog */}
      <DialogContent className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-black">
            Reject Gym Submission:{" "}
            <span className="font-bold text-red">{gym.gymName}</span>
          </DialogTitle>
          <p className="text-sm text-gray mt-1">
            Please provide a reason for rejecting this gym submission.
          </p>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setRejectDialogOpen(false);
            setRejectData({ gymId: 0, reason: "" });
          }}
        >
          <div className="grid gap-3 pb-3">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              name="reason"
              value={rejectData.reason}
              onChange={(e) =>
                setRejectData({
                  ...rejectData,
                  reason: e.target.value,
                })
              }
              placeholder="Enter rejection reason"
              className="min-h-[100px] rounded-lg border-gray"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="rounded-lg border border-gray text-black"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-red hover:opacity-90 text-white rounded-lg">
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GymSubmissionActionDialog;
