import { clsx } from "clsx";
import { SQLiteBlobJsonBuilder } from "drizzle-orm/sqlite-core";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

