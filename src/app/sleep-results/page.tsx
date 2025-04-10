"use client";

import { useState, useEffect, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '@/components/layout/Footer';

import { SLEEP_CYCLE_DURATION, FALLING_ASLEEP_TIME, RECOMMENDED_CYCLES, sleepCycleStages, sleepHealthBenefits } from '@/constants/sleepCalculator';
import { formatTimeAmPm, parseTimeString } from '@/utils/date/formatters';
import { calculateBedtimes, calculateWakeUpTimes } from '@/utils/date/calculations';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });

// JSON-LD schema for SEO
const sleepResultsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sleep Calculator Sleep Results",
  "description": "View your personalized sleep cycle recommendations. Sleep Calculator provides optimal bedtimes and wake-up times based on 90-minute sleep cycles.",
  "mainEntity": {
    "@type": "HealthAndBeautyBusiness",
    "name": "Sleep Calculator",
    "description": "Calculate optimal sleep times based on 90-minute sleep cycles."
  },
  "keywords": "sleep calculator results, optimal wake time, ideal bedtime, sleep cycle results, when to sleep calculator, when to wake up calculator, REM sleep calculator results, sleep cycle times, 90-minute sleep cycle calculator, best time to wake up, best bedtime calculator, sleep efficiency results, personalized sleep schedule, sleep quality recommendations, deep sleep optimization, sleep cycle chart, sleep duration calculator results"
};

// Create a SleepResultsContent component that uses useSearchParams
function SleepResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<Date[]>([]);
  const [copied, setCopied] = useState(false);
  const [sleepQualityTips, setSleepQualityTips] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  
  // Get parameters from URL
  const time = searchParams.get('time') || '08:00';
  const mode = searchParams.get('mode') as 'wakeup' | 'sleep' || 'wakeup';
  
  // Define functions with useCallback to avoid dependency cycles
  const calculateSleepTimes = useCallback(() => {
    const baseTime = parseTimeString(time);
    
    if (mode === 'wakeup') {
      // Calculate bedtimes for wake-up time
      setResults(calculateBedtimes(baseTime));
    } else {
      // Calculate wake-up times for bedtime
      setResults(calculateWakeUpTimes(baseTime));
    }
  }, [time, mode]);
  
  // Generate personalized sleep quality tips based on the time
  const generateSleepQualityTips = useCallback(() => {
    const [hours] = time.split(':').map(Number);
    const tips: string[] = [];
    
    // Common tips for everyone
    tips.push("Maintain a consistent sleep schedule, even on weekends");
    tips.push("Create a relaxing bedtime routine to signal your body it's time to sleep");
    
    if (mode === 'wakeup') {
      // Early morning wake up (5-7 AM)
      if (hours >= 5 && hours <= 7) {
        tips.push("Expose yourself to natural sunlight upon waking to reinforce your circadian rhythm");
        tips.push("Consider avoiding caffeine after 2 PM to ensure quality sleep");
      }
      // Mid-morning wake up (8-10 AM)
      else if (hours >= 8 && hours <= 10) {
        tips.push("Try to gradually shift your wake-up time earlier if possible");
        tips.push("Limit screen time in the hour before bed to improve sleep quality");
      }
      // Late morning/noon wake up (11 AM-12 PM)
      else if (hours >= 11 && hours <= 12) {
        tips.push("Consider resetting your circadian rhythm by going to bed earlier");
        tips.push("Avoid afternoon naps which might interfere with nighttime sleep");
      }
      // Afternoon/evening wake up (after 12 PM)
      else {
        tips.push("Your sleep schedule suggests you might be a shift worker or have delayed sleep phase syndrome");
        tips.push("Use blackout curtains to ensure your sleeping environment stays dark");
      }
    } else {
      // Early evening bedtime (8-10 PM)
      if (hours >= 20 && hours <= 22) {
        tips.push("This is an optimal bedtime aligned with natural circadian rhythms");
        tips.push("Dim lights 1-2 hours before bed to help melatonin production");
      }
      // Late evening bedtime (11 PM-12 AM)
      else if (hours >= 23 || hours === 0) {
        tips.push("Try to finish eating at least 2-3 hours before bedtime");
        tips.push("Consider a warm shower before bed to help initiate sleep");
      }
      // Very late/early morning bedtime (1-4 AM)
      else if (hours >= 1 && hours <= 4) {
        tips.push("Your late bedtime may impact overall sleep quality and quantity");
        tips.push("Try gradually shifting your bedtime earlier by 15 minutes each night");
      }
      // Morning/daytime bedtime (5 AM-7 PM)
      else {
        tips.push("If you're a shift worker, use blackout curtains and consider a sleep mask");
        tips.push("Try to maintain the same sleep schedule even on your days off");
      }
    }
    
    setSleepQualityTips(tips);
  }, [time, mode]);
  
  // Client-side mounting
  useEffect(() => {
    setMounted(true);
    calculateSleepTimes();
    generateSleepQualityTips();
    
    // Set same page title as the homepage
    if (typeof window !== 'undefined') {
      document.title = "Sleep Calculator - Calculate Your Ideal Sleep & Wake Times";
    }
  }, [calculateSleepTimes, generateSleepQualityTips]);
  
  const formatTime = (date: Date) => {
    return formatTimeAmPm(date);
  };
  
  const getCycleCount = (index: number) => {
    return mode === 'wakeup' ? 6 - index : index + 3;
  };
  
  const getSleepDuration = (cycles: number) => {
    const hours = Math.floor((cycles * SLEEP_CYCLE_DURATION) / 60);
    const minutes = (cycles * SLEEP_CYCLE_DURATION) % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  };
  
  const isRecommended = (index: number) => {
    const cycles = getCycleCount(index);
    return RECOMMENDED_CYCLES.includes(cycles);
  };
  
  const handleShareResults = async () => {
    const shareText = `My ${mode === 'wakeup' ? 'bedtime' : 'wake-up time'} options:\n` +
      results.map((time, i) => 
        `${formatTime(time)} (${getSleepDuration(getCycleCount(i))} of sleep)`
      ).join('\n') +
      '\nCalculated with Sleep Calculator';
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Sleep Schedule',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  };
  
  const handleBackToCalculator = () => {
    router.push('/');
  };
  
  const navigateToNapCalculator = () => {
    router.push('/nap-calculator');
  };
  
  const navigateToSleepTips = () => {
    router.push('/sleep-tips');
  };

  const handleAddToCalendar = () => {
    if (typeof window === 'undefined') return;
    
    const recommendedIndex = results.findIndex((_, i) => isRecommended(i));
    const selectedTimeToUse = selectedTime || (recommendedIndex !== -1 ? results[recommendedIndex] : results[0]);
    
    if (!selectedTimeToUse) return;
    
    const eventTitle = mode === 'wakeup' ? 'Bedtime' : 'Wake-up time';
    const eventDate = selectedTimeToUse.toISOString().replace(/-|:|\.\d+/g, '');
    const eventEndDate = new Date(selectedTimeToUse.getTime() + 15 * 60000).toISOString().replace(/-|:|\.\d+/g, '');
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventDate}/${eventEndDate}&details=${encodeURIComponent('Sleep schedule generated by SleepCalc')}`;
    
    window.open(googleCalUrl, '_blank');
  };
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Main results container - now full width and centered */}
        <motion.div 
          className="glass-card p-6 mb-8 border-2 border-primary-400 rounded-xl max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary-400">
            {mode === 'wakeup' ? 'Optimal Bedtimes' : 'Optimal Wake-Up Times'}
          </h1>
          
          <p className="text-gray-300 mb-6">
            {mode === 'wakeup' 
              ? `For a wake-up time of ${time}, consider going to bed at one of these times:` 
              : `If you go to bed at ${time}, consider setting your alarm for one of these times:`}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {results.map((result, index) => (
              <motion.div 
                key={index}
                className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                  selectedTime && selectedTime.getTime() === result.getTime()
                    ? 'bg-primary-800 border-2 border-primary-600'
                    : isRecommended(index) 
                      ? 'bg-primary-900/30 border border-primary-700 hover:bg-primary-900/50' 
                      : 'bg-dark-800/50 border border-dark-700 hover:bg-dark-800'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedTime(result)}
              >
                <div className="font-bold text-xl mb-1">{formatTime(result)}</div>
                <div className="text-xs text-gray-400 mb-1">{getCycleCount(index)} sleep cycles</div>
                <div className="text-sm text-gray-300">{getSleepDuration(getCycleCount(index))}</div>
                {isRecommended(index) && (
                  <div className="text-xs text-primary-400 mt-2">✓ Recommended</div>
                )}
              </motion.div>
            ))}
          </div>
          
          {selectedTime && (
            <motion.div
              className="bg-dark-800/60 rounded-lg p-4 mb-6 border border-primary-800/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary-900/30 p-3 rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary-400">You selected: {formatTime(selectedTime)}</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    This time will give you {getSleepDuration(getCycleCount(results.findIndex(r => r.getTime() === selectedTime.getTime())))} of sleep with {getCycleCount(results.findIndex(r => r.getTime() === selectedTime.getTime()))} complete sleep cycles.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <motion.button 
              onClick={handleBackToCalculator}
              className="btn-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Calculator
            </motion.button>
            
            <motion.button 
              onClick={handleShareResults}
              className="btn-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              {copied ? 'Copied!' : 'Share Results'}
            </motion.button>
            
            <motion.button 
              onClick={navigateToNapCalculator}
              className="btn-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8L22 12L18 16"></path>
                <path d="M2 12H22"></path>
              </svg>
              Try Nap Calculator
            </motion.button>
            
            <motion.button 
              onClick={navigateToSleepTips}
              className="btn-secondary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              View Sleep Tips
            </motion.button>
            
            <motion.button 
              onClick={handleAddToCalendar}
              className="btn-primary flex items-center justify-center gap-2"
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
        </motion.div>
        
        {/* Personalized Sleep Insights - now below main container */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Personalized Sleep Insights</h2>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-primary-400 mb-2">Tips to improve your sleep quality:</h3>
              <ul className="space-y-2">
                {sleepQualityTips.map((tip, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-primary-400 mr-2 mt-1">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Benefits of Quality Sleep</h2>
            
            <div className="grid grid-cols-2 gap-3">
              {sleepHealthBenefits.map((benefit, index) => (
                <div key={index} className="p-3 bg-dark-800/50 rounded-lg">
                  <div className="text-lg mb-1">{benefit.icon}</div>
                  <h4 className="text-sm font-medium mb-1">{benefit.title}</h4>
                  <p className="text-xs text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Collapsable sections - now below both panels */}
        <div className="max-w-4xl mx-auto flex flex-col space-y-4 mb-8">
          <div 
            className="bg-dark-800/70 p-4 rounded-lg cursor-pointer"
            onClick={() => toggleSection('howItWorks')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">How It Works</h3>
              <span>{expandedSection === 'howItWorks' ? '−' : '+'}</span>
            </div>
            
            <AnimatePresence>
              {expandedSection === 'howItWorks' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-300 text-sm overflow-hidden"
                >
                  <p className="mb-2">
                    This calculator works by counting backward (or forward) in 90-minute increments from your wake-up time (or bedtime). Each 90-minute period represents one complete sleep cycle.
                  </p>
                  <p className="mb-2">
                    A typical night's sleep consists of 4-6 complete sleep cycles. However, 5-6 cycles (7.5-9 hours) is generally recommended for adults, which is why some options are marked as "recommended."
                  </p>
                  <p>
                    The calculator also factors in the average time it takes to fall asleep (about 15 minutes) to provide more accurate bedtime recommendations.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div 
            className="bg-dark-800/70 p-4 rounded-lg cursor-pointer"
            onClick={() => toggleSection('sleepCycleInfo')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Sleep Cycle Stages</h3>
              <span>{expandedSection === 'sleepCycleInfo' ? '−' : '+'}</span>
            </div>
            
            <AnimatePresence>
              {expandedSection === 'sleepCycleInfo' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="space-y-3">
                    {sleepCycleStages.map((stage, index) => (
                      <div key={index} className="bg-dark-700/30 p-3 rounded">
                        <h4 className="text-primary-400 font-medium text-sm">{stage.name}</h4>
                        <p className="text-xs text-gray-400 mb-1">Duration: {stage.duration}</p>
                        <p className="text-xs text-gray-300">{stage.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div 
            className="bg-dark-800/70 p-4 rounded-lg cursor-pointer"
            onClick={() => toggleSection('sleepQuality')}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Sleep Pattern Analysis</h3>
              <span>{expandedSection === 'sleepQuality' ? '−' : '+'}</span>
            </div>
            
            <AnimatePresence>
              {expandedSection === 'sleepQuality' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-300 text-sm overflow-hidden"
                >
                  {(() => {
                    // Analysis based on time of day
                    const [hoursStr] = time.split(':');
                    const hours = parseInt(hoursStr);
                    
                    let evaluation = '';
                    
                    // Different analysis based on mode
                    if (mode === 'wakeup') {
                      if (hours >= 5 && hours <= 8) {
                        evaluation = 'Your wake-up time aligns well with natural circadian rhythms. This typically promotes better alertness and energy throughout the day.';
                      } else if (hours > 8 && hours <= 10) {
                        evaluation = 'This is a later wake-up time than what most adults use. If it works with your schedule and you feel rested, it may be fine for you.';
                      } else if (hours > 10 || hours < 5) {
                        evaluation = 'This wake-up time is outside typical patterns and may indicate an irregular sleep schedule or shift work needs.';
                      }
                    } else {
                      if (hours >= 21 && hours <= 23) {
                        evaluation = 'This bedtime aligns well with natural circadian rhythms for most adults, supporting optimal sleep quality and hormone regulation.';
                      } else if (hours >= 0 && hours <= 2) {
                        evaluation = 'This bedtime is later than optimal for many adults. If possible, gradually shift to an earlier bedtime for potential health benefits.';
                      } else if ((hours > 2 && hours < 19) || hours > 23) {
                        evaluation = 'This bedtime is outside the typical range and may indicate an irregular sleep schedule, shift work, or a circadian rhythm disorder.';
                      }
                    }
                    
                    return (
                      <>
                        <p className="mb-3">{evaluation}</p>
                        <p className="font-medium text-primary-300 mb-2">Suggested adjustments:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {sleepQualityTips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Sleep cycle visualization */}
        <motion.div 
          className="max-w-4xl mx-auto glass-card p-6 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Your Sleep Cycle Visualization</h2>
          
          <div className="relative h-40 bg-dark-900/50 rounded-lg p-3 mb-4">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-dark-700"></div>
            
            {/* Simple sleep cycle visualization */}
            <div className="relative h-full">
              {[...Array(6)].map((_, i) => {
                const cycleHeight = (i % 3 === 0) ? '40%' : (i % 3 === 1) ? '65%' : '85%';
                return (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 bg-primary-600/30 border-t-2 border-primary-500"
                    style={{
                      height: cycleHeight,
                      left: `${i * 16.66}%`,
                      width: '16.66%'
                    }}
                    initial={{ height: '0%' }}
                    animate={{ height: cycleHeight }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                  >
                    <div className="absolute top-0 left-0 w-full transform -translate-y-6 text-xs text-center">
                      <span className="text-primary-400 font-medium">{i+1}</span>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Labels */}
              <div className="absolute left-0 top-0 text-xs text-gray-400">Deep Sleep</div>
              <div className="absolute left-0 bottom-3 text-xs text-gray-400">Light Sleep</div>
              <div className="absolute right-2 top-0 text-xs text-gray-400">REM</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-4">
            This visualization shows how your sleep will likely progress through different stages during the night. 
            The deeper the bar, the deeper your sleep. REM sleep (when dreaming occurs) happens periodically and increases in duration as the night progresses.
          </p>
          
          <div className="bg-primary-900/20 border border-primary-800/30 p-4 rounded-lg">
            <h3 className="text-md font-medium text-primary-400 mb-2">Did you know?</h3>
            <p className="text-sm text-gray-300">
              Most adults spend about 50% of their total sleep time in stage 2 sleep, 20% in REM sleep, and 30% in the other stages.
              Following your optimal sleep schedule helps maintain this balance for quality restorative sleep.
            </p>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}

// Main component that wraps SleepResultsContent with Suspense
export default function SleepResults() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center">
        <motion.div 
          className="text-center" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold">Loading your sleep schedule...</h1>
          <p className="text-gray-400 mt-2">Calculating optimal sleep cycles</p>
        </motion.div>
      </div>
    }>
      <SleepResultsContent />
    </Suspense>
  );
} 
