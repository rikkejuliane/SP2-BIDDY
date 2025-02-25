import { register } from "../../api/auth/register.js";
import { createLoadingSpinner } from "../global/loadingSpinner.js";
import { showOverlayModal, showActionModal } from "../global/modal.js";

/**
 * Handles the user registration process by sending user data to the API.
 * Displays a success modal if registration is successful or an error modal otherwise.
 *
 * @async
 * @param {Event} event - The form submission event.
 */
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const name = form["name-register"].value.trim();
  const email = form["email-register"].value.trim();
  const password = form["password-register"].value.trim();
  const button = form.querySelector("button");
  const spinnerContainer = document.getElementById(
    "spinner-container-register"
  );
  const spinner = createLoadingSpinner();

  button.disabled = true;
  spinnerContainer.appendChild(spinner);
  spinner.classList.remove("hidden");

  try {
    await register({ name, email, password });
    showOverlayModal("Registration successful!");
  } catch (error) {
    let errorMessage =
      error.message || "Registration failed. Please try again.";
    showActionModal(errorMessage, [
      {
        text: "Ok",
        className:
          "mt-4 bg-royal-blue text-white text-lg font-serif font-bold p-2 rounded w-[100px] h-[30px] flex items-center justify-center",
      },
    ]);
  } finally {
    spinner.remove();
    button.disabled = false;
  }
}
