"use server"
import { ApiResponse } from "@/types/api";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});





export async function deleteImage(public_id: string): Promise<ApiResponse<any>> {
    if (!public_id) {
        return ({ success: false, message: "Missing public_id" });
    }
    try {
        const formData = new FormData();
        formData.append('public_ids[]', public_id);
        const auth = Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_SECRET}`).toString("base64");
        const resp = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload/`,
            {
                method: "DELETE", headers: {
                    "Authorization": `Basic ${auth}`,
                }, body: formData,
            },

        )

        const result = await resp.json();

        console.log("Result of deletion is:", result);
        if (result?.deleted[public_id] === "deleted") {
            return ({ success: true, message: "Successfully deleted image" });
        } else {
            return ({ success: false, message: "Image not deleted" });
        }
    } catch (error: any) {
        console.error("Cloudinary deletion error:", error);
        return ({ success: false, message: "Failed to delete image" });
    }
}
//TODO (BUG): Filter reviews needs to be fixed