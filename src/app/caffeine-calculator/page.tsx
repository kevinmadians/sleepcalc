"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Dynamically import components with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const CaffeineCalculatorContent = dynamic(() => import('./CaffeineCalculatorContent'), { ssr: false });

export default function CaffeineCalculatorPage() {
  // Set page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Caffeine Calculator - Sleep Calculator";
    }
  }, []);

  return (
    <>
      <Navbar />
      <CaffeineCalculatorContent />
      <Footer />
    </>
  );
} 