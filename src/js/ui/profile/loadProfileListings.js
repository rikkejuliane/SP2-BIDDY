import { readProfile } from "../../api/profile/read.js";
import { API_PROFILE_BIDS } from "../../api/constants.js";
import { headers } from "../../api/headers.js"; 
import { renderProfileListingCard } from "../../api/post/renderProfileListing.js"; 

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

  // ✅ Ensure arrays exist
  const listings = profileData.listings || [];
  const wins = profileData.wins || [];

  // ✅ Fetch Bids Separately
  let bids = [];
  try {
    const response = await fetch(API_PROFILE_BIDS(profileUsername) + "?_listings=true&_seller=true", {
      headers: headers(),
    });
    
    

    if (!response.ok) throw new Error("Failed to fetch user bids");
    const result = await response.json();
    bids = result.data || [];
    console.log("📌 User Bids Data:", bids);
  } catch (error) {
    console.error("⚠️ Error fetching bids:", error);
  }

  // ✅ Extract bid listings and attach highest bid amount
  const bidListings = bids
  .filter(bid => bid.listing && bid.listing.id) // ✅ Ensure valid listings
  .map(bid => ({
    ...bid.listing, 
    highestBid: bid.amount, // ✅ Attach highest bid
    bidderName: bid.bidder?.name || "Unknown Bidder", // ✅ Include bidder info
    totalBids: bid.listing?._count?.bids || 0, // ✅ Attach total bids
    seller: bid.listing?.seller || {}, // ✅ Ensure seller info is attached
  }));


  console.log("🎯 Processed Bid Listings:", bidListings);

  // ✅ Render Listings, Wins, and Bids
  renderPaginatedListings(listings, "listings-container", "listings-pagination");
  renderPaginatedListings(wins, "wins-container", "wins-pagination");
  renderPaginatedListings(bidListings, "bids-container", "bids-pagination");

  // ✅ Handle Empty State Messages
  showEmptyStateMessage(listings, "listings-container", "No listings found.");
  showEmptyStateMessage(wins, "wins-container", "You have no wins yet.");
  showEmptyStateMessage(bidListings, "bids-container", "You haven't placed any bids yet.");
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
      const card = renderProfileListingCard(item, true);
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
