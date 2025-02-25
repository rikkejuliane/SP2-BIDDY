import { API_USER_PROFILE } from "../constants.js";
import { headers } from "../headers.js";
import { showOverlayModal } from "../../ui/global/modal.js";

/**
 * Opens the edit profile modal with pre-filled user data.
 * @param {Object} profileData - The current user profile data.
 */
export function openEditProfileModal(profileData) {
  const existingModal = document.getElementById("edit-profile-modal");
  if (existingModal) existingModal.remove();

  // ✅ Create modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "edit-profile-modal";
  modalOverlay.className = "fixed inset-0 flex justify-center items-center bg-[#9AA2D5] bg-opacity-50 z-[9999]";

  // ✅ Create modal content
  const modalContent = document.createElement("div");
  modalContent.className = "relative bg-white p-6 rounded-lg shadow-lg z-[10000] w-[350px] flex flex-col justify-center items-center max-h-[70vh] overflow-auto";

  // ✅ Create modal body wrapper (For proper centering)
  const modalBody = document.createElement("div");
  modalBody.className = "flex flex-col items-center text-center w-full";

  // ✅ Create heading
  const heading = document.createElement("h2");
  heading.className = "text-black font-serif text-[20px] font-bold";
  heading.textContent = "Edit Profile";

  // ✅ Create close button (❌) - Top right of modal
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "X";
  closeButton.className = "absolute top-4 right-4 text-charcoal-grey text-xl font-bold";
  closeButton.addEventListener("click", () => modalOverlay.remove());

  // ✅ Create the form
  const form = document.createElement("form");
  form.id = "edit-profile-form";
  form.className = "flex flex-col w-full mt-4 items-start";

  // ✅ Avatar Input
  const avatarLabel = document.createElement("label");
  avatarLabel.htmlFor = "avatar-url";
  avatarLabel.className = "text-black font-inter text-sm font-semibold mt-2";
  avatarLabel.textContent = "Avatar URL:";

  const avatarInput = document.createElement("input");
  avatarInput.id = "avatar-url";
  avatarInput.type = "url";
  avatarInput.name = "avatar";
  avatarInput.placeholder = "Enter avatar URL";
  avatarInput.value = profileData.avatar?.url || "";
  avatarInput.className = "mt-1 p-2 shadow-md rounded w-[302px] h-[35px] bg-lavender-blue bg-opacity-20 placeholder-charcoal-grey placeholder:font-inter placeholder:text-sm";

  // ✅ Banner Input
  const bannerLabel = document.createElement("label");
  bannerLabel.htmlFor = "banner-url";
  bannerLabel.className = "text-black font-inter text-sm font-semibold mt-3";
  bannerLabel.textContent = "Banner URL:";

  const bannerInput = document.createElement("input");
  bannerInput.id = "banner-url";
  bannerInput.type = "url";
  bannerInput.name = "banner";
  bannerInput.placeholder = "Enter banner URL";
  bannerInput.value = profileData.banner?.url || "";
  bannerInput.className = "mt-1 p-2 shadow-md rounded w-[302px] h-[35px] bg-lavender-blue bg-opacity-20 placeholder-charcoal-grey placeholder:font-inter placeholder:text-sm";

  // ✅ Bio Input
  const bioLabel = document.createElement("label");
  bioLabel.htmlFor = "bio";
  bioLabel.className = "text-black font-inter text-sm font-semibold mt-3";
  bioLabel.textContent = "Bio:";

  const bioInput = document.createElement("textarea");
  bioInput.id = "bio";
  bioInput.name = "bio";
  bioInput.placeholder = "Tell us about yourself...";
  bioInput.value = profileData.bio || "";
  bioInput.className = "mt-1 p-2 shadow-md rounded w-[302px] h-[80px] bg-lavender-blue bg-opacity-20 placeholder-charcoal-grey placeholder:font-inter placeholder:text-sm";

  // ✅ Save Button
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "mt-5 bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-[150px] h-[35px] flex items-center justify-center";
  saveButton.textContent = "Save";

  // ✅ Form Submit Event
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedProfile = {
      avatar: { url: avatarInput.value },
      banner: { url: bannerInput.value },
      bio: bioInput.value,
    };

    try {
      await updateProfile(profileData.name, updatedProfile);
      showOverlayModal("Profile updated successfully!");
      modalOverlay.remove();
      setTimeout(() => location.reload(), 1500); // Refresh after update
    } catch (error) {
      showOverlayModal("Failed to update profile.");
    }
  });

  // ✅ Append elements
  form.appendChild(avatarLabel);
  form.appendChild(avatarInput);
  form.appendChild(bannerLabel);
  form.appendChild(bannerInput);
  form.appendChild(bioLabel);
  form.appendChild(bioInput);
  form.appendChild(saveButton);
  
  modalBody.appendChild(heading);
  modalBody.appendChild(form);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalBody);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

/**
 * Updates user profile via API.
 *
 * @param {string} username - The user's username.
 * @param {Object} updatedData - The profile update data.
 * @returns {Promise<Object>} A promise resolving to the updated profile data.
 * @throws {Error} If the update fails.
 */
export async function updateProfile(username, updatedData) {
  const response = await fetch(`${API_USER_PROFILE}${username}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("❌ Failed to update profile.");
  }

  return response.json();
}
