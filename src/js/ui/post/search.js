import { API_LISTING_SEARCH } from "../../api/constants.js";
import { renderListingCard } from "../../api/post/renderListingCard.js";
import { loadListings } from "./loadListings.js"; 

export function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const heroSection = document.getElementById("hero-section"); // ✅ Section to hide/show
  const listingsContainer = document.getElementById("listings-container");

  if (!searchInput) {
    console.error("❌ Search bar not found! Check if `id='search-input'` exists in HTML.");
    return;
  }

  console.log("✅ Search bar detected!");

  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();

    // ✅ If search is cleared, restore hero section & reset listings
    if (query.length === 0) {
      heroSection.classList.remove("hidden");
      setTimeout(() => {
        heroSection.classList.remove("opacity-0");
      }, 10); // Small delay to prevent flickering
      loadListings(); // ✅ Reload full listings
      return;
    }

    // ✅ Hide hero section when searching
    heroSection.classList.add("opacity-0");
    setTimeout(() => {
      heroSection.classList.add("hidden");
    }, 300); // ⏳ Fade out over 0.3s

    try {
      console.log(`🔍 Searching for: ${query}`);
      const response = await fetch(`${API_LISTING_SEARCH}${encodeURIComponent(query)}&_seller=true`);
      if (!response.ok) throw new Error("Failed to fetch search results");

      const result = await response.json();
      let listings = result.data || [];

      console.log("📢 Search Results:", listings); // ✅ Debug API response

      // ✅ Ensure container is cleared before adding new results
      listingsContainer.innerHTML = "";

      if (listings.length === 0) {
        listingsContainer.innerHTML = `<p class="text-center text-gray-500">No results found.</p>`;
      } else {
        // ✅ Render the search results
        listings.forEach((listing) => {
          const card = renderListingCard(listing, Boolean(localStorage.getItem("token")));
          listingsContainer.appendChild(card);
        });
      }
    } catch (error) {
      console.error("❌ Search error:", error);
      listingsContainer.innerHTML = `<p class="text-center text-red-600">Error loading search results.</p>`;
    }
  });
}
