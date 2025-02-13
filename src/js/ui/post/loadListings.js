import { API_AUCTION } from "../../api/constants.js";
import { renderListingCard } from "../../api/post/renderListingCard.js";
import { renderPagination } from "./pagination.js"; 

const ITEMS_PER_PAGE = 12;
export let currentPage = 1;
export let totalPages = 1;
export let allListings = []; // ✅ Store all listings globally

export async function loadListings() {
  const container = document.getElementById("listings-container");
  if (!container) return console.error("❌ Listings container not found!");

  try {
    const response = await fetch(`${API_AUCTION}/listings?_bids=true&_seller=true`);
    if (!response.ok) throw new Error("Failed to fetch listings");

    const result = await response.json();
    let listings = result.data;

    if (!Array.isArray(listings)) {
      throw new Error("API response is not an array.");
    }

    // ✅ Store all valid listings globally
    allListings = listings.filter((listing) => {
      if (!listing || typeof listing !== "object") return false;
      return (
        typeof listing.title === "string" && listing.title.trim().length >= 3 &&
        Array.isArray(listing.media) && listing.media.length > 0 && listing.media[0]?.url &&
        Array.isArray(listing.tags) && listing.tags.length > 0 &&
        typeof listing.description === "string" && listing.description.trim().length > 0
      );
    });

    totalPages = Math.ceil(allListings.length / ITEMS_PER_PAGE);
    currentPage = 1; // ✅ Reset to first page
    renderPage(); // ✅ Load first page

  } catch (error) {
    console.error("❌ Error loading listings:", error);
    container.innerHTML = `<p class="text-center text-red-600">Error loading listings.</p>`;
  }
}

// ✅ Export renderPage() for search.js
export function renderPage() {
  const container = document.getElementById("listings-container");
  if (!container) return;

  container.innerHTML = ""; // Clear listings

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const listingsToShow = allListings.slice(startIndex, endIndex);

  if (listingsToShow.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500">No valid listings available.</p>`;
  } else {
    listingsToShow.forEach((listing) => {
      container.appendChild(renderListingCard(listing, Boolean(localStorage.getItem("token"))));
    });
  }

  // ✅ Call pagination
  renderPagination(currentPage, totalPages, (newPage) => {
    currentPage = newPage;
    renderPage();
  });
}
