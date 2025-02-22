import { displayUserCredits } from "../auth/credits.js";
import { setLogoutListener } from "../../ui/global/logout.js";

/**
 * Initializes and handles the functionality of the mobile hamburger menu.
 * This includes opening/closing the menu, displaying user credits,
 * and setting up the logout button.
 *
 * @function setupHamburgerMenu
 * @returns {void}
 */
export function setupHamburgerMenu() {
  const menuIcon = document.getElementById("hamburgermeny");
  let menu = document.getElementById("mobile-menu");

  if (!menuIcon) return;

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("open"); // Toggle the X animation
    toggleMenu();
  });

  /**
  * Toggles the hamburger menu's visibility and updates UI elements dynamically.
  * Adds/removes the menu from the DOM if it does not exist.
  *
  * @function toggleMenu
  * @returns {void}
  */
  function toggleMenu() {
    if (!menu) {
      menu = document.createElement("div");
      menu.id = "mobile-menu";
      menu.className = "fixed top-0 right-0 w-full h-auto bg-cloud-grey p-6 shadow-lg z-50 transition-transform duration-300 translate-x-full";
      menu.innerHTML = `
            <ul class="font-inter font-bold text-charcoal-grey text-lg space-y-4 pt-16">
                <li id="hamburger-credits" class="flex justify-center items-center">Credits: <span class="text-royal-blue">$0</span></li>
                <hr class="border-t border-charcoal-grey opacity-25 rounded-full w-5/6 mx-auto">
                <li class="flex justify-center items-center"><a href="/post/create/">New listing</a></li>
                <hr class="border-t border-charcoal-grey opacity-25 rounded-full w-5/6 mx-auto">
                <li class="flex justify-center items-center"><a href="/profile/">Profile</a></li>
                <hr class="border-t border-charcoal-grey opacity-25 rounded-full w-5/6 mx-auto">
                <li class="flex justify-center items-center"><button id="hamburger-logout-btn" class="bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-5/6">Logout</button></li>
            </ul>
        `;
      document.body.appendChild(menu);
    }

    const isMenuOpen = menu.classList.contains("translate-x-0");

    if (isMenuOpen) {
      // Close menu
      menu.classList.add("translate-x-full");
      menu.classList.remove("translate-x-0");
      menuIcon.classList.remove("open"); // Reset animation
    } else {
      // Open menu
      menu.classList.add("translate-x-0");
      menu.classList.remove("translate-x-full");
      menuIcon.classList.add("open"); // Trigger animation
    }

    displayUserCredits();
    setLogoutListener();

    // ✅ Ensures clicking outside closes it every time
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && event.target !== menuIcon) {
        menu.classList.add("translate-x-full");
        menu.classList.remove("translate-x-0");
        menuIcon.classList.remove("open");
      }
    });
  }
}
