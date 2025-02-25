import { API_LISTING_SINGLE } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Deletes a listing from the API.
 * @param {string} id - The ID of the listing to delete.
 * @returns {Promise<void>} Resolves if successful, rejects on failure.
 */
export async function deletePost(id) {
  const response = await fetch(`${API_LISTING_SINGLE(id)}`, {
    method: "DELETE",
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error("❌ Failed to delete listing.");
  }
}
