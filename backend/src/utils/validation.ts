import {
  CLOSED_DAYS,
  CLOSING_HOUR,
  HOLIDAYS,
  OPENING_HOUR,
} from "./constants.ts";

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidDate(ts: number): boolean {
  const date = new Date(ts);
  return !isNaN(date.getTime());
}

export function isValidDateOnly(input: string): boolean {
  if (!input || typeof input !== "string") return false;

  if (!/^\d{2,4}-\d{2}-\d{2}$/.test(input)) {
    return false;
  }

  const parts = input.split("-");

  if (parts[0].length === 4) {
    const [yyyy, mm, dd] = parts.map(Number);
    return isRealDate(yyyy, mm, dd);
  }

  if (parts[2].length === 4 && Number(parts[0]) > 12) {
    const [dd, mm, yyyy] = parts.map(Number);
    return isRealDate(yyyy, mm, dd);
  }

  if (parts[2].length === 4 && Number(parts[1]) > 12) {
    const [mm, dd, yyyy] = parts.map(Number);
    return isRealDate(yyyy, mm, dd);
  }

  return false;
}

export function isValidTimestamp(ts: number): boolean {
  return typeof ts === "number" && !isNaN(ts) && ts > 0;
}

export function isFutureTimestamp(ts: number): boolean {
  return ts > Date.now();
}

export function isWithinOpeningHours(dateStr: number): boolean {
  const date = new Date(dateStr);
  const hours = date.getHours();
  return hours >= OPENING_HOUR && hours < CLOSING_HOUR;
}

export function isSunday(ts: number): boolean {
  const date = new Date(ts);
  const dayOfWeek = date.getDay();
  return CLOSED_DAYS.includes(dayOfWeek);
}

export function isHoliday(ts: number): boolean {
  const date = new Date(ts);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const monthDay = `${month}-${day}`;

  return HOLIDAYS.includes(monthDay);
}

function isRealDate(y: number, m: number, d: number): boolean {
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;

  const date = new Date(
    `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
  );

  return (
    date.getFullYear() === y &&
    date.getMonth() + 1 === m &&
    date.getDate() === d
  );
}
