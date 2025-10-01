import { API_USER_PROFILE, API_PROFILE_BIDS } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetches profile data for a given username, including listings, wins, and seller info.
 * If no username is provided, it defaults to the logged-in user's profile.
 *
 * @param {string} [username] - The username of the profile to fetch.
 * @returns {Promise<{data: Object, isOwner: boolean} | {error: string}>}
 *          A promise resolving to an object containing profile data and ownership status,
 *          or an error message if the profile cannot be fetched.
 */
export async function readProfile(username) {
  if (!username) {
    username = localStorage.getItem("username");
    window.history.replaceState(null, "", "/profile/");
  }

  if (!username) {
    return { error: "Profile not found." };
  }

  try {
    const response = await fetch(
      `${API_USER_PROFILE}${username}?_listings=true&_wins=true&_seller=true`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch profile");

    const result = await response.json();

    let bidsData = [];
    const bidsUrl = `${API_PROFILE_BIDS(username)}?_listings=true&_seller=true`;

    try {
      const bidsResponse = await fetch(bidsUrl, {
        method: "GET",
        headers: headers(),
      });

      if (bidsResponse.ok) {
        const bidsResult = await bidsResponse.json();
        bidsData = bidsResult.data || [];
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    }

    return {
      data: { ...result.data, bids: bidsData },
      isOwner: username === localStorage.getItem("username"),
    };
  } catch {
    return { error: "Error loading profile." };
  }
}
