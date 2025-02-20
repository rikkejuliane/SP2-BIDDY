import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";
import { displayUserCredits } from "../../ui/auth/credits.js";
import { updateNavbar } from "../../ui/global/navbar.js";
import { setupLogoSwap } from "../../ui/global/logoHandler.js";
import { loadProfile } from "../../api/profile/loadProfile.js";
import { loadProfileListings } from "../../ui/profile/loadProfileListings.js"; 
import { openEditProfileModal } from "../../api/profile/update.js";
import { readProfile } from "../../api/profile/read.js";



authGuard();
setLogoutListener();
displayUserCredits();
updateNavbar();
setupLogoSwap();
loadProfile();
loadProfileListings(); // ✅ Fetch and display listings, wins, and bids


async function initProfilePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const profileUsername = urlParams.get("user") || localStorage.getItem("username");

  const { data: profileData, isOwner } = await readProfile(profileUsername);
  if (!profileData) {
    console.error("❌ Profile not found!");
    return;
  }

  // Prefill profile details
  document.getElementById("profile-avatar").src = profileData.avatar?.url || "/public/images/default-avatar.jpg";
  document.getElementById("profile-username").textContent = profileData.name || "Unknown";
  document.getElementById("profile-bio").textContent = profileData.bio || "No bio available";

  if (isOwner) {
    const editProfileButton = document.getElementById("edit-profile-btn");
    editProfileButton.addEventListener("click", () => openEditProfileModal(profileData));
  }
}

initProfilePage();
initProfilePage();