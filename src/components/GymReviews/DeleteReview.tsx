"use client";

import { useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { deleteReview } from "@/actions/reviewActions";
import { ReviewWithUserAndVotes } from "@/types/review";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useImageManager } from "@/hooks/useImageManager";
import { ImageData } from "@/types/gym";
import { useQueryClient } from "@tanstack/react-query";

const DeleteReview = ({ review }: { review: ReviewWithUserAndVotes }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { removeImages } = useImageManager();
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    setLoading(true);
    if (!session) {
      toast.error("No session found!");
      return;
    }

    try {
      const res = await deleteReview(review.id, session?.user?.id);
      if (!res.success) {
        return toast.error(res.message ?? "Failed to delete review");
      }

      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
        refetchType: "active",
      });

      if (Array.isArray(review.images) && review.images.length > 0) {
        await removeImages(review.images as unknown as ImageData[]);
      }
    } catch (err: any) {
      toast.error(err.message ?? "Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col bg-accent rounded-2xl shadow-lg sm:max-w-[565px] max-h-[85vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Delete Review?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove your
            review and all associated media.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReview;
