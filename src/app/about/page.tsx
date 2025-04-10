"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';


// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });

// JSON-LD schema for SEO
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About SleepCalc",
  "description": "Learn about the science behind SleepCalc - how 90-minute sleep cycles work to optimize your sleep and wake times.",
  "mainEntity": {
    "@type": "Organization",
    "name": "SleepCalc",
    "description": "SleepCalc helps you optimize your sleep schedule with sleep cycle technology."
  }
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Force set the document title directly
    if (typeof window !== 'undefined') {
      document.title = "About - Sleep Calculator";
    }
  }, []);
  
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
        {mounted && <Navbar />}
        
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-primary-400">About</span> SleepCalc Sleep Calculator
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Learn how our sleep calculator works with your natural sleep cycles
          </motion.p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="glass-card p-6 md:p-8 lg:col-span-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <motion.div 
                  className="glass-card p-6 flex flex-col items-center text-center"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary-900/30 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Sleep Cycle Science</h3>
                  <p className="text-gray-300">
                    Our calculator works with your body's natural 90-minute sleep cycles to help you wake feeling refreshed, not groggy.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="glass-card p-6 flex flex-col items-center text-center"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary-900/30 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Precision Timing</h3>
                  <p className="text-gray-300">
                    Get personalized recommendations for when to sleep or wake up based on your schedule and sleep needs.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="glass-card p-6 flex flex-col items-center text-center"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary-900/30 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Energy Optimization</h3>
                  <p className="text-gray-300">
                    Boost your daily productivity and mental clarity by aligning your sleep with your body's natural rhythms.
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                className="glass-card p-8 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row items-center mb-6">
                  <div className="bg-primary-900/30 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">How SleepCalc Works</h3>
                    <p className="text-gray-300">
                      SleepCalc's sleep calculator helps you optimize your sleep schedule by calculating the ideal times to sleep and wake based on natural 90-minute sleep cycles. Our bodies go through multiple sleep cycles each night, and waking up at the end of a cycle rather than in the middle can help you feel more refreshed and energetic.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-dark-800/50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-400 font-bold">1</span>
                      </div>
                      <h4 className="font-medium">Light Sleep</h4>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      You begin with light sleep, where your muscles relax and brain waves slow down.
                    </p>
                  </div>
                  
                  <div className="bg-dark-800/50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-400 font-bold">2</span>
                      </div>
                      <h4 className="font-medium">Deep Sleep</h4>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Your body repairs tissues, builds bone and muscle, and strengthens your immune system.
                    </p>
                  </div>
                  
                  <div className="bg-dark-800/50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-400 font-bold">3</span>
                      </div>
                      <h4 className="font-medium">REM Sleep</h4>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Your brain is highly active, dreams occur, and memory consolidation takes place.
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">
                  This complete cycle takes approximately 90 minutes for the average adult. By planning your sleep in multiples of these 90-minute cycles, you can improve your sleep quality and wake up feeling more rested.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Why Sleep Cycles Matter
                </h3>
                <p className="text-gray-300 mb-4">
                  Waking up in the middle of a sleep cycle can leave you feeling tired and disoriented, a state known as sleep inertia. By targeting wake times that coincide with the end of a sleep cycle when your body is naturally closest to wakefulness, you can:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">✓</span>
                    <span>Reduce morning grogginess</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">✓</span>
                    <span>Improve daily energy levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">✓</span>
                    <span>Enhance cognitive performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">✓</span>
                    <span>Boost overall mood and well-being</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Improve Your Sleep Quality
                </h3>
                <p className="text-gray-300 mb-4">
                  In addition to timing your sleep cycles, there are several strategies that can help improve your sleep quality:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-800/50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Consistent Schedule</h4>
                    <p className="text-xs text-gray-400">Maintain the same sleep and wake times, even on weekends</p>
                  </div>
                  <div className="bg-dark-800/50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Bedtime Routine</h4>
                    <p className="text-xs text-gray-400">Create a relaxing routine to signal it's time to sleep</p>
                  </div>
                  <div className="bg-dark-800/50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Optimal Environment</h4>
                    <p className="text-xs text-gray-400">Keep your bedroom cool, dark, and quiet</p>
                  </div>
                  <div className="bg-dark-800/50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Reduce Blue Light</h4>
                    <p className="text-xs text-gray-400">Limit screen time 1-2 hours before bed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
} 
