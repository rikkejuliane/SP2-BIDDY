import { onLogout } from "../auth/logout.js";

/**
 * Attaches a logout event listener to all logout buttons in the UI.
 * - Selects both the standard navbar logout button and the hamburger menu logout button.
 * - Calls the `onLogout()` function when clicked, then redirects the user to the homepage (`/`).
 *
 * @function setLogoutListener
 * @returns {void}
 */
export async function setLogoutListener() {
  const logoutButtons = document.querySelectorAll(
    "#logout-btn, #hamburger-logout-btn"
  );
  if (!logoutButtons.length) return;

  logoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      onLogout();
      window.location.href = "/";
    });
  });
}
