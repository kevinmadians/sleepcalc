/**
 * Sleep time calculation utilities for the Sleep Calculator app
 */
import { SLEEP_CYCLE_DURATION, FALLING_ASLEEP_TIME } from '@/constants/sleepCalculator';

/**
 * Calculates bedtimes based on a desired wake-up time
 * @param wakeUpTime Date object representing the desired wake-up time
 * @param numCycles Number of sleep cycles to calculate for (default: 4-6 cycles)
 * @returns Array of Date objects representing recommended bedtimes
 */
export function calculateBedtimes(
  wakeUpTime: Date, 
  numCycles: number[] = [6, 5, 4, 3]
): Date[] {
  const bedtimes: Date[] = [];
  
  for (const cycles of numCycles) {
    const bedtime = new Date(wakeUpTime.getTime());
    // Subtract sleep cycles + falling asleep time
    bedtime.setMinutes(
      bedtime.getMinutes() - (cycles * SLEEP_CYCLE_DURATION + FALLING_ASLEEP_TIME)
    );
    bedtimes.push(bedtime);
  }
  
  return bedtimes;
}

/**
 * Calculates wake-up times based on a given bedtime
 * @param bedtime Date object representing the bedtime
 * @param numCycles Number of sleep cycles to calculate for (default: 3-6 cycles)
 * @returns Array of Date objects representing recommended wake-up times
 */
export function calculateWakeUpTimes(
  bedtime: Date, 
  numCycles: number[] = [3, 4, 5, 6]
): Date[] {
  const wakeUpTimes: Date[] = [];
  
  for (const cycles of numCycles) {
    const wakeUpTime = new Date(bedtime.getTime());
    // Add falling asleep time + sleep cycles
    wakeUpTime.setMinutes(
      wakeUpTime.getMinutes() + FALLING_ASLEEP_TIME + (cycles * SLEEP_CYCLE_DURATION)
    );
    wakeUpTimes.push(wakeUpTime);
  }
  
  return wakeUpTimes;
}

/**
 * Calculates nap times (when to wake up) based on start time and duration
 * @param startTime Date object representing the start time of the nap
 * @param durationMinutes Nap duration in minutes
 * @param fallAsleepMinutes Time to fall asleep in minutes (default: 5 minutes)
 * @returns Object with sleep time and wake time as Date objects
 */
export function calculateNapTimes(
  startTime: Date,
  durationMinutes: number,
  fallAsleepMinutes: number = 5
): { sleepTime: Date; wakeTime: Date } {
  // Add time to fall asleep
  const sleepTime = new Date(startTime.getTime());
  sleepTime.setMinutes(sleepTime.getMinutes() + fallAsleepMinutes);
  
  // Calculate wake-up time
  const wakeTime = new Date(sleepTime.getTime());
  wakeTime.setMinutes(wakeTime.getMinutes() + durationMinutes);
  
  return { sleepTime, wakeTime };
} 