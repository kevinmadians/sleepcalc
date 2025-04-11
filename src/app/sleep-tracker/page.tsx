import type { Metadata } from "next";
import SleepTrackerContent from './SleepTrackerContent';

export const metadata: Metadata = {
  title: "Sleep Quality Tracker - Sleep Calculator",
  description: "Track your sleep quality, mood, and energy levels over time. Get personalized insights and recommendations to improve your sleep patterns.",
  keywords: "sleep quality tracker, sleep journal, sleep diary, sleep log, sleep monitoring, sleep pattern analysis, sleep quality visualization, sleep mood tracker, sleep energy tracker, sleep improvement tool, sleep analytics, sleep data visualization, sleep habit tracking, personalized sleep recommendations, sleep quality trends, sleep cycle monitoring, sleep efficiency tracking, sleep consistency tracker, sleep health monitoring, sleep quality metrics",
  openGraph: {
    title: "Sleep Quality Tracker - Sleep Calculator",
    description: "Track your sleep quality, mood, and energy levels over time. Get personalized insights and recommendations to improve your sleep patterns.",
    url: "https://sleepcalc.net/sleep-tracker",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "https://sleepcalc.net/og-image.jpg",
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
    description: "Track your sleep quality, mood, and energy levels over time. Get personalized insights and recommendations to improve your sleep patterns.",
    images: ["https://sleepcalc.net/og-image.jpg"],
  }
};

export default function SleepTracker() {
  // JSON-LD schema for SEO
  const sleepTrackerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sleep Quality Tracker",
    "description": "Track your sleep quality, mood, and energy levels over time. Get personalized insights and recommendations to improve your sleep patterns.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Sleep Calculator Sleep Quality Tracker",
      "applicationCategory": "HealthApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "keywords": "sleep quality tracker, sleep journal, sleep diary, sleep log, sleep monitoring, sleep pattern analysis, sleep quality visualization, sleep mood tracker, sleep energy tracker, sleep improvement tool, sleep analytics, sleep data visualization, sleep habit tracking, personalized sleep recommendations, sleep quality trends, sleep cycle monitoring, sleep efficiency tracking, sleep consistency tracker, sleep health monitoring, sleep quality metrics"
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sleepTrackerSchema) }}
      />
      <SleepTrackerContent />
    </>
  );
} 