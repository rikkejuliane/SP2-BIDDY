import { readProfile } from "./read.js";

/**
 * Loads and displays the user's profile information.
 * Fetches data from the API and updates the UI accordingly.
 */
export async function loadProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user");

  const {
    data: profileData,
    isOwner,
    error,
  } = await readProfile(profileUsername);

  if (error) {
    document.getElementById(
      "profile-info"
    ).innerHTML = `<p class='text-red-600'>${error}</p>`;
    return;
  }

  updateProfileUI(profileData, isOwner);
}

/**
 * Updates the profile UI elements with the fetched profile data.
 *
 * @param {Object} profile - The profile data retrieved from the API.
 * @param {boolean} isOwner - Indicates whether the logged-in user is viewing their own profile.
 */
function updateProfileUI(profile, isOwner) {
  const bannerElement = document.getElementById("banner-image");
  const avatarElement = document.getElementById("profile-avatar");
  const usernameElement = document.getElementById("profile-username");
  const bioElement = document.getElementById("profile-bio");
  const editButton = document.getElementById("edit-profile-btn");
  const welcomeMessage = document.getElementById("welcome-message");

  // Banner
  bannerElement.style.backgroundImage = `url('${
    profile.banner?.url || "/public/images/default-banner.jpg"
  }')`;
  bannerElement.style.backgroundSize = "cover";
  bannerElement.style.backgroundPosition = "center";

  // Avatar
  avatarElement.src =
    profile.avatar?.url || "/public/images/default-avatar.png";

  // Username & bio
  usernameElement.textContent = profile.name;
  bioElement.textContent = profile.bio || "This user has no bio.";

  editButton.classList.toggle("hidden", !isOwner);
  welcomeMessage.classList.toggle("hidden", !isOwner);
  updateProfileStats(profile);
}

/**
 * Updates the profile statistics (listings, wins, bids).
 *
 * @param {Object} profile - The profile data containing statistics.
 */
function updateProfileStats(profile) {
  document.getElementById("listings-count").textContent = `Listings: ${
    profile._count.listings || 0
  }`;
  document.getElementById("wins-count").textContent = `Wins: ${
    profile._count.wins || 0
  }`;

  const bidCount = profile.bids ? profile.bids.length : 0;
  document.getElementById("bids-count").textContent = `Bids: ${bidCount}`;
}
