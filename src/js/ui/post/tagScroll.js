export function tagScroll() {
  const tagContainer = document.getElementById("tag-container");
  const tagLeft = document.getElementById("tag-left");
  const tagRight = document.getElementById("tag-right");

  if (!tagContainer || !tagLeft || !tagRight) return; // Prevent errors if elements are missing

  const scrollAmount = 200;

  function updateButtons() {
      tagLeft.disabled = tagContainer.scrollLeft <= 0;
      tagRight.disabled = tagContainer.scrollLeft + tagContainer.clientWidth >= tagContainer.scrollWidth;
  }

  tagLeft.onclick = function () {
      tagContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(updateButtons, 300);
  };

  tagRight.onclick = function () {
      tagContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(updateButtons, 300);
  };

  updateButtons(); // Set initial button state
}
