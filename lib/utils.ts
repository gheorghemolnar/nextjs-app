import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSiteId(id: number) {
  return `${id}`.padStart(2, "0")
}

export function formatDate(dateInput: string) {
  const date = new Date(dateInput)

  if (!date) return "--"

  return `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`
}
