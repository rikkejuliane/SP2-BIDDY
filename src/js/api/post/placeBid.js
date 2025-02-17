// placeBid.js
import { API_BID_ON_LISTING } from '../constants.js'; // Import the API endpoint constant
import { headers } from '../headers.js'; // Import the headers function

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
      throw new Error(errorData.message || "Failed to place bid."); // Use the error message from the API if available
    }

    // Parse the response data
    const result = await response.json();
    return result.data; // Return the bid data
  } catch (error) {
    console.error("Error placing bid:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
}