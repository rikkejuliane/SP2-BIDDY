import { API_AUTH_REGISTER } from "../constants.js";

/**
 * Registers a new user by sending a POST request to the API.
 * @param {Object} data - The registration data.
 * @returns {Promise<Object>} Resolves with the registration response.
 * @throws {Error} If the request fails.
 */
export async function register({ name, email, password }) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      let errorMessage = json.errors?.[0]?.message || json.error || json.message || "Registration failed";
      throw new Error(errorMessage);
    }

    return json;
  } catch (error) {
    throw error;
  }
}
