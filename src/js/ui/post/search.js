import { API_LISTING_SEARCH } from "../../api/constants.js";
import { renderListingCard } from "../../api/post/renderListingCard.js";
import { loadListings } from "./loadListings.js";

/**
 * Sets up the search functionality for filtering listings in real-time.
 * - Detects user input in the search bar.
 * - Hides hero section when searching.
 * - Fetches search results from the API.
 * - Renders search results or displays a "No results found" message.
 */
export function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const heroSection = document.getElementById("hero-section");
  const listingsContainer = document.getElementById("listings-container");

  if (!searchInput) {
    console.error(
      "Search bar not found! Check if `id='search-input'` exists in HTML."
    );
    return;
  }

  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value.trim();

    if (query.length === 0) {
      heroSection.classList.remove("hidden");
      setTimeout(() => {
        heroSection.classList.remove("opacity-0");
      }, 10);
      loadListings();
      return;
    }

    heroSection.classList.add("opacity-0");
    setTimeout(() => {
      heroSection.classList.add("hidden");
    }, 300);

    try {
      const response = await fetch(
        `${API_LISTING_SEARCH}${encodeURIComponent(query)}&_seller=true`
      );
      if (!response.ok) throw new Error("Failed to fetch search results");

      const result = await response.json();
      let listings = result.data || [];

      listingsContainer.innerHTML = "";

      if (listings.length === 0) {
        listingsContainer.innerHTML = `<p class="text-center text-gray-500">No results found.</p>`;
      } else {
        listings.forEach((listing) => {
          const card = renderListingCard(
            listing,
            Boolean(localStorage.getItem("token"))
          );
          listingsContainer.appendChild(card);
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      listingsContainer.innerHTML = `<p class="text-center text-red-600">Error loading search results.</p>`;
    }
  });
}
