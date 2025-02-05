import { onLogout } from "../auth/logout.js";
/**
 * Attaches a logout event listener to the logout button.
 *
 * - Selects the logout button from the DOM.
 * - Attaches a click event listener that triggers the `onLogout` function.
 * - Redirects the user to the login page after logout.
 *
 * @throws {Error} If the logout button is not found in the DOM.
 * @returns {void}
 */
export async function setLogoutListener() {
  const logoutButton = document.querySelector("#logout-btn");
  logoutButton.addEventListener("click", () => {
    onLogout()
    window.location.href = "/auth/login/";
  });
}