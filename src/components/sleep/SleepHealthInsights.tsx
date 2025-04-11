import React from 'react';
import { motion } from 'framer-motion';

interface SleepHealthInsightsProps {
  onSelectTab: (tab: string) => void;
}

const SleepHealthInsights: React.FC<SleepHealthInsightsProps> = ({ onSelectTab }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-dark-800 rounded-lg p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Sleep Health <span className="text-primary-400">Insights</span>
      </h2>
      
      <p className="text-gray-300 text-center mb-8">
        Understanding the profound connection between sleep and your overall health can help
        you prioritize sleep as a vital component of your wellness routine.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-dark-700 rounded-lg p-5">
          <div className="flex items-center mb-4">
            <div className="bg-primary-900/30 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Heart Health</h3>
          </div>
          <p className="text-gray-300 mb-3">
            During deep sleep, your blood pressure drops, giving your heart and blood vessels time to rest and repair. 
            Chronic sleep deprivation is linked to increased risk of heart disease, high blood pressure, and stroke.
          </p>
          <ul className="text-gray-400 space-y-1 pl-5 list-disc">
            <li>Poor sleep increases coronary calcium buildup</li>
            <li>Raises inflammatory markers like C-reactive protein</li>
            <li>Disrupts glucose metabolism and insulin sensitivity</li>
          </ul>
        </div>
        
        <div className="bg-dark-700 rounded-lg p-5">
          <div className="flex items-center mb-4">
            <div className="bg-primary-900/30 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Brain Function</h3>
          </div>
          <p className="text-gray-300 mb-3">
            Sleep is essential for cognitive functions including memory consolidation, learning, creativity, 
            and problem-solving. It's during sleep that your brain processes information from the day.
          </p>
          <ul className="text-gray-400 space-y-1 pl-5 list-disc">
            <li>REM sleep enhances creative problem solving</li>
            <li>Slow-wave sleep solidifies declarative memory</li>
            <li>Sleep loss impairs attention and decision-making</li>
          </ul>
        </div>
        
        <div className="bg-dark-700 rounded-lg p-5">
          <div className="flex items-center mb-4">
            <div className="bg-primary-900/30 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Immune Function</h3>
          </div>
          <p className="text-gray-300 mb-3">
            Your immune system relies on quality sleep to function properly. Sleep strengthens immune memory and 
            helps your body fight infections. Sleep-deprived individuals are more susceptible to illness.
          </p>
          <ul className="text-gray-400 space-y-1 pl-5 list-disc">
            <li>Sleep increases T-cell production and effectiveness</li>
            <li>Supports cytokine release during immune responses</li>
            <li>People who sleep less than 6 hours are 4x more likely to catch a cold</li>
          </ul>
        </div>
        
        <div className="bg-dark-700 rounded-lg p-5">
          <div className="flex items-center mb-4">
            <div className="bg-primary-900/30 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Metabolism & Weight</h3>
          </div>
          <p className="text-gray-300 mb-3">
            Sleep regulates hormones that control appetite, including leptin (which signals fullness) and 
            ghrelin (which stimulates hunger). Sleep loss disrupts this balance, potentially leading to weight gain.
          </p>
          <ul className="text-gray-400 space-y-1 pl-5 list-disc">
            <li>Lack of sleep increases ghrelin and decreases leptin</li>
            <li>Poor sleep is associated with 55% increased risk of obesity</li>
            <li>Can increase cravings for high-calorie, high-carbohydrate foods</li>
          </ul>
        </div>
      </div>
      
      {/* Sleep Cycle Diagram */}
      <div className="bg-dark-700 rounded-lg p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">The Sleep Cycle & Your Health</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full md:w-1/2 max-w-md">
            <div className="relative h-72">
              {/* Sleep Cycle Diagram */}
              <div className="absolute inset-0 bg-dark-800 rounded-lg p-4">
                <div className="relative h-full">
                  {/* REM */}
                  <div className="absolute top-0 left-0 right-0 h-[20%] bg-primary-900/30 rounded-t-lg border-b border-dark-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-primary-400 font-medium">REM Sleep</span>
                    </div>
                  </div>
                  
                  {/* Light Sleep */}
                  <div className="absolute top-[20%] left-0 right-0 h-[30%] bg-primary-800/20 border-b border-dark-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-primary-300 font-medium">Light Sleep</span>
                    </div>
                  </div>
                  
                  {/* Deep Sleep */}
                  <div className="absolute top-[50%] left-0 right-0 h-[30%] bg-primary-700/15 border-b border-dark-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-primary-200 font-medium">Deep Sleep</span>
                    </div>
                  </div>
                  
                  {/* Awake */}
                  <div className="absolute top-[80%] left-0 right-0 h-[20%] bg-dark-600 rounded-b-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-300 font-medium">Awake/Light Sleep</span>
                    </div>
                  </div>
                  
                  {/* Cycle Markers */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 h-5">
                    <div className="border-l border-gray-500 h-full"></div>
                    <div className="border-l border-gray-500 h-full"></div>
                    <div className="border-l border-gray-500 h-full"></div>
                    <div className="border-l border-gray-500 h-full"></div>
                    <div className="border-l border-gray-500 h-full"></div>
                    <div className="border-l border-gray-500 h-full"></div>
                  </div>
                  
                  {/* Time labels */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-2 text-xs text-gray-400">
                    <span>10pm</span>
                    <span>11:30pm</span>
                    <span>1am</span>
                    <span>2:30am</span>
                    <span>4am</span>
                    <span>5:30am</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h4 className="text-lg font-medium mb-3 text-primary-300">Why Each Stage Matters:</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-block w-20 p-1 bg-primary-900/30 text-primary-400 rounded text-xs text-center font-semibold mr-3 mt-1">REM</span>
                <div>
                  <p className="text-gray-300">Critical for emotional processing, memory consolidation, and learning. Dreams typically occur during this stage.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-20 p-1 bg-primary-800/20 text-primary-300 rounded text-xs text-center font-semibold mr-3 mt-1">Light Sleep</span>
                <div>
                  <p className="text-gray-300">Helps maintain mental performance, muscle recovery, and metabolic regulation.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-20 p-1 bg-primary-700/15 text-primary-200 rounded text-xs text-center font-semibold mr-3 mt-1">Deep Sleep</span>
                <div>
                  <p className="text-gray-300">Essential for physical restoration, cellular repair, and immune function. Growth hormone is released during this stage.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Sleep Science Facts */}
      <div className="bg-primary-900/20 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Sleep Science Facts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-dark-800/60 rounded-lg p-4">
            <h4 className="text-primary-400 font-medium mb-2">Memory Formation</h4>
            <p className="text-gray-300 text-sm">During sleep, your brain transfers information from short-term to long-term memory through a process called memory consolidation.</p>
          </div>
          
          <div className="bg-dark-800/60 rounded-lg p-4">
            <h4 className="text-primary-400 font-medium mb-2">Brain Detoxification</h4>
            <p className="text-gray-300 text-sm">Your brain's glymphatic system becomes 10x more active during sleep, clearing out toxins including beta-amyloid plaques linked to Alzheimer's.</p>
          </div>
          
          <div className="bg-dark-800/60 rounded-lg p-4">
            <h4 className="text-primary-400 font-medium mb-2">Growth & Repair</h4>
            <p className="text-gray-300 text-sm">Human growth hormone is released during deep sleep, facilitating tissue repair, muscle growth, and cellular regeneration.</p>
          </div>
          
          <div className="bg-dark-800/60 rounded-lg p-4">
            <h4 className="text-primary-400 font-medium mb-2">Chronotypes</h4>
            <p className="text-gray-300 text-sm">Your chronotype (whether you're a morning person, night owl, or in-between) is genetically determined and influences your optimal sleep-wake schedule.</p>
          </div>
          
          <div className="bg-dark-800/60 rounded-lg p-4">
            <h4 className="text-primary-400 font-medium mb-2">Sleep Pressure</h4>
            <p className="text-gray-300 text-sm">Adenosine accumulates in your brain throughout the day, building "sleep pressure." Sleep clears adenosine, reducing this pressure and helping you feel refreshed.</p>
          </div>
          
          <div className="bg-dark-800/60 rounded-lg p-4">
            <h4 className="text-primary-400 font-medium mb-2">Sleep & Creativity</h4>
            <p className="text-gray-300 text-sm">REM sleep enhances creative problem-solving by forming new neural connections. Many scientific breakthroughs and artistic inspirations have come after sleep.</p>
          </div>
        </div>
      </div>
      
      <div className="text-center pb-4">
        <button
          onClick={() => onSelectTab('log')}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Start Tracking Your Sleep
        </button>
      </div>
    </motion.div>
  );
};

export default SleepHealthInsights; 