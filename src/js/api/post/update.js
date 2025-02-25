import { API_LISTING_SINGLE } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Updates a listing on the API.
 * @param {string} id - The listing ID.
 * @param {Object} updatedData - The updated listing data.
 * @returns {Promise<Object>} The updated listing data.
 */
export async function updatePost(id, updatedData) {
  const response = await fetch(`${API_LISTING_SINGLE(id)}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update listing.");
  }

  return response.json();
}
