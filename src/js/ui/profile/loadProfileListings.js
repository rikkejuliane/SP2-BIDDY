import { readProfile } from "../../api/profile/read.js";
import { API_USER_PROFILE, API_PROFILE_BIDS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { renderProfileListingCard } from "../../api/post/renderProfileListing.js";
import { renderPagination } from "../post/pagination.js";
import { createLoadingSpinner } from "../global/loadingSpinner.js"; // ✅ Import spinner

const ITEMS_PER_PAGE = 6;

/**
 * Loads and displays profile listings, wins, and bids.
 * Fetches data from the API, processes bids, and renders paginated listings.
 * Also handles a loading spinner during data fetching.
 */
export async function loadProfileListings() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user") || localStorage.getItem("username");

  // ✅ Select spinner container
  const spinnerContainer = document.getElementById("spinner-profile");
  if (spinnerContainer) {
    spinnerContainer.innerHTML = ""; // Clear any existing spinner
    const spinner = createLoadingSpinner("spinner-profile");
    spinnerContainer.appendChild(spinner);
    spinner.classList.remove("hidden"); // Show spinner
  }

  const { data: profileData, isOwner, error } = await readProfile(profileUsername);
  if (error) {
    console.error("❌ Error loading profile listings:", error);
    if (spinnerContainer) spinnerContainer.classList.add("hidden"); // Hide spinner on error
    return;
  }

  console.log("📦 Profile Data:", profileData);

  let listings = [], wins = [], bids = [];

  try {
    const response = await fetch(`${API_USER_PROFILE}${profileUsername}/listings?_seller=true&_bids=true`, { headers: headers() });
    listings = response.ok ? (await response.json()).data || [] : [];
  } catch (error) {
    console.error("⚠️ Error fetching profile listings:", error);
  }

  try {
    const response = await fetch(`${API_USER_PROFILE}${profileUsername}/wins?_seller=true&_bids=true`, { headers: headers() });
    wins = response.ok ? (await response.json()).data || [] : [];
  } catch (error) {
    console.error("⚠️ Error fetching profile wins:", error);
  }

  try {
    const response = await fetch(`${API_PROFILE_BIDS(profileUsername)}?_listings=true`, { headers: headers() });
    bids = response.ok ? (await response.json()).data || [] : [];
  } catch (error) {
    console.error("⚠️ Error fetching profile bids:", error);
  }

  // ✅ Process Bids to Attach Seller Info & Total Bids Count
  const bidListings = bids
    .filter((bid) => bid.listing && bid.listing.id)
    .reduce((uniqueListings, bid) => {
      const existingBid = uniqueListings.get(bid.listing.id);
      if (!existingBid || existingBid.amount < bid.amount) {
        uniqueListings.set(bid.listing.id, {
          ...bid.listing,
          highestBid: bid.amount,
          currentHighest: bid.listing.bids?.length ? Math.max(...bid.listing.bids.map((b) => b.amount)) : 0,
          isLeading: bid.amount >= (bid.listing.bids?.length ? Math.max(...bid.listing.bids.map((b) => b.amount)) : 0),
        });
      }
      return uniqueListings;
    }, new Map());

  const uniqueBidListings = Array.from(bidListings.values());

  console.log("📋 Processed Listings with User Bids:", uniqueBidListings);

  // ✅ Render Listings, Wins, and Bids
  renderPaginatedListings(listings, "listings-container", "pagination-listings");
  renderPaginatedListings(wins, "wins-container", "pagination-wins");
  renderPaginatedListings(uniqueBidListings, "bids-container", "pagination-bids", "bid");  

  // ✅ Handle Empty State Messages
  showEmptyStateMessage(listings, "listings-container", "No listings found.");
  showEmptyStateMessage(wins, "wins-container", "You have no wins yet.");
  showEmptyStateMessage(uniqueBidListings, "bids-container", "You haven't placed any bids yet.");

  // ✅ Hide spinner when done
  if (spinnerContainer) spinnerContainer.classList.add("hidden");
}

/**
 * Renders paginated listings for profile sections.
 * 
 * @param {Array} items - The array of listings to display.
 * @param {string} containerId - The ID of the container where listings will be rendered.
 * @param {string} paginationId - The ID of the pagination container.
 * @param {string} [bid] - Optional parameter to indicate if it's a bid listing.
 */
function renderPaginatedListings(items, containerId, paginationId, bid) {
  const container = document.getElementById(containerId);
  const paginationContainer = document.getElementById(paginationId);
  if (!container || !paginationContainer) {
    console.error(`❌ Pagination container or listing container not found! (ID: ${paginationId})`);
    return;
  }

  let currentPage = 1;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  function displayPage(page) {
    container.innerHTML = "";
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach((item) => {
      const card = renderProfileListingCard(item, true, bid);
      container.appendChild(card);
    });

    renderPagination(paginationId, currentPage, totalPages, (newPage) => {
      currentPage = newPage;
      displayPage(newPage);
    });
  }

  displayPage(currentPage);
}

function showEmptyStateMessage(items, containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
    <div class="col-span-full flex justify-center items-center">
    <p class="text-gray-500 italic text-lg text-center"> 
      ${message} 
    </p>
  </div>
  `;
  }
}
