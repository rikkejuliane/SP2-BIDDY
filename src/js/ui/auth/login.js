import { login } from "../../api/auth/login.js";
import { createLoadingSpinner } from "../global/loadingSpinner.js";
import { showOverlayModal, showActionModal } from "../global/modal.js";

/**
 * Handles the login process by passing user credentials to the login API
 * and storing the token if successful.
 *
 * @async
 * @param {Event} event - The form submission event.
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = document.getElementById("login-form");
  if (!form) return console.error("⚠️ Login form not found.");

  const emailInput = form.querySelector("#email-login");
  const passwordInput = form.querySelector("#password-login");

  if (!emailInput || !passwordInput)
    return console.error("⚠️ Email or password field missing.");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email) {
    return showInlineError(emailInput, "Please enter your email address.");
  }
  if (!password) {
    return showInlineError(passwordInput, "Please enter your password.");
  }
  if (!email.includes("@")) {
    return showInlineError(emailInput, "Please enter a valid email address.");
  }

  const button = form.querySelector("button");
  const spinnerContainer = document.getElementById("spinner-container-login");
  const spinner = createLoadingSpinner();

  try {
    button.disabled = true;
    spinnerContainer.appendChild(spinner);
    spinner.classList.remove("hidden");

    const apiResponse = await login({ email, password });

    localStorage.setItem("token", apiResponse.data.accessToken);
    localStorage.setItem(
      "username",
      apiResponse.data?.name || apiResponse.name
    );

    showOverlayModal("Login successful!");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    console.error("Login failed:", error);

    let errorMessage = "Login failed. Please try again.";
    if (error.message) {
      errorMessage = error.message;
    } else if (
      error.errors &&
      error.errors.length > 0 &&
      error.errors[0].message
    ) {
      errorMessage = error.errors[0].message;
    }

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

/**
 * Displays an inline error message under an input field.
 *
 * @param {HTMLElement} inputElement - The input field where the error should be displayed.
 * @param {string} message - The error message to show.
 */
function showInlineError(inputElement, message) {
  let errorElement = inputElement.nextElementSibling;

  if (!errorElement || !errorElement.classList.contains("input-error")) {
    errorElement = document.createElement("p");
    errorElement.className = "input-error text-red-500 text-sm mt-1";
    inputElement.after(errorElement);
  }

  errorElement.textContent = message;
}
