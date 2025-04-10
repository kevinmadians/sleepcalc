"use client";

import { useEffect, useState } from "react";
import ChronotypeAnalyzerContent from "./ChronotypeAnalyzerContent";

export default function ChronotypeAnalyzer() {
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Set page title directly
    if (typeof window !== 'undefined') {
      document.title = "Chronotype Analyzer - Sleep Calculator";
    }
  }, []);

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

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    // ... existing code ...
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
