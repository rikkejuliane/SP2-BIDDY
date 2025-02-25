import { API_KEY } from "./constants";

/**
 * Generates HTTP headers for API requests.
 *
 * @param {Object} [options] - Configuration options for headers.
 * @param {boolean} [options.apiKey=true] - Whether to include the API key.
 * @param {boolean} [options.authToken=true] - Whether to include the auth token.
 * @param {boolean} [options.contentType=true] - Whether to include the Content-Type header.
 * @returns {Headers} A Headers object with the appropriate settings.
 */
export function headers({
  apiKey = true,
  authToken = true,
  contentType = true,
} = {}) {
  const headers = new Headers();

  if (apiKey) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }
  if (authToken) {
    const token = localStorage.getItem("token");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
  }
  if (contentType) {
    headers.append("Content-Type", "application/json");
  }
  return headers;
}
