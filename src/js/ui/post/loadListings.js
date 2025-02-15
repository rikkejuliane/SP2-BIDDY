import { API_AUCTION } from "../../api/constants.js";
import { renderListingCard } from "../../api/post/renderListingCard.js";
import { renderPagination } from "./pagination.js";
import { initTagFiltering } from "./tagFilter.js";

const ITEMS_PER_PAGE = 12;
export let currentPage = 1;
export let totalPages = 1;
export let allListings = []; // Store all listings globally
export let filteredListings = []; // Store filtered listings globally

export async function loadListings() {
  const container = document.getElementById("listings-container");
  if (!container) return console.error("❌ Listings container not found!");

  try {
    let listings = [];
    let page = 1;
    let hasMore = true;

    // Fetch ALL listings, handling API pagination
    while (hasMore) {
      const response = await fetch(`${API_AUCTION}/listings?_bids=true&_seller=true&limit=100&page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch listings");

      const result = await response.json();
      if (!Array.isArray(result.data) || result.data.length === 0) break;

      listings = [...listings, ...result.data];
      page++;
      hasMore = result.data.length === 100; // If API returns 100 items, assume more exist
    }

    if (listings.length === 0) throw new Error("No listings found.");

    // Filter out broken posts (missing required data)
    allListings = listings
      .filter((listing) => {
        return (
          listing &&
          typeof listing.title === "string" &&
          listing.title.trim().length >= 3 &&
          typeof listing.description === "string" &&
          listing.description.trim().length > 0 &&
          Array.isArray(listing.media) &&
          listing.media.length > 0 &&
          listing.media[0]?.url &&
          Array.isArray(listing.tags) &&
          listing.tags.length > 0
        );
      })
      .sort((a, b) => new Date(b.created) - new Date(a.created)); // Sort by newest first

    // Default to showing all listings
    filteredListings = [...allListings];
    totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
    currentPage = 1; // Reset to first page

    renderPage(filteredListings); // Load first page with all listings

    // Initialize tag filtering
    initTagFiltering(allListings, updateFilteredListings, setCurrentPage);

  } catch (error) {
    console.error("❌ Error loading listings:", error);
    container.innerHTML = `<p class="text-center text-red-600">Error loading listings.</p>`;
  }
}

// ✅ Function to update filtered listings when selecting a tag
export function updateFilteredListings(newListings) {
  filteredListings = [...newListings]; // Update global filtered listings
  totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  currentPage = 1; // Reset to first page
  renderPage(filteredListings);
}

// ✅ Function to update the current page
export function setCurrentPage(newPage) {
  currentPage = newPage;
  renderPage(filteredListings); // Ensure it only shows filtered listings
}

// ✅ Modified renderPage to always use filteredListings
export function renderPage(listingsToShow) {
  const container = document.getElementById("listings-container");
  if (!container) return;

  container.innerHTML = ""; // Clear listings

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const listingsToDisplay = listingsToShow.slice(startIndex, endIndex);

  if (listingsToDisplay.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500">No valid listings available.</p>`;
  } else {
    listingsToDisplay.forEach((listing) => {
      container.appendChild(renderListingCard(listing, Boolean(localStorage.getItem("token"))));
    });
  }

  // ✅ Now pagination listens to filteredListings instead of allListings
  renderPagination(currentPage, totalPages, (newPage) => {
    setCurrentPage(newPage);
  });

  // ✅ Update total listings count dynamically
  const totalListingsElement = document.getElementById("total-listings-count");
  if (totalListingsElement) {
    totalListingsElement.textContent = filteredListings.length; // Correct count after filtering
  }
}
