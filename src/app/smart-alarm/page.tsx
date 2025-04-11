"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Script from 'next/script';

// Dynamically import components with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const SmartAlarmContent = dynamic(() => import('./SmartAlarmContent'), { ssr: false });

// JSON-LD schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Smart Alarm Calculator - Sleep Calculator",
  "description": "Calculate your optimal wake-up time using sleep cycles, chronotype, and sleep inertia. Get personalized smart alarm recommendations for better morning energy.",
  "url": "https://sleepcalc.net/smart-alarm",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Optimal wake time calculation",
    "Chronotype-based recommendations",
    "Sleep inertia adjustment",
    "Morning routine planning",
    "Sleep cycle visualization"
  ],
  "about": {
    "@type": "Thing",
    "name": "Sleep Cycles and Chronotypes",
    "description": "Sleep cycles typically last 90 minutes, and waking at the end of a cycle helps reduce grogginess. Your chronotype (sleep-wake tendency) affects optimal wake times."
  }
};

export default function SmartAlarmPage() {
  // Set page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Smart Alarm Calculator - Sleep Calculator";
    }
  }, []);

  return (
    <>
      <Script 
        id="smart-alarm-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <SmartAlarmContent />
      <Footer />
    </>
  );
} 