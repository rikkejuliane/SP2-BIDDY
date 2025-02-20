import { readProfile } from "../../api/profile/read.js";
import { API_USER_PROFILE, API_PROFILE_BIDS } from "../../api/constants.js";
import { headers } from "../../api/headers.js";
import { renderProfileListingCard } from "../../api/post/renderProfileListing.js";
import { renderPagination } from "../post/pagination.js";

const ITEMS_PER_PAGE = 6;

export async function loadProfileListings() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user") || localStorage.getItem("username");

  const { data: profileData, isOwner, error } = await readProfile(profileUsername);
  if (error) {
    console.error("❌ Error loading profile listings:", error);
    return;
  }

  console.log("📦 Profile Data:", profileData);

  // ✅ Fetch Listings (Ensure `_seller=true&_bids=true`)
  let listings = [];
  try {
    const response = await fetch(`${API_USER_PROFILE}${profileUsername}/listings?_seller=true&_bids=true`, {
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch profile listings");
    const result = await response.json();
    listings = result.data || [];
    console.log("🛍️ User Listings Data:", listings);
  } catch (error) {
    console.error("⚠️ Error fetching profile listings:", error);
  }

  // ✅ Fetch Wins (Ensure `_seller=true&_bids=true`)
  let wins = [];
  try {
    const response = await fetch(`${API_USER_PROFILE}${profileUsername}/wins?_seller=true&_bids=true`, {
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch profile wins");
    const result = await response.json();
    wins = result.data || [];
    console.log("🏆 User Wins Data:", wins);
  } catch (error) {
    console.error("⚠️ Error fetching profile wins:", error);
  }

  // ✅ Fetch Bids (Ensure `_listings=true&_seller=true`)
  let bids = [];
  try {
    const response = await fetch(`${API_PROFILE_BIDS(profileUsername)}?_listings=true`, {
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch user bids");
    const result = await response.json();
    bids = result.data || [];

    console.log("💰 User Bids Data:", bids);
  } catch (error) {
    console.error("⚠️ Error fetching bids:", error);
  }

  // ✅ Process Bids to Attach Seller Info & Total Bids Count
  const bidListings = bids
    .filter((bid) => bid.listing && bid.listing.id) // ✅ Ensure valid listings
    .reduce((uniqueListings, bid) => {
      // Use the listing ID as a key to ensure uniqueness
      const existingBid = uniqueListings.get(bid.listing.id);

      // If no bid exists or the current bid is higher than the stored bid, update it
      if (!existingBid || existingBid.amount < bid.amount) {
        uniqueListings.set(bid.listing.id, {
          ...bid.listing,
          highestBid: bid.amount, // ✅ Get highest bid from all bids
          currentHighest: bid.listing.bids?.length ? Math.max(...bid.listing.bids.map((b) => b.amount)) : 0, // ✅ Attach user's bid amount
          isLeading: bid.amount >= (bid.listing.bids?.length ? Math.max(...bid.listing.bids.map((b) => b.amount)) : 0), // ✅ Check if user's bid is highest
        });
      }

      return uniqueListings;
    }, new Map());

  // Convert Map to array
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
}

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

    // ✅ Now using new `renderPagination`
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
