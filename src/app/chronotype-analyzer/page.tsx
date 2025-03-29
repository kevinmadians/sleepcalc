import type { Metadata } from "next";
import ChronotypeAnalyzerContent from "./ChronotypeAnalyzerContent";

export const metadata: Metadata = {
  title: "Chronotype Analyzer - Sleep Calculator",
  description: "Discover your natural sleep-wake cycle with our Chronotype Analyzer. Learn if you're a morning lark, night owl, or somewhere in between and optimize your daily schedule.",
  keywords: "chronotype analyzer, sleep chronotype test, morning person or night owl, circadian rhythm assessment, sleep-wake pattern analysis, biological clock test, morningness-eveningness questionnaire, sleep type quiz, natural sleep pattern, productivity timing optimization, peak performance hours, chronobiology assessment, circadian preference test, genetic sleep type, sleep schedule optimization, bedtime type analyzer, morning lark or night owl, peak alertness hours, diurnal preference test, personalized sleep timing",
  openGraph: {
    title: "Chronotype Analyzer - Sleep Calculator",
    description: "Discover your natural sleep-wake cycle with our Chronotype Analyzer. Learn if you're a morning lark, night owl, or somewhere in between and optimize your daily schedule.",
    url: "https://sleepcalc.net/chronotype-analyzer",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "https://sleepcalc.net/og-image.jpg",
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
    description: "Discover your natural sleep-wake cycle with our Chronotype Analyzer. Learn if you're a morning lark, night owl, or somewhere in between and optimize your daily schedule.",
    images: ["https://sleepcalc.net/og-image.jpg"],
  }
};

export default function ChronotypeAnalyzer() {
  // JSON-LD schema for SEO
  const chronotypeAnalyzerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Chronotype Analyzer",
    "description": "Discover your natural sleep-wake cycle with our Chronotype Analyzer. Learn if you're a morning lark, night owl, or somewhere in between and optimize your daily schedule.",
    "mainEntity": {
      "@type": "HealthAndBeautyBusiness",
      "name": "Sleep Calculator",
      "description": "Calculate optimal sleep times and analyze your chronotype."
    },
    "keywords": "chronotype analyzer, sleep chronotype test, morning person or night owl, circadian rhythm assessment, sleep-wake pattern analysis, biological clock test, morningness-eveningness questionnaire, sleep type quiz, natural sleep pattern, productivity timing optimization, peak performance hours, chronobiology assessment, circadian preference test, genetic sleep type, sleep schedule optimization, bedtime type analyzer, morning lark or night owl, peak alertness hours, diurnal preference test, personalized sleep timing"
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chronotypeAnalyzerSchema) }}
      />
      <ChronotypeAnalyzerContent />
    </>
  );
} 