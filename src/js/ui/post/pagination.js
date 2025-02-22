/**
 * Renders a pagination UI with previous/next buttons and page numbers.
 *
 * - Supports dynamic page number rendering based on total pages.
 * - Adds "..." for large paginations to keep UI clean.
 * - Calls `onPageChange` when a page button is clicked.
 *
 * @param {string} paginationContainerId - The ID of the pagination container.
 * @param {number} currentPage - The current active page.
 * @param {number} totalPages - The total number of pages available.
 * @param {function} onPageChange - Callback function to handle page changes.
 */
export function renderPagination(paginationContainerId, currentPage, totalPages, onPageChange) {
  const paginationContainer = document.getElementById(paginationContainerId);
  if (!paginationContainer) {
    console.error(`❌ Pagination container not found! (ID: ${paginationContainerId})`);
    return;
  }

  paginationContainer.innerHTML = ""; // Clear old pagination

  if (totalPages <= 1) return; // No pagination needed if only 1 page

  // 🔹 Create Previous Button
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&lt;"; // `<` Arrow
  prevButton.className = "px-3 py-4 text-royal-blue text-lg font-bold disabled:opacity-50";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  });

  paginationContainer.appendChild(prevButton);

  // 🔹 Generate Page Numbers
  const pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  // 🔹 Render Page Buttons
  pages.forEach((page) => {
    if (page === "...") {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.className = "px-3 py-2 text-lg font-bold text-gray-500";
      paginationContainer.appendChild(ellipsis);
    } else {
      const pageButton = document.createElement("button");
      pageButton.textContent = page;
      pageButton.className = `px-3 py-4 text-lg font-bold ${page === currentPage ? "text-royal-blue" : "text-black"}`;
      pageButton.addEventListener("click", () => {
        onPageChange(page);
      });

      paginationContainer.appendChild(pageButton);
    }
  });

  // 🔹 Create Next Button
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&gt;"; // `>` Arrow
  nextButton.className = "px-3 py-4 text-royal-blue text-lg font-bold disabled:opacity-50";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  });

  paginationContainer.appendChild(nextButton);
}
