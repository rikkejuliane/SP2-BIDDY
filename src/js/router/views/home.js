import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";
import { displayUserCredits } from "../../ui/auth/credits.js";

const username = localStorage.getItem("username");
console.log("Retrieved username:", username);


authGuard();
setLogoutListener(); 
displayUserCredits();