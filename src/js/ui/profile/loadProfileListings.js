import { readProfile } from "../../api/profile/read.js";
import { API_PROFILE_BIDS } from "../../api/constants.js";
import { headers } from "../../api/headers.js"; 
import { renderListingCard } from "../../api/post/renderListingCard.js";

const ITEMS_PER_PAGE = 6; // Number of listings per page

export async function loadProfileListings() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user"); // Get user from URL or default to logged-in user

  const { data: profileData, isOwner, error } = await readProfile(profileUsername);
  if (error) {
    console.error("❌ Error loading profile listings:", error);
    return;
  }

  console.log("📦 Profile Data:", profileData); // ✅ Log API response to check data structure

  if (!profileData.listings) profileData.listings = [];
  if (!profileData.wins) profileData.wins = [];

  // ✅ Fetch Bids Separately
  let bids = [];
  try {
    const response = await fetch(API_PROFILE_BIDS(profileUsername) + "?_listings=true", {
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch user bids");
    const result = await response.json();
    bids = result.data || [];
    console.log("📌 User Bids Data:", bids); // ✅ Log bids
  } catch (error) {
    console.error("⚠️ Error fetching bids:", error);
  }

  // ✅ Filter out bids that don't have a valid listing
const bidListings = bids
.map(bid => bid.listing)
.filter(listing => listing && listing.id); // Remove invalid listings

console.log("📌 Processed Bid Listings:", bidListings); // ✅ Debugging to check what we're passing

// ✅ Render Listings, Wins, and Bids
renderPaginatedListings(profileData.listings, "listings-container", "listings-pagination");
renderPaginatedListings(profileData.wins, "wins-container", "wins-pagination");
renderPaginatedListings(bidListings, "bids-container", "bids-pagination"); // Use filtered bid listings

// ✅ Handle Empty State Messages
showEmptyStateMessage(profileData.listings, "listings-container", "No listings found.");
showEmptyStateMessage(profileData.wins, "wins-container", "You have no wins yet.");
showEmptyStateMessage(bidListings, "bids-container", "You haven't placed any bids yet."); // Use filtered list


  // ✅ Render Listings, Wins, and Bids
  renderPaginatedListings(profileData.listings, "listings-container", "listings-pagination");
  renderPaginatedListings(profileData.wins, "wins-container", "wins-pagination");
  renderPaginatedListings(bids.map(bid => bid.listing), "bids-container", "bids-pagination");

  // ✅ Handle Empty State Messages
  showEmptyStateMessage(profileData.listings, "listings-container", "No listings found.");
  showEmptyStateMessage(profileData.wins, "wins-container", "You have no wins yet.");
  showEmptyStateMessage(bids, "bids-container", "You haven't placed any bids yet.");
}

function renderPaginatedListings(items, containerId, paginationId) {
  const container = document.getElementById(containerId);
  const pagination = document.getElementById(paginationId);
  if (!container || !pagination) return;

  let currentPage = 1;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  function displayPage(page) {
    container.innerHTML = "";
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach((item) => {
      const card = renderListingCard(item, true); // Always show cards as logged in
      container.appendChild(card);
    });

    renderPaginationControls(pagination, page, totalPages);
  }

  function renderPaginationControls(paginationElement, currentPage, totalPages) {
    paginationElement.innerHTML = "";
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.className = `px-3 py-1 mx-1 rounded ${
        i === currentPage ? "bg-royal-blue text-white" : "bg-gray-300"
      }`;
      button.addEventListener("click", () => displayPage(i));
      paginationElement.appendChild(button);
    }
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
