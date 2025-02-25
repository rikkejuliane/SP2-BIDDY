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

  const navbarCredits = document.getElementById("user-credits");
  const hamburgerCredits = document.getElementById("hamburger-credits");

  try {
    const response = await fetch(`${API_USER_PROFILE}${username}`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch credits");

    const { data } = await response.json();
    const credits = data.credits;

    if (navbarCredits) {
      navbarCredits.innerHTML = `Credits: <span class="text-royal-blue">$${credits}</span>`;
    }

    if (hamburgerCredits) {
      hamburgerCredits.innerHTML = `Credits: <span class="text-royal-blue">$${credits}</span>`;
    }
  } catch (error) {
    console.error("Error fetching user credits:", error);
  }
}
