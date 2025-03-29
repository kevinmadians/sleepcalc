"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import CustomTimePicker from '@/components/CustomTimePicker';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// JSON-LD schema for SEO
const napCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sleep Calculator Nap Calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "description": "Calculate optimal nap durations based on your schedule. Find the perfect power nap, refresh nap, or full cycle nap time with Sleep Calculator.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "keywords": "nap calculator, power nap calculator, best nap duration, optimal nap time, how long should I nap, refresh nap, full cycle nap, nap schedule calculator, power nap benefits, midday nap, afternoon nap, quick nap timer, nap benefits calculator, short nap benefits, long nap benefits, sleep cycle nap, nap time optimization"
};

// Define nap durations and their benefits
const napDurations = [
  {
    id: "power",
    name: "Power Nap",
    duration: "10-20 min",
    benefits: "Quick alertness boost without grogginess",
    icon: "⚡",
    description: "A power nap is perfect for a quick energy boost. It keeps you in the lighter stages of sleep, helping you wake up feeling alert rather than groggy.",
    durationMinutes: 20
  },
  {
    id: "refresh",
    name: "Refresh Nap",
    duration: "30-60 min",
    benefits: "Memory and cognitive enhancement",
    icon: "🧠",
    description: "This longer nap includes some deeper sleep, helping with memory consolidation and cognitive processing. May cause some sleep inertia upon waking.",
    durationMinutes: 45
  },
  {
    id: "full",
    name: "Full Cycle",
    duration: "90 min",
    benefits: "Complete rejuvenation with REM sleep",
    icon: "🌀",
    description: "A 90-minute nap allows you to complete one full sleep cycle, including REM sleep. This helps with creativity, emotional processing, and physical recovery.",
    durationMinutes: 90
  }
];

// Best times for napping
const bestNapTimes = [
  {
    timeRange: "1:00 - 3:00 PM",
    description: "Post-lunch dip in alertness makes this an ideal time for most people to nap."
  },
  {
    timeRange: "5:00 - 7:00 PM",
    description: "Early evening can work well if it's at least 3 hours before your bedtime."
  }
];

export default function NapCalculatorPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });
  
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [napDetails, setNapDetails] = useState<{wakeTime: string, sleepTime: string} | null>(null);
  const [napTips, setNapTips] = useState<string[]>([]);
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleTimeChange = (time: string) => {
    setCurrentTime(time);
  };
  
  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration);
    calculateNapTimes(currentTime, duration);
  };
  
  // Calculate wake-up time based on nap duration
  const calculateNapTimes = (startTime: string, duration: number) => {
    // Parse the start time
    const [hours, minutes] = startTime.split(':').map(Number);
    
    // Add 5 minutes to fall asleep
    let fallAsleepDate = new Date();
    fallAsleepDate.setHours(hours, minutes + 5, 0, 0);
    
    // Calculate wake-up time
    let wakeDate = new Date(fallAsleepDate);
    wakeDate.setMinutes(wakeDate.getMinutes() + duration);
    
    // Format times for display
    const sleepTime = formatTime(fallAsleepDate);
    const wakeTime = formatTime(wakeDate);
    
    setNapDetails({ sleepTime, wakeTime });
    setShowResults(true);
    
    // Set nap tips based on selected duration
    if (duration <= 20) {
      setNapTips([
        "Find a quiet, comfortable place",
        "Set an alarm to avoid oversleeping",
        "Use an eye mask to block light",
        "Try to nap sitting slightly upright to avoid deep sleep"
      ]);
    } else if (duration <= 60) {
      setNapTips([
        "Find a quiet, dark place to lie down",
        "Use a light blanket as body temperature drops during sleep",
        "Set an alarm to avoid sleep inertia",
        "Consider a caffeine nap (drink coffee right before your nap)"
      ]);
    } else {
      setNapTips([
        "Make sure your nap environment is comfortable and quiet",
        "Block all light sources for deeper sleep",
        "Expect to feel groggy upon waking (sleep inertia)",
        "Allow 15-30 minutes to fully wake up after your nap"
      ]);
    }
  };
  
  // Format time for display
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  
  const resetCalculator = () => {
    setSelectedDuration(null);
    setShowResults(false);
    setNapDetails(null);
  };
  
  // Function to add nap to calendar
  const addToCalendar = () => {
    if (!napDetails) return;
    
    // Parse the sleep and wake times
    const now = new Date();
    const [sleepHours, sleepMinutes, sleepAmPm] = napDetails.sleepTime.match(/(\d+):(\d+) (\w+)/)?.slice(1) || [];
    const [wakeHours, wakeMinutes, wakeAmPm] = napDetails.wakeTime.match(/(\d+):(\d+) (\w+)/)?.slice(1) || [];
    
    if (!sleepHours || !wakeHours) return;
    
    // Convert to 24-hour format
    let sleepHour = parseInt(sleepHours);
    if (sleepAmPm === 'PM' && sleepHour < 12) sleepHour += 12;
    if (sleepAmPm === 'AM' && sleepHour === 12) sleepHour = 0;
    
    let wakeHour = parseInt(wakeHours);
    if (wakeAmPm === 'PM' && wakeHour < 12) wakeHour += 12;
    if (wakeAmPm === 'AM' && wakeHour === 12) wakeHour = 0;
    
    // Create Date objects
    const sleepTime = new Date(now);
    sleepTime.setHours(sleepHour, parseInt(sleepMinutes), 0, 0);
    
    const wakeTime = new Date(now);
    wakeTime.setHours(wakeHour, parseInt(wakeMinutes), 0, 0);
    
    // If wake time is earlier than sleep time, it means the nap goes to the next day
    if (wakeTime < sleepTime) {
      wakeTime.setDate(wakeTime.getDate() + 1);
    }
    
    // Format for Google Calendar
    const startTime = sleepTime.toISOString().replace(/-|:|\.\d+/g, '');
    const endTime = wakeTime.toISOString().replace(/-|:|\.\d+/g, '');
    
    // Create Google Calendar URL
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Power Nap')}&dates=${startTime}/${endTime}&details=${encodeURIComponent('Scheduled nap from Sleep Calculator')}`;
    
    // Open in new tab
    window.open(googleCalUrl, '_blank');
  };
  
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(napCalculatorSchema) }}
      />
    
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
        {mounted && <Navbar />}
        
        <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-primary-400">Nap</span> Calculator
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Calculate Your Best Nap Times - Boost alertness and productivity with perfectly timed naps
          </motion.p>
          
          {/* Main content - centered time picker */}
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 mb-8">
            <motion.div
              className="glass-card p-6 md:p-8 w-full border-2 border-primary-400 rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {!showResults ? (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-center">When do you want to start your nap?</h2>
                  
                  <div className="mb-6 w-full max-w-md mx-auto">
                    <CustomTimePicker value={currentTime} onChange={handleTimeChange} />
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 mt-6 text-center">Choose a nap duration:</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {napDurations.map((nap, index) => (
                      <motion.button
                        key={index}
                        className={`p-3 rounded-lg text-left transition-all h-full ${
                          selectedDuration === nap.durationMinutes 
                            ? 'bg-primary-600/20 border border-primary-500' 
                            : 'bg-dark-700/50 border border-dark-600 hover:bg-dark-700'
                        }`}
                        onClick={() => handleDurationSelect(nap.durationMinutes)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-semibold text-lg">
                          {nap.duration}
                          <span className="ml-2 text-sm text-gray-400">({nap.name})</span>
                        </div>
                        <div className="text-xs text-gray-300 mt-1 flex items-start">
                          <span className="text-primary-400 mr-1 mt-0.5">•</span> 
                          <span>{nap.benefits}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Your Nap Schedule</h2>
                  
                  <div className="p-4 bg-dark-700/50 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-dark-800/60 rounded-lg">
                        <div className="text-sm text-gray-400">Fall asleep at</div>
                        <div className="text-2xl font-bold text-white">{napDetails?.sleepTime}</div>
                      </div>
                      
                      <div className="text-center p-3 bg-dark-800/60 rounded-lg">
                        <div className="text-sm text-gray-400">Wake up at</div>
                        <div className="text-2xl font-bold text-white">{napDetails?.wakeTime}</div>
                      </div>
                    </div>
                    
                    {/* Nap duration info card */}
                    <div className="mt-4 p-3 bg-dark-800/60 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="bg-primary-800/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-400 text-lg font-bold">
                            {selectedDuration && (selectedDuration <= 20 ? "⚡" : selectedDuration <= 60 ? "🧠" : "🌀")}
                          </span>
                        </span>
                        <div>
                          <h3 className="font-medium text-lg">
                            {selectedDuration && (
                              selectedDuration <= 20 
                                ? "Power Nap" 
                                : selectedDuration <= 60 
                                  ? "Refresh Nap" 
                                  : "Full Cycle Nap"
                            )}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1">
                            {selectedDuration && (
                              selectedDuration <= 20 
                                ? "A quick recharge that avoids deep sleep, leaving you alert and ready to go." 
                                : selectedDuration <= 60 
                                  ? "Includes some slow-wave sleep for memory consolidation and cognitive improvement." 
                                  : "Complete sleep cycle including REM sleep for maximum cognitive benefits."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sleep stages section */}
                    <div className="mt-4 p-3 bg-dark-800/60 rounded-lg">
                      <h3 className="text-md font-medium mb-3">Sleep Stages You'll Experience:</h3>
                      <div className="grid grid-cols-4 gap-2">
                        <div className={`p-2 rounded text-center ${selectedDuration && selectedDuration >= 5 ? 'bg-primary-900/30 border border-primary-800/30' : 'bg-dark-700/50 text-gray-500'}`}>
                          <div className="text-xs font-medium mb-1">Stage 1</div>
                          <div className="text-xs">{selectedDuration && selectedDuration >= 5 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className={`p-2 rounded text-center ${selectedDuration && selectedDuration >= 15 ? 'bg-primary-900/30 border border-primary-800/30' : 'bg-dark-700/50 text-gray-500'}`}>
                          <div className="text-xs font-medium mb-1">Stage 2</div>
                          <div className="text-xs">{selectedDuration && selectedDuration >= 15 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className={`p-2 rounded text-center ${selectedDuration && selectedDuration >= 30 ? 'bg-primary-900/30 border border-primary-800/30' : 'bg-dark-700/50 text-gray-500'}`}>
                          <div className="text-xs font-medium mb-1">Deep Sleep</div>
                          <div className="text-xs">{selectedDuration && selectedDuration >= 30 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className={`p-2 rounded text-center ${selectedDuration && selectedDuration >= 75 ? 'bg-primary-900/30 border border-primary-800/30' : 'bg-dark-700/50 text-gray-500'}`}>
                          <div className="text-xs font-medium mb-1">REM</div>
                          <div className="text-xs">{selectedDuration && selectedDuration >= 75 ? 'Yes' : 'No'}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expected benefits section */}
                    <div className="mt-4 p-3 bg-dark-800/60 rounded-lg">
                      <h3 className="text-md font-medium mb-2">Expected Benefits:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-start">
                          <span className={`mr-2 flex-shrink-0 text-sm ${selectedDuration && selectedDuration >= 10 ? 'text-primary-400' : 'text-gray-500'}`}>
                            {selectedDuration && selectedDuration >= 10 ? '✓' : '○'}
                          </span>
                          <span className={selectedDuration && selectedDuration >= 10 ? '' : 'text-gray-500'}>Increased alertness</span>
                        </div>
                        <div className="flex items-start">
                          <span className={`mr-2 flex-shrink-0 text-sm ${selectedDuration && selectedDuration >= 15 ? 'text-primary-400' : 'text-gray-500'}`}>
                            {selectedDuration && selectedDuration >= 15 ? '✓' : '○'}
                          </span>
                          <span className={selectedDuration && selectedDuration >= 15 ? '' : 'text-gray-500'}>Reduced fatigue</span>
                        </div>
                        <div className="flex items-start">
                          <span className={`mr-2 flex-shrink-0 text-sm ${selectedDuration && selectedDuration >= 30 ? 'text-primary-400' : 'text-gray-500'}`}>
                            {selectedDuration && selectedDuration >= 30 ? '✓' : '○'}
                          </span>
                          <span className={selectedDuration && selectedDuration >= 30 ? '' : 'text-gray-500'}>Improved memory</span>
                        </div>
                        <div className="flex items-start">
                          <span className={`mr-2 flex-shrink-0 text-sm ${selectedDuration && selectedDuration >= 45 ? 'text-primary-400' : 'text-gray-500'}`}>
                            {selectedDuration && selectedDuration >= 45 ? '✓' : '○'}
                          </span>
                          <span className={selectedDuration && selectedDuration >= 45 ? '' : 'text-gray-500'}>Enhanced learning</span>
                        </div>
                        <div className="flex items-start">
                          <span className={`mr-2 flex-shrink-0 text-sm ${selectedDuration && selectedDuration >= 60 ? 'text-primary-400' : 'text-gray-500'}`}>
                            {selectedDuration && selectedDuration >= 60 ? '✓' : '○'}
                          </span>
                          <span className={selectedDuration && selectedDuration >= 60 ? '' : 'text-gray-500'}>Emotional regulation</span>
                        </div>
                        <div className="flex items-start">
                          <span className={`mr-2 flex-shrink-0 text-sm ${selectedDuration && selectedDuration >= 90 ? 'text-primary-400' : 'text-gray-500'}`}>
                            {selectedDuration && selectedDuration >= 90 ? '✓' : '○'}
                          </span>
                          <span className={selectedDuration && selectedDuration >= 90 ? '' : 'text-gray-500'}>Enhanced creativity</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tips for the perfect nap */}
                    <div className="mt-4 p-3 bg-primary-900/20 border border-primary-800/30 rounded-lg">
                      <h3 className="text-md font-medium text-primary-400 mb-1">Tips for the perfect nap:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {napTips.map((tip, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-primary-400 mr-2 flex-shrink-0">✓</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      onClick={resetCalculator}
                      className="btn-secondary py-2 px-5 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 2v6h6M21.5 22v-6h-6"/>
                        <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5A10 10 0 0 0 20.8 16.8"/>
                      </svg>
                      Calculate Another Nap
                    </motion.button>
                    
                    <motion.button
                      onClick={addToCalendar}
                      className="btn-primary py-2 px-5 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      Add to Calendar
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
          
          {/* Nap information section - moved below the time picker */}
          <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-3">Optimal Nap Times</h3>
              
              <div className="space-y-3">
                {bestNapTimes.map((timeSlot, index) => (
                  <div key={index} className="p-2 bg-dark-800/50 rounded-lg">
                    <div className="font-medium text-primary-400 text-sm">{timeSlot.timeRange}</div>
                    <p className="text-xs text-gray-300">{timeSlot.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold mb-3">Benefits of Napping</h3>
              
              <div className="grid grid-cols-1 gap-1 text-xs text-gray-300">
                <div className="flex items-start">
                  <span className="text-primary-400 mr-1 mt-0.5">•</span>
                  <span>Increases alertness and reduces fatigue</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-400 mr-1 mt-0.5">•</span>
                  <span>Improves mood and emotional regulation</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-400 mr-1 mt-0.5">•</span>
                  <span>Enhances cognitive functions like memory</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-400 mr-1 mt-0.5">•</span>
                  <span>Boosts creativity and problem-solving</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-400 mr-1 mt-0.5">•</span>
                  <span>Reduces stress and lowers blood pressure</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Educational Section on Napping */}
          <motion.div 
            className="w-full max-w-4xl mx-auto mt-8 glass-card p-5 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">The Science of Napping</h2>
            
            <div className="prose prose-invert max-w-none">
              <p>
                Taking a well-timed nap can improve cognitive function, boost alertness, and enhance performance. Napping is a natural way to recharge during the day, and humans are biologically programmed for two periods of intense sleepiness: during the night and in the mid-afternoon.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Types of Naps & Their Benefits</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-dark-800/50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-primary-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-400 font-bold">⚡</span>
                    </div>
                    <h4 className="font-medium">Power Nap (10-20 min)</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    Enhances alertness and concentration without entering deep sleep stages. Ideal for a quick energy boost.
                  </p>
                </div>
                
                <div className="bg-dark-800/50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-primary-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-400 font-bold">🧠</span>
                    </div>
                    <h4 className="font-medium">Refresh Nap (30-60 min)</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    Includes some slow-wave sleep, which aids memory consolidation. May cause some grogginess (sleep inertia) upon waking.
                  </p>
                </div>
                
                <div className="bg-dark-800/50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-primary-800/30 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-400 font-bold">🌀</span>
                    </div>
                    <h4 className="font-medium">Full Cycle Nap (90 min)</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    Completes a full sleep cycle including REM sleep. Enhances creativity and emotional processing with minimal sleep inertia.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">How Napping Affects Your Brain</h3>
              
              <p>
                During a nap, your brain cycles through different sleep stages depending on the duration:
              </p>
              
              <ul className="space-y-2 mt-3 mb-4">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2 font-bold">→</span>
                  <span><strong>Stage 1 (1-5 minutes):</strong> Light sleep where you drift in and out of consciousness.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2 font-bold">→</span>
                  <span><strong>Stage 2 (5-20 minutes):</strong> Brain activity slows, body temperature drops, and heart rate decreases.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2 font-bold">→</span>
                  <span><strong>Stages 3-4 (20-60 minutes):</strong> Deep sleep where physical restoration occurs.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2 font-bold">→</span>
                  <span><strong>REM (60-90 minutes):</strong> Rapid eye movement sleep where dreaming occurs and cognitive processing happens.</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Tips for Effective Napping</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="bg-dark-800/30 p-4 rounded-lg">
                  <h4 className="font-medium text-primary-400 mb-2">Timing Is Everything</h4>
                  <p className="text-sm text-gray-300">
                    The ideal nap time for most people is between 1:00-3:00 PM when there's a natural dip in alertness. Avoid napping after 3:00 PM to prevent interference with nighttime sleep.
                  </p>
                </div>
                
                <div className="bg-dark-800/30 p-4 rounded-lg">
                  <h4 className="font-medium text-primary-400 mb-2">Create the Right Environment</h4>
                  <p className="text-sm text-gray-300">
                    Find a cool, dark, and quiet place. Use an eye mask and earplugs if needed. Recline slightly to avoid deep sleep during short naps.
                  </p>
                </div>
                
                <div className="bg-dark-800/30 p-4 rounded-lg">
                  <h4 className="font-medium text-primary-400 mb-2">Set an Alarm</h4>
                  <p className="text-sm text-gray-300">
                    Always set an alarm to wake up at the right time. Oversleeping can lead to sleep inertia and may affect your nighttime sleep.
                  </p>
                </div>
                
                <div className="bg-dark-800/30 p-4 rounded-lg">
                  <h4 className="font-medium text-primary-400 mb-2">Coffee Nap Technique</h4>
                  <p className="text-sm text-gray-300">
                    For maximum alertness, try a "coffee nap": drink caffeine right before a 20-minute nap. The caffeine kicks in just as you wake up, enhancing the nap's refreshing effects.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Napping for Different Age Groups</h3>
              
              <div className="overflow-x-auto mt-3">
                <table className="min-w-full bg-dark-700/30 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-dark-600/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Age Group</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Ideal Nap Duration</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-600">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-300">Young Adults</td>
                      <td className="px-4 py-3 text-sm text-gray-300">20-30 min</td>
                      <td className="px-4 py-3 text-sm text-gray-300">Focus on power naps for performance</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-300">Adults (25-64)</td>
                      <td className="px-4 py-3 text-sm text-gray-300">10-20 min or 90 min</td>
                      <td className="px-4 py-3 text-sm text-gray-300">Choose based on available time and need</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-300">Older Adults (65+)</td>
                      <td className="px-4 py-3 text-sm text-gray-300">30-90 min</td>
                      <td className="px-4 py-3 text-sm text-gray-300">May benefit from longer naps due to less efficient nighttime sleep</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-300">Shift Workers</td>
                      <td className="px-4 py-3 text-sm text-gray-300">90-120 min</td>
                      <td className="px-4 py-3 text-sm text-gray-300">Longer naps help offset sleep deprivation from irregular schedules</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
} 