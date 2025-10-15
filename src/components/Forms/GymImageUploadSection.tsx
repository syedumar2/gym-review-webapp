"use client";
import { CldUploadWidget } from "next-cloudinary";
import { ImageData } from "@/types/gym";
import { Dispatch, SetStateAction, useState } from "react";

import { CircleX, File } from "lucide-react";

import { Button } from "../ui/button";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { deleteImage } from "@/actions/cloudinaryActions";
import { Label } from "../ui/label";

const GymImageUploadSection = ({
  images,
  setImages,
}: {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
}) => {

  const handleRemoveImage = async (public_id: string) => {
    try {
      setImages((prev) => prev.filter((img) => img.public_id !== public_id));
      const response = await deleteImage(public_id);

      // Remove from state if deletion succeeds
      if (!response.success) {
        console.error("Image deletion from cloudinary failed! ");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Gym Images</Label>
      <p className="text-sm text-muted-foreground italic">
        These will be displayed for your gym when your request is approved{" "}
      </p>

      {/* Cloudinary Upload Widget */}
      <CldUploadWidget
        options={{
          sources: ["local", "url", "google_drive", "camera"],
          multiple: true,
          folder: "gym_images",
          resourceType: "image", // only images
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        }}
        uploadPreset="gym_review_app"
        onSuccess={(result) => {
          if (result?.info) {
            setImages((prev) => [
              ...prev,
              {
                public_id: result.info?.public_id,
                url: result.info?.secure_url,
              },
            ]);
          }
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="gap-1"
            onClick={() => open()}
          >
            <File className="w-4 h-4" />
            Upload Images
          </Button>
        )}
      </CldUploadWidget>

      {/* Carousel of uploaded images */}
      {images.length > 0 && (
        <ImageCarousel
          images={images.map((img) => img.url)}
          className="w-full my-8"
        />
      )}

      {/* Grid of thumbnails with remove buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {images.map((img) => (
          <div key={img.public_id} className="relative">
            <img
              src={img.url}
              alt={img.public_id}
              className="h-20 w-20 rounded object-cover"
            />
            <Button
              type="button"
              className="absolute top-0 right-0 bg-red-700 text-white rounded-full p-1"
              size="sm"
              variant={undefined}
              onClick={() => handleRemoveImage(img.public_id)}
            >
              <CircleX />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymImageUploadSection;
