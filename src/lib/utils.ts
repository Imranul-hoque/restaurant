import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function DateFormat(date: Date) {
  const formated = format(new Date(date), "MMM dd, yyyy");
  return formated;
}