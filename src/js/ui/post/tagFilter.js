import { updateFilteredListings, setCurrentPage } from "./loadListings.js";
import { renderPagination } from "./pagination.js";

/**
 * Initializes the tag filtering functionality for listings.
 * - Highlights the selected tag.
 * - Filters listings based on the selected tag.
 * - Scrolls the tag bar to keep the selected tag in view.
 *
 * @param {Array} allListings - The array of all available listings.
 */
export function initTagFiltering(allListings) {
  const tagItems = document.querySelectorAll(".tag-item");
  const leftButton = document.getElementById("tag-left");
  const rightButton = document.getElementById("tag-right");

  if (!tagItems.length) return;

  // ✅ Store tags in order
  const tags = Array.from(tagItems).map(tag => tag.getAttribute("data-tag"));
  let currentIndex = tags.indexOf("all"); // Default to "all"

  /**
   * Updates the active tag and applies filtering.
   * @param {number} index - The index of the tag to activate.
   * @param {boolean} [isButtonClick=false] - Whether the update was triggered by a navigation button.
   */
  function updateActiveTag(index, isButtonClick = false) {
    if (index < 0 || index >= tags.length) return;

    const activeTag = tags[index];
    const activeTagItem = document.querySelector(`.tag-item[data-tag="${activeTag}"]`);

    // ✅ Remove active state from all tags
    tagItems.forEach(tag => tag.classList.remove("active-tag"));

    // ✅ Apply active state to the new selected tag
    if (activeTagItem) {
      activeTagItem.classList.add("active-tag");
      updateTagStyles(activeTagItem);

      const tagContainer = document.querySelector("#tag-container");

      if (tagContainer) {
        const containerRect = tagContainer.getBoundingClientRect();
        const itemRect = activeTagItem.getBoundingClientRect();

        // Calculate scroll position so the active tag moves to the center
        const scrollAmount = itemRect.left - containerRect.left - (containerRect.width / 2) + (itemRect.width / 2);

        // Scroll only the tag bar, not the whole page
        tagContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }

    // ✅ Filter listings
    filterListingsByTag(activeTag, allListings);

    // ✅ Update index tracking
    currentIndex = index;
  }

  // ✅ Click event for tag items
  tagItems.forEach((tagItem, index) => {
    tagItem.addEventListener("click", () => {
      updateActiveTag(index);
    });
  });

  // ✅ Navigation buttons (Only apply scroll effect)
  rightButton?.addEventListener("click", () => {
    let newIndex = (currentIndex + 1) % tags.length; // Move right (loop around)
    updateActiveTag(newIndex, true);
  });

  leftButton?.addEventListener("click", () => {
    let newIndex = (currentIndex - 1 + tags.length) % tags.length; // Move left (loop around)
    updateActiveTag(newIndex, true);
  });

  // ✅ Ensure "All Listings" is the default active tag
  updateActiveTag(currentIndex);
}

/**
 * Filters the listings based on the selected tag.
 * Updates the displayed listings and pagination.
 *
 * @param {string} tag - The selected tag for filtering.
 * @param {Array} allListings - The complete list of listings.
 */
export function filterListingsByTag(tag, allListings) {
  if (!allListings || !Array.isArray(allListings)) return;

  let newFilteredListings = tag === "all"
    ? allListings
    : allListings.filter(listing => listing.tags.includes(tag));

  updateFilteredListings(newFilteredListings);
}

/**
 * Updates tag styling dynamically to fix SVG thickness issues.
 * Ensures that the active tag stands out.
 *
 * @param {HTMLElement} activeTag - The currently selected tag element.
 */
function updateTagStyles(activeTag) {
  const allTags = document.querySelectorAll(".tag-item");

  allTags.forEach(tag => {
    const svgPath = tag.querySelector("svg path");
    const text = tag.querySelector("p");

    if (svgPath) {
      if (svgPath.hasAttribute("fill")) svgPath.setAttribute("fill", "#4E4E4E"); // Default
      if (svgPath.hasAttribute("stroke")) svgPath.setAttribute("stroke", "#4E4E4E"); // Default
    }
    if (text) text.classList.remove("text-royal-blue", "border-b-4", "border-royal-blue", "pb-1");
  });

  const activeSvgPath = activeTag.querySelector("svg path");
  const activeText = activeTag.querySelector("p");

  if (activeSvgPath) {
    if (activeSvgPath.hasAttribute("fill")) activeSvgPath.setAttribute("fill", "#0017AD");
    if (activeSvgPath.hasAttribute("stroke")) activeSvgPath.setAttribute("stroke", "#0017AD");
  }
  if (activeText) {
    activeText.classList.add(
      "text-royal-blue",
      "border-b-4",
      "border-sm",
      "border-royal-blue",
      "pb-1",
      "font-inter",
      "font-medium"
    );
  }
}
