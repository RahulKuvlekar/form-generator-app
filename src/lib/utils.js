import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateRandomNumber = () =>
  Math.floor(1000 + Math.random() * 9000);
