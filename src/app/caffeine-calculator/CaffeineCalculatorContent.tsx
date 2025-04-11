"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, RadialLinearScale } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import Link from 'next/link';
import CustomTimePicker from '@/components/ui/CustomTimePicker';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend);

// Define common caffeine sources with amounts in mg
const CAFFEINE_SOURCES = [
  { name: 'Espresso (1 shot)', amount: 63, icon: '☕' },
  { name: 'Coffee (8 oz)', amount: 95, icon: '☕' },
  { name: 'Black Tea (8 oz)', amount: 47, icon: '🍵' },
  { name: 'Green Tea (8 oz)', amount: 28, icon: '🍵' },
  { name: 'Cola (12 oz)', amount: 34, icon: '🥤' },
  { name: 'Energy Drink (8 oz)', amount: 80, icon: '⚡' },
  { name: 'Dark Chocolate (1 oz)', amount: 12, icon: '🍫' },
  { name: 'Caffeine Pill (standard)', amount: 200, icon: '💊' },
];

// Caffeine half-life in hours (varies by person)
const DEFAULT_HALF_LIFE = 5;
// Recommended caffeine cutoff time before bed (in hours)
const RECOMMENDED_CUTOFF = 8;

export default function CaffeineCalculatorContent() {
  // State for user inputs
  const [bedTime, setBedTime] = useState('22:30');
  const [caffeineItems, setCaffeineItems] = useState<{id: string; source: string; amount: number; time: string}[]>([]);
  const [customSource, setCustomSource] = useState('');
  const [customAmount, setCustomAmount] = useState(0);
  const [customTime, setCustomTime] = useState('');
  const [halfLife, setHalfLife] = useState(DEFAULT_HALF_LIFE);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Results state
  const [totalCaffeine, setTotalCaffeine] = useState(0);
  const [caffeineAtBedtime, setCaffeineAtBedtime] = useState(0);
  const [cutoffTime, setCutoffTime] = useState('');
  const [safeToSleep, setSafeToSleep] = useState(true);
  const [timeUntilHalfRemaining, setTimeUntilHalfRemaining] = useState(0);
  
  // Ref for results section scrolling
  const resultsRef = useRef<HTMLDivElement>(null);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
    
    // Set current time for custom time input
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCustomTime(`${hours}:${minutes}`);
  }, []);

  // Generate time labels for chart (hourly from 6am to 12am)
  const generateTimeLabels = () => {
    const labels = [];
    for (let hour = 6; hour < 30; hour++) {
      const displayHour = hour % 24;
      labels.push(`${displayHour.toString().padStart(2, '0')}:00`);
    }
    return labels;
  };

  // Generate caffeine level data for chart
  const generateCaffeineData = () => {
    if (caffeineItems.length === 0) return [];
    
    // Calculate caffeine levels at each hour
    const data = Array(24).fill(0);
    
    // Start time is 6am
    const startHour = 6;
    
    // Calculate bedtime hour index (0-23)
    const [bedHours, bedMinutes] = bedTime.split(':').map(Number);
    const bedtimeHourIndex = (bedHours - startHour + 24) % 24;
    
    caffeineItems.forEach(item => {
      // Parse time consumed
      const [consumedHours, consumedMinutes] = item.time.split(':').map(Number);
      
      // Calculate hour index (0-23)
      const consumedHourIndex = (consumedHours - startHour + 24) % 24;
      // Factor in minutes as fraction of hour
      const hourOffset = consumedMinutes / 60;
      
      // Add caffeine at consumed hour
      for (let i = 0; i < 24; i++) {
        // Skip times before consumption
        if (i < consumedHourIndex) continue;
        
        // Calculate hours since consumption
        const hoursSinceConsumption = i - consumedHourIndex + hourOffset;
        
        // Calculate remaining caffeine using half-life formula
        const halfLifeCycles = hoursSinceConsumption / halfLife;
        const remainingPercentage = Math.pow(0.5, halfLifeCycles);
        const remainingAmount = item.amount * remainingPercentage;
        
        // Add to total for this hour
        data[i] += remainingAmount;
      }
    });
    
    // Mark bedtime with slightly increased value for visual reference
    if (bedtimeHourIndex >= 0 && bedtimeHourIndex < 24) {
      data[bedtimeHourIndex] = data[bedtimeHourIndex] * 1.1;
    }
    
    return data;
  };

  // Add a new caffeine item to the tracker
  const addCaffeineItem = (source: string, amount: number) => {
    const id = `caffeine-${Date.now()}`;
    setCaffeineItems([
      ...caffeineItems,
      { id, source, amount, time: customTime }
    ]);
  };

  // Add a custom caffeine source
  const addCustomSource = () => {
    if (customSource && customAmount > 0) {
      addCaffeineItem(customSource, customAmount);
      setCustomSource('');
      setCustomAmount(0);
    }
  };

  // Remove a caffeine item
  const removeCaffeineItem = (id: string) => {
    setCaffeineItems(caffeineItems.filter(item => item.id !== id));
  };

  // Calculate caffeine levels and recommendations
  const calculateCaffeine = () => {
    // Calculate total caffeine intake
    const totalAmount = caffeineItems.reduce((sum, item) => sum + item.amount, 0);
    setTotalCaffeine(totalAmount);
    
    // Parse bedtime
    const [bedHours, bedMinutes] = bedTime.split(':').map(Number);
    const bedtimeDate = new Date();
    bedtimeDate.setHours(bedHours, bedMinutes, 0, 0);
    
    // Calculate caffeine remaining at bedtime for each item
    let remainingAtBedtime = 0;
    
    caffeineItems.forEach(item => {
      // Parse time consumed
      const [consumedHours, consumedMinutes] = item.time.split(':').map(Number);
      const consumedDate = new Date();
      consumedDate.setHours(consumedHours, consumedMinutes, 0, 0);
      
      // If consumed time is after bed time, assume it's from the previous day
      if (consumedDate > bedtimeDate) {
        consumedDate.setDate(consumedDate.getDate() - 1);
      }
      
      // Calculate hours between consumption and bedtime
      const hoursDifference = (bedtimeDate.getTime() - consumedDate.getTime()) / (1000 * 60 * 60);
      
      // Calculate remaining caffeine using half-life formula
      const halfLifeCycles = hoursDifference / halfLife;
      const remainingPercentage = Math.pow(0.5, halfLifeCycles);
      const itemRemainingAmount = item.amount * remainingPercentage;
      
      remainingAtBedtime += itemRemainingAmount;
    });
    
    setCaffeineAtBedtime(Math.round(remainingAtBedtime));
    
    // Determine if it's safe to sleep (less than 30mg of caffeine remaining)
    const isSafeToSleep = remainingAtBedtime < 30;
    setSafeToSleep(isSafeToSleep);
    
    // Calculate recommended cutoff time
    const lastCaffeineItem = [...caffeineItems].sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeB[0] * 60 + timeB[1]) - (timeA[0] * 60 + timeA[1]);
    })[0];
    
    if (lastCaffeineItem) {
      const [lastHours, lastMinutes] = lastCaffeineItem.time.split(':').map(Number);
      const lastCaffeineTime = new Date();
      lastCaffeineTime.setHours(lastHours, lastMinutes, 0, 0);
      
      // Calculate hours until half the caffeine remains
      const hoursUntilHalf = halfLife;
      setTimeUntilHalfRemaining(hoursUntilHalf);
      
      // Calculate recommended cutoff time (8 hours before bed)
      const cutoffDate = new Date(bedtimeDate.getTime() - (RECOMMENDED_CUTOFF * 60 * 60 * 1000));
      const cutoffHours = cutoffDate.getHours().toString().padStart(2, '0');
      const cutoffMinutes = cutoffDate.getMinutes().toString().padStart(2, '0');
      setCutoffTime(`${cutoffHours}:${cutoffMinutes}`);
    }
    
    setShowResults(true);
    
    // Scroll to results after a small delay
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-dark-900 text-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Caffeine <span className="text-primary-400">Calculator</span>
          </h1>
          <h2 className="text-xl text-center text-primary-300 mb-6">Track Caffeine Intake & Optimize Sleep Quality</h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
            Calculate how caffeine affects your sleep by tracking your intake throughout the day. Get personalized recommendations on when to stop consuming caffeine for optimal sleep quality.
          </p>
          
          {/* Input Form */}
          <div className="max-w-4xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl mb-8">
            <div className="mb-6">
              {/* Bedtime Input - Enhanced Engaging Version */}
              <div className="mb-8 text-center">
                <h4 className="text-lg font-semibold text-primary-300 mb-4">What time do you plan to go to bed?</h4>
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-dark-700 border-2 border-primary-500/30 rounded-xl p-4 shadow-lg w-full max-w-md mx-auto mb-3">
                    <CustomTimePicker 
                      value={bedTime}
                      onChange={setBedTime}
                      is24Hour={false}
                    />
                  </div>
                  <p className="text-sm text-gray-300 max-w-lg mx-auto">
                    Your target bedtime helps us calculate the optimal cutoff time for caffeine. 
                    Most sleep experts recommend avoiding caffeine 8 hours before bedtime.
                  </p>
                </div>
              </div>
              
              {/* Half-life Input - Enhanced Centered Version */}
              <div className="mb-8 text-center">
                <h4 className="text-lg font-semibold text-primary-300 mb-4">Caffeine Metabolism (Half-Life in Hours)</h4>
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-dark-700 border-2 border-primary-500/30 rounded-xl p-5 shadow-lg w-full max-w-md mx-auto mb-3">
                    <div className="flex items-center justify-center space-x-4">
                      <input
                        type="range"
                        id="halfLife"
                        min="3"
                        max="7"
                        step="0.5"
                        value={halfLife}
                        onChange={(e) => setHalfLife(parseFloat(e.target.value))}
                        className="w-5/6 h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-2xl font-semibold text-white">{halfLife}h</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 max-w-lg mx-auto">
                    Average is 5-6 hours. Faster metabolism (lower value) if you're younger or very active. 
                    Slower (higher value) if you're older, pregnant, or take certain medications.
                  </p>
                </div>
              </div>
              
              {/* Caffeine Source Selection */}
              <div className="mb-6">
                <h4 className="text-md font-semibold mb-3">Add Caffeine Sources</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {CAFFEINE_SOURCES.map((source, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addCaffeineItem(source.name, source.amount)}
                      className="flex flex-col items-center justify-center p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors border border-dark-600"
                    >
                      <span className="text-2xl mb-1">{source.icon}</span>
                      <span className="text-sm font-medium">{source.name}</span>
                      <span className="text-xs text-primary-300">{source.amount} mg</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Source Input */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="customSource" className="block text-gray-300 mb-2">Custom Source</label>
                  <input
                    type="text"
                    id="customSource"
                    value={customSource}
                    onChange={(e) => setCustomSource(e.target.value)}
                    placeholder="e.g., Matcha Latte"
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="customAmount" className="block text-gray-300 mb-2">Caffeine (mg)</label>
                  <input
                    type="number"
                    id="customAmount"
                    value={customAmount || ''}
                    onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
                    placeholder="Amount in mg"
                    min="0"
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="customTime" className="block text-gray-300 mb-2">Time Consumed</label>
                  <div className="flex">
                    <input
                      type="time"
                      id="customTime"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="flex-1 bg-dark-700 border border-dark-600 rounded-l-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      type="button"
                      onClick={addCustomSource}
                      disabled={!customSource || customAmount <= 0}
                      className="bg-primary-600 text-white px-4 py-3 rounded-r-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              
              {/* List of Added Caffeine Items */}
              {caffeineItems.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-3">Your Caffeine Intake Today</h4>
                  <div className="bg-dark-700 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-dark-600">
                          <th className="text-left pb-2">Source</th>
                          <th className="text-center pb-2">Amount</th>
                          <th className="text-center pb-2">Time</th>
                          <th className="text-right pb-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {caffeineItems.map((item) => (
                          <tr key={item.id} className="border-b border-dark-600 last:border-0">
                            <td className="py-2">{item.source}</td>
                            <td className="text-center py-2">{item.amount} mg</td>
                            <td className="text-center py-2">{item.time}</td>
                            <td className="text-right py-2">
                              <button
                                type="button"
                                onClick={() => removeCaffeineItem(item.id)}
                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Calculate Button */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={calculateCaffeine}
                  disabled={caffeineItems.length === 0}
                  className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Caffeine Impact
                </button>
                {caffeineItems.length === 0 && (
                  <p className="text-sm text-gray-400 mt-2">Add at least one caffeine source to calculate</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results section */}
        {showResults && (
          <div ref={resultsRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl mb-8"
            >
              <h3 className="text-xl font-semibold text-primary-300 mb-4">Your Caffeine Analysis</h3>
              
              {/* Results Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <h4 className="text-sm text-gray-300 mb-1">Total Caffeine Today</h4>
                  <p className="text-2xl font-bold text-white">{totalCaffeine} mg</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {totalCaffeine <= 200 ? 'Moderate intake' : 
                     totalCaffeine <= 400 ? 'Within recommended daily limit' : 
                     'Above recommended daily limit (400mg)'}
                  </p>
                </div>
                
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <h4 className="text-sm text-gray-300 mb-1">Caffeine at Bedtime</h4>
                  <p className={`text-2xl font-bold ${caffeineAtBedtime < 30 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {caffeineAtBedtime} mg
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {caffeineAtBedtime < 30 ? 'Low enough for good sleep' : 
                     caffeineAtBedtime < 100 ? 'May disrupt sleep quality' : 
                     'Likely to significantly impact sleep'}
                  </p>
                </div>
                
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <h4 className="text-sm text-gray-300 mb-1">Recommended Cutoff</h4>
                  <p className="text-2xl font-bold text-primary-400">{cutoffTime}</p>
                  <p className="text-xs text-gray-400 mt-1">Last time to consume caffeine for optimal sleep</p>
                </div>
              </div>
              
              {/* Half-life Visualization */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-3">Caffeine Half-Life Visualization</h4>
                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                  <div className="h-60">
                    {caffeineItems.length > 0 && mounted && (
                      <Line
                        data={{
                          labels: generateTimeLabels(),
                          datasets: [
                            {
                              label: 'Caffeine Level (mg)',
                              data: generateCaffeineData(),
                              borderColor: 'rgba(96, 165, 250, 1)',
                              backgroundColor: 'rgba(96, 165, 250, 0.1)',
                              fill: true,
                              tension: 0.4,
                            },
                            {
                              label: 'Sleep Threshold (30mg)',
                              data: Array(24).fill(30),
                              borderColor: 'rgba(74, 222, 128, 0.6)',
                              borderWidth: 2,
                              borderDash: [5, 5],
                              pointRadius: 0,
                              fill: false,
                            }
                          ]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                              },
                              ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                              },
                              title: {
                                display: true,
                                text: 'Caffeine (mg)',
                                color: 'rgba(255, 255, 255, 0.7)',
                              }
                            },
                            x: {
                              grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                              },
                              ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                maxRotation: 45,
                                minRotation: 45,
                              }
                            }
                          },
                          plugins: {
                            legend: {
                              position: 'top',
                              labels: {
                                color: 'rgba(255, 255, 255, 0.7)',
                              }
                            },
                            tooltip: {
                              backgroundColor: 'rgba(15, 23, 42, 0.8)',
                              titleColor: 'rgba(255, 255, 255, 1)',
                              bodyColor: 'rgba(255, 255, 255, 0.8)',
                              borderColor: 'rgba(96, 165, 250, 0.5)',
                              borderWidth: 1,
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                  <div className="text-center mt-3">
                    <div className="inline-flex items-center px-3 py-1 bg-dark-800 rounded-full text-xs text-gray-300">
                      <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                      <span>Caffeine metabolizes with a half-life of {halfLife} hours in your body</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalized Recommendations */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-3">Personalized Recommendations</h4>
                <div className="bg-dark-700 rounded-lg p-5 border border-dark-600">
                  <div className={`mb-4 p-3 rounded-md ${safeToSleep ? 'bg-green-900/20 border border-green-800' : 'bg-yellow-900/20 border border-yellow-800'}`}>
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${safeToSleep ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                        {safeToSleep ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="M12 8v4"></path>
                            <path d="M12 16h.01"></path>
                          </svg>
                        )}
                      </div>
                      <div>
                        <h5 className={`font-medium ${safeToSleep ? 'text-green-500' : 'text-yellow-500'}`}>
                          {safeToSleep ? 'Your caffeine levels should not disrupt sleep' : 'Your caffeine levels may impact sleep quality'}
                        </h5>
                        <p className="text-sm text-gray-300 mt-1">
                          {safeToSleep 
                            ? `Based on your metabolism and intake, you'll have less than 30mg of caffeine in your system at bedtime. This is unlikely to interfere with your sleep.`
                            : `You'll have approximately ${caffeineAtBedtime}mg of caffeine in your system at bedtime. This may make it harder to fall asleep or reduce sleep quality.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h5 className="font-medium text-white mb-2">Recommendations for Better Sleep:</h5>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2">•</span>
                      <span>Stop consuming caffeine by {cutoffTime} ({RECOMMENDED_CUTOFF} hours before your bedtime)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2">•</span>
                      <span>Consider switching to decaffeinated options in the afternoon</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-400 mr-2">•</span>
                      <span>Remember that your caffeine half-life is {halfLife} hours, meaning it takes that long for your body to eliminate half of the caffeine</span>
                    </li>
                    {totalCaffeine > 400 && (
                      <li className="flex items-start">
                        <span className="text-primary-400 mr-2">•</span>
                        <span>Your total daily caffeine intake exceeds the recommended 400mg limit. Consider reducing your consumption for better overall health</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              
              {/* Caffeine Facts */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-3">Caffeine & Sleep Facts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                    <h5 className="font-medium text-primary-300 mb-2">How Caffeine Affects Sleep</h5>
                    <p className="text-sm text-gray-300">
                      Caffeine blocks adenosine receptors in your brain, preventing the buildup of sleep pressure 
                      that naturally occurs throughout the day. This can delay sleep onset, reduce total sleep time, 
                      and decrease the amount of restorative deep sleep you get.
                    </p>
                  </div>
                  <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                    <h5 className="font-medium text-primary-300 mb-2">Caffeine Half-Life Factors</h5>
                    <p className="text-sm text-gray-300">
                      Your body's ability to metabolize caffeine varies based on genetics, age, liver function, 
                      pregnancy status, and medications. Some people break down caffeine quickly (3-4 hours half-life) 
                      while others may take twice as long (6-7 hours).
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Other Tools */}
              <div className="mt-8 text-center">
                <h4 className="text-md font-semibold mb-4">Optimize Your Sleep Further</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/" className="flex items-center bg-dark-700 hover:bg-dark-600 px-4 py-3 rounded-lg transition-colors border border-dark-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400 mr-2">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                    <span>Sleep Calculator</span>
                  </Link>
                  <Link href="/smart-alarm" className="flex items-center bg-dark-700 hover:bg-dark-600 px-4 py-3 rounded-lg transition-colors border border-dark-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400 mr-2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span>Smart Alarm</span>
                  </Link>
                  <Link href="/sleep-tracker" className="flex items-center bg-dark-700 hover:bg-dark-600 px-4 py-3 rounded-lg transition-colors border border-dark-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400 mr-2">
                      <path d="M4 4v16"></path>
                      <path d="M4 12h13"></path>
                      <path d="m4 8 4 4-4 4"></path>
                      <path d="M20 20v-8"></path>
                    </svg>
                    <span>Sleep Tracker</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Caffeine Facts Carousel */}
        <div className="max-w-4xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl mb-8 mt-12">
          <h3 className="text-xl font-semibold text-primary-300 mb-4 text-center">Caffeine & Sleep Science</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-700 rounded-lg p-5 border border-dark-600 hover:border-primary-400/40 transition-colors">
              <div className="flex items-center justify-center mb-3 text-primary-300 text-3xl">☕</div>
              <h4 className="text-md font-medium text-center mb-2">Caffeine's Peak Effect</h4>
              <p className="text-sm text-gray-300 text-center">
                Caffeine typically reaches peak levels in your bloodstream 30-60 minutes after consumption, 
                but can remain active for 8-10+ hours depending on your metabolism.
              </p>
            </div>
            <div className="bg-dark-700 rounded-lg p-5 border border-dark-600 hover:border-primary-400/40 transition-colors">
              <div className="flex items-center justify-center mb-3 text-primary-300 text-3xl">🧠</div>
              <h4 className="text-md font-medium text-center mb-2">Why Caffeine Keeps You Alert</h4>
              <p className="text-sm text-gray-300 text-center">
                Caffeine molecules are similar to adenosine, a compound that builds up during the day making you sleepy.
                Caffeine blocks adenosine receptors, preventing your brain from receiving "time to sleep" signals.
              </p>
            </div>
            <div className="bg-dark-700 rounded-lg p-5 border border-dark-600 hover:border-primary-400/40 transition-colors">
              <div className="flex items-center justify-center mb-3 text-primary-300 text-3xl">⏱️</div>
              <h4 className="text-md font-medium text-center mb-2">Sensitivity Variations</h4>
              <p className="text-sm text-gray-300 text-center">
                Your sensitivity to caffeine is affected by genetics, age, medications, and even regular consumption patterns.
                Some people can metabolize caffeine up to 4x faster than others due to CYP1A2 gene variations.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl mb-8">
          <h3 className="text-xl font-semibold text-primary-300 mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div className="bg-dark-700 rounded-lg p-5 border border-dark-600">
              <h4 className="text-md font-semibold text-primary-400 mb-2">How accurate is the caffeine calculator?</h4>
              <p className="text-sm text-gray-300">
                The calculator provides a good estimate based on average caffeine metabolism rates. Everyone's body processes 
                caffeine differently, so results may vary. The half-life slider lets you adjust for your personal metabolism.
              </p>
            </div>
            
            <div className="bg-dark-700 rounded-lg p-5 border border-dark-600">
              <h4 className="text-md font-semibold text-primary-400 mb-2">What's the ideal cutoff time for caffeine?</h4>
              <p className="text-sm text-gray-300">
                Most sleep experts recommend avoiding caffeine 8 hours before bedtime. For sensitive individuals or those with 
                sleep disorders, a 10-12 hour cutoff may be better. Our calculator uses 8 hours as the recommended guideline.
              </p>
            </div>
            
            <div className="bg-dark-700 rounded-lg p-5 border border-dark-600">
              <h4 className="text-md font-semibold text-primary-400 mb-2">Can decaf coffee affect sleep?</h4>
              <p className="text-sm text-gray-300">
                Decaffeinated coffee still contains small amounts of caffeine (about 2-15mg per 8oz cup, compared to 95mg in regular coffee). 
                For most people this is negligible, but very sensitive individuals might still experience effects, especially in larger quantities.
              </p>
            </div>
            
            <div className="bg-dark-700 rounded-lg p-5 border border-dark-600">
              <h4 className="text-md font-semibold text-primary-400 mb-2">Does caffeine affect REM sleep?</h4>
              <p className="text-sm text-gray-300">
                Yes, studies show caffeine can reduce total sleep time and the amount of deep sleep (slow-wave) and REM sleep you get. 
                This can impact memory consolidation, learning, and mood regulation that occurs during these important sleep stages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 