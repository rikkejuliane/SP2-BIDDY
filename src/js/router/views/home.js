import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout.js";

authGuard();
setLogoutListener(); 