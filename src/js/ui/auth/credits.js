import { API_USER_PROFILE } from "../../api/constants.js";
import { headers } from "../../api/headers.js"; 

/**
 * Fetches and displays the logged-in user's available credits in both the main navbar 
 * and the hamburger menu (if applicable).
 * 
 * @async
 * @function displayUserCredits
 * @returns {Promise<void>} - Updates the UI with the user's credit balance.
 */
export async function displayUserCredits() {
    const username = localStorage.getItem("username");
    if (!username) return;

    const navbarCredits = document.getElementById("user-credits"); // ✅ Keep existing ID for navbar
    const hamburgerCredits = document.getElementById("hamburger-credits"); // ✅ New ID for hamburger menu

    try {
        const response = await fetch(`${API_USER_PROFILE}${username}`, {
            method: "GET",
            headers: headers(),
        });

        if (!response.ok) throw new Error("Failed to fetch credits");

        const { data } = await response.json();
        const credits = data.credits;

        // ✅ Update navbar credits (KEEP THIS UNCHANGED)
        if (navbarCredits) {
            navbarCredits.innerHTML = `Credits: <span class="text-royal-blue">$${credits}</span>`;
        }

        // ✅ ALSO update hamburger credits if it exists
        if (hamburgerCredits) {
            hamburgerCredits.innerHTML = `Credits: <span class="text-royal-blue">$${credits}</span>`;
        }

    } catch (error) {
        console.error("Error fetching user credits:", error);
    }
}
