import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Quality Tracker - Sleep Calculator",
  description: "Track your sleep quality, mood, and energy levels over time. Get personalized insights and recommendations to improve your sleep patterns. Explore sleep health insights and compare your sleep statistics with global averages.",
  keywords: "sleep quality tracker, sleep journal, sleep diary, sleep log, sleep monitoring, sleep pattern analysis, sleep quality visualization, sleep mood tracker, sleep energy tracker, sleep improvement tool, sleep analytics, sleep data visualization, sleep habit tracking, personalized sleep recommendations, sleep quality trends, sleep cycle monitoring, sleep efficiency tracking, sleep consistency tracker, sleep health monitoring, sleep quality metrics, sleep statistics, sleep health insights",
  openGraph: {
    title: "Sleep Quality Tracker - Sleep Calculator",
    description: "Track your sleep quality, mood, and energy levels over time. Get personalized insights and recommendations to improve your sleep patterns. Explore sleep health insights and compare your sleep statistics with global averages.",
    url: "https://sleepcalc.net/sleep-tracker",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Sleep Quality Tracker"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Quality Tracker - Sleep Calculator",
    description: "Track your sleep quality, mood, and energy levels over time. Get personalized insights and recommendations to improve your sleep patterns. Explore sleep health insights and compare your sleep statistics with global averages.",
    images: ["/twitter-image.png"],
  }
}; 