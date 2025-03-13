import { format } from "date-fns";

function formatDateVeryShort(date) {
  return format(date, "MMM dd");
}

function formatDateShort(date) {
  return format(date, "MMMM dd");
}

function formatDateLong(date) {
  return format(date, "MMMM dd, yyyy");
}

export {
  formatDateVeryShort,
  formatDateShort,
  formatDateLong,
}