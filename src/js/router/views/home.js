import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";
import { displayUserCredits } from "../../ui/auth/credits.js";
import { updateNavbar } from "../../ui/global/navbar.js";
import { setupLogoSwap } from "../../ui/global/logoHandler.js";
import { loadListings } from "../../ui/post/loadListings.js";
import { setupSearch } from "../../ui/post/search.js";
import { createLoadingSpinner } from "../../ui/global/loadingSpinner.js";
import { setupTagFilters } from "../../ui/post/tagFilter.js"; 



const username = localStorage.getItem("username");
console.log("Retrieved username:", username);

authGuard();
setLogoutListener();
displayUserCredits();
updateNavbar();
setupLogoSwap();

const listingsContainer = document.getElementById("listings-container");

if (listingsContainer) {
  console.log("✅ Listings container found!");

  // ✅ Add and show the spinner
  const spinner = createLoadingSpinner();
  listingsContainer.appendChild(spinner);
  spinner.classList.remove("hidden"); // ✅ Ensure it's visible
  console.log("⏳ Spinner added inside listings container");

  // ✅ Load listings & hide spinner when done
  loadListings().finally(() => {
    spinner.classList.add("hidden"); // ✅ Hide spinner when done
    console.log("✅ Spinner hidden after loading listings.");
  });
}

// ✅ Initialize search AFTER the listings are loaded
setupSearch();
setupTagFilters()
