/**
 * Handles dynamic swapping of the site logo based on screen width.
 * - Uses a smaller logo for screens below 950px width.
 * - Uses the full logo for larger screens.
 *
 * @function setupLogoSwap
 * @returns {void}
 */
export function setupLogoSwap() {
  const logo = document.getElementById("logo");
  if (!logo) return;

  /**
   * Updates the logo source based on window size.
   * - Uses a small logo on mobile.
   * - Uses a full logo on larger screens.
   *
   * @function swapLogo
   * @returns {void}
   */
  function swapLogo() {
    if (window.innerWidth < 950) {
      logo.src = "/images/biddy-small-logo.png";
    } else {
      logo.src = "/images/biddy-logo.png";
    }
  }

  swapLogo();
  window.addEventListener("resize", swapLogo);
}
