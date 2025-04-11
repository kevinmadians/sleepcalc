import React from 'react';
import { motion } from 'framer-motion';

interface SleepStatisticsProps {
  userAverage?: number;
}

const SleepStatistics: React.FC<SleepStatisticsProps> = ({ userAverage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800 rounded-lg p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4 text-center">Sleep By The Numbers</h3>
      
      {userAverage && (
        <div className="bg-primary-900/20 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-medium mb-3 text-center">Your Sleep Compared to Others</h4>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-200 bg-primary-900/30">
                  {userAverage < 6 ? 'Below Average' : 
                   userAverage < 7 ? 'Slightly Below Average' : 
                   userAverage < 8 ? 'Average' : 
                   userAverage < 9 ? 'Optimal' : 'Above Average'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary-200">
                  {userAverage.toFixed(1)} hours (your average)
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-dark-600">
              <div className="w-[20%] h-full bg-red-500/60"></div>
              <div className="w-[15%] h-full bg-yellow-500/60"></div>
              <div className="w-[30%] h-full bg-green-500/60"></div>
              <div className="w-[15%] h-full bg-yellow-500/60"></div>
              <div className="w-[20%] h-full bg-red-500/60"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>&lt;5h</span>
              <span>6h</span>
              <span>7-8h (Optimal)</span>
              <span>9h</span>
              <span>&gt;10h</span>
            </div>
            
            {/* Indicator of where user falls */}
            <div 
              className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-white absolute bottom-7"
              style={{ left: `calc(${Math.min(Math.max((userAverage / 12) * 100, 5), 95)}% - 8px)` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-dark-700 rounded-lg p-4">
          <h4 className="text-primary-400 font-medium mb-3">Average Sleep Duration</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Adults (26-64)</span>
                <span className="text-sm font-medium text-white">7-9 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Teens (14-17)</span>
                <span className="text-sm font-medium text-white">8-10 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Children (6-13)</span>
                <span className="text-sm font-medium text-white">9-11 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Older Adults (65+)</span>
                <span className="text-sm font-medium text-white">7-8 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-700 rounded-lg p-4">
          <h4 className="text-primary-400 font-medium mb-3">Sleep Around the World</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Japan</span>
                <span className="text-sm font-medium text-white">6.3 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">United States</span>
                <span className="text-sm font-medium text-white">6.8 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '56%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">United Kingdom</span>
                <span className="text-sm font-medium text-white">7.1 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '59%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">New Zealand</span>
                <span className="text-sm font-medium text-white">7.5 hours</span>
              </div>
              <div className="w-full bg-dark-600 h-2 rounded-full">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-dark-700 rounded-lg p-5 mb-6">
        <h4 className="text-primary-400 font-medium mb-4">Sleep Deficit Impact</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-dark-800/60 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-400 mb-2">33%</div>
            <p className="text-sm text-gray-300">Increase in accident risk after sleeping 6 hours or less</p>
          </div>
          <div className="bg-dark-800/60 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-2">48%</div>
            <p className="text-sm text-gray-300">Increased risk of heart disease from chronic sleep deprivation</p>
          </div>
          <div className="bg-dark-800/60 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary-400 mb-2">3x</div>
            <p className="text-sm text-gray-300">Higher risk for type 2 diabetes with reduced sleep</p>
          </div>
        </div>
      </div>
      
      <div className="bg-dark-700 rounded-lg p-5">
        <h4 className="text-primary-400 font-medium mb-4">Interesting Sleep Facts</h4>
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Humans are the only mammals that willingly delay sleep.</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Up to 15% of the population are "short sleepers" who need less than 6 hours of sleep due to a genetic mutation.</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Record for the longest time without sleep is 11 days and 25 minutes (264.4 hours), set by 17-year-old Randy Gardner in 1964.</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Newborns spend about 16-17 hours asleep each day, with about half in REM sleep (compared to 25% for adults).</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Being awake for 16 hours straight decreases your performance as much as having a blood alcohol level of 0.05%.</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SleepStatistics; 