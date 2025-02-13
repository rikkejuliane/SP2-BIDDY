
export const API_KEY = "c8279e85-ba08-4a23-a185-0b3f2f88c4dd";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_AUCTION = `${API_BASE}/auction`; // ✅ New base for auction-related routes
export const API_USER_PROFILE = `${API_AUCTION}/profiles/`;


export const API_LISTINGS = `${API_AUCTION}/listings`; // ✅ Fetch all listings
export const API_LISTING_SEARCH = `${API_LISTINGS}/search?q=`; // ✅ Search listings
export const API_LISTING_SINGLE = (id) => `${API_LISTINGS}/${id}`; // ✅ Fetch single listing
export const API_LISTINGS_BY_TAG = (tag) => `${API_LISTINGS}?_tag=${tag}`; // ✅ Filter by tag
export const API_LISTINGS_PAGINATED = (limit, page) => `${API_LISTINGS}?limit=${limit}&page=${page}`; // ✅ Pagination
