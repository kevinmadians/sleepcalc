import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chronotype Analyzer - Sleep Calculator",
  description: "Discover your chronotype (sleep personality) with our free chronotype quiz. Learn if you're a bear, wolf, lion, or dolphin and optimize your sleep schedule accordingly.",
  keywords: "chronotype quiz, sleep chronotype, chronotype test, what is my chronotype, sleep personality test, sleep type quiz, am I a morning person, night owl test, bear chronotype, wolf chronotype, lion chronotype, dolphin chronotype, sleep-wake patterns, circadian type, best sleep schedule, chronobiology test",
  alternates: {
    canonical: 'https://sleepcalc.net/chronotype-analyzer'
  },
  openGraph: {
    title: "Chronotype Analyzer - Sleep Calculator",
    description: "Discover your sleep chronotype with our free analyzer tool. Learn if you're a Lion, Bear, Wolf, or Dolphin and optimize your sleep schedule for your biological rhythm.",
    url: "https://sleepcalc.net/chronotype-analyzer",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Chronotype Analyzer"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronotype Analyzer - Sleep Calculator",
    description: "Discover your sleep chronotype with our free analyzer tool. Learn if you're a Lion, Bear, Wolf, or Dolphin and optimize your sleep schedule.",
    images: ["/twitter-image.png"],
  }
}; 