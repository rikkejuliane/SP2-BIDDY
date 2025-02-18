import { readProfile } from "./read.js";

export async function loadProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user"); // Get user from URL

  const { data: profileData, isOwner, error } = await readProfile(profileUsername); // ✅ Fetch profile

  if (error) {
    document.getElementById("profile-info").innerHTML = `<p class='text-red-600'>${error}</p>`;
    return;
  }

  updateProfileUI(profileData, isOwner); // ✅ Update UI
}

function updateProfileUI(profile, isOwner) {
  const bannerElement = document.getElementById("banner-image");
  const avatarElement = document.getElementById("profile-avatar");
  const usernameElement = document.getElementById("profile-username");
  const bioElement = document.getElementById("profile-bio");
  const editButton = document.getElementById("edit-profile-btn"); // ✅ Select by ID now

  // ✅ Set banner (fallback to default)
  bannerElement.style.backgroundImage = `url('${profile.banner?.url || "/public/images/default-banner.jpg"}')`;
  bannerElement.style.backgroundSize = "cover";
  bannerElement.style.backgroundPosition = "center";

  // ✅ Set avatar
  avatarElement.src = profile.avatar?.url || "/public/images/default-avatar.jpg";

  // ✅ Set username & bio
  usernameElement.textContent = profile.name;
  bioElement.textContent = profile.bio || "This user has no bio.";

  // ✅ Show "Edit Profile" button only if it's the logged-in user's profile
  editButton.classList.toggle("hidden", !isOwner);

  // ✅ Update stats dynamically
  updateProfileStats(profile);
}

function updateProfileStats(profile) {
  document.getElementById("listings-count").textContent = `Listings: ${profile._count.listings || 0}`;
  document.getElementById("wins-count").textContent = `Wins: ${profile._count.wins || 0}`;
  
  // ✅ Count bids manually (since _count.bids doesn't exist)
  const bidCount = profile.bids ? profile.bids.length : 0;
  document.getElementById("bids-count").textContent = `Bids: ${bidCount}`;
}

