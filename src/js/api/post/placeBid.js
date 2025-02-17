import { API_BID_ON_LISTING } from "../../api/constants.js";

/**
 * Handles placing a bid on a listing.
 * @param {string} listingId - The ID of the listing
 * @param {HTMLElement} bidInput - The input field for the bid
 * @param {HTMLElement} bidButton - The button for submitting a bid
 * @param {Function} updateBidHistory - Function to update the UI bid history
 */
export async function placeBid(listingId, bidInput, bidButton, updateBidHistory) {
  const bidAmount = parseFloat(bidInput.value);

  // Validate input
  if (isNaN(bidAmount) || bidAmount <= 0) {
    alert("⚠️ Please enter a valid bid amount.");
    return;
  }

  // Disable the button while submitting
  bidButton.disabled = true;
  bidButton.textContent = "Placing Bid...";

  try {
    // Send bid request to API
    const response = await fetch(API_BID_ON_LISTING(listingId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is logged in
      },
      body: JSON.stringify({ amount: bidAmount }),
    });

    if (!response.ok) throw new Error("Failed to place bid. Try again!");

    const result = await response.json();
    console.log("✅ Bid placed successfully:", result);

    // Success message
    alert("🎉 Your bid has been placed successfully!");

    // Update bid history UI
    updateBidHistory({ amount: bidAmount, bidder: { name: "You", avatar: "/images/default-avatar.png" } });

    // Clear input field
    bidInput.value = "";

  } catch (error) {
    console.error("❌ Error placing bid:", error);
    alert("⚠️ Unable to place bid. Please try again.");
  } finally {
    bidButton.disabled = false;
    bidButton.textContent = "Place Bid";
  }
}
