import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date as a string
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('en-US', {
    ...options,
  }).format(new Date(date))
}

/**
 * Truncates a string with ellipsis
 * @param str String to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated string
 */
export function truncateString(str: string, maxLength: number = 30): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

/**
 * Formats a blockchain address with ellipsis in the middle
 * @param address Full blockchain address
 * @param chars Number of characters to show at start and end
 * @returns Formatted address
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address) return ''
  if (address.length <= chars * 2) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

/**
 * Delays execution for a specified time
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Generates a random numeric ID
 * @param length Length of the ID
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  return Math.random().toString().substring(2, 2 + length)
}

/**
 * Parses JWT token to get payload
 * @param token JWT token string
 * @returns Decoded token payload or null if invalid
 */
export function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}
