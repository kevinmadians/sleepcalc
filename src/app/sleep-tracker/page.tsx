"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Script from 'next/script';

// Dynamically import components with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const SleepTrackerContent = dynamic(() => import('./SleepTrackerContent'), { ssr: false });

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

export default function SleepTracker() {
  // Set page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Sleep Quality Tracker - Sleep Calculator";
    }
  }, []);

  return (
    <>
      <Script 
        id="sleep-tracker-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sleepTrackerSchema) }}
      />
      <Navbar />
      <SleepTrackerContent />
      <Footer />
    </>
  );
} 