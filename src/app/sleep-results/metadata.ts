import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Results - Sleep Calculator",
  description: "View your personalized sleep cycle calculation results. Find optimal bedtimes and wake-up times based on 90-minute sleep cycles for better rest and increased energy.",
  keywords: "sleep cycle results, best time to sleep, optimal wake up time, 90 minute sleep cycle, sleep calculator results, bedtime calculator, REM sleep optimization, sleep cycle times, sleep cycle chart, best sleep schedule, personalized sleep times, sleep recommendations, sleep quality optimization, circadian rhythm calculator",
  alternates: {
    canonical: 'https://sleepcalc.net/sleep-results'
  },
  openGraph: {
    title: "Sleep Results - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "View your personalized sleep cycle calculation results. Find optimal bedtimes and wake-up times based on 90-minute sleep cycles for better rest and increased energy.",
    url: "https://sleepcalc.net/sleep-results",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Sleep Cycle Results"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Results - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "View your personalized sleep cycle calculation results. Find optimal bedtimes and wake-up times based on 90-minute sleep cycles.",
    images: ["/twitter-image.png"],
  }
}; 