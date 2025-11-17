"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { CircleX, Edit, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import AddReviewMedia from "./AddReviewMedia";
import RatingInput from "./RatingInput";
import { useEditReviewForm } from "@/hooks/useEditReviewForm";
import { useImageManager } from "@/hooks/useImageManager";
import { ReviewWithUserAndVotes } from "@/types/review";

const EditReview = ({ review }: { review: ReviewWithUserAndVotes }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const { images, setImages, removeImage } = useImageManager();
  const { control, handleSubmit, onSubmit, reset, formState, loading } =
    useEditReviewForm(review.userId, review.id, review.gymId, () => {
      setOpen(false);
      reset();
      setRating(review.rating);
      setImages(Array.isArray(review.images) ? review.images : []); // restore initial images
    }); 

  useEffect(() => {
    if (open) {
      reset({
        title: review.title ?? undefined,
        body: review.body,
      });

      setRating(review.rating);
      setImages(Array.isArray(review.images) ? review.images : []);
    }
  }, [open]);

  const handleManualSubmit = () =>
    handleSubmit((data) => onSubmit(data, rating, images))();

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val && !loading) {
          reset();
          setRating(review.rating);
          setImages(Array.isArray(review.images) ? review.images : []);
        }
        setOpen(val);
      }}
      modal={false}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" disabled={loading}>
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="flex flex-col bg-accent rounded-2xl shadow-lg sm:max-w-[565px] max-h-[85vh] overflow-y-auto no-scrollbar"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Edit Your Review
          </DialogTitle>
          <div className="flex items-center gap-2 my-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
              <AvatarFallback>{user?.name?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-lg font-semibold">{user?.name}</span>
              <p className="text-xs text-gray">Editing publicly</p>
            </div>
          </div>
        </DialogHeader>

        {/* RATING */}
        <div className="flex flex-col items-center py-3">
          <RatingInput
            rating={rating}
            loading={loading}
            onRatingChange={(val) => !loading && setRating(val)}
          />
        </div>

        {/* TITLE */}
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input id="title" disabled={loading} {...field} />
            )}
          />
          {formState.errors.title && (
            <p className="text-red-500 text-sm">
              {formState.errors.title.message}
            </p>
          )}
        </div>

        {/* BODY */}
        <div className="grid gap-3 mt-3">
          <Label htmlFor="body">Body*</Label>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <Textarea id="body" disabled={loading} {...field} />
            )}
          />
          {formState.errors.body && (
            <p className="text-red-500 text-sm">
              {formState.errors.body.message}
            </p>
          )}
        </div>

        {/* MEDIA UPLOAD */}
        <AddReviewMedia setImages={setImages} loading={loading} />

        {/* IMAGE PREVIEW */}
        <div className="grid grid-cols-3 mt-4">
          {images.map((img) => (
            <div key={img.public_id} className="relative">
              <img src={img.url} className="h-40 w-40 rounded object-cover" />
              <Button
                type="button"
                variant="ghost"
                size="xs"
                className="absolute top-1 right-4 bg-red-500/90 text-white rounded-full"
                onClick={() => removeImage(img.public_id)}
                disabled={loading}
              >
                <CircleX className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleManualSubmit}
            variant="constructive"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditReview;
//TODO(HIGH): Complete delete review dialog box
