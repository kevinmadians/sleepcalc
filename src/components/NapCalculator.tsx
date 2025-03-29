"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import CustomTimePicker from './CustomTimePicker';

// Constants
const POWER_NAP = 20; // minutes
const SHORT_NAP = 30; // minutes
const RECOVERY_NAP = 60; // minutes
const FULL_CYCLE_NAP = 90; // minutes

const napOptions = [
  { 
    duration: POWER_NAP, 
    name: 'Power Nap', 
    description: 'Quick refresh without entering deep sleep',
    benefits: 'Increases alertness and concentration',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 8 4 4-4 4"></path>
        <path d="m2 12 4-4 4 4-4 4Z"></path>
        <path d="M10 12h10"></path>
      </svg>
    )
  },
  { 
    duration: SHORT_NAP, 
    name: 'Short Nap', 
    description: 'Light sleep phase for quick recovery',
    benefits: 'Improves mood and reduces fatigue',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  { 
    duration: RECOVERY_NAP, 
    name: 'Recovery Nap', 
    description: 'Reaches deep sleep for better restoration',
    benefits: 'Enhances memory and cognitive processing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8"></path>
        <path d="m16 6-4 4-4-4"></path>
        <path d="M12 14v8"></path>
        <path d="m8 18 4-4 4 4"></path>
      </svg>
    )
  },
  { 
    duration: FULL_CYCLE_NAP, 
    name: 'Full Cycle Nap', 
    description: 'Complete sleep cycle including REM',
    benefits: 'Maximum restoration, creativity boost',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8"></circle>
        <path d="M12 2v4"></path>
        <path d="M12 18v4"></path>
        <path d="M4.93 4.93l2.83 2.83"></path>
        <path d="M16.24 16.24l2.83 2.83"></path>
        <path d="M2 12h4"></path>
        <path d="M18 12h4"></path>
        <path d="M4.93 19.07l2.83-2.83"></path>
        <path d="M16.24 7.76l2.83-2.83"></path>
      </svg>
    )
  },
];

const NapCalculator = () => {
  const [currentTime, setCurrentTime] = useState<string>(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });
  
  const [selectedNap, setSelectedNap] = useState<number | null>(null);
  
  const handleTimeChange = (newTime: string) => {
    setCurrentTime(newTime);
  };
  
  const calculateWakeTime = (napDuration: number): string => {
    const [hours, minutes] = currentTime.split(':').map(Number);
    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0);
    
    // Add nap duration plus 10 minutes to fall asleep
    const wakeTime = new Date(currentDate.getTime() + (napDuration + 10) * 60000);
    
    // Format wake time as HH:MM AM/PM
    const wakeHours = wakeTime.getHours();
    const wakeMinutes = wakeTime.getMinutes();
    const ampm = wakeHours >= 12 ? 'PM' : 'AM';
    const displayHours = wakeHours % 12 || 12;
    
    return `${displayHours}:${wakeMinutes.toString().padStart(2, '0')} ${ampm}`;
  };
  
  return (
    <section className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto my-12" id="nap">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-gradient">Nap</span> Calculator
      </motion.h2>
      
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label htmlFor="nap-time-input" className="block mb-4 text-sm font-medium text-gray-300">
          I want to take a nap now (current time):
        </label>
        <CustomTimePicker value={currentTime} onChange={handleTimeChange} />
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {napOptions.map((option, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedNap === index 
                ? 'bg-primary-600/20 border-2 border-primary-500' 
                : 'bg-dark-700/40 border border-dark-600 hover:bg-dark-700/60'
            }`}
            onClick={() => setSelectedNap(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`text-${selectedNap === index ? 'primary-400' : 'gray-400'}`}>
                {option.icon}
              </div>
              <h3 className="font-bold text-lg">
                {option.name} <span className="text-sm font-normal text-gray-400">({option.duration} min)</span>
              </h3>
            </div>
            <p className="text-sm text-gray-300 mb-1">{option.description}</p>
            <p className="text-xs text-primary-400">{option.benefits}</p>
            
            {selectedNap === index && (
              <motion.div
                className="mt-4 p-3 bg-dark-900/40 rounded-lg border border-dark-600"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-300">
                  Wake up at: <span className="text-white font-bold text-lg">{calculateWakeTime(option.duration)}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  (Includes 10 minutes to fall asleep)
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="p-4 bg-dark-700/30 rounded-lg mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-sm font-medium text-primary-400 mb-2">Napping Tips</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• Keep naps short (20-30 minutes) to avoid sleep inertia</li>
          <li>• Nap in the early afternoon (1-3 PM) when there's a natural dip in alertness</li>
          <li>• Find a quiet, dark place with a comfortable temperature</li>
          <li>• Use a sleep mask and earplugs if needed</li>
          <li>• Avoid caffeine 4-6 hours before your nap</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default NapCalculator; 