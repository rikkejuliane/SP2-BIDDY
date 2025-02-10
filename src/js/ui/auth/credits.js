import { API_USER_PROFILE } from "../../api/constants.js";
import { headers } from "../../api/headers.js"; 

export async function displayUserCredits() {
    const username = localStorage.getItem("username");
    if (!username) return; // ✅ No user logged in, exit early

    const creditElement = document.getElementById("user-credits");
    if (!creditElement) return; // ✅ Avoid errors if the element isn't found

    try {
        const response = await fetch(`${API_USER_PROFILE}${username}`, {
            method: "GET",
            headers: headers(),
        });
        if (!response.ok) throw new Error("Failed to fetch credits");
        
        const { data } = await response.json();
        const credits = data.credits;

        // ✅ Keep "Credits:" and make the amount blue
        creditElement.innerHTML = `Credits: <span class="text-royal-blue">$${credits}</span>`;
    } catch (error) {
        console.error("Error fetching user credits:", error);
    }
}


