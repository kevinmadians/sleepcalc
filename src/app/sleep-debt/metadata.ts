import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Debt Calculator - Sleep Calculator",
  description: "Calculate your sleep debt to understand how much sleep you're missing and learn how to recover. Track your sleep patterns and improve your sleep health.",
  keywords: "sleep debt calculator, sleep deficit calculator, sleep debt tracker, how much sleep do I need, sleep debt recovery, chronic sleep deprivation, cumulative sleep debt, weekly sleep debt, sleep debt health effects, optimal sleep duration, sleep pattern analysis, catch up on sleep, sleep banking, recover from sleep debt, sleep loss calculator, sleep balance calculator",
  openGraph: {
    title: "Sleep Debt Calculator - Sleep Calculator",
    description: "Calculate your sleep debt to understand how much sleep you're missing and learn how to recover. Track your sleep patterns and improve your sleep health.",
    url: "https://sleepcalc.net/sleep-debt",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Sleep Debt Calculator"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Debt Calculator - Sleep Calculator",
    description: "Calculate your sleep debt to understand how much sleep you're missing and learn how to recover. Track your sleep patterns and improve your sleep health.",
    images: ["/twitter-image.png"],
  }
}; 