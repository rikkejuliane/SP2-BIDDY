import { API_BID_ON_LISTING } from "../constants.js"; // Import the API endpoint constant
import { headers } from "../headers.js"; // Import the headers function
import { showOverlayModal, showActionModal } from "../../ui/global/modal.js";

/**
 * Places a bid on a listing by making a POST request to the API.
 *
 * @param {string} listingId - The ID of the listing to place a bid on.
 * @param {number} bidAmount - The bid amount to be placed.
 * @returns {Promise<Object>} - The bid data returned from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function placeBid(listingId, bidAmount) {
  try {
    const response = await fetch(API_BID_ON_LISTING(listingId), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ amount: bidAmount }),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    // Parse the response data
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error;
  }
}

/**
 * Handles the logic for placing a bid, including validation, API calls, and UI feedback.
 *
 * @param {string} listingId - The ID of the listing to place a bid on.
 * @param {number} bidAmount - The bid amount to be placed.
 */
export async function handleBidPlacement(listingId, bidAmount) {
  if (isNaN(bidAmount) || bidAmount <= 0) {
    showActionModal("Please enter a valid bid amount.", [
      {
        text: "OK",
        onClick: () => {},
      },
    ]);
    return;
  }

  try {
    await placeBid(listingId, bidAmount);
    showOverlayModal("Bid placed successfully!");

    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error.errors && error.errors.length > 0) {
      errorMessage = error.errors[0].message;
    }
    showActionModal("Failed to place bid: " + errorMessage, [
      {
        text: "OK",
        onClick: () => {},
      },
    ]);
  }
}
