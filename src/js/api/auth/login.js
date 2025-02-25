import { API_AUTH_LOGIN } from "../constants.js";

/**
 * Authenticates a user by sending their email and password to the login API.
 *
 * @async
 * @function login
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The JSON response from the API upon successful login.
 * @throws {Error} If the login fails or the API returns an error response.
 */
export async function login({ email, password }) {
  const response = await fetch(API_AUTH_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(
      json.message || "Login failed. Please check your credentials."
    );
  }

  return json;
}
