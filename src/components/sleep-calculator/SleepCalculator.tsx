"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomTimePicker from '@/components/ui/CustomTimePicker';
import { calculateBedtimes, calculateWakeUpTimes } from '@/utils/date/calculations';
import { formatTimeAmPm, parseTimeString } from '@/utils/date/formatters';
import { SLEEP_CYCLE_DURATION, RECOMMENDED_CYCLES } from '@/constants/sleepCalculator';

type SleepCalculatorProps = {
  mode: 'wakeup' | 'sleep';
};

const SleepCalculator = ({ mode }: SleepCalculatorProps) => {
  const [time, setTime] = useState<string>(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });
  
  const [results, setResults] = useState<Date[]>([]);
  const [copied, setCopied] = useState(false);
  
  // Define calculateSleepTimes with useCallback
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
  
  // Calculate sleep times when time changes or mode changes
  useEffect(() => {
    calculateSleepTimes();
  }, [calculateSleepTimes]);
  
  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
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
        `${formatTimeAmPm(time)} (${getSleepDuration(getCycleCount(i))} of sleep)`
      ).join('\n') +
      '\nCalculated with Sleep Cycle Calculator';
    
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
  
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <label htmlFor="time-input" className="block mb-4 text-sm font-medium text-gray-300">
          {mode === 'wakeup' ? 'I want to wake up at:' : 'I want to go to bed at:'}
        </label>
        
        <CustomTimePicker value={time} onChange={handleTimeChange} />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'wakeup' ? 'Go to bed at one of these times:' : 'Wake up at one of these times:'}
        </h2>
        
        <div className="grid gap-3">
          <AnimatePresence>
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`glass-card p-4 flex justify-between items-center ${
                  isRecommended(index) ? 'border-primary-500' : ''
                }`}
              >
                <div>
                  <div className="text-xl font-bold text-white">{formatTimeAmPm(result)}</div>
                  <div className="text-sm text-gray-400">
                    {getCycleCount(index)} cycles • {getSleepDuration(getCycleCount(index))} of sleep
                  </div>
                </div>
                
                {isRecommended(index) && (
                  <div className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    Recommended
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-2 flex justify-center">
        <button 
          onClick={handleShareResults}
          className="btn-secondary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          {copied ? 'Copied!' : 'Share Results'}
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-dark-700/30 rounded-lg">
        <h3 className="text-sm font-medium text-primary-400 mb-2">How it works</h3>
        <p className="text-sm text-gray-300">
          This calculator helps you plan sleep times based on 90-minute sleep cycles. 
          It accounts for the average 15 minutes it takes to fall asleep.
          For healthy adults, 5-6 complete cycles (7.5-9 hours) is ideal.
        </p>
      </div>
    </div>
  );
};

export default SleepCalculator; 