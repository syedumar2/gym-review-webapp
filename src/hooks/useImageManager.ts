"use client";
import { useState } from "react";
import { deleteImage, deleteImages } from "@/actions/cloudinaryActions";
import { ImageData } from "@/types/gym";


export function useImageManager() {
  const [images, setImages] = useState<any[]>([]);

  const removeImage = async (public_id: string) => {
    setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    try {
      const res = await deleteImage({ public_id });
      if (!res.success) console.error("Cloudinary deletion failed");
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };


  const removeImages = async (imgs: ImageData[]) => {
    const ids = imgs.map((img) => img.public_id);

    // Remove immediately from UI
    setImages((prev) => prev.filter((img) => !ids.includes(img.public_id)));

    try {
      const res = await deleteImages(ids);
      if (!res.success) console.error("Some Cloudinary deletions failed");
    } catch (err) {
      console.error("Error deleting multiple images:", err);
    }
  };
  return { images, setImages, removeImage, removeImages };
}
