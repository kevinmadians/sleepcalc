"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import CustomTimePicker from '@/components/CustomTimePicker';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// JSON-LD schema for SEO
const sleepCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sleep Calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "description": "Calculate your best sleep cycle times based on 90-minute sleep cycles. Find optimal bedtimes and wake-up times for better sleep quality.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1243",
    "reviewCount": "856"
  },
  "keywords": "sleep calculator, best sleep calculator, sleep cycle calculator, bedtime calculator, wake-up time calculator, what time should I wake up, how much sleep do I need, sleep schedule calculator, REM sleep calculator, deep sleep calculator, best time to sleep calculator, sleep quality calculator, sleep duration calculator, ideal sleep time calculator, circadian rhythm calculator, sleep efficiency calculator, baby sleep calculator"
};

export default function Home() {
  const router = useRouter();
  const [calculatorMode, setCalculatorMode] = useState<'wakeup' | 'sleep'>('wakeup');
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<string>(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
  };

  const handleCalculate = () => {
    // Encode the time and mode as query parameters
    const params = new URLSearchParams();
    params.set('time', time);
    params.set('mode', calculatorMode);
    
    // Navigate to the results page
    router.push(`/sleep-results?${params.toString()}`);
  };
  
  // Sleep facts for the carousel
  const sleepFacts = [
    {
      title: "Sleep Cycles",
      description: "Your sleep consists of 90-minute cycles, each with light, deep, and REM phases. Waking at the end of a cycle helps you feel refreshed.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    {
      title: "Adults Need 7-9 Hours",
      description: "Adults typically need 7-9 hours of sleep per night, which equals about 4-6 complete sleep cycles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      )
    },
    {
      title: "Blue Light Effect",
      description: "Blue light from screens suppresses melatonin production. Avoid screens 1-2 hours before bedtime for better sleep quality.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"></rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>
      )
    }
  ];
  
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sleepCalculatorSchema) }}
      />
      
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Navbar />
        
        <motion.div 
          className="flex flex-col items-center justify-center flex-grow w-full px-4 py-12 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="text-primary-400">Sleep</span> Calculator
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-l text-gray-300 text-center max-w-2xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Calculate Your Best Sleep Cycle - Find optimal times to wake up or fall asleep
          </motion.p>
          
          {/* 728x90 Ad Banner */}
          <motion.div
            className="w-full flex justify-center my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AdPlaceholder width={728} height={90} className="hidden md:flex" />
            <AdPlaceholder width={320} height={100} className="flex md:hidden" />
          </motion.div>
          
          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 mb-12">
            <motion.div 
              className="glass-card p-6 md:p-8 w-full border-2 border-primary-400 rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex gap-2 mb-8 bg-dark-700/50 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    calculatorMode === 'wakeup' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-dark-600/50'
                  }`}
                  onClick={() => setCalculatorMode('wakeup')}
                  aria-label="Calculate wake-up time"
                >
                  Wake-up Time
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                    calculatorMode === 'sleep' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-dark-600/50'
                  }`}
                  onClick={() => setCalculatorMode('sleep')}
                  aria-label="Calculate bedtime"
                >
                  Bedtime
                </button>
              </div>
              
              {/* Step 1: Choose time */}
              {mounted && (
                <div className="flex flex-col items-center">
                  <div className="mb-6 w-full max-w-md mx-auto">
                    <label htmlFor="time-input" className="block mb-4 text-sm font-medium text-gray-300 text-center">
                      {calculatorMode === 'wakeup' ? 'I want to wake up at:' : 'I want to go to bed at:'}
                    </label>
                    
                    <CustomTimePicker value={time} onChange={handleTimeChange} />
                  </div>
                  
                  <motion.button
                    onClick={handleCalculate}
                    className="bg-primary-600 text-white py-3 px-6 rounded-lg mt-4 hover:bg-primary-700 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Calculate ${calculatorMode === 'wakeup' ? 'bedtime' : 'wake-up time'}`}
                  >
                    Calculate {calculatorMode === 'wakeup' ? 'Bedtime' : 'Wake-up Time'}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Sleep facts section */}
          <motion.div
            className="w-full max-w-4xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <span className="text-primary-400">Sleep</span> Facts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sleepFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="text-primary-400 mb-4">
                    {fact.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{fact.title}</h3>
                  <p className="text-gray-300 text-sm">{fact.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Sleep stats section */}
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Sleep <span className="text-primary-400">Statistics</span>
            </h2>
            
            <div className="glass-card p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="text-4xl font-bold text-primary-400 mb-2">33%</div>
                  <p className="text-gray-300 text-sm">of adults don't get enough sleep regularly</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="text-4xl font-bold text-primary-400 mb-2">90</div>
                  <p className="text-gray-300 text-sm">minutes is the average length of one sleep cycle</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="text-4xl font-bold text-primary-400 mb-2">5-6</div>
                  <p className="text-gray-300 text-sm">complete sleep cycles recommended per night</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="text-4xl font-bold text-primary-400 mb-2">33%</div>
                  <p className="text-gray-300 text-sm">improvement in cognitive performance with proper sleep</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <Footer />
      </main>
    </>
  );
} 