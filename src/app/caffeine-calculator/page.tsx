"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Script from 'next/script';

// Dynamically import components with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const CaffeineCalculatorContent = dynamic(() => import('./CaffeineCalculatorContent'), { ssr: false });

// JSON-LD schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Caffeine Calculator - Sleep Calculator",
  "description": "Track caffeine intake, visualize caffeine half-life, and get personalized recommendations on when to stop consuming caffeine for better sleep quality.",
  "url": "https://sleepcalc.net/caffeine-calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Caffeine intake tracking",
    "Caffeine half-life visualization",
    "Personalized bedtime caffeine cutoff recommendations",
    "Sleep quality optimization"
  ],
  "about": {
    "@type": "Thing",
    "name": "Caffeine and Sleep",
    "description": "Caffeine blocks adenosine receptors in your brain, preventing the buildup of sleep pressure that naturally occurs throughout the day."
  }
};

export default function CaffeineCalculatorPage() {
  // Set page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Caffeine Calculator - Sleep Calculator";
    }
  }, []);

  return (
    <>
      <Script 
        id="caffeine-calculator-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <CaffeineCalculatorContent />
      <Footer />
    </>
  );
} 