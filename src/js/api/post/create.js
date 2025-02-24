// export async function createPost({ title, body, tags, media }) {}
import { API_LISTINGS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { showOverlayModal } from "../../ui/global/modal.js";

/**
 * Creates a new listing on the auction API.
 *
 * @param {Object} listingData - The listing details.
 * @returns {Promise<Object>} - The response from the API.
 */
export async function createPost(listingData) {
  try {
    const response = await fetch(API_LISTINGS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create listing. Please try again.");
    }

    const result = await response.json();
    showOverlayModal("🎉 Listing created successfully!");
    return result.data;
  } catch (error) {
    console.error("❌ Error creating listing:", error);
    showOverlayModal("❌ Error creating listing. Please try again.");
    throw error;
  }
}
