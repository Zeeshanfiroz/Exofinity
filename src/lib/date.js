// src/lib/date.js
export function formatDate(dateStr) {
  if (!dateStr) return "Date TBA";

  const parsed = new Date(dateStr);
  // If it's not a real, parseable date (e.g. "TBA", "Coming soon"),
  // just show the original text instead of "Invalid Date".
  if (isNaN(parsed.getTime())) return dateStr;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}