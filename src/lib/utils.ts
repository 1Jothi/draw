import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLovableAppUrl(value: string) {
  try {
    const hostname = new URL(value, "https://local.invalid").hostname.toLowerCase();
    return hostname === "lovable.app" || hostname.endsWith(".lovable.app");
  } catch {
    return false;
  }
}
