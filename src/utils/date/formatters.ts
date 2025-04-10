/**
 * Date formatting utilities for the Sleep Calculator app
 */

/**
 * Formats a date to display time in 12-hour format with AM/PM
 * @param date Date object to format
 * @returns Formatted time string (e.g., "10:30 PM")
 */
export function formatTimeAmPm(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

/**
 * Formats a date to display time in 24-hour format
 * @param date Date object to format
 * @returns Formatted time string (e.g., "22:30")
 */
export function formatTime24Hours(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Parses a time string in "HH:MM" format
 * @param timeString Time string in "HH:MM" format
 * @returns Date object set to the specified time (today's date)
 */
export function parseTimeString(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/**
 * Parses a time string in "HH:MM AM/PM" format
 * @param timeString Time string in "HH:MM AM/PM" format (e.g., "10:30 PM")
 * @returns Date object set to the specified time (today's date)
 */
export function parseAmPmTimeString(timeString: string): Date | null {
  const match = timeString.match(/(\d+):(\d+)\s+(AM|PM)/i);
  if (!match) return null;
  
  let [_, hoursStr, minutesStr, ampm] = match;
  let hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);
  
  // Convert 12-hour format to 24-hour
  if (ampm.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  } else if (ampm.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }
  
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
} 