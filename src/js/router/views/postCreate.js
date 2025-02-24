import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";
import { displayUserCredits } from "../../ui/auth/credits.js";
import { updateNavbar } from "../../ui/global/navbar.js";
import { setupLogoSwap } from "../../ui/global/logoHandler.js";

authGuard();
setLogoutListener();
displayUserCredits();
updateNavbar();
setupLogoSwap();

const form = document.forms.createPost;
form.addEventListener("submit", onCreatePost);
