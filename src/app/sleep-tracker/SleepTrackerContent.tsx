"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import SleepHealthInsights from '@/components/sleep/SleepHealthInsights';
import SleepStatistics from '@/components/sleep/SleepStatistics';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Interface for our sleep log entry
interface SleepLogEntry {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  sleepQuality: number; // 1-10
  mood: number; // 1-5
  energy: number; // 1-5
  notes?: string; // Make notes optional
}

const QUALITY_LABELS = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
const MOOD_LABELS = ["Very Bad", "Bad", "Neutral", "Good", "Very Good"];
const ENERGY_LABELS = ["Very Low", "Low", "Moderate", "High", "Very High"];

export default function SleepTrackerContent() {
  // Define all possible tab types, including 'intro' which is used for the overview tab
  type TabType = 'intro' | 'log' | 'report' | 'recommendations' | 'trends' | 'health' | 'stats';
  const [activeTab, setActiveTab] = useState<TabType>('intro');
  const [sleepLogs, setSleepLogs] = useState<SleepLogEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Form state
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bedTime, setBedTime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [sleepQuality, setSleepQuality] = useState(5);
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Document title
  useEffect(() => {
    if (mounted) {
      document.title = "Sleep Quality Tracker - Sleep Calculator";
    }
  }, [mounted]);

  // Load sleep logs from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLogs = localStorage.getItem('sleepLogs');
      if (savedLogs) {
        setSleepLogs(JSON.parse(savedLogs));
      }
    }
  }, []);

  // Save logs to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && sleepLogs.length > 0) {
      localStorage.setItem('sleepLogs', JSON.stringify(sleepLogs));
    }
  }, [sleepLogs]);

  // Calculate sleep duration in hours
  const calculateSleepDuration = (bedTime: string, wakeTime: string): number => {
    const [bedHours, bedMinutes] = bedTime.split(':').map(Number);
    const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);
    
    let hours = wakeHours - bedHours;
    let minutes = wakeMinutes - bedMinutes;
    
    if (hours < 0) hours += 24; // Handle overnight sleep
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    
    return hours + (minutes / 60);
  };

  // Submit sleep log entry
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: SleepLogEntry = {
      id: Date.now().toString(),
      date,
      bedTime,
      wakeTime,
      sleepQuality,
      mood,
      energy
      // Removed notes
    };
    
    setSleepLogs(prev => [...prev, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    
    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setBedTime('22:00');
    setWakeTime('07:00');
    setSleepQuality(5);
    setMood(3);
    setEnergy(3);
    
    // Navigate to sleep report tab after logging sleep
    setActiveTab('report');
  };

  // Function to scroll to the log sleep heading
  const scrollToLogSleepHeading = () => {
    setTimeout(() => {
      const heading = document.getElementById('log-sleep-heading');
      if (heading) {
        // Scroll to bring the heading to the top of the viewport
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add additional offset to ensure the heading is fully visible
        window.scrollBy({
          top: -20, // Small negative offset to ensure proper spacing
          behavior: 'smooth'
        });
      }
    }, 200); // Increased delay to ensure element is fully rendered
  };

  // Calculate data for charts
  const prepareChartData = () => {
    const lastTwoWeeks = sleepLogs
      .filter(log => {
        const logDate = new Date(log.date);
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        return logDate > twoWeeksAgo;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const labels = lastTwoWeeks.map(log => {
      const date = new Date(log.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    const sleepDurations = lastTwoWeeks.map(log => 
      calculateSleepDuration(log.bedTime, log.wakeTime)
    );
    
    const qualityData = lastTwoWeeks.map(log => log.sleepQuality);
    const moodData = lastTwoWeeks.map(log => log.mood);
    const energyData = lastTwoWeeks.map(log => log.energy);
    
    return {
      labels,
      sleepDurations,
      qualityData,
      moodData,
      energyData
    };
  };

  // Generate recommendations based on sleep data
  const generateRecommendations = () => {
    if (sleepLogs.length < 3) return [
      "Log at least 3 days of sleep data to receive personalized recommendations."
    ];
    
    const recommendations: { category: string; text: string; priority: 'high' | 'medium' | 'low' }[] = [];
    
    // Calculate averages
    const totalEntries = sleepLogs.length;
    const avgSleepDuration = sleepLogs.reduce((sum, log) => 
      sum + calculateSleepDuration(log.bedTime, log.wakeTime), 0) / totalEntries;
    const avgQuality = sleepLogs.reduce((sum, log) => sum + log.sleepQuality, 0) / totalEntries;
    const avgMood = sleepLogs.reduce((sum, log) => sum + log.mood, 0) / totalEntries;
    const avgEnergy = sleepLogs.reduce((sum, log) => sum + log.energy, 0) / totalEntries;
    
    // Sort logs by date
    const sortedLogs = [...sleepLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate time consistency
    const bedTimes = sortedLogs.map(log => {
      const [hours, minutes] = log.bedTime.split(':').map(Number);
      return hours * 60 + minutes;
    });
    
    const wakeTimes = sortedLogs.map(log => {
      const [hours, minutes] = log.wakeTime.split(':').map(Number);
      return hours * 60 + minutes;
    });
    
    const bedTimeVariance = Math.max(...bedTimes) - Math.min(...bedTimes);
    const wakeTimeVariance = Math.max(...wakeTimes) - Math.min(...wakeTimes);
    
    // Duration recommendations
    if (avgSleepDuration < 6) {
      recommendations.push({ 
        category: 'Sleep Duration',
        text: "Your average sleep duration is significantly below the recommended 7-9 hours. This can lead to serious health issues over time. Try going to bed 1 hour earlier or waking up 1 hour later.",
        priority: 'high'
      });
    } else if (avgSleepDuration < 7) {
      recommendations.push({ 
        category: 'Sleep Duration',
        text: "Your average sleep duration is below the recommended 7-9 hours. Try going to bed 30 minutes earlier to increase your total sleep time.",
        priority: 'medium'
      });
    } else if (avgSleepDuration > 9) {
      recommendations.push({ 
        category: 'Sleep Duration',
        text: "You're getting more than 9 hours of sleep on average. While this might feel good, excessive sleep can sometimes lead to grogginess and may disrupt your body's natural rhythm. Consider a more consistent schedule with 7-9 hours of sleep.",
        priority: 'low'
      });
    } else {
      recommendations.push({
        category: 'Sleep Duration',
        text: "You're getting an optimal amount of sleep (7-9 hours) which is excellent for your overall health and cognitive function. Continue maintaining this healthy duration.",
        priority: 'low'
      });
    }
    
    // Quality recommendations
    if (avgQuality < 4) {
      recommendations.push({
        category: 'Sleep Quality',
        text: "Your sleep quality ratings are very low. Focus on improving your sleep environment - ensure your room is dark, quiet, and cool. Consider investing in a better mattress or pillow if discomfort is an issue.",
        priority: 'high'
      });
    } else if (avgQuality < 6) {
      recommendations.push({
        category: 'Sleep Quality',
        text: "Your sleep quality could be improved. Consider limiting screen time before bed, reducing caffeine intake in the afternoon, and creating a relaxing bedtime routine.",
        priority: 'medium'
      });
    } else {
      recommendations.push({
        category: 'Sleep Quality',
        text: "Your sleep quality ratings are good. Continue your healthy sleep habits and consider introducing relaxation techniques like deep breathing or meditation before bed to maintain or further improve quality.",
        priority: 'low'
      });
    }
    
    // Consistency recommendations
    if (bedTimeVariance > 120) {
      recommendations.push({
        category: 'Sleep Consistency',
        text: "Your bedtimes vary by more than 2 hours. This significant inconsistency can disrupt your circadian rhythm and make it harder to fall asleep. Try to establish a consistent bedtime, even on weekends.",
        priority: 'high'
      });
    } else if (bedTimeVariance > 60) {
      recommendations.push({
        category: 'Sleep Consistency',
        text: "Your bedtimes vary by more than an hour. Try to establish a more consistent sleep schedule, aiming to go to bed within a 30-minute window each night.",
        priority: 'medium'
      });
    }
    
    if (wakeTimeVariance > 120) {
      recommendations.push({
        category: 'Sleep Consistency',
        text: "Your wake times vary by more than 2 hours. This significant inconsistency can severely disrupt your circadian rhythm. Try to maintain a consistent wake time, even on weekends and days off.",
        priority: 'high'
      });
    } else if (wakeTimeVariance > 60) {
      recommendations.push({
        category: 'Sleep Consistency',
        text: "Your wake times vary by more than an hour. A consistent wake time helps regulate your body's internal clock. Try to wake up at the same time every day, including weekends.",
        priority: 'medium'
      });
    }
    
    // Look for patterns in notes
    const notesWithContent = sortedLogs.filter(log => log.notes && log.notes.trim().length > 0);
    
    if (notesWithContent.length > 0) {
      // Check for common factors mentioned in notes
      const lowerCaseNotes = notesWithContent.map(log => (log.notes || '').toLowerCase());
      
      if (lowerCaseNotes.some(note => note.includes('caffeine') || note.includes('coffee') || note.includes('tea') || note.includes('energy drink'))) {
        recommendations.push({
          category: 'Lifestyle Factors',
          text: "Caffeine appears in your sleep notes. Consider limiting caffeine to morning hours only, at least 8-10 hours before bedtime, as it can stay in your system for many hours.",
          priority: 'medium'
        });
      }
      
      if (lowerCaseNotes.some(note => note.includes('stress') || note.includes('anxious') || note.includes('anxiety') || note.includes('worried'))) {
        recommendations.push({
          category: 'Mental Wellbeing',
          text: "Stress or anxiety appears in your sleep notes. Consider incorporating stress-reduction techniques like meditation, journaling, or deep breathing exercises before bed.",
          priority: 'high'
        });
      }
      
      if (lowerCaseNotes.some(note => note.includes('screen') || note.includes('phone') || note.includes('tv') || note.includes('laptop') || note.includes('computer'))) {
        recommendations.push({
          category: 'Sleep Hygiene',
          text: "Screen usage appears in your sleep notes. The blue light from screens can interfere with melatonin production. Try to avoid screens for at least 1 hour before bedtime or use blue light filters.",
          priority: 'medium'
        });
      }
      
      if (lowerCaseNotes.some(note => note.includes('alcohol') || note.includes('drink') || note.includes('wine') || note.includes('beer'))) {
        recommendations.push({
          category: 'Lifestyle Factors',
          text: "Alcohol consumption appears in your sleep notes. While alcohol might help you fall asleep faster, it often reduces sleep quality and disrupts REM sleep. Consider limiting alcohol, especially close to bedtime.",
          priority: 'high'
        });
      }
    }
    
    // Add some general recommendations if we don't have many specific ones
    if (recommendations.length < 3) {
      recommendations.push({
        category: 'Sleep Environment',
        text: "Optimize your sleep environment by keeping your bedroom cool (65-68°F/18-20°C), dark, and quiet. Consider using blackout curtains, white noise machines, or earplugs if needed.",
        priority: 'medium'
      });
      
      recommendations.push({
        category: 'Sleep Hygiene',
        text: "Establish a relaxing pre-sleep routine to signal to your body that it's time to wind down. This could include reading, gentle stretching, or taking a warm bath.",
        priority: 'medium'
      });
    }
    
    // Sort recommendations by priority
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  // Calculate sleep cycle data for trends
  const calculateSleepTrendData = () => {
    if (sleepLogs.length < 3) return null;
    
    const sortedLogs = [...sleepLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate sleep consistency
    const bedTimeConsistency = calculateTimeConsistency(sortedLogs.map(log => log.bedTime));
    const wakeTimeConsistency = calculateTimeConsistency(sortedLogs.map(log => log.wakeTime));
    
    // Calculate averages by day of week
    const dayAverages = calculateDayOfWeekAverages(sortedLogs);
    
    // Calculate correlation between sleep quality and other factors
    const qualityVsDurationCorrelation = calculateCorrelation(
      sortedLogs.map(log => log.sleepQuality),
      sortedLogs.map(log => calculateSleepDuration(log.bedTime, log.wakeTime))
    );
    
    const qualityVsMoodCorrelation = calculateCorrelation(
      sortedLogs.map(log => log.sleepQuality),
      sortedLogs.map(log => log.mood)
    );
    
    const qualityVsEnergyCorrelation = calculateCorrelation(
      sortedLogs.map(log => log.sleepQuality),
      sortedLogs.map(log => log.energy)
    );
    
    return {
      bedTimeConsistency,
      wakeTimeConsistency,
      dayAverages,
      qualityVsDurationCorrelation,
      qualityVsMoodCorrelation,
      qualityVsEnergyCorrelation
    };
  };
  
  // Calculate time consistency (lower is more consistent)
  const calculateTimeConsistency = (times: string[]): number => {
    const minutesArray = times.map(time => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    });
    
    // Adjust for the day wrapping (e.g., 23:45 vs 00:15 should be considered close)
    for (let i = 0; i < minutesArray.length; i++) {
      if (minutesArray[i] > 18 * 60) { // after 6pm
        minutesArray[i] = minutesArray[i] - 24 * 60;
      }
    }
    
    // Calculate standard deviation
    const avg = minutesArray.reduce((sum, val) => sum + val, 0) / minutesArray.length;
    const squareDiffs = minutesArray.map(value => {
      const diff = value - avg;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
    const standardDeviation = Math.sqrt(avgSquareDiff);
    
    // Convert back to minutes
    return standardDeviation;
  };
  
  // Calculate day of week averages
  const calculateDayOfWeekAverages = (logs: SleepLogEntry[]) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayAverages: {[key: string]: { count: number, duration: number, quality: number, mood: number, energy: number }} = {};
    
    days.forEach(day => {
      dayAverages[day] = { count: 0, duration: 0, quality: 0, mood: 0, energy: 0 };
    });
    
    logs.forEach(log => {
      const date = new Date(log.date);
      const day = days[date.getDay()];
      const duration = calculateSleepDuration(log.bedTime, log.wakeTime);
      
      dayAverages[day].count += 1;
      dayAverages[day].duration += duration;
      dayAverages[day].quality += log.sleepQuality;
      dayAverages[day].mood += log.mood;
      dayAverages[day].energy += log.energy;
    });
    
    // Calculate averages
    days.forEach(day => {
      if (dayAverages[day].count > 0) {
        dayAverages[day].duration /= dayAverages[day].count;
        dayAverages[day].quality /= dayAverages[day].count;
        dayAverages[day].mood /= dayAverages[day].count;
        dayAverages[day].energy /= dayAverages[day].count;
      }
    });
    
    return dayAverages;
  };
  
  // Calculate correlation coefficient between two sets of data
  const calculateCorrelation = (x: number[], y: number[]): number => {
    const n = x.length;
    if (n !== y.length || n < 3) return 0;
    
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
  };

  // Prepare data for visualization
  const trendData = mounted && sleepLogs.length >= 3 ? calculateSleepTrendData() : null;
  const chartData = mounted && sleepLogs.length > 0 ? prepareChartData() : null;
  const recommendations = mounted ? generateRecommendations() : [];

  // Reset button clicked state when going back to intro tab
  useEffect(() => {
    if (activeTab === 'intro') {
      setButtonClicked(false);
    }
  }, [activeTab]);

  if (!mounted) return null;
  
  return (
    <>
      <main className="min-h-screen bg-dark-900 text-white py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
              Sleep Quality <span className="text-primary-400">Tracker</span>
            </h1>
            <h2 className="text-xl text-center text-primary-300 mb-6">Analyze, Visualize, and Improve Your Sleep Patterns</h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-8">
              Our advanced Sleep Quality Tracker helps you monitor your sleep patterns, identify trends, and receive personalized recommendations to optimize your rest. Track your mood, energy levels, and sleep quality to unlock better sleep and more energized days.
            </p>
            
            {/* Main CTA Button - Only show if not clicked and on intro tab */}
            {activeTab === 'intro' && !buttonClicked && (
              <motion.div 
                className="flex justify-center mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => {
                    setButtonClicked(true);
                    // Always navigate to log tab first
                    setActiveTab('log');
                    // Scroll to the log sleep heading
                    scrollToLogSleepHeading();
                  }}
                  className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Start Tracking Sleep Quality
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            )}

            {/* Tab Navigation - Show for all users */}
            <div className="flex justify-center mb-8 overflow-x-auto">
              <div className="flex flex-wrap justify-center space-x-1 md:space-x-2 bg-dark-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('intro' as TabType)}
                  className={`px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                    activeTab === 'intro' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('log')}
                  className={`px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                    activeTab === 'log' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Log Sleep
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                    activeTab === 'report' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sleep Report
                </button>
                <button
                  onClick={() => setActiveTab('trends')}
                  className={`px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                    activeTab === 'trends' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sleep Trends
                </button>
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className={`px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                    activeTab === 'recommendations' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Recommendations
                </button>
                <button
                  onClick={() => setActiveTab('health')}
                  className={`px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                    activeTab === 'health' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Health Insights
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
                    activeTab === 'stats' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sleep Statistics
                </button>
              </div>
            </div>

            {/* Now include all the tab content sections, each conditional on the active tab */}
            
            {/* Feature Highlights - Only show on intro tab */}
            {activeTab === 'intro' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
                <motion.div 
                  className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="text-primary-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Track Daily Sleep</h3>
                  <p className="text-gray-300">Log your sleep times, quality, mood, and energy levels to build a complete picture of your sleep health.</p>
                  <button 
                    onClick={() => setActiveTab('log')} 
                    className="mt-4 text-primary-400 hover:text-primary-300 transition-colors font-medium flex items-center"
                  >
                    Start Tracking
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
                
                <motion.div 
                  className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="text-primary-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Visualize Patterns</h3>
                  <p className="text-gray-300">Interactive charts and reports help you visualize trends in your sleep duration, quality, and energy levels.</p>
                  <button 
                    onClick={() => setActiveTab('report')} 
                    className="mt-4 text-primary-400 hover:text-primary-300 transition-colors font-medium flex items-center"
                  >
                    View Reports
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
                
                <motion.div 
                  className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="text-primary-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Get Recommendations</h3>
                  <p className="text-gray-300">Receive personalized sleep improvement recommendations based on your unique sleep patterns.</p>
                  <button 
                    onClick={() => setActiveTab('recommendations')} 
                    className="mt-4 text-primary-400 hover:text-primary-300 transition-colors font-medium flex items-center"
                  >
                    See Insights
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
                
                <motion.div 
                  className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="text-primary-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sleep Health Insights</h3>
                  <p className="text-gray-300">Explore the science behind sleep and its critical impact on your physical and mental health.</p>
                  <button 
                    onClick={() => setActiveTab('health')} 
                    className="mt-4 text-primary-400 hover:text-primary-300 transition-colors font-medium flex items-center"
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
                
                <motion.div 
                  className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div className="text-primary-400 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sleep Statistics</h3>
                  <p className="text-gray-300">Compare your sleep patterns with global averages and discover fascinating facts about sleep around the world.</p>
                  <button 
                    onClick={() => setActiveTab('stats')} 
                    className="mt-4 text-primary-400 hover:text-primary-300 transition-colors font-medium flex items-center"
                  >
                    View Statistics
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            )}
            
            {/* Benefits Section */}
            {activeTab === 'intro' && (
              <div className="max-w-4xl mx-auto mb-12">
                <h3 className="text-2xl font-bold text-center mb-8">How Better Sleep Tracking <span className="text-primary-400">Benefits You</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-primary-900/30 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Increased Energy</h4>
                      <p className="text-gray-300">Optimize your sleep patterns to wake up naturally refreshed and maintain energy throughout the day.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-900/30 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Improved Health</h4>
                      <p className="text-gray-300">Better sleep quality contributes to improved immune function, heart health, and weight management.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-900/30 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Enhanced Mood</h4>
                      <p className="text-gray-300">Consistent quality sleep helps regulate mood, reducing irritability and improving emotional resilience.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-900/30 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Better Cognitive Performance</h4>
                      <p className="text-gray-300">Optimal sleep enhances memory, concentration, problem-solving abilities, and overall mental clarity.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* NEW: Getting Started Guide - Added for better UX */}
            {activeTab === 'intro' && (
              <motion.div 
                className="max-w-4xl mx-auto mb-12 bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl overflow-hidden shadow-lg border border-dark-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-primary-900/20 py-4 px-6 border-b border-dark-700">
                  <h3 className="text-2xl font-bold">
                    <span className="text-primary-400">Getting Started</span> With Sleep Tracking
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary-900/30 text-primary-400 rounded-full mb-4 text-2xl font-bold">1</div>
                      <h4 className="text-lg font-semibold mb-2">Log Your Sleep</h4>
                      <p className="text-gray-300 text-sm">Record your bedtime, wake time, sleep quality, mood, and energy levels daily for at least a week.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary-900/30 text-primary-400 rounded-full mb-4 text-2xl font-bold">2</div>
                      <h4 className="text-lg font-semibold mb-2">Review Your Trends</h4>
                      <p className="text-gray-300 text-sm">Examine your sleep patterns through interactive charts to identify trends and opportunities.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary-900/30 text-primary-400 rounded-full mb-4 text-2xl font-bold">3</div>
                      <h4 className="text-lg font-semibold mb-2">Apply Improvements</h4>
                      <p className="text-gray-300 text-sm">Implement personalized recommendations and track how they impact your sleep quality over time.</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button 
                      onClick={() => {
                        setActiveTab('log');
                        setButtonClicked(true);
                        scrollToLogSleepHeading();
                      }} 
                      className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center group"
                    >
                      Start Your Sleep Journal
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Sleep Science Facts - Interactive Slider */}
            {activeTab === 'intro' && (
              <motion.div 
                className="max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-center mb-6">Fascinating <span className="text-primary-400">Sleep Science</span> Facts</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-900">
                    <div className="text-primary-400 text-3xl mb-2 font-bold">90</div>
                    <h4 className="text-lg font-semibold mb-3">Minutes in a Sleep Cycle</h4>
                    <p className="text-gray-300 text-sm">The average sleep cycle lasts about 90 minutes, with each cycle including light sleep, deep sleep, and REM sleep. Most adults need 4-6 complete cycles per night.</p>
                  </div>
                  
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-900">
                    <div className="text-primary-400 text-3xl mb-2 font-bold">25%</div>
                    <h4 className="text-lg font-semibold mb-3">Of Sleep is REM</h4>
                    <p className="text-gray-300 text-sm">REM (Rapid Eye Movement) sleep typically accounts for 25% of your total sleep time. This is when most dreaming occurs and is crucial for memory consolidation and learning.</p>
                  </div>
                  
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-900">
                    <div className="text-primary-400 text-3xl mb-2 font-bold">16-20%</div>
                    <h4 className="text-lg font-semibold mb-3">Is Deep Sleep</h4>
                    <p className="text-gray-300 text-sm">Deep sleep (slow-wave sleep) makes up about 16-20% of sleep in healthy adults. This stage is critical for physical restoration, immune function, and growth hormone release.</p>
                  </div>
                  
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary-900">
                    <div className="text-primary-400 text-3xl mb-2 font-bold">7-14</div>
                    <h4 className="text-lg font-semibold mb-3">Day Reset Period</h4>
                    <p className="text-gray-300 text-sm">It takes 7-14 days of consistent sleep patterns to reset your circadian rhythm. This is why tracking your sleep for at least two weeks provides the most meaningful insights.</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm italic mb-2">Regular sleep tracking helps identify how these factors impact your personal sleep quality</p>
                  <button 
                    onClick={() => setActiveTab('health')} 
                    className="text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium"
                  >
                    Learn more about sleep science
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* FAQ Section for Sleep Tracking */}
            {activeTab === 'intro' && (
              <motion.div 
                className="max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked <span className="text-primary-400">Questions</span></h3>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 hover:border-primary-700 transition-colors duration-300">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      How long should I track my sleep to see meaningful patterns?
                    </h4>
                    <p className="text-gray-300 pl-7">For meaningful insights, we recommend tracking your sleep for at least 2 weeks. This provides enough data to identify patterns related to your sleep quality, duration, and consistency. The longer you track, the more personalized your recommendations will become.</p>
                  </div>
                  
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 hover:border-primary-700 transition-colors duration-300">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      Is my sleep data saved securely?
                    </h4>
                    <p className="text-gray-300 pl-7">Your sleep data is stored locally in your browser using secure local storage. We don't send your data to any servers - it stays on your device only. If you clear your browser data, your sleep logs will be reset.</p>
                  </div>
                  
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 hover:border-primary-700 transition-colors duration-300">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      How accurate are the sleep recommendations?
                    </h4>
                    <p className="text-gray-300 pl-7">Our recommendations are based on sleep science research and the patterns detected in your personal sleep data. While they provide valuable guidance, they aren't meant to replace medical advice. For serious sleep concerns, please consult a healthcare professional.</p>
                  </div>
                  
                  <div className="bg-dark-800 p-5 rounded-xl border border-dark-700 hover:border-primary-700 transition-colors duration-300">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      How does sleep tracking improve my sleep quality?
                    </h4>
                    <p className="text-gray-300 pl-7">Simply becoming aware of your sleep patterns often leads to better sleep habits. Our tracker helps you identify specific factors affecting your sleep, suggests personalized improvements, and motivates you to maintain consistent sleep hygiene practices over time.</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => {
                      setButtonClicked(true);
                      setActiveTab('log');
                      scrollToLogSleepHeading();
                    }} 
                    className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    Start Tracking Your Sleep Now
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Log Sleep Form */}
            {activeTab === 'log' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl"
              >
                <h2 id="log-sleep-heading" className="text-2xl font-semibold mb-3 text-center">Log Your Sleep</h2>
                <p className="text-gray-300 text-center mb-6">Track your sleep patterns to receive personalized insights and recommendations</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="date" className="block text-gray-300">Date</label>
                        <div className="relative group">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="absolute right-0 bottom-6 w-48 bg-dark-700 p-2 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Select the date you went to sleep (not when you woke up).
                          </div>
                        </div>
                      </div>
                      <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="bedTime" className="block text-gray-300">Bed Time</label>
                          <div className="relative group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="absolute right-0 bottom-6 w-48 bg-dark-700 p-2 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                              When you got into bed and tried to sleep, not when you started getting ready for bed.
                            </div>
                          </div>
                        </div>
                        <input
                          type="time"
                          id="bedTime"
                          value={bedTime}
                          onChange={(e) => setBedTime(e.target.value)}
                          required
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="wakeTime" className="block text-gray-300">Wake Time</label>
                          <div className="relative group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="absolute right-0 bottom-6 w-48 bg-dark-700 p-2 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                              When you woke up for the final time, not when you got out of bed.
                            </div>
                          </div>
                        </div>
                        <input
                          type="time"
                          id="wakeTime"
                          value={wakeTime}
                          onChange={(e) => setWakeTime(e.target.value)}
                          required
                          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-gray-300">Sleep Quality (1-10)</label>
                      <div className="relative group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="absolute right-0 bottom-6 w-64 bg-dark-700 p-2 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          Rate how well you slept overall: 1 = Very poor sleep, lots of disturbances; 10 = Excellent, deep uninterrupted sleep
                        </div>
                      </div>
                    </div>
                    <div className="bg-dark-700 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={sleepQuality}
                          onChange={(e) => setSleepQuality(Number(e.target.value))}
                          className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <span className="text-white font-medium w-8 text-center">{sleepQuality}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-300">Mood Today (1-5)</label>
                        <div className="relative group">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="absolute right-0 bottom-6 w-48 bg-dark-700 p-2 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            How you're feeling emotionally since waking up
                          </div>
                        </div>
                      </div>
                      <div className="bg-dark-700 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={mood}
                            onChange={(e) => setMood(Number(e.target.value))}
                            className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                          />
                          <span className="text-white font-medium">{MOOD_LABELS[mood-1]}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Very Bad</span>
                          <span>Very Good</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-gray-300">Energy Level (1-5)</label>
                        <div className="relative group">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="absolute right-0 bottom-6 w-48 bg-dark-700 p-2 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Your physical energy level after waking up
                          </div>
                        </div>
                      </div>
                      <div className="bg-dark-700 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={energy}
                            onChange={(e) => setEnergy(Number(e.target.value))}
                            className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-500"
                          />
                          <span className="text-white font-medium">{ENERGY_LABELS[energy-1]}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Very Low</span>
                          <span>Very High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    {calculateSleepDuration(bedTime, wakeTime) > 0 && (
                      <div className="text-center mb-4 p-3 bg-primary-900/20 rounded-lg">
                        <p className="text-gray-300">
                          Sleep duration: <span className="text-primary-400 font-semibold">{calculateSleepDuration(bedTime, wakeTime).toFixed(1)} hours</span>
                          {calculateSleepDuration(bedTime, wakeTime) < 7 && (
                            <span className="text-yellow-400 text-sm block mt-1">This is below the recommended 7-9 hours for adults</span>
                          )}
                          {calculateSleepDuration(bedTime, wakeTime) > 9 && (
                            <span className="text-yellow-400 text-sm block mt-1">This is above the recommended 7-9 hours for adults</span>
                          )}
                        </p>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-white px-5 py-4 text-center transition-colors"
                    >
                      Save Sleep Log
                    </button>
                  </div>
                  
                  {sleepLogs.length > 0 && (
                    <div className="pt-4 border-t border-dark-700 mt-8">
                      <p className="text-sm text-center text-gray-400 mb-4">
                        You've logged {sleepLogs.length} {sleepLogs.length === 1 ? 'entry' : 'entries'} so far.
                        {sleepLogs.length >= 3 ? (
                          <span> View your <button onClick={() => setActiveTab('recommendations')} className="text-primary-400 hover:text-primary-300">personalized recommendations</button>.</span>
                        ) : (
                          <span> Log at least 3 entries to receive personalized recommendations.</span>
                        )}
                      </p>
                    </div>
                  )}
                </form>
              </motion.div>
            )}
            
            {/* Sleep Report */}
            {activeTab === 'report' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold">Your Sleep Report</h2>
                  
                  {sleepLogs.length > 0 && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to clear all your sleep logs? This action cannot be undone.')) {
                          setSleepLogs([]);
                          localStorage.removeItem('sleepLogs');
                          setActiveTab('log');
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      Clear Sleep Logs
                    </button>
                  )}
                </div>
                
                {sleepLogs.length === 0 ? (
                  <div className="bg-dark-800 rounded-xl p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">No Sleep Data Yet</h3>
                    <p className="text-gray-400 mb-6">Start logging your sleep to generate your personal sleep report.</p>
                    <button
                      onClick={() => setActiveTab('log')}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg transition-colors"
                    >
                      Log Your First Sleep Entry
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Sleep Duration Chart */}
                    {chartData && (
                      <div className="bg-dark-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Sleep Duration (Last 2 Weeks)</h3>
                        <div className="h-64">
                          <Line
                            data={{
                              labels: chartData.labels,
                              datasets: [
                                {
                                  label: 'Sleep Duration (hours)',
                                  data: chartData.sleepDurations,
                                  borderColor: 'rgba(124, 58, 237, 1)',
                                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                                  tension: 0.3,
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
                                    color: 'rgba(255, 255, 255, 0.1)'
                                  },
                                  ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                  }
                                },
                                x: {
                                  grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                  },
                                  ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                  }
                                }
                              },
                              plugins: {
                                legend: {
                                  labels: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Quality, Mood & Energy Chart */}
                    {chartData && (
                      <div className="bg-dark-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Quality, Mood & Energy</h3>
                        <div className="h-64">
                          <Bar
                            data={{
                              labels: chartData.labels,
                              datasets: [
                                {
                                  label: 'Sleep Quality',
                                  data: chartData.qualityData,
                                  backgroundColor: 'rgba(124, 58, 237, 0.6)',
                                },
                                {
                                  label: 'Mood',
                                  data: chartData.moodData,
                                  backgroundColor: 'rgba(59, 130, 246, 0.6)',
                                },
                                {
                                  label: 'Energy',
                                  data: chartData.energyData,
                                  backgroundColor: 'rgba(16, 185, 129, 0.6)',
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                y: {
                                  beginAtZero: true,
                                  max: 10,
                                  grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                  },
                                  ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                  }
                                },
                                x: {
                                  grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                  },
                                  ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                  }
                                }
                              },
                              plugins: {
                                legend: {
                                  labels: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Recent Sleep Logs */}
                    <div className="bg-dark-700 p-4 rounded-lg overflow-x-auto">
                      <h3 className="text-lg font-medium mb-4">Recent Sleep Logs</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-400 border-b border-dark-600">
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Bed Time</th>
                            <th className="px-4 py-2 text-left">Wake Time</th>
                            <th className="px-4 py-2 text-center">Duration</th>
                            <th className="px-4 py-2 text-center">Quality</th>
                            <th className="px-4 py-2 text-center">Mood</th>
                            <th className="px-4 py-2 text-center">Energy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sleepLogs.slice(-10).reverse().map(log => (
                            <tr key={log.id} className="border-b border-dark-600 hover:bg-dark-600">
                              <td className="px-4 py-3">{new Date(log.date).toLocaleDateString()}</td>
                              <td className="px-4 py-3">{log.bedTime}</td>
                              <td className="px-4 py-3">{log.wakeTime}</td>
                              <td className="px-4 py-3 text-center">{calculateSleepDuration(log.bedTime, log.wakeTime).toFixed(1)}h</td>
                              <td className="px-4 py-3 text-center">{log.sleepQuality}</td>
                              <td className="px-4 py-3 text-center">{MOOD_LABELS[log.mood-1]}</td>
                              <td className="px-4 py-3 text-center">{ENERGY_LABELS[log.energy-1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Sleep Trends */}
            {activeTab === 'trends' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center">Sleep Trends Analysis</h2>
                
                {sleepLogs.length < 3 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">At least 3 sleep entries are needed for trend analysis.</p>
                    <button
                      onClick={() => setActiveTab('log')}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg transition-colors"
                    >
                      Log Sleep Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Sleep Consistency Analysis */}
                    {trendData && (
                      <div className="bg-dark-700 p-5 rounded-lg">
                        <h3 className="text-xl font-medium mb-4">Sleep Schedule Consistency</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg text-gray-300 mb-3">Bedtime Consistency</h4>
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-200 bg-primary-900/30">
                                    {trendData.bedTimeConsistency < 30 ? 'Very Consistent' : 
                                     trendData.bedTimeConsistency < 60 ? 'Consistent' : 
                                     trendData.bedTimeConsistency < 90 ? 'Moderately Consistent' : 'Inconsistent'}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-semibold inline-block text-primary-200">
                                    {trendData.bedTimeConsistency.toFixed(0)} min variation
                                  </span>
                                </div>
                              </div>
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-600">
                                <div 
                                  style={{ width: `${Math.max(0, 100 - trendData.bedTimeConsistency/1.2)}%` }} 
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                                ></div>
                              </div>
                              <p className="text-sm text-gray-400">
                                {trendData.bedTimeConsistency < 30 ? 'You go to bed at very consistent times, which is excellent for your circadian rhythm.' : 
                                 trendData.bedTimeConsistency < 60 ? 'Your bedtimes are fairly consistent. Aim to keep within a 30-minute window for optimal results.' : 
                                 trendData.bedTimeConsistency < 90 ? 'Your bedtimes vary moderately. Try to make them more consistent.' : 
                                 'Your bedtimes vary significantly which can disrupt your circadian rhythm.'}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg text-gray-300 mb-3">Wake Time Consistency</h4>
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-200 bg-primary-900/30">
                                    {trendData.wakeTimeConsistency < 30 ? 'Very Consistent' : 
                                     trendData.wakeTimeConsistency < 60 ? 'Consistent' : 
                                     trendData.wakeTimeConsistency < 90 ? 'Moderately Consistent' : 'Inconsistent'}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-semibold inline-block text-primary-200">
                                    {trendData.wakeTimeConsistency.toFixed(0)} min variation
                                  </span>
                                </div>
                              </div>
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-600">
                                <div 
                                  style={{ width: `${Math.max(0, 100 - trendData.wakeTimeConsistency/1.2)}%` }} 
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                                ></div>
                              </div>
                              <p className="text-sm text-gray-400">
                                {trendData.wakeTimeConsistency < 30 ? 'You wake up at very consistent times, which is excellent for your circadian rhythm.' : 
                                 trendData.wakeTimeConsistency < 60 ? 'Your wake times are fairly consistent. Aim to keep within a 30-minute window for optimal results.' : 
                                 trendData.wakeTimeConsistency < 90 ? 'Your wake times vary moderately. Try to make them more consistent.' : 
                                 'Your wake times vary significantly which can disrupt your circadian rhythm.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Day of Week Analysis */}
                    {trendData && trendData.dayAverages && (
                      <div className="bg-dark-700 p-5 rounded-lg">
                        <h3 className="text-xl font-medium mb-4">Day of Week Patterns</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="text-gray-400 border-b border-dark-600">
                                <th className="px-4 py-2 text-left">Day</th>
                                <th className="px-4 py-2 text-center">Entries</th>
                                <th className="px-4 py-2 text-center">Avg Duration</th>
                                <th className="px-4 py-2 text-center">Avg Quality</th>
                                <th className="px-4 py-2 text-center">Avg Mood</th>
                                <th className="px-4 py-2 text-center">Avg Energy</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(trendData.dayAverages).map(([day, data]) => (
                                <tr key={day} className={`border-b border-dark-600 hover:bg-dark-600 ${data.count === 0 ? 'opacity-50' : ''}`}>
                                  <td className="px-4 py-3">{day}</td>
                                  <td className="px-4 py-3 text-center">{data.count}</td>
                                  <td className="px-4 py-3 text-center">
                                    {data.count > 0 ? data.duration.toFixed(1) + 'h' : '-'}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    {data.count > 0 ? data.quality.toFixed(1) : '-'}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    {data.count > 0 ? MOOD_LABELS[Math.round(data.mood)-1] : '-'}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    {data.count > 0 ? ENERGY_LABELS[Math.round(data.energy)-1] : '-'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="mt-4 p-4 bg-dark-800 rounded-lg">
                          <h4 className="text-md font-medium mb-2">Insights:</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {Object.entries(trendData.dayAverages)
                              .filter(([_, data]) => data.count > 0)
                              .sort((a, b) => b[1].quality - a[1].quality)
                              .slice(0, 1)
                              .map(([day, data]) => (
                                <li key={`best-${day}`}>• Best sleep quality on <span className="text-primary-400">{day}</span> (average: {data.quality.toFixed(1)})</li>
                              ))
                            }
                            
                            {Object.entries(trendData.dayAverages)
                              .filter(([_, data]) => data.count > 0)
                              .sort((a, b) => a[1].quality - b[1].quality)
                              .slice(0, 1)
                              .map(([day, data]) => (
                                <li key={`worst-${day}`}>• Worst sleep quality on <span className="text-primary-400">{day}</span> (average: {data.quality.toFixed(1)})</li>
                              ))
                            }
                            
                            {Object.entries(trendData.dayAverages)
                              .filter(([_, data]) => data.count > 0)
                              .sort((a, b) => b[1].duration - a[1].duration)
                              .slice(0, 1)
                              .map(([day, data]) => (
                                <li key={`longest-${day}`}>• Longest sleep duration on <span className="text-primary-400">{day}</span> ({data.duration.toFixed(1)} hours)</li>
                              ))
                            }
                            
                            {Object.entries(trendData.dayAverages)
                              .filter(([_, data]) => data.count > 0)
                              .sort((a, b) => b[1].energy - a[1].energy)
                              .slice(0, 1)
                              .map(([day, data]) => (
                                <li key={`energy-${day}`}>• Highest energy levels on <span className="text-primary-400">{day}</span> ({ENERGY_LABELS[Math.round(data.energy)-1]})</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {/* Correlation Analysis */}
                    {trendData && (
                      <div className="bg-dark-700 p-5 rounded-lg">
                        <h3 className="text-xl font-medium mb-4">Sleep Quality Correlations</h3>
                        <p className="text-sm text-gray-300 mb-4">
                          These charts show how different factors correlate with your sleep quality
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-dark-800 p-3 rounded-lg">
                            <h4 className="text-md font-medium mb-2 text-center">Quality vs. Duration</h4>
                            <div className="flex justify-center items-center h-24">
                              <div className="relative w-24 h-24">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                                  <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke={trendData.qualityVsDurationCorrelation > 0 ? "#8b5cf6" : "#ef4444"} 
                                    strokeWidth="10"
                                    strokeDasharray={`${Math.abs(trendData.qualityVsDurationCorrelation) * 283} 283`}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-lg font-bold">
                                    {Math.abs(trendData.qualityVsDurationCorrelation).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-400">
                              {Math.abs(trendData.qualityVsDurationCorrelation) < 0.2 ? "Little to no correlation" :
                               Math.abs(trendData.qualityVsDurationCorrelation) < 0.4 ? "Weak correlation" :
                               Math.abs(trendData.qualityVsDurationCorrelation) < 0.6 ? "Moderate correlation" :
                               Math.abs(trendData.qualityVsDurationCorrelation) < 0.8 ? "Strong correlation" :
                               "Very strong correlation"}
                              {trendData.qualityVsDurationCorrelation > 0 ? " (positive)" : " (negative)"}
                            </p>
                          </div>
                          
                          <div className="bg-dark-800 p-3 rounded-lg">
                            <h4 className="text-md font-medium mb-2 text-center">Quality vs. Mood</h4>
                            <div className="flex justify-center items-center h-24">
                              <div className="relative w-24 h-24">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                                  <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke={trendData.qualityVsMoodCorrelation > 0 ? "#8b5cf6" : "#ef4444"} 
                                    strokeWidth="10"
                                    strokeDasharray={`${Math.abs(trendData.qualityVsMoodCorrelation) * 283} 283`}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-lg font-bold">
                                    {Math.abs(trendData.qualityVsMoodCorrelation).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-400">
                              {Math.abs(trendData.qualityVsMoodCorrelation) < 0.2 ? "Little to no correlation" :
                               Math.abs(trendData.qualityVsMoodCorrelation) < 0.4 ? "Weak correlation" :
                               Math.abs(trendData.qualityVsMoodCorrelation) < 0.6 ? "Moderate correlation" :
                               Math.abs(trendData.qualityVsMoodCorrelation) < 0.8 ? "Strong correlation" :
                               "Very strong correlation"}
                              {trendData.qualityVsMoodCorrelation > 0 ? " (positive)" : " (negative)"}
                            </p>
                          </div>
                          
                          <div className="bg-dark-800 p-3 rounded-lg">
                            <h4 className="text-md font-medium mb-2 text-center">Quality vs. Energy</h4>
                            <div className="flex justify-center items-center h-24">
                              <div className="relative w-24 h-24">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                                  <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke={trendData.qualityVsEnergyCorrelation > 0 ? "#8b5cf6" : "#ef4444"} 
                                    strokeWidth="10"
                                    strokeDasharray={`${Math.abs(trendData.qualityVsEnergyCorrelation) * 283} 283`}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-lg font-bold">
                                    {Math.abs(trendData.qualityVsEnergyCorrelation).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-400">
                              {Math.abs(trendData.qualityVsEnergyCorrelation) < 0.2 ? "Little to no correlation" :
                               Math.abs(trendData.qualityVsEnergyCorrelation) < 0.4 ? "Weak correlation" :
                               Math.abs(trendData.qualityVsEnergyCorrelation) < 0.6 ? "Moderate correlation" :
                               Math.abs(trendData.qualityVsEnergyCorrelation) < 0.8 ? "Strong correlation" :
                               "Very strong correlation"}
                              {trendData.qualityVsEnergyCorrelation > 0 ? " (positive)" : " (negative)"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Recommendations */}
            {activeTab === 'recommendations' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto bg-dark-800 rounded-xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-semibold mb-2 text-center">
                  <span className="text-primary-400">Personalized</span> Sleep Recommendations
                </h2>
                
                <p className="text-center text-gray-300 mb-6">
                  Based on your unique sleep patterns, we've identified specific areas for improvement
                </p>
                
                {sleepLogs.length < 3 ? (
                  <div className="text-center py-8">
                    <div className="bg-primary-900/30 inline-block p-4 rounded-full mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 mb-4">Log at least 3 days of sleep data to receive personalized recommendations.</p>
                    <button
                      onClick={() => setActiveTab('log')}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg transition-colors"
                    >
                      Log Sleep Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Personalized Recommendations */}
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <motion.div 
                          key={index} 
                          className={`p-5 rounded-lg border-l-4 ${
                            typeof rec !== 'string' && rec.priority === 'high' ? 'border-red-500 bg-red-900/10' : 
                            typeof rec !== 'string' && rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-900/10' : 
                            'border-green-500 bg-green-900/10'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {typeof rec === 'string' ? (
                            <div className="text-gray-200">{rec}</div>
                          ) : (
                            <div className="flex items-start">
                              <div className="mr-3">
                                {rec.priority === 'high' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                ) : rec.priority === 'medium' ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h3 className={`text-md font-semibold mb-1 ${
                                  rec.priority === 'high' ? 'text-red-400' : 
                                  rec.priority === 'medium' ? 'text-yellow-400' : 
                                  'text-green-400'
                                }`}>
                                  {rec.category}
                                </h3>
                                <p className="text-gray-200">{rec.text}</p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Sleep Insights Summary */}
                    <div className="bg-primary-900/20 p-5 rounded-lg mt-8">
                      <h3 className="text-lg font-medium mb-3">Your Sleep Profile</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-dark-800/50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-400 mb-1">Average Sleep Duration</p>
                          <p className="text-xl text-primary-400 font-semibold">
                            {(sleepLogs.reduce((sum, log) => sum + calculateSleepDuration(log.bedTime, log.wakeTime), 0) / sleepLogs.length).toFixed(1)}
                            <span className="text-sm ml-1">hours</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(sleepLogs.reduce((sum, log) => sum + calculateSleepDuration(log.bedTime, log.wakeTime), 0) / sleepLogs.length) < 7 ? "Below recommended" : 
                             (sleepLogs.reduce((sum, log) => sum + calculateSleepDuration(log.bedTime, log.wakeTime), 0) / sleepLogs.length) > 9 ? "Above recommended" : 
                             "Within recommended range"}
                          </p>
                        </div>
                        
                        <div className="bg-dark-800/50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-400 mb-1">Average Sleep Quality</p>
                          <p className="text-xl text-primary-400 font-semibold">
                            {(sleepLogs.reduce((sum, log) => sum + log.sleepQuality, 0) / sleepLogs.length).toFixed(1)}
                            <span className="text-sm ml-1">/ 10</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(sleepLogs.reduce((sum, log) => sum + log.sleepQuality, 0) / sleepLogs.length) < 5 ? "Needs improvement" : 
                             (sleepLogs.reduce((sum, log) => sum + log.sleepQuality, 0) / sleepLogs.length) < 7 ? "Fair" : 
                             "Good quality"}
                          </p>
                        </div>
                        
                        <div className="bg-dark-800/50 p-3 rounded-lg text-center">
                          <p className="text-sm text-gray-400 mb-1">Sleep Records</p>
                          <p className="text-xl text-primary-400 font-semibold">
                            {sleepLogs.length}
                            <span className="text-sm ml-1">entries</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {sleepLogs.length < 7 ? "Keep logging for better insights" : 
                             sleepLogs.length < 14 ? "Good data collection" : 
                             "Excellent tracking!"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expert Sleep Tips */}
                    <div className="p-5 bg-dark-700 rounded-lg">
                      <h3 className="text-lg font-medium mb-3">Expert Sleep Tips</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span><strong>Consistent Schedule:</strong> Maintain a consistent sleep schedule, even on weekends. Your body thrives on routine.</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span><strong>Optimal Environment:</strong> Create a restful environment that is cool (65-68°F/18-20°C), dark, and quiet.</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span><strong>Screen Curfew:</strong> Avoid screens (phones, tablets, computers) for at least 1 hour before bedtime, as blue light suppresses melatonin production.</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span><strong>Mindful Consumption:</strong> Limit caffeine after 2pm and avoid large meals, alcohol, and excessive fluids close to bedtime.</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span><strong>Wind Down Routine:</strong> Develop a relaxing pre-sleep routine, such as reading, gentle stretching, or meditation to signal to your body it's time to sleep.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setActiveTab('log')}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg transition-colors mr-4"
                      >
                        Log More Sleep Data
                      </button>
                      <button
                        onClick={() => setActiveTab('trends')}
                        className="bg-dark-700 hover:bg-dark-600 text-white px-5 py-2 rounded-lg transition-colors"
                      >
                        View Sleep Trends
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Health Insights Tab */}
            {activeTab === 'health' && (
              <SleepHealthInsights onSelectTab={(tab: string) => setActiveTab(tab as TabType)} />
            )}
            
            {/* Sleep Statistics Tab */}
            {activeTab === 'stats' && (
              <SleepStatistics 
                userAverage={sleepLogs.length > 0 
                  ? sleepLogs.reduce((sum, log) => sum + calculateSleepDuration(log.bedTime, log.wakeTime), 0) / sleepLogs.length 
                  : undefined} 
              />
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
} 