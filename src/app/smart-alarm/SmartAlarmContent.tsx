"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, RadialLinearScale } from 'chart.js';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';
import Link from 'next/link';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend);

// Define chronotype options
const CHRONOTYPES = [
  { id: 'lion', name: 'Lion (Early Bird)', wakeupRange: '5:00 - 6:00 AM', peakAlertness: 'Morning' },
  { id: 'bear', name: 'Bear (Middle of the Road)', wakeupRange: '7:00 - 8:00 AM', peakAlertness: 'Mid-morning' },
  { id: 'wolf', name: 'Wolf (Night Owl)', wakeupRange: '8:00 - 9:00 AM', peakAlertness: 'Evening' },
  { id: 'dolphin', name: 'Dolphin (Light Sleeper)', wakeupRange: '6:30 - 7:30 AM', peakAlertness: 'Variable' },
];

// Sleep cycle duration in minutes
const SLEEP_CYCLE_DURATION = 90;

// Sleep inertia options
const SLEEP_INERTIA_OPTIONS = [
  { id: 'minimal', name: 'Minimal', duration: 15, description: 'Rarely feel groggy in the morning' },
  { id: 'moderate', name: 'Moderate', duration: 20, description: 'Sometimes feel groggy after waking up' },
  { id: 'heavy', name: 'Heavy', duration: 30, description: 'Often feel very groggy and disoriented when waking up' },
];

export default function SmartAlarmContent() {
  // State for user inputs
  const [bedTime, setBedTime] = useState('22:30');
  const [desiredWakeTime, setDesiredWakeTime] = useState('07:00');
  const [chronotype, setChronotype] = useState('bear');
  const [sleepInertia, setSleepInertia] = useState('moderate');
  const [activityTime, setActivityTime] = useState('08:30');
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Results state
  const [optimalWakeupTimes, setOptimalWakeupTimes] = useState<string[]>([]);
  const [suggestedAlarmTime, setSuggestedAlarmTime] = useState('');
  const [suggestedBedTime, setSuggestedBedTime] = useState('');
  const [sleepDuration, setSleepDuration] = useState(0);
  const [sleepCycles, setSleepCycles] = useState(0);
  const [morningRoutineTimes, setMorningRoutineTimes] = useState<{ activity: string; time: string }[]>([]);
  
  // Ref for results section scrolling
  const resultsRef = useRef<HTMLDivElement>(null);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate all optimal wake-up times based on sleep cycles
  const calculateOptimalWakeupTimes = () => {
    // Get bedtime as Date object
    const [bedHours, bedMinutes] = bedTime.split(':').map(Number);
    let bedDateTime = new Date();
    bedDateTime.setHours(bedHours, bedMinutes, 0, 0);
    
    // Calculate optimal wake up times (4-6 cycles)
    const times: string[] = [];
    const selectedInertia = SLEEP_INERTIA_OPTIONS.find(option => option.id === sleepInertia);
    const inertiaMinutes = selectedInertia ? selectedInertia.duration : 20;
    
    // Calculate for 4, 5, and 6 complete sleep cycles
    for (let cycles = 4; cycles <= 6; cycles++) {
      const wakeDateTime = new Date(bedDateTime.getTime() + (cycles * SLEEP_CYCLE_DURATION * 60 * 1000));
      // Adjust for sleep inertia by subtracting inertia time
      const adjustedWakeTime = new Date(wakeDateTime.getTime() - (inertiaMinutes * 60 * 1000));
      
      // Format the time
      let hours = adjustedWakeTime.getHours();
      const minutes = adjustedWakeTime.getMinutes();
      
      times.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    }
    
    return times;
  };

  // Select the best wake-up time based on desired wake time and chronotype
  const findBestWakeupTime = (optimalTimes: string[]) => {
    if (optimalTimes.length === 0) return '';
    
    const [desiredHours, desiredMinutes] = desiredWakeTime.split(':').map(Number);
    const desiredTimeMinutes = desiredHours * 60 + desiredMinutes;
    
    // Convert all optimal times to minutes for comparison
    const timesInMinutes = optimalTimes.map(time => {
      const [hours, minutes] = time.split(':').map(Number);
      let timeInMinutes = hours * 60 + minutes;
      
      // Handle times past midnight
      if (timeInMinutes < 4 * 60) { // if before 4 AM, assume it's the next day
        timeInMinutes += 24 * 60;
      }
      
      return { time, minutes: timeInMinutes };
    });
    
    // Find the closest time to the desired wake-up time
    const sortedTimes = [...timesInMinutes].sort((a, b) => 
      Math.abs(a.minutes - desiredTimeMinutes) - Math.abs(b.minutes - desiredTimeMinutes)
    );
    
    return sortedTimes[0].time;
  };

  // Generate morning routine schedule based on wake-up time
  const generateMorningRoutine = (wakeupTime: string) => {
    if (!wakeupTime) return [];
    
    const [wakeHours, wakeMinutes] = wakeupTime.split(':').map(Number);
    let wakeupDate = new Date();
    wakeupDate.setHours(wakeHours, wakeMinutes, 0, 0);
    
    const selectedInertia = SLEEP_INERTIA_OPTIONS.find(option => option.id === sleepInertia);
    const inertiaMinutes = selectedInertia ? selectedInertia.duration : 20;
    
    const routine = [
      { activity: 'Wake up', time: formatTime(wakeupDate) },
      { activity: 'Feel alert (after sleep inertia)', time: formatTime(new Date(wakeupDate.getTime() + inertiaMinutes * 60 * 1000)) },
      { activity: 'Light stretching or yoga', time: formatTime(new Date(wakeupDate.getTime() + (inertiaMinutes + 10) * 60 * 1000)) },
      { activity: 'Hydration & breakfast', time: formatTime(new Date(wakeupDate.getTime() + (inertiaMinutes + 25) * 60 * 1000)) },
      { activity: 'Main morning activity', time: activityTime }
    ];
    
    return routine;
  };

  // Helper function to format time
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Calculate sleep duration in hours
  const calculateSleepDuration = (start: string, end: string): number => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    
    let hours = endHours - startHours;
    let minutes = endMinutes - startMinutes;
    
    if (hours < 0) hours += 24; // Handle overnight sleep
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    
    return Number((hours + (minutes / 60)).toFixed(1));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate optimal wake-up times
    const optimalTimes = calculateOptimalWakeupTimes();
    setOptimalWakeupTimes(optimalTimes);
    
    // Find the best wake-up time
    const bestTime = findBestWakeupTime(optimalTimes);
    setSuggestedAlarmTime(bestTime);
    
    // Calculate sleep duration
    const duration = calculateSleepDuration(bedTime, bestTime);
    setSleepDuration(duration);
    
    // Calculate number of sleep cycles
    const cycles = Math.round(duration * 60 / SLEEP_CYCLE_DURATION);
    setSleepCycles(cycles);
    
    // Generate morning routine
    const routine = generateMorningRoutine(bestTime);
    setMorningRoutineTimes(routine);
    
    // Calculate suggested bedtime based on desired wake time
    const [desiredWakeHours, desiredWakeMinutes] = desiredWakeTime.split(':').map(Number);
    let wakeupDate = new Date();
    wakeupDate.setHours(desiredWakeHours, desiredWakeMinutes, 0, 0);
    
    // Calculate back from desired wake time
    const idealCycles = 5; // Ideal is 5 sleep cycles (7.5 hours)
    const selectedInertia = SLEEP_INERTIA_OPTIONS.find(option => option.id === sleepInertia);
    const inertiaMinutes = selectedInertia ? selectedInertia.duration : 20;
    
    // Calculate ideal bedtime by going back idealCycles * SLEEP_CYCLE_DURATION minutes + inertia
    const idealBedTime = new Date(wakeupDate.getTime() - ((idealCycles * SLEEP_CYCLE_DURATION) + inertiaMinutes) * 60 * 1000);
    setSuggestedBedTime(formatTime(idealBedTime));
    
    // Show results and scroll to results section
    setShowResults(true);
    
    // Scroll to results after a small delay to ensure the component has rendered
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
            Smart Alarm <span className="text-primary-400">Calculator</span>
          </h1>
          <h2 className="text-xl text-center text-primary-300 mb-6">Calculate Optimal Wake-Up Times Using Sleep Cycles</h2>
          <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
            Our advanced Smart Alarm Calculator helps you determine the ideal time to wake up based on your sleep cycles, chronotype, and sleep inertia. Get personalized recommendations for better mornings and more energized days.
          </p>
          
          {/* Input Form */}
          <div className="max-w-3xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl mb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="bedTime" className="block text-gray-300 mb-2">Bedtime</label>
                  <input
                    type="time"
                    id="bedTime"
                    value={bedTime}
                    onChange={(e) => setBedTime(e.target.value)}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">When you plan to go to sleep</p>
                </div>
                
                <div>
                  <label htmlFor="desiredWakeTime" className="block text-gray-300 mb-2">Desired Wake-up Time</label>
                  <input
                    type="time"
                    id="desiredWakeTime"
                    value={desiredWakeTime}
                    onChange={(e) => setDesiredWakeTime(e.target.value)}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Your target time to wake up</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="chronotype" className="block text-gray-300 mb-2">Your Chronotype</label>
                <select
                  id="chronotype"
                  value={chronotype}
                  onChange={(e) => setChronotype(e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  {CHRONOTYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Your natural sleep-wake preference</p>
                
                {/* CTA for Chronotype Analyzer */}
                <div className="mt-3 p-3 bg-primary-900/30 rounded-lg">
                  <p className="text-sm text-gray-200 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>
                      Not sure about your chronotype? <Link href="/chronotype-analyzer" className="text-primary-400 hover:underline font-medium">Take our Chronotype Quiz</Link> to discover whether you're a Lion, Bear, Wolf, or Dolphin.
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="sleepInertia" className="block text-gray-300 mb-2">Sleep Inertia Level</label>
                <select
                  id="sleepInertia"
                  value={sleepInertia}
                  onChange={(e) => setSleepInertia(e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  {SLEEP_INERTIA_OPTIONS.map(option => (
                    <option key={option.id} value={option.id}>{option.name} - {option.description}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">How long it typically takes you to feel fully alert after waking up</p>
              </div>
              
              <div className="mb-8">
                <label htmlFor="activityTime" className="block text-gray-300 mb-2">Morning Activity Time</label>
                <input
                  type="time"
                  id="activityTime"
                  value={activityTime}
                  onChange={(e) => setActivityTime(e.target.value)}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">When you need to be fully alert for work/exercise/etc.</p>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Calculate Optimal Wake Time
                </button>
              </div>
            </form>
          </div>
          
          {/* Results Section */}
          {showResults && (
            <div ref={resultsRef} className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                  Your Personalized <span className="text-primary-400">Smart Alarm</span> Results
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {/* Primary Recommendation */}
                  <div className="bg-dark-800 rounded-xl p-6 shadow-xl border border-primary-600/30">
                    <h3 className="text-xl font-bold mb-4 text-primary-300">Optimal Alarm Time</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-dark-700 rounded-lg p-4 text-center w-full">
                        <span className="block text-3xl font-bold text-primary-400 mb-1">{suggestedAlarmTime}</span>
                        <span className="text-sm text-gray-300">Set your alarm for this time</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      This time is optimized based on your sleep cycles ({sleepCycles} full cycles) and accounts for 
                      your {SLEEP_INERTIA_OPTIONS.find(o => o.id === sleepInertia)?.name.toLowerCase()} sleep inertia.
                    </p>
                    <div className="mt-4 p-3 bg-primary-900/30 rounded-lg text-sm">
                      <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Waking up at this time will help you feel more refreshed and alert
                      </p>
                    </div>
                  </div>
                  
                  {/* Sleep Statistics */}
                  <div className="bg-dark-800 rounded-xl p-6 shadow-xl border border-dark-700">
                    <h3 className="text-xl font-bold mb-4 text-primary-300">Sleep Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Bedtime:</span>
                        <span className="font-semibold text-primary-200">{bedTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Wake Time:</span>
                        <span className="font-semibold text-primary-200">{suggestedAlarmTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Sleep:</span>
                        <span className="font-semibold text-primary-200">{sleepDuration} hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Sleep Cycles:</span>
                        <span className="font-semibold text-primary-200">{sleepCycles} cycles</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Chronotype:</span>
                        <span className="font-semibold text-primary-200">
                          {CHRONOTYPES.find(c => c.id === chronotype)?.name.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Alternative Wake Times */}
                <div className="bg-dark-800 rounded-xl p-6 shadow-xl border border-dark-700 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary-300">Alternative Wake-Up Times</h3>
                  <p className="text-gray-300 mb-4">
                    These times correspond to waking up at the end of a complete sleep cycle to minimize grogginess.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {optimalWakeupTimes.map((time, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg text-center ${
                          time === suggestedAlarmTime 
                            ? 'bg-primary-600/40 border border-primary-500' 
                            : 'bg-dark-700'
                        }`}
                      >
                        <div className="text-xl font-semibold mb-1">
                          {time}
                        </div>
                        <div className="text-xs text-gray-400">
                          {index + 4} cycles • {((index + 4) * 1.5).toFixed(1)} hrs
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Morning Routine */}
                <div className="bg-dark-800 rounded-xl p-6 shadow-xl border border-dark-700 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary-300">Your Morning Routine Timeline</h3>
                  <div className="space-y-2 mb-4">
                    {morningRoutineTimes.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-3 bg-dark-700 rounded-lg"
                      >
                        <div className="w-16 text-primary-400 font-mono font-semibold">{item.time}</div>
                        <div className="w-full pl-3">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Following this timeline helps you make the most of your natural alertness patterns.
                  </p>
                </div>
                
                {/* Visualization Section */}
                <div className="bg-dark-800 rounded-xl p-6 shadow-xl border border-dark-700 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary-300">Sleep Cycle Visualization</h3>
                  <div className="aspect-w-16 aspect-h-9 bg-dark-700 rounded-lg overflow-hidden mb-4">
                    <div className="p-4 h-full">
                      <Bar
                        data={{
                          labels: ['Deep Sleep', 'Light Sleep', 'REM Sleep', 'Wake'],
                          datasets: [
                            {
                              label: 'Hours in Each Sleep Stage',
                              data: [
                                sleepDuration * 0.25, // Deep sleep ~25% of total sleep
                                sleepDuration * 0.45, // Light sleep ~45% of total sleep
                                sleepDuration * 0.25, // REM sleep ~25% of total sleep
                                sleepDuration * 0.05, // Wake ~5% of total sleep
                              ],
                              backgroundColor: [
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 99, 132, 0.5)',
                              ],
                              borderColor: [
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(255, 99, 132)',
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          plugins: {
                            legend: {
                              position: 'top',
                              labels: {
                                color: 'white',
                              },
                            },
                            title: {
                              display: true,
                              text: 'Estimated Sleep Stages',
                              color: 'white',
                            },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              ticks: {
                                color: 'white',
                              },
                              grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                              },
                            },
                            x: {
                              ticks: {
                                color: 'white',
                              },
                              grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    This visualization shows the estimated time spent in each sleep stage during your {sleepDuration} hours of sleep.
                    Waking up at the end of a complete sleep cycle helps you avoid interrupting deep sleep.
                  </p>
                </div>
                
                {/* Recommendations */}
                <div className="bg-dark-800 rounded-xl p-6 shadow-xl border border-dark-700 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary-300">Personalized Recommendations</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-dark-700 rounded-lg">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h4 className="text-lg font-semibold">Ideal Bedtime Adjustment</h4>
                      </div>
                      <p className="ml-8 text-gray-300">
                        For your desired wake-up time of {desiredWakeTime}, try going to bed at <span className="font-semibold text-primary-300">{suggestedBedTime}</span> to optimize your sleep cycles.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-dark-700 rounded-lg">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-lg font-semibold">Sleep Inertia Management</h4>
                      </div>
                      <p className="ml-8 text-gray-300">
                        Allow {SLEEP_INERTIA_OPTIONS.find(o => o.id === sleepInertia)?.duration} minutes after waking for sleep inertia to dissipate.
                        Use this time for gentle stretching or light exposure to help your body fully wake up.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-dark-700 rounded-lg">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <h4 className="text-lg font-semibold">Chronotype Optimization</h4>
                      </div>
                      <p className="ml-8 text-gray-300">
                        As a {CHRONOTYPES.find(c => c.id === chronotype)?.name}, your peak alertness is typically in the {CHRONOTYPES.find(c => c.id === chronotype)?.peakAlertness}.
                        Schedule your most demanding tasks during this time when possible.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Health Integration Features */}
                <div className="bg-dark-800 rounded-xl p-6 shadow-xl border border-dark-700 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-primary-300">Health Integration Features</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-dark-700 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <h4 className="font-semibold">Smart Home Integration</h4>
                      </div>
                      <p className="text-sm text-gray-300">
                        Connect your smart home devices to gradually increase light intensity 30 minutes before your alarm time to prepare your body to wake up naturally.
                      </p>
                    </div>
                    
                    <div className="bg-dark-700 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <h4 className="font-semibold">Activity Tracking</h4>
                      </div>
                      <p className="text-sm text-gray-300">
                        Sync with fitness trackers to monitor how your morning exercise aligns with your optimal alertness window for maximum performance benefits.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-900/30 p-4 rounded-lg text-sm">
                    <p className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>
                        Consistency is key. Using this smart alarm system regularly helps train your body's circadian rhythm, making it easier to wake up naturally over time.
                      </span>
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-dark-700 hover:bg-dark-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Recalculate
                  </button>
                  
                  <button
                    onClick={() => {
                      // This would typically trigger calendar integration functionality
                      alert("This would set an alarm and add to your calendar in a real application.");
                    }}
                    className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Set Alarm & Add to Calendar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Info Section */}
          <div className="max-w-4xl mx-auto mt-12 mb-8 bg-dark-800 rounded-xl p-6 shadow-xl border border-dark-700">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary-300">How the Smart Alarm Calculator Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary-200">Sleep Cycles Explained</h3>
                <p className="text-gray-300 text-sm">
                  Each night, you progress through multiple sleep cycles lasting approximately 90 minutes each. 
                  Each cycle includes stages of light sleep, deep sleep, and REM sleep. Waking up during deep 
                  sleep can cause grogginess and fatigue, while waking at the end of a cycle can help you feel 
                  more refreshed.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary-200">Sleep Inertia</h3>
                <p className="text-gray-300 text-sm">
                  Sleep inertia is the temporary feeling of grogginess that occurs immediately after waking up.
                  It typically lasts 15-30 minutes depending on the individual, and is influenced by which sleep 
                  stage you were in when you woke up. Our calculator factors this in to ensure you're fully alert
                  when you need to be.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary-200">Chronotype Optimization</h3>
                <p className="text-gray-300 text-sm">
                  Your chronotype represents your natural tendency to sleep and wake at certain times.
                  The four main chronotypes (Lion, Bear, Wolf, and Dolphin) have different optimal wake 
                  times and alertness patterns. Our calculator adjusts recommendations based on your 
                  chronotype to work with your natural biology.
                </p>
                <div className="mt-3 flex justify-center">
                  <Link 
                    href="/chronotype-analyzer" 
                    className="bg-primary-600/40 hover:bg-primary-600/60 font-medium rounded-lg px-4 py-2 inline-flex items-center transition-colors text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Discover Your Chronotype
                  </Link>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary-200">Morning Routine Planning</h3>
                <p className="text-gray-300 text-sm">
                  A consistent morning routine helps reinforce your circadian rhythm and prepares your 
                  body and mind for the day ahead. Our timeline suggestions account for sleep inertia 
                  and help you schedule activities when you're naturally more alert, improving both 
                  productivity and wellbeing.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 