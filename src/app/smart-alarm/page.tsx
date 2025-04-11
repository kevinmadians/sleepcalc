"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import SmartAlarmContent from './SmartAlarmContent';

// Dynamically import components with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });

export default function SmartAlarmPage() {
  // Set page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Smart Alarm Calculator - Sleep Calculator";
    }
  }, []);

  return (
    <>
      <Navbar />
      <SmartAlarmContent />
      <Footer />
    </>
  );
} 