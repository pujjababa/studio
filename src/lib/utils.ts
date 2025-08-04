import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a Date object into the specific ISO 8601 format required by the Prokerala API.
 * The format is YYYY-MM-DDTHH:MM:SSZ, e.g., 2024-07-26T10:00:00+05:30.
 * @param date The date to format.
 * @returns A string representing the formatted date.
 */
export function getFormattedProkeralaDate(date: Date): string {
  const pad = (num: number) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const timezoneOffset = -date.getTimezoneOffset();
  const offsetSign = timezoneOffset >= 0 ? '+' : '-';
  const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
  const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);
  
  const timezoneString = `${offsetSign}${offsetHours}:${offsetMinutes}`;
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneString}`;
}
