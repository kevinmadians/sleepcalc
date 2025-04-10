"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const sleepTips: Tip[] = [
  {
    id: 1,
    title: 'Maintain a Consistent Schedule',
    description: "Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Create a Restful Environment',
    description: 'Keep your bedroom dark, quiet, and cool. Consider using blackout curtains, earplugs, or a white noise machine.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h8"></path>
        <path d="M14 12h8"></path>
        <path d="M7 12a5 5 0 0 1 5-5"></path>
        <path d="M12 7v10"></path>
        <path d="M12 17a5 5 0 0 1-5-5"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Limit Screen Time',
    description: 'Avoid screens (phones, tablets, computers) for at least 1 hour before bedtime. Blue light can interfere with melatonin production.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Watch Your Diet',
    description: 'Avoid large meals, caffeine, and alcohol before bedtime. These can disrupt your sleep quality and make it harder to fall asleep.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    )
  },
  {
    id: 5,
    title: 'Exercise Regularly',
    description: 'Regular physical activity can help you fall asleep faster and enjoy deeper sleep. Just avoid exercising too close to bedtime.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 8 2 2-2 2 2 2-2 2"></path>
        <path d="m22 8-2 2 2 2-2 2 2 2"></path>
        <path d="M8 7.5V2h8v5.5"></path>
        <path d="M8 16.5V22h8v-5.5"></path>
        <path d="M7.5 8a4.5 4.5 0 0 0 9 0"></path>
        <path d="M7.5 16a4.5 4.5 0 0 1 9 0"></path>
      </svg>
    )
  },
  {
    id: 6,
    title: 'Manage Stress',
    description: 'Practice relaxation techniques such as deep breathing, meditation, or progressive muscle relaxation before bedtime.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path>
        <path d="M9 9c.367 1.1 1.3 2.5 3 2.5s2.633-1.4 3-2.5"></path>
        <path d="M9 15h6"></path>
      </svg>
    )
  }
];

const SleepTips = () => {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  
  const toggleTip = (id: number) => {
    setExpandedTip(expandedTip === id ? null : id);
  };
  
  return (
    <section className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto my-12" id="tips">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-gradient">Sleep</span> Tips
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 text-center mb-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Improve your sleep quality with these science-backed tips for better rest
      </motion.p>
      
      <div className="grid gap-4">
        {sleepTips.map((tip, index) => (
          <motion.div 
            key={tip.id}
            className="bg-dark-700/40 border border-dark-600 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleTip(tip.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`text-${expandedTip === tip.id ? 'primary-400' : 'gray-400'}`}>
                  {tip.icon}
                </div>
                <h3 className="font-semibold text-lg">{tip.title}</h3>
              </div>
              <div className={`transition-transform duration-300 ${expandedTip === tip.id ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
            
            {expandedTip === tip.id && (
              <motion.div 
                className="px-4 pb-4 pt-0 text-gray-300"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{tip.description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-10 bg-dark-800/60 p-5 rounded-xl border border-primary-800/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold mb-3 text-primary-300">The Science of Sleep Cycles</h3>
        <p className="text-gray-300 mb-3">
          Sleep occurs in cycles, each lasting about 90 minutes. A typical night consists of 4-6 complete cycles.
        </p>
        <p className="text-gray-300 mb-3">
          Each cycle contains four stages: 
        </p>
        <ul className="text-gray-300 space-y-2 mb-3">
          <li><span className="text-primary-400 font-medium">Stage 1:</span> Light sleep, easily awakened</li>
          <li><span className="text-primary-400 font-medium">Stage 2:</span> Body temperature drops, heart rate slows</li>
          <li><span className="text-primary-400 font-medium">Stages 3-4:</span> Deep sleep, physical restoration occurs</li>
          <li><span className="text-primary-400 font-medium">REM:</span> Rapid Eye Movement, dreams occur, mental restoration</li>
        </ul>
        <p className="text-gray-300">
          Waking up at the end of a cycle helps you feel more refreshed, as you're less likely to interrupt deep sleep or REM sleep.
        </p>
      </motion.div>
    </section>
  );
};

export default SleepTips; 