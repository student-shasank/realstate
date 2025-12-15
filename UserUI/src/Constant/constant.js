// Base API URL
export const BASE_URL = "http://localhost:5000/api/user";

// -----------------------
// Auth Endpoints
// -----------------------
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const SIGNUP_URL = `${BASE_URL}/auth/signup`;

// -----------------------
// Admin Endpoints
// -----------------------
export const ADMIN_DASHBOARD_URL = `${BASE_URL}/admin/dashboard`;
export const ADMIN_LISTINGS_URL = `${BASE_URL}/admin/listing`;
export const ADMIN_LISTING_STATUS_URL = (id) => `${BASE_URL}/admin/listings/${id}/status`;
export const ADMIN_LISTING_AVAILABILITY_URL = (id) =>
  `${BASE_URL}/admin/listings/${id}/availability`;



export const fetchListingsAPI  = `${BASE_URL}/show/listings`;