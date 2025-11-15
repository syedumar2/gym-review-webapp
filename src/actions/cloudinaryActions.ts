"use server"
import { ApiResponse } from "@/types/api";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//TODO(HIGH):Update deleteImages actions. call the admin api instead see postman

export async function deleteImage(public_id: string): Promise<ApiResponse<any>> {
    if (!public_id) {
        return ({ success: false, message: "Missing public_id" });
    }
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return ({ success: true, data: result });
    } catch (error: any) {
        console.error("Cloudinary deletion error:", error);
        return ({ success: false, message: "Failed to delete image" });
    }

}