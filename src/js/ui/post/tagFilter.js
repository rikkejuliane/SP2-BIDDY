import { updateFilteredListings, setCurrentPage } from "./loadListings.js";
import { renderPagination } from "./pagination.js";

export function initTagFiltering(allListings) {
  const tagItems = document.querySelectorAll(".tag-item");

  if (!tagItems.length) return;

  // ✅ Ensure "All Listings" is the default active tag
  const defaultTag = document.querySelector('.tag-item[data-tag="all"]');
  if (defaultTag) {
    defaultTag.classList.add("active-tag");
    updateTagStyles(defaultTag);
  }

  tagItems.forEach(tagItem => {
    tagItem.addEventListener("click", () => {
      const selectedTag = tagItem.getAttribute("data-tag");

      // ✅ Remove active state from all tags before applying to the clicked one
      tagItems.forEach(item => item.classList.remove("active-tag"));

      // ✅ Apply active class to the clicked tag
      tagItem.classList.add("active-tag");

      // ✅ Update SVG stroke/fill and text styling
      updateTagStyles(tagItem);

      // ✅ Filter listings based on the selected tag
      filterListingsByTag(selectedTag, allListings);
    });
  });
}

// Function to filter listings by tag and update pagination
export function filterListingsByTag(tag, allListings) {
  if (!allListings || !Array.isArray(allListings)) return;

  // Filter listings based on selected tag or show all
  let newFilteredListings = tag === "all"
    ? allListings
    : allListings.filter(listing => listing.tags.includes(tag));

  // ✅ Update filtered listings and reset pagination
  updateFilteredListings(newFilteredListings);
  setCurrentPage(1);
}

// ✅ Function to update tag styling dynamically (Fixes SVG Thickness Issue)
function updateTagStyles(activeTag) {
  const allTags = document.querySelectorAll(".tag-item");

  allTags.forEach(tag => {
    const svgPath = tag.querySelector("svg path");
    const text = tag.querySelector("p");

    // ✅ Reset all SVGs without modifying their thickness
    if (svgPath) {
      if (svgPath.hasAttribute("fill")) svgPath.setAttribute("fill", "#4E4E4E"); // Default fill
      if (svgPath.hasAttribute("stroke")) svgPath.setAttribute("stroke", "#4E4E4E"); // Default stroke
    }
    if (text) text.classList.remove("text-royal-blue", "border-b-4", "border-royal-blue", "pb-1");
  });

  // ✅ Apply active styles to the selected tag
  const activeSvgPath = activeTag.querySelector("svg path");
  const activeText = activeTag.querySelector("p");

  if (activeSvgPath) {
    // ✅ Only update the attributes that exist to prevent thickness issues
    if (activeSvgPath.hasAttribute("fill")) activeSvgPath.setAttribute("fill", "#0017AD");
    if (activeSvgPath.hasAttribute("stroke")) activeSvgPath.setAttribute("stroke", "#0017AD");
  }
  if (activeText) {
    activeText.classList.add(
      "text-royal-blue",
      "border-b-4", // Thicker border
      "border-royal-blue",
      "pb-1", // Adds spacing so text doesn’t sit on the border
      "font-inter",
      "font-medium"
    );
  }
}
