export function setupLogoSwap() {
  const logo = document.getElementById("logo");
  if (!logo) return;

  function swapLogo() {
      if (window.innerWidth < 850) {
          logo.src = "/images/biddy-small-logo.png"; // Small logo on mobile
      } else {
          logo.src = "/images/biddy-logo.png"; // Full logo on larger screens
      }
  }

  swapLogo(); // Run on page load
  window.addEventListener("resize", swapLogo); // Update on resize
}
