import { format } from "date-fns";

function formatDateShort(date) {
  return format(date, "MMM dd");
}

function formatDateLong(date) {
  return format(date, "MMMM dd, yyyy");
}

export {
  formatDateShort,
  formatDateLong,
}