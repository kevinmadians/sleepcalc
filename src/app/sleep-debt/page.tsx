"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// JSON-LD schema for SEO
const sleepDebtSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sleep Calculator Sleep Debt Calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "description": "Calculate your sleep debt to understand how much sleep you're missing. Track your sleep patterns and improve your sleep health with Sleep Calculator.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "keywords": "sleep debt calculator, sleep deficit calculator, sleep debt tracker, how much sleep do I need, sleep debt recovery, chronic sleep deprivation, cumulative sleep debt, weekly sleep debt, sleep debt health effects, optimal sleep duration, sleep pattern analysis, catch up on sleep, sleep banking, recover from sleep debt, sleep loss calculator, sleep balance calculator"
};

// Sleep recommendations by age group
const sleepRecommendations = [
  { ageGroup: "Newborns (0-3 months)", hoursRange: "14-17", optimal: 15.5 },
  { ageGroup: "Infants (4-12 months)", hoursRange: "12-16", optimal: 14 },
  { ageGroup: "Toddlers (1-2 years)", hoursRange: "11-14", optimal: 12.5 },
  { ageGroup: "Preschoolers (3-5 years)", hoursRange: "10-13", optimal: 11.5 },
  { ageGroup: "School-age (6-12 years)", hoursRange: "9-12", optimal: 10.5 },
  { ageGroup: "Teens (13-18 years)", hoursRange: "8-10", optimal: 9 },
  { ageGroup: "Adults (18-64 years)", hoursRange: "7-9", optimal: 8 },
  { ageGroup: "Older Adults (65+ years)", hoursRange: "7-8", optimal: 7.5 }
];

// Effects of sleep debt
const sleepDebtEffects = [
  {
    level: "Mild (1-2 hours)",
    effects: [
      "Decreased alertness and concentration",
      "Mild mood changes",
      "Increased stress",
      "Slightly impaired decision making"
    ],
    remedy: "Can be recovered with one good night's sleep"
  },
  {
    level: "Moderate (3-5 hours)",
    effects: [
      "Significant fatigue",
      "Reduced cognitive performance",
      "Irritability and mood swings",
      "Impaired immune function",
      "Increased appetite and cravings"
    ],
    remedy: "Requires 2-3 nights of adequate sleep to recover"
  },
  {
    level: "Severe (6+ hours)",
    effects: [
      "Extreme fatigue and microsleeps",
      "Significant cognitive impairment",
      "Risk of chronic health issues",
      "Depression and anxiety",
      "Weakened metabolism",
      "Elevated risk of accidents"
    ],
    remedy: "May take up to 1-2 weeks to fully recover; should be addressed gradually"
  }
];

// Tips for recovering from sleep debt
const recoveryTips = [
  "Add an extra 1-2 hours of sleep on weekends, but maintain a consistent wake time",
  "Take a short 20-30 minute nap in the early afternoon",
  "Go to bed 15-30 minutes earlier each night until you reach your target",
  "Improve sleep quality through better sleep hygiene",
  "Create a relaxing bedtime routine to help fall asleep faster",
  "Limit screen time 1-2 hours before bed",
  "Avoid caffeine after 2 PM and alcohol before bedtime"
];

export default function SleepDebtPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [ageGroup, setAgeGroup] = useState("Adults (18-64 years)");
  const [recommendedHours, setRecommendedHours] = useState(8);
  const [weekdayHours, setWeekdayHours] = useState(6.5);
  const [weekendHours, setWeekendHours] = useState(8);
  const [sleepDebt, setSleepDebt] = useState<number | null>(null);
  const [debtCategory, setDebtCategory] = useState<string>("none");
  const [debtWeekly, setDebtWeekly] = useState<number | null>(null);
  const [recoveryTime, setRecoveryTime] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle age group change
  const handleAgeGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setAgeGroup(selected);
    
    // Update recommended hours based on age group
    const recommendation = sleepRecommendations.find(item => item.ageGroup === selected);
    if (recommendation) {
      setRecommendedHours(recommendation.optimal);
    }
  };

  // Update sleep debt calculation
  const handleHoursChange = (type: 'weekday' | 'weekend' | 'recommended', value: number) => {
    if (type === 'weekday') {
      setWeekdayHours(value);
    } else if (type === 'weekend') {
      setWeekendHours(value);
    } else {
      setRecommendedHours(value);
    }
  };

  // Calculate sleep debt
  const calculateSleepDebt = () => {
    // Weekly sleep calculation (5 weekdays + 2 weekend days)
    const actualWeeklySleep = (weekdayHours * 5) + (weekendHours * 2);
    const idealWeeklySleep = recommendedHours * 7;
    const weeklyDebt = idealWeeklySleep - actualWeeklySleep;
    
    // Daily average debt
    const averageDailyDebt = weeklyDebt / 7;
    
    // Set calculated values
    setSleepDebt(parseFloat(averageDailyDebt.toFixed(1)));
    setDebtWeekly(parseFloat(weeklyDebt.toFixed(1)));
    
    // Determine debt category
    if (averageDailyDebt <= 0) {
      setDebtCategory("none");
      setRecoveryTime("You're getting enough sleep!");
    } else if (averageDailyDebt < 2) {
      setDebtCategory("mild");
      setRecoveryTime("1-2 nights of good sleep");
    } else if (averageDailyDebt < 5) {
      setDebtCategory("moderate");
      setRecoveryTime("2-3 nights of good sleep");
    } else {
      setDebtCategory("severe");
      setRecoveryTime("7-10 days of consistent adequate sleep");
    }
    
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setSleepDebt(null);
    setDebtWeekly(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // If not mounted yet, don't render content
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sleepDebtSchema) }}
      />
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="text-primary-400">Sleep Debt</span> Calculator
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Calculate your sleep debt to understand if you're getting enough rest
          </motion.p>
          
          {!showResults ? (
            // Calculator Form
            <motion.div 
              className="glass-card p-6 md:p-8 border-2 border-primary-400 rounded-xl mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-6">Calculate Your Sleep Debt</h2>
              
              {/* Age Group Selection */}
              <div className="mb-6">
                <label htmlFor="age-group" className="block mb-2 text-sm font-medium text-gray-300">
                  Your Age Group
                </label>
                <select
                  id="age-group"
                  className="w-full p-3 rounded-lg bg-dark-800 border border-dark-600 text-white"
                  value={ageGroup}
                  onChange={handleAgeGroupChange}
                >
                  {sleepRecommendations.map(item => (
                    <option key={item.ageGroup} value={item.ageGroup}>
                      {item.ageGroup} ({item.hoursRange} hours)
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Recommended Sleep Hours */}
              <div className="mb-6">
                <label htmlFor="recommended-hours" className="block mb-2 text-sm font-medium text-gray-300">
                  Your Recommended Sleep Hours
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    id="recommended-hours"
                    min="5"
                    max="17"
                    step="0.5"
                    value={recommendedHours}
                    onChange={(e) => handleHoursChange('recommended', parseFloat(e.target.value))}
                    className="w-full mr-4 accent-primary-500"
                  />
                  <span className="text-xl font-semibold w-16 text-center">{recommendedHours} h</span>
                </div>
              </div>
              
              {/* Weekday Sleep Hours */}
              <div className="mb-6">
                <label htmlFor="weekday-hours" className="block mb-2 text-sm font-medium text-gray-300">
                  Your Average Weekday Sleep (Monday-Friday)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    id="weekday-hours"
                    min="3"
                    max="14"
                    step="0.5"
                    value={weekdayHours}
                    onChange={(e) => handleHoursChange('weekday', parseFloat(e.target.value))}
                    className="w-full mr-4 accent-primary-500"
                  />
                  <span className="text-xl font-semibold w-16 text-center">{weekdayHours} h</span>
                </div>
              </div>
              
              {/* Weekend Sleep Hours */}
              <div className="mb-8">
                <label htmlFor="weekend-hours" className="block mb-2 text-sm font-medium text-gray-300">
                  Your Average Weekend Sleep (Saturday-Sunday)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    id="weekend-hours"
                    min="3"
                    max="14"
                    step="0.5"
                    value={weekendHours}
                    onChange={(e) => handleHoursChange('weekend', parseFloat(e.target.value))}
                    className="w-full mr-4 accent-primary-500"
                  />
                  <span className="text-xl font-semibold w-16 text-center">{weekendHours} h</span>
                </div>
              </div>
              
              {/* Calculate Button */}
              <motion.button
                onClick={calculateSleepDebt}
                className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Calculate My Sleep Debt
              </motion.button>
            </motion.div>
          ) : (
            // Results Section
            <motion.div 
              className="glass-card p-6 md:p-8 border-2 border-primary-400 rounded-xl mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Your Sleep Debt Results</h2>
              
              <div className="flex justify-center mb-8">
                <div className="relative w-56 h-56">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#1e293b"
                      strokeWidth="10"
                    />
                    {/* Progress circle - red for debt, green for surplus */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke={sleepDebt && sleepDebt > 0 ? "#ef4444" : "#22c55e"}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - Math.min(Math.abs(sleepDebt || 0) / 5, 1))}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">{sleepDebt}</span>
                    <span className="text-lg text-gray-400">hours/day</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${
                  sleepDebt && sleepDebt <= 0 ? 'text-green-400' : 
                  debtCategory === 'mild' ? 'text-yellow-400' :
                  debtCategory === 'moderate' ? 'text-orange-400' :
                  'text-red-400'
                }`}>
                  {sleepDebt && sleepDebt <= 0 
                    ? 'Optimal Sleep Balance!' 
                    : `${debtCategory.charAt(0).toUpperCase() + debtCategory.slice(1)} Sleep Debt`}
                </h3>
                <p className="text-gray-300">
                  {sleepDebt && sleepDebt <= 0
                    ? `You're getting ${Math.abs(sleepDebt)} hours more sleep than needed. Great job!`
                    : `You're missing about ${sleepDebt} hours of sleep per day, or ${debtWeekly} hours weekly.`}
                </p>
              </div>
              
              {sleepDebt && sleepDebt > 0 && (
                <div className="bg-dark-800/60 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-primary-400 mb-2">Recovery Plan</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    <strong>Estimated recovery time:</strong> {recoveryTime}
                  </p>
                  <p className="text-sm text-gray-300">
                    {debtCategory === 'mild' 
                      ? 'Your sleep debt is manageable and can be recovered with some adjustments to your sleep schedule.'
                      : debtCategory === 'moderate'
                      ? 'Your sleep debt is significant. Focus on improving your sleep schedule and habits to recover.'
                      : 'Your sleep debt is severe. Consider consulting a healthcare provider and prioritize sleep improvement.'}
                  </p>
                </div>
              )}
              
              {/* Weekly Sleep Analysis */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Your Weekly Sleep Pattern</h3>
                <div className="bg-dark-800/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm">Current:</span>
                    <span className="text-sm font-medium">{(weekdayHours * 5 + weekendHours * 2).toFixed(1)} hours/week</span>
                  </div>
                  
                  <div className="h-3 bg-dark-700 rounded-full mb-4">
                    <div 
                      className={`h-full rounded-full ${sleepDebt && sleepDebt <= 0 ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(((weekdayHours * 5 + weekendHours * 2) / (recommendedHours * 7)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recommended:</span>
                    <span className="text-sm font-medium">{(recommendedHours * 7).toFixed(1)} hours/week</span>
                  </div>
                </div>
              </div>
              
              {/* Recommendations */}
              {sleepDebt && sleepDebt > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Sleep Recovery Tips</h3>
                  <ul className="space-y-2">
                    {recoveryTips.slice(0, 4).map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-400 mr-2 mt-1 flex-shrink-0">✓</span>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={resetCalculator}
                  className="bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Recalculate
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Informational Sections */}
          <div className="max-w-4xl mx-auto mb-8">
            <div 
              className="bg-dark-800/70 p-4 rounded-lg cursor-pointer mb-4"
              onClick={() => toggleSection('sleepDebtInfo')}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Understanding Sleep Debt</h3>
                <span>{expandedSection === 'sleepDebtInfo' ? '−' : '+'}</span>
              </div>
              
              {expandedSection === 'sleepDebtInfo' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-300 text-sm overflow-hidden"
                >
                  <p className="mb-3">
                    Sleep debt, also called sleep deficit, is the difference between the amount of sleep you need and the amount you actually get. It's a cumulative issue—if you lose an hour of sleep each night for a week, by the weekend you'll have accumulated 7 hours of sleep debt.
                  </p>
                  <p className="mb-3">
                    Unlike financial debt, you can't fully "repay" large amounts of sleep debt with a single good night's sleep. Recovery requires consistency and may take days or weeks depending on how much sleep you've lost.
                  </p>
                  <p>
                    Research suggests that chronic sleep debt contributes to health issues including weakened immunity, impaired cognitive function, increased stress levels, and elevated risk of chronic conditions like diabetes and heart disease.
                  </p>
                </motion.div>
              )}
            </div>
            
            <div 
              className="bg-dark-800/70 p-4 rounded-lg cursor-pointer mb-4"
              onClick={() => toggleSection('sleepDebtEffects')}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Effects of Sleep Debt</h3>
                <span>{expandedSection === 'sleepDebtEffects' ? '−' : '+'}</span>
              </div>
              
              {expandedSection === 'sleepDebtEffects' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="space-y-4">
                    {sleepDebtEffects.map((level, index) => (
                      <div key={index} className="bg-dark-700/30 p-4 rounded-lg">
                        <h4 className={`font-medium mb-2 ${
                          level.level.includes("Mild") ? "text-yellow-400" :
                          level.level.includes("Moderate") ? "text-orange-400" :
                          "text-red-400"
                        }`}>
                          {level.level}
                        </h4>
                        <ul className="space-y-1 mb-3">
                          {level.effects.map((effect, i) => (
                            <li key={i} className="text-sm flex items-start">
                              <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">•</span>
                              <span>{effect}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-primary-300">
                          <strong>Recovery:</strong> {level.remedy}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <div 
              className="bg-dark-800/70 p-4 rounded-lg cursor-pointer"
              onClick={() => toggleSection('recoveryTips')}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">How to Recover from Sleep Debt</h3>
                <span>{expandedSection === 'recoveryTips' ? '−' : '+'}</span>
              </div>
              
              {expandedSection === 'recoveryTips' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-300 text-sm overflow-hidden"
                >
                  <p className="mb-3">
                    Recovering from sleep debt requires a strategic approach based on the severity of your deficit.
                  </p>
                  
                  <h4 className="font-medium text-primary-400 mb-2">Short-term Recovery</h4>
                  <ul className="space-y-1 mb-4">
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Add 1-2 extra hours of sleep on weekends (but don't oversleep as it can disrupt your rhythm)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Take a short 20-30 minute afternoon nap when possible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Go to bed 15-30 minutes earlier for a few nights</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-medium text-primary-400 mb-2">Long-term Strategies</h4>
                  <ul className="space-y-1 mb-4">
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Establish a consistent sleep schedule, even on weekends</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Create an optimal sleep environment (dark, quiet, cool)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Limit screen time 1-2 hours before bed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Avoid caffeine after 2 PM and alcohol near bedtime</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      <span>Exercise regularly, but not within 2-3 hours of bedtime</span>
                    </li>
                  </ul>
                  
                  <div className="bg-primary-900/20 border border-primary-800/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-primary-400">Remember</h4>
                    <p>
                      Recovery should be gradual. Trying to repay large sleep debts in a single night can disrupt your circadian rhythm. Consistency is key to healthy sleep.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Additional Sleep Debt Information Section */}
          <motion.div
            className="max-w-4xl mx-auto mb-8 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              <span className="text-primary-400">Understanding</span> Your Sleep Health
            </h2>
            
            {/* Sleep Debt Impact Chart */}
            <div className="glass-card p-6 mb-8 border border-dark-600 rounded-xl">
              <h3 className="text-xl font-medium mb-4">Impact of Sleep Debt on Daily Life</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full mb-4">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-dark-800 text-left text-sm font-medium rounded-tl-lg">Daily Activities</th>
                      <th className="py-3 px-4 bg-dark-800 text-left text-sm font-medium">No Sleep Debt</th>
                      <th className="py-3 px-4 bg-dark-800 text-left text-sm font-medium">Mild Sleep Debt</th>
                      <th className="py-3 px-4 bg-dark-800 text-left text-sm font-medium">Moderate Sleep Debt</th>
                      <th className="py-3 px-4 bg-dark-800 text-left text-sm font-medium rounded-tr-lg">Severe Sleep Debt</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 bg-dark-800/40 font-medium border-t border-dark-700">Focus & Concentration</td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-green-500" style={{ width: '95%' }}></div>
                          </div>
                          <span className="ml-2 text-green-400">High</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-blue-500" style={{ width: '70%' }}></div>
                          </div>
                          <span className="ml-2 text-blue-400">Good</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '45%' }}></div>
                          </div>
                          <span className="ml-2 text-yellow-400">Poor</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-red-500" style={{ width: '20%' }}></div>
                          </div>
                          <span className="ml-2 text-red-400">Very Poor</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 bg-dark-800/40 font-medium border-t border-dark-700">Memory</td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-green-500" style={{ width: '90%' }}></div>
                          </div>
                          <span className="ml-2 text-green-400">High</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-blue-500" style={{ width: '75%' }}></div>
                          </div>
                          <span className="ml-2 text-blue-400">Good</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '50%' }}></div>
                          </div>
                          <span className="ml-2 text-yellow-400">Poor</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-red-500" style={{ width: '25%' }}></div>
                          </div>
                          <span className="ml-2 text-red-400">Very Poor</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 bg-dark-800/40 font-medium border-t border-dark-700">Mood Regulation</td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-green-500" style={{ width: '95%' }}></div>
                          </div>
                          <span className="ml-2 text-green-400">High</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-blue-500" style={{ width: '65%' }}></div>
                          </div>
                          <span className="ml-2 text-blue-400">Good</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '40%' }}></div>
                          </div>
                          <span className="ml-2 text-yellow-400">Poor</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-red-500" style={{ width: '15%' }}></div>
                          </div>
                          <span className="ml-2 text-red-400">Very Poor</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 bg-dark-800/40 font-medium border-t border-dark-700 rounded-bl-lg">Immune Function</td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-green-500" style={{ width: '90%' }}></div>
                          </div>
                          <span className="ml-2 text-green-400">High</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-blue-500" style={{ width: '80%' }}></div>
                          </div>
                          <span className="ml-2 text-blue-400">Good</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-yellow-500" style={{ width: '55%' }}></div>
                          </div>
                          <span className="ml-2 text-yellow-400">Poor</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 bg-dark-800/40 border-t border-dark-700 rounded-br-lg">
                        <div className="flex items-center">
                          <div className="h-2.5 w-full bg-dark-700 rounded-full">
                            <div className="h-2.5 rounded-full bg-red-500" style={{ width: '30%' }}></div>
                          </div>
                          <span className="ml-2 text-red-400">Very Poor</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-400 italic text-center">
                  This chart illustrates how different levels of sleep debt affect various aspects of daily life and cognitive function.
                </p>
              </div>
            </div>
            
            {/* Weekly Sleep Pattern Visualization */}
            <div className="glass-card p-6 mb-8 border border-dark-600 rounded-xl">
              <h3 className="text-xl font-medium mb-4">Weekly Sleep Pattern Visualization</h3>
              
              <div className="flex flex-col md:flex-row md:space-x-8 items-center">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <div className="bg-dark-800/30 p-5 rounded-lg">
                    <h4 className="text-lg font-medium mb-4 text-primary-400">Optimal Sleep Pattern</h4>
                    <div className="space-y-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex items-center">
                          <span className="w-24 text-sm">{day}</span>
                          <div className="flex-grow h-6 bg-dark-700 rounded-full relative">
                            <div 
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${day === 'Saturday' || day === 'Sunday' ? 90 : 85}%` }}
                            >
                              <span className="absolute right-2 text-xs text-white top-1/2 transform -translate-y-1/2">
                                {day === 'Saturday' || day === 'Sunday' ? '8h' : '7.5h'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-300">
                      An optimal sleep pattern maintains consistent sleep duration throughout the week, with only slight variations on weekends.
                    </p>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="bg-dark-800/30 p-5 rounded-lg">
                    <h4 className="text-lg font-medium mb-4 text-red-400">Sleep Debt Pattern</h4>
                    <div className="space-y-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                        const isWeekend = day === 'Saturday' || day === 'Sunday';
                        let width;
                        if (isWeekend) {
                          width = 95; // 9h on weekends
                        } else if (index === 0) {
                          width = 65; // 6h on Monday
                        } else {
                          width = 55 + (index * 2); // Decreasing through the week
                        }
                        
                        return (
                          <div key={day} className="flex items-center">
                            <span className="w-24 text-sm">{day}</span>
                            <div className="flex-grow h-6 bg-dark-700 rounded-full relative">
                              <div 
                                className={`h-full rounded-full ${isWeekend ? 'bg-green-500' : 'bg-yellow-500'}`}
                                style={{ width: `${width}%` }}
                              >
                                <span className="absolute right-2 text-xs text-white top-1/2 transform -translate-y-1/2">
                                  {isWeekend ? '9h' : `${5.5 - ((index > 0 ? index : 0) * 0.3)}h`}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-sm text-gray-300">
                      A sleep debt pattern often shows insufficient sleep during weekdays and attempts to "catch up" on weekends, which disrupts your circadian rhythm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sleep Habits Checklist */}
            <div className="glass-card p-6 mb-8 border border-dark-600 rounded-xl">
              <h3 className="text-xl font-medium mb-4">Sleep Habits Self-Assessment Checklist</h3>
              <p className="text-sm text-gray-300 mb-6">
                Review these common sleep habits to identify areas where you can improve your sleep quality and reduce sleep debt.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-dark-800/40 p-5 rounded-lg">
                  <h4 className="text-lg font-medium mb-4 text-primary-400">Healthy Sleep Habits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-primary-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I go to bed and wake up at approximately the same time every day</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-primary-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>My bedroom is dark, quiet, and at a comfortable temperature</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-primary-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I avoid caffeine, alcohol, and large meals before bedtime</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-primary-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I exercise regularly (but not right before bed)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-primary-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I have a relaxing bedtime routine that helps me unwind</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-primary-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I limit screen time 1-2 hours before bed</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-dark-800/40 p-5 rounded-lg">
                  <h4 className="text-lg font-medium mb-4 text-red-400">Sleep-Disrupting Habits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-red-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I use electronic devices (phone, laptop, TV) in bed</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-red-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I drink caffeine in the afternoon or evening</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-red-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I sleep in significantly later on weekends (2+ hours)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-red-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I work or study in bed regularly</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-red-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I often use sleep medication or alcohol to help me fall asleep</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-md border border-red-400 flex-shrink-0 mt-0.5 mr-3"></div>
                      <span>I frequently find myself worrying or planning when trying to sleep</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-center mt-6 text-sm text-gray-400">
                The more items you check in the "Healthy Sleep Habits" column and the fewer in the "Sleep-Disrupting Habits" column, the better your sleep hygiene. Each item you improve can help reduce your sleep debt.
              </p>
            </div>
            
            {/* Sleep Science Facts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-card p-5 flex flex-col items-center text-center">
                <div className="text-3xl mb-3">⏰</div>
                <h4 className="text-lg font-medium mb-2">Consistency Matters</h4>
                <p className="text-sm text-gray-300">
                  Your body's internal clock (circadian rhythm) works best when you maintain consistent sleep and wake times, even on weekends.
                </p>
              </div>
              
              <div className="glass-card p-5 flex flex-col items-center text-center">
                <div className="text-3xl mb-3">🧠</div>
                <h4 className="text-lg font-medium mb-2">Brain Detoxification</h4>
                <p className="text-sm text-gray-300">
                  During deep sleep, your brain clears out toxins that build up during waking hours, which may help prevent neurodegenerative diseases.
                </p>
              </div>
              
              <div className="glass-card p-5 flex flex-col items-center text-center">
                <div className="text-3xl mb-3">🔄</div>
                <h4 className="text-lg font-medium mb-2">90-Minute Cycles</h4>
                <p className="text-sm text-gray-300">
                  Sleep occurs in 90-minute cycles of light sleep, deep sleep, and REM sleep. A full night typically includes 4-6 complete cycles.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Ad Banner */}
          <motion.div
            className="w-full flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AdPlaceholder width={728} height={90} className="hidden md:flex" />
            <AdPlaceholder width={320} height={100} className="flex md:hidden" />
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
} 