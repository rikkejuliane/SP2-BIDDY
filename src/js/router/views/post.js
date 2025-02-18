import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";
import { displayUserCredits } from "../../ui/auth/credits.js";
import { updateNavbar } from "../../ui/global/navbar.js";
import { setupLogoSwap } from "../../ui/global/logoHandler.js";
import { loadSingleListing } from "../../api/post/loadSingleListing.js";

authGuard();
setLogoutListener();
displayUserCredits();
updateNavbar();
setupLogoSwap();
loadSingleListing();


