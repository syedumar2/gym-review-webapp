"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Gym, GymRequest } from "@/generated/prisma";
import { ApiResponse } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  gym: GymRequest;
  onApprove?: (
    gym: GymRequest,
    adminId: string
  ) => Promise<ApiResponse<Gym | null>>;
  onReject?: (
    gym: GymRequest,
    adminId: string,
    reason: string
  ) => Promise<ApiResponse<GymRequest | null>>;
}

const GymSubmissionActionDialog = ({ gym, onApprove, onReject }: Props) => {
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();
  const queryClient = useQueryClient();

  const handleApprove = async () => {
    if (!onApprove) return;
    if (!session.data?.user.id) return toast.error("No Session!");
    setIsSubmitting(true);
    try {
      const res = await onApprove(gym, session.data.user.id);
      if (res.success) {
        toast.success(res.message);
        setShowApproveDialog(false);
        queryClient.invalidateQueries({ queryKey: ["adminGymRequests"] });
      } else {
        return setError(res.error ?? "Something went wrong! ");
      }
    } catch (err: any) {
      toast.error("Approval failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!session.data?.user.id) return toast.error("No Session!");

    if (!rejectReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }
    if (!onReject) return;

    setIsSubmitting(true);
    try {
      const res = await onReject(gym, session.data?.user.id, rejectReason);
      if (res.success) {
        toast.success(res.message);
        setShowRejectDialog(false);
        setRejectReason("");
        queryClient.invalidateQueries({ queryKey: ["adminGymRequests"] });
      } else {
        return setError(res.error ?? "Something went wrong! ");
      }
    } catch (err: any) {
      toast.error(err?.message || "Rejection failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Dropdown Actions */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="bg-secondary text-white rounded-full text-xs md:text-sm px-2 py-1 hover:bg-secondary/50">
            Actions <ChevronDown className="inline w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 " align="end">
          <DropdownMenuLabel>Request Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => setShowApproveDialog(true)}>
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowRejectDialog(true)}>
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="sm:max-w-[425px] bg-primary">
          <DialogHeader>
            {error && error.length > 0 && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Error!</span> {error}
                </div>
              </div>
            )}
            <DialogTitle>Approve Gym Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve Gym Request for{" "}
              <strong>{gym.gymName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="constructive"
              onClick={handleApprove}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Approving..." : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={showRejectDialog}
        onOpenChange={(open) => {
          setShowRejectDialog(open);
          if (!open) setRejectReason("");
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-primary ">
          <DialogHeader>
            {error && error.length > 0 && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Error!</span> {error}
                </div>
              </div>
            )}
            <DialogTitle>Reject Gym Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject Gym Request for{" "}
              <strong>{gym.gymName}</strong>?
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GymSubmissionActionDialog;
