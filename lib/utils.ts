import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateTime: string) {
  // format datetime received in the form "2023-11-02 08:25:03.289686 +0000 UTC" to "11-02-2023, 4:25 PM"
  const date = new Date(dateTime)
  const month = date.getMonth() + 1
  let day:string | number = date.getDate()
  day = day < 10 ? `0${day}` : day
  const year = date.getFullYear()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 || 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  return `${month}-${day}-${year}, ${formattedHour}:${formattedMinutes} ${ampm}`
}