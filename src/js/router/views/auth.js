import { onRegister } from "../../ui/auth/register.js";


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



