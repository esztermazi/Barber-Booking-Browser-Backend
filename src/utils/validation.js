import {
  CLOSED_DAYS,
  CLOSING_HOUR,
  HOLIDAYS,
  OPENING_HOUR,
} from "./constants.js";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidDate(dateStr) {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

export function isFutureDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  return date > now;
}

export function isWithinOpeningHours(dateStr) {
  const date = new Date(dateStr);
  const hours = date.getHours();
  return hours >= OPENING_HOUR && hours < CLOSING_HOUR;
}

export function isSunday(dateStr) {
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();
  return CLOSED_DAYS.includes(dayOfWeek);
}

export function isHoliday(dateStr) {
  const date = new Date(dateStr);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const monthDay = `${month}-${day}`;

  return HOLIDAYS.includes(monthDay);
}
