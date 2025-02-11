import { onLogout } from "../auth/logout.js";

/**
 * Attaches a logout event listener to all logout buttons.
 */
export async function setLogoutListener() {
  const logoutButtons = document.querySelectorAll("#logout-btn, #hamburger-logout-btn");
  if (!logoutButtons.length) return; // ✅ Exit early if no buttons are found

  logoutButtons.forEach(button => {
    button.addEventListener("click", () => {
      onLogout();
      window.location.href = "/";
    });
  });
}
