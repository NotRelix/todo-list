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

function formatEditTaskDate(date) {
  return format(date, "yyyy-MM-dd");
}

export {
  formatDateVeryShort,
  formatDateShort,
  formatDateLong,
  formatEditTaskDate
}