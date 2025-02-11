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
            <li id="user-credits">Your credit: <span class="text-royal-blue">$0</span></li>
            <li><a href="/post/create/index.html">New listing</a></li>
            <li><a href="/profile/index.html">Profile</a></li>
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
                <a href="/auth/" class="bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-[100px] h-[30px] flex items-center justify-center">
                    Login
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
