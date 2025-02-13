import { API_LISTINGS_BY_TAG } from "../../api/constants.js";
import { renderPage } from "./loadListings.js"; 

/**
 * Filters listings based on selected tag.
 * @param {string} tag - The tag to filter by.
 */
export async function filterByTag(tag) {
  if (!tag) return;

  try {
    const response = await fetch(API_LISTINGS_BY_TAG(tag));
    if (!response.ok) throw new Error("Failed to fetch filtered listings");

    const result = await response.json();
    let filteredListings = result.data;

    if (!Array.isArray(filteredListings)) {
      throw new Error("API response is not an array.");
    }

    // Update global listings and re-render
    window.allListings = filteredListings;
    window.currentPage = 1;
    renderPage();
  } catch (error) {
    console.error("❌ Error filtering listings:", error);
  }
}

/**
 * Initializes tag filtering event listeners.
 */
export function setupTagFilters() {
  const tagButtons = document.querySelectorAll(".tag-filter");
  if (!tagButtons.length) return console.warn("❌ No tag buttons found!");

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTag = button.dataset.tag;
      filterByTag(selectedTag);
    });
  });
}
