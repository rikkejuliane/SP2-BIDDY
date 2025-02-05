import { onRegister } from "../../ui/auth/register.js";
import { onLogin } from "../../ui/auth/login.js";

/**
 * Handles the login form submission event.
 *
 * @listens submit - Listens for the form's `submit` event.
 * @param {Event} event - The event object triggered by the form submission.
 */
const form = document.getElementById("login-form"); // ✅ Updated to use ID
const loginButton = document.getElementById("sign-in-button");

if (form && loginButton) {
  loginButton.addEventListener("click", async (event) => {
    console.log("✅ Login button clicked!"); // 🔥 Debugging log

    event.preventDefault();
    loginButton.disabled = true;

    try {
      await onLogin(event);
    } finally {
      loginButton.disabled = false;
    }
  });
} else {
  console.error("⚠️ Login form or button not found. Check your HTML.");
}



// Find the register form and attach event listener
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", onRegister);
}

/**
 * Toggle login/register with overlays
 * Handles toggling between the login and registration views.
 * Adds or removes the `right-panel-active` class to animate the overlay and forms.
 */
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



