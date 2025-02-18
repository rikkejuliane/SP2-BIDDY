import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";
import { displayUserCredits } from "../../ui/auth/credits.js";
import { updateNavbar } from "../../ui/global/navbar.js";
import { setupLogoSwap } from "../../ui/global/logoHandler.js";
import { loadProfile } from "../../api/profile/loadProfile.js";
import { loadProfileListings } from "../../ui/profile/loadProfileListings.js"; 



authGuard();
setLogoutListener();
displayUserCredits();
updateNavbar();
setupLogoSwap();
loadProfile();
loadProfileListings(); // ✅ Fetch and display listings, wins, and bids


