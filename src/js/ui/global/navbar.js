import { displayUserCredits } from "../auth/credits.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { setupHamburgerMenu } from "./hamburgerMenu.js"; 

export function updateNavbar() {
  const navbarContainer = document.getElementById("navbar");
  if (!navbarContainer) return;

  const isLoggedIn = localStorage.getItem("token");
  
  let navbarHTML = `
      <nav class="hidden md:flex items-center">
          <ul class="flex flex-row justify-center items-center gap-6 font-inter font-bold text-charcoal-grey whitespace-nowrap">
  `;

  if (isLoggedIn) {
      navbarHTML += `
          <li id="user-credits">Your credit: $0</li>
          <li><a href="/post/create/index.html">New listing</a></li>
          <li><a href="/profile/index.html">Profile</a></li>
          <li>
              <button id="logout-btn" class="bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-[100px] h-[30px] flex items-center justify-center">
                  Logout
              </button>
          </li>
      `;
  } else {
      navbarHTML += `
          <li>
              <a href="/auth/" class="bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-[100px] h-[30px] flex items-center justify-center">
                  Login
              </a>
          </li>
      `;
  }
  navbarHTML += `</ul></nav>`;
  
  if (isLoggedIn) {
      navbarHTML += `
          <div id="hamburgermeny" class="hidden max-[849px]:block cursor-pointer z-50">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </div>
      `;
  }

  navbarContainer.innerHTML = navbarHTML;

  if (isLoggedIn) {
      displayUserCredits();
      setLogoutListener();
      setupHamburgerMenu(); // Initialize hamburger menu logic
  }
}

