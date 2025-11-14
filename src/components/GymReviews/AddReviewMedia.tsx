"use client";
import { Camera } from "lucide-react";
import { Button } from "../ui/button";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { ImageData } from "@/types/gym";
import { Dispatch, SetStateAction, useRef } from "react";

const AddReviewMedia = ({
  setImages,
  loading,
}: {
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  loading?: boolean;
}) => {
  const widgetRef = useRef<any>(null);
  return (
    <>
      <CldUploadWidget
        options={{
          sources: ["local", "url", "google_drive", "camera"],
          multiple: true,
          folder: "review_images",
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        }}
        uploadPreset="gym_review_app"
        onClose={() => {
          widgetRef.current?.close?.();
        }}
        onSuccess={(result) => {
          if (result?.info) {
            const info = result?.info as CloudinaryUploadWidgetInfo;
            setImages((prev) => [
              ...prev,
              {
                public_id: info?.public_id,
                url: info?.secure_url,
              },
            ]);
          }
        }}
      >
        {({ open }) => (
          <Button
            className="cursor-pointer"
            onClick={() => !loading && open()}
            disabled={loading}
          >
            <Camera /> Add Media
          </Button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default AddReviewMedia;
