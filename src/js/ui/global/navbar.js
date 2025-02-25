import { displayUserCredits } from "../auth/credits.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { setupHamburgerMenu } from "./hamburgerMenu.js";

/**
 * Updates the navigation bar dynamically based on authentication status.
 * - Displays navigation links and buttons based on user login state.
 * - Adds event listeners for logout and credit display.
 *
 * @returns {void}
 */
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
            <li id="user-credits">Your credit: <span class="text-royal-blue">$0</span></li>
            <li><a href="/post/create/">New listing</a></li>
            <li><a href="/profile/">Profile</a></li>
            <li>
                <button id="logout-btn" class="bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-[100px] h-[30px] flex items-center justify-center">
                    Logout
                </button>
            </li>
        `;
    }

    navbarHTML += `</ul></nav>`;

    // ✅ Login button is placed **outside the nav**, so it’s always visible
    if (!isLoggedIn) {
        navbarHTML += `
            <div class="flex justify-center mt-3">
                <a href="/auth/" class="bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded sm:w-[100px] sm:h-[30px] w-10 h-10 flex items-center justify-center mx-auto">
                    <span class="hidden sm:block">Login</span> 
                    <svg class="w-6 h-6 sm:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15m-3-3h8.25m0 0l-3-3m3 3l-3 3"/>
                    </svg>
                </a>
            </div>
        `;
    }

    // ✅ Show the hamburger menu **only when logged in and under 850px**
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
        setupHamburgerMenu();
    }
}
