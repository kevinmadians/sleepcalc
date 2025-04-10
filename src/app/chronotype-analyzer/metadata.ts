import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chronotype Analyzer - Sleep Calculator",
  description: "Discover your chronotype (sleep personality) with our free chronotype quiz. Learn if you're a bear, wolf, lion, or dolphin and optimize your sleep schedule accordingly.",
  keywords: "chronotype quiz, sleep chronotype, chronotype test, what is my chronotype, sleep personality test, sleep type quiz, am I a morning person, night owl test, bear chronotype, wolf chronotype, lion chronotype, dolphin chronotype, sleep-wake patterns, circadian type, best sleep schedule, chronobiology test",
  alternates: {
    canonical: 'https://sleepcalc.net/chronotype-analyzer'
  },
  openGraph: {
    title: "Chronotype Analyzer - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "Discover your chronotype (sleep personality) with our free chronotype quiz. Learn if you're a bear, wolf, lion, or dolphin and optimize your sleep schedule accordingly.",
    url: "https://sleepcalc.net/chronotype-analyzer",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "https://sleepcalc.net/images/chronotype-analyzer-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Chronotype Quiz & Sleep Type Analyzer"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronotype Analyzer - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "Discover your chronotype (sleep personality) with our free chronotype quiz. Learn if you're a bear, wolf, lion, or dolphin and optimize your schedule.",
    images: ["https://sleepcalc.net/images/chronotype-analyzer-og.jpg"],
  }
}; 