"use server"
import { ApiResponse } from "@/types/api";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});





/**
 * Deletes an image from Cloudinary using its public ID.
 *
 * @param {Object} params - The parameters for image deletion.
 * @param {string} params.public_id - The public ID of the image to delete.
 * @returns {Promise<ApiResponse<any>>} A promise that resolves to an ApiResponse indicating success or failure.
 *
 * @remarks
 * - Requires Cloudinary API credentials to be set in environment variables:
 *   - `CLOUDINARY_API_KEY`
 *   - `CLOUDINARY_SECRET`
 *   - `CLOUDINARY_CLOUD_NAME`
 * - Returns a success message if the image is deleted, otherwise returns an error message.
 */
export async function deleteImage({ public_id }: { public_id: string; }): Promise<ApiResponse<any>> {
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


export async function deleteImages(publicIds: string[]): Promise<ApiResponse<any>> {
  if (!publicIds.length) {
    return { success: false, message: "No images provided" };
  }

  try {
    const formData = new FormData();
    for (const id of publicIds) formData.append("public_ids[]", id);

    const auth = Buffer.from(
      `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_SECRET}`
    ).toString("base64");

    const resp = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload/`,
      {
        method: "DELETE",
        headers: { Authorization: `Basic ${auth}` },
        body: formData,
      }
    );

    const result = await resp.json();
    console.log("Multi delete result:", result);

    const failures = Object.values(result.deleted).filter((v) => v !== "deleted");

    if (failures.length > 0) {
      return { success: false, message: "Some images failed to delete" };
    }

    return { success: true, message: "All images deleted successfully" };
  } catch (err) {
    console.error("Multi-delete error:", err);
    return { success: false, message: "Failed to delete images" };
  }
}

//TODO (BUG): Filter reviews needs to be fixed