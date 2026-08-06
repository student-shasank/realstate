// src/Components/utils/formatCurrency.js

/**
 * Formats a number using Dubai/UAE-standard digit grouping (1,234,567)
 * regardless of the visitor's browser locale.
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  if (isNaN(num)) return null;
  return num.toLocaleString("en-AE"); // international grouping, not Indian
};

/**
 * Formats a full currency string, e.g. formatCurrency(1000239, "AED")
 * -> "AED 1,000,239"
 */
export const formatCurrency = (value, currency = "AED") => {
  const formatted = formatNumber(value);
  if (formatted === null) return "—";
  return `${currency?.toUpperCase() || "AED"} ${formatted}`;
};