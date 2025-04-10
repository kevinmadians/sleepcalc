// Nap calculator constants

// Define nap durations and their benefits
export const napDurations = [
  {
    id: "power",
    name: "Power Nap",
    duration: "10-20 min",
    benefits: "Quick alertness boost without grogginess",
    icon: "⚡",
    description: "A power nap is perfect for a quick energy boost. It keeps you in the lighter stages of sleep, helping you wake up feeling alert rather than groggy.",
    durationMinutes: 20
  },
  {
    id: "refresh",
    name: "Refresh Nap",
    duration: "30-60 min",
    benefits: "Memory and cognitive enhancement",
    icon: "🧠",
    description: "This longer nap includes some deeper sleep, helping with memory consolidation and cognitive processing. May cause some sleep inertia upon waking.",
    durationMinutes: 45
  },
  {
    id: "full",
    name: "Full Cycle",
    duration: "90 min",
    benefits: "Complete rejuvenation with REM sleep",
    icon: "🌀",
    description: "A 90-minute nap allows you to complete one full sleep cycle, including REM sleep. This helps with creativity, emotional processing, and physical recovery.",
    durationMinutes: 90
  }
];

// Best times for napping
export const bestNapTimes = [
  {
    timeRange: "1:00 - 3:00 PM",
    description: "Post-lunch dip in alertness makes this an ideal time for most people to nap."
  },
  {
    timeRange: "5:00 - 7:00 PM",
    description: "Early evening can work well if it's at least 3 hours before your bedtime."
  }
];

// Constants used in the NapCalculator component
export const POWER_NAP = 20; // minutes
export const SHORT_NAP = 30; // minutes
export const RECOVERY_NAP = 60; // minutes
export const FULL_CYCLE_NAP = 90; // minutes 