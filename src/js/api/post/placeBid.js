import { API_BID_ON_LISTING } from '../constants.js'; // Import the API endpoint constant
import { headers } from '../headers.js'; // Import the headers function
import { showOverlayModal, showActionModal } from '../../ui/global/modal.js';

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
    // Make the API request to place a bid
    const response = await fetch(API_BID_ON_LISTING(listingId), {
      method: "POST",
      headers: headers(), // Call the headers function to get the necessary headers
      body: JSON.stringify({ amount: bidAmount }), // Send the bid amount in the request body
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json(); // Get the error response
      console.log("API Response:", errorData); // Log the response for debugging
      throw errorData; // Throw the entire error data for handling in the calling function
    }

    // Parse the response data
    const result = await response.json();
    return result.data; // Return the bid data
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error; // Rethrow the error for handling in the calling function
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
        onClick: () => { }, // No additional action needed
      },
    ]);
    return;
  }

  try {
    await placeBid(listingId, bidAmount); // Call the placeBid function with the listing ID and bid amount
    showOverlayModal("Bid placed successfully!"); // Use modal for success

    // Reload the page after a successful bid
    setTimeout(() => {
      location.reload(); // Reload the page to update the listing
    }, 1000); // Optional: Add a delay before reloading to allow the user to see the success message

  } catch (error) {
    // Check if the error has a response with errors array
    let errorMessage = "An unknown error occurred."; // Fallback message
    if (error.errors && error.errors.length > 0) {
      errorMessage = error.errors[0].message; // Get the first error message
    }
    showActionModal("Failed to place bid: " + errorMessage, [ // Use action modal for error with an OK button
      {
        text: "OK",
        onClick: () => { } // No additional action needed
      }
    ]);
  }
}
