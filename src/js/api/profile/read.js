import { API_USER_PROFILE, API_PROFILE_BIDS } from "../constants.js"; // ✅ Import API routes
import { headers } from "../headers.js";

export async function readProfile(username) {
  if (!username) {
    username = localStorage.getItem("username"); // ✅ Default to logged-in user
    window.history.replaceState(null, "", "/profile/");
  }

  if (!username) {
    console.error("❌ No username found for profile!");
    return { error: "Profile not found." };
  }

  console.log("🔍 Fetching profile for:", username);

  try {
    // ✅ Fetch Profile Data (including listings, wins & seller info)
    const response = await fetch(`${API_USER_PROFILE}${username}?_listings=true&_wins=true&_seller=true`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) throw new Error("Failed to fetch profile");

    const result = await response.json();
    console.log("📦 API Response Data:", result); // ✅ Log full profile response

    // ✅ Fetch Bids Separately (Ensure it includes `_listings` & `_seller`)
    let bidsData = [];
    const bidsUrl = `${API_PROFILE_BIDS(username)}?_listings=true&_seller=true`;
    console.log("🔗 Fetching bids from:", bidsUrl); // ✅ Check if URL is correct

    try {
      const bidsResponse = await fetch(bidsUrl, { 
        method: "GET", 
        headers: headers() 
      });

      if (bidsResponse.ok) {
        const bidsResult = await bidsResponse.json();
        bidsData = bidsResult.data || []; // ✅ Store bids data
        console.log("📦 Bids API Response:", bidsResult); // ✅ Log bids response
      } else {
        console.warn("⚠️ Failed to fetch bids, API response:", bidsResponse.status);
      }
    } catch (bidError) {
      console.warn("⚠️ Error fetching bids:", bidError);
    }

    return { 
      data: { ...result.data, bids: bidsData }, // ✅ Include bids in return data
      isOwner: username === localStorage.getItem("username")
    };

  } catch (error) {
    console.error("❌ Error reading profile:", error);
    return { error: "Error loading profile." };
  }
}



export async function readProfiles(limit, page) {}
