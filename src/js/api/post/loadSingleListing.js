import { API_LISTING_SINGLE } from "../../api/constants.js";
import { renderSingleListing } from "../../api/post/renderSingleListing.js";
import { createLoadingSpinner } from "../../ui/global/loadingSpinner.js";

/**
 * Fetches and displays a single listing based on the listing ID from the URL parameters.
 * Shows a loading spinner while fetching the data.
 * Handles errors and displays appropriate messages if the listing is not found.
 */
export async function loadSingleListing() {
  const container = document.getElementById("single-listing-container");
  if (!container) {
    console.error("Single listing container not found!");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    container.innerHTML = `<p class="text-center text-red-600">Listing not found.</p>`;
    return;
  }

  const spinner = createLoadingSpinner("listing-spinner");
  container.innerHTML = "";
  container.appendChild(spinner);
  spinner.classList.remove("hidden");

  try {
    const response = await fetch(
      `${API_LISTING_SINGLE(listingId)}?_bids=true&_seller=true`
    );
    if (!response.ok) throw new Error("Failed to fetch listing");

    const result = await response.json();
    const listing = result.data;

    if (!listing) throw new Error("Listing not found.");

    spinner.classList.add("hidden");
    container.innerHTML = "";
    container.appendChild(
      renderSingleListing(listing, Boolean(localStorage.getItem("token")))
    );
  } catch (error) {
    console.error("Error loading single listing:", error);
    container.innerHTML = `<p class="text-center text-red-600">Error loading listing.</p>`;
  }
}
