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

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.errors
        ? result.errors.map((err) => err.message).join(", ")
        : "Failed to create listing.";
      throw new Error(errorMessage);
    }

    showOverlayModal("Listing created successfully!");
    return result.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    showOverlayModal(` ${error.message}`);
    throw error;
  }
}
