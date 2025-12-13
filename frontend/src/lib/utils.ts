import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toLocalYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

export const HOLIDAYS = [
  "01-01",
  "03-15",
  "05-01",
  "08-20",
  "10-23",
  "11-01",
  "12-24",
  "12-25",
  "12-26",
];

export function isHoliday(date: Date): boolean {
  const mmdd = toLocalYMD(date).slice(5);
  return HOLIDAYS.includes(mmdd);
}
