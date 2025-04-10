// Sleep calculator constants

export const SLEEP_CYCLE_DURATION = 90; // minutes
export const FALLING_ASLEEP_TIME = 15; // minutes
export const RECOMMENDED_CYCLES = [5, 6]; // 5 or 6 cycles is recommended (7.5-9 hours)

// Sleep cycle stages information
export const sleepCycleStages = [
  {
    name: "NREM Stage 1",
    duration: "1-5 minutes",
    description: "Light sleep, easily awakened, muscles relax, may experience sudden muscle jerks",
  },
  {
    name: "NREM Stage 2",
    duration: "10-25 minutes",
    description: "Body temperature drops, heart rate slows, brain prepares for deep sleep",
  },
  {
    name: "NREM Stage 3",
    duration: "20-40 minutes",
    description: "Deep sleep, difficult to wake, body repairs tissues, builds bone and muscle, strengthens immune system",
  },
  {
    name: "REM Sleep",
    duration: "10-60 minutes",
    description: "Brain is active, vivid dreams occur, body is paralyzed, crucial for cognitive functions and memory consolidation",
  },
];

// Sleep health benefits
export const sleepHealthBenefits = [
  {
    title: "Improves Memory",
    description: "During sleep, your brain processes and consolidates memories from the day.",
    icon: "🧠"
  },
  {
    title: "Enhances Mood",
    description: "Quality sleep helps regulate emotions and reduce anxiety and irritability.",
    icon: "😊"
  },
  {
    title: "Boosts Immunity",
    description: "Your immune system produces protective cytokines and antibodies during sleep.",
    icon: "🛡️"
  },
  {
    title: "Helps Weight Management",
    description: "Poor sleep disrupts hormones that regulate hunger, potentially leading to weight gain.",
    icon: "⚖️"
  },
  {
    title: "Improves Physical Performance",
    description: "Sleep enhances athletic performance, coordination, and reaction time.",
    icon: "💪"
  },
  {
    title: "Reduces Stress",
    description: "Quality sleep helps lower stress hormones and manage blood pressure.",
    icon: "🧘"
  }
]; 