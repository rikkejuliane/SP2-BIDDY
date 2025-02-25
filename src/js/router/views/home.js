import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";
import { displayUserCredits } from "../../ui/auth/credits.js";
import { updateNavbar } from "../../ui/global/navbar.js";
import { setupLogoSwap } from "../../ui/global/logoHandler.js";
import { loadListings } from "../../ui/post/loadListings.js";
import { setupSearch } from "../../ui/post/search.js";
import { createLoadingSpinner } from "../../ui/global/loadingSpinner.js";

authGuard();
setLogoutListener();
displayUserCredits();
updateNavbar();
setupLogoSwap();

const listingsContainer = document.getElementById("listings-container");

if (listingsContainer) {
  const spinner = createLoadingSpinner();
  listingsContainer.appendChild(spinner);
  spinner.classList.remove("hidden");

  loadListings().finally(() => {
    spinner.classList.add("hidden");
  });
}

setupSearch();
