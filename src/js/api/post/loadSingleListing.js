import { API_LISTING_SINGLE } from "../../api/constants.js";
import { renderSingleListing } from "../../api/post/renderSingleListing.js";
import { createLoadingSpinner } from "../../ui/global/loadingSpinner.js"; // ✅ Import the spinner

export async function loadSingleListing() {
  const container = document.getElementById("single-listing-container");
  if (!container) return console.error("❌ Single listing container not found!");

  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    container.innerHTML = `<p class="text-center text-red-600">Listing not found.</p>`;
    return;
  }

  // ✅ Create and show loading spinner
  const spinner = createLoadingSpinner("listing-spinner");
  container.innerHTML = ""; // Clear container before showing spinner
  container.appendChild(spinner);
  spinner.classList.remove("hidden"); // Show spinner

  try {
    const response = await fetch(`${API_LISTING_SINGLE(listingId)}?_bids=true&_seller=true`);
    if (!response.ok) throw new Error("Failed to fetch listing");

    const result = await response.json();
    const listing = result.data;

    if (!listing) throw new Error("Listing not found.");

    // ✅ Hide the spinner once data is loaded
    spinner.classList.add("hidden");
    container.innerHTML = ""; // Clear previous content
    container.appendChild(renderSingleListing(listing, Boolean(localStorage.getItem("token"))));

  } catch (error) {
    console.error("❌ Error loading single listing:", error);
    container.innerHTML = `<p class="text-center text-red-600">Error loading listing.</p>`;
  }
}
