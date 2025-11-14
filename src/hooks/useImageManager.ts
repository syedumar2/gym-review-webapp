"use client";
import { useState } from "react";
import { deleteImage } from "@/actions/cloudinaryActions";

export function useImageManager() {
  const [images, setImages] = useState<any[]>([]);

  const removeImage = async (public_id: string) => {
    setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    try {
      const res = await deleteImage(public_id);
      if (!res.success) console.error("Cloudinary deletion failed");
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  return { images, setImages, removeImage };
}
