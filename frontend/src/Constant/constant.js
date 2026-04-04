// Base API URL
export const BASE_URL = "http://localhost:5000/api";

// -----------------------
// Auth Endpoints
// -----------------------
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const SIGNUP_URL = `${BASE_URL}/auth/signup`;

// -----------------------
// Admin Endpoints
// -----------------------
export const ADMIN_DASHBOARD_URL = `${BASE_URL}/admin/dashboard`;
export const ADMIN_LISTINGS_URL = `${BASE_URL}/admin/listings`;
export const ADMIN_LISTING_STATUS_URL = (id) => `${BASE_URL}/admin/listings/${id}/status`;
export const ADMIN_LISTING_AVAILABILITY_URL = (id) =>
  `${BASE_URL}/admin/listings/${id}/availability`;

export const ADMIN_Communities = `${BASE_URL}/admin/communities`;
export const ADMIN_LISTING_FEATURED_URL = (id) =>
  `${BASE_URL}/admin/listings/${id}/featured`;

export const SELLER_LEADS_API = `${BASE_URL}/admin/seller-leads`;

export const APPROVE_SELLER_LEAD_API = (id) =>
  `${BASE_URL}/admin/seller-leads/${id}/approve`;

export const REJECT_SELLER_LEAD_API = (id) =>
  `${BASE_URL}/admin/seller-leads/${id}/reject`;

