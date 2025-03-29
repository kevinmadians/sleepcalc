"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// JSON-LD schema for SEO
const sleepTipsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Sleep Tips - SleepCalc",
  "description": "Improve your sleep quality with science-backed sleep tips and advice. Learn about sleep disorders, environment optimization, and sleep habits.",
  "keywords": "sleep tips, how to sleep better, sleep improvement, sleep quality tips, sleep disorders, insomnia tips, sleep environment, sleep habits, bedtime routine, sleep science, sleep schedule tips, deep sleep tips, REM sleep improvement, sleep hygiene, better sleep quality, falling asleep tips, sleeping disorders"
};

// Define sleep tip categories and their detailed information
const sleepTips = [
  {
    category: "Sleep Environment",
    tips: [
      {
        title: "Optimize your bedroom temperature",
        description: "Keep your bedroom between 60-67°F (15-20°C). Your body temperature naturally decreases during sleep, and a cool room helps facilitate this process.",
        icon: "🌡️"
      },
      {
        title: "Block out noise and light",
        description: "Use blackout curtains, eye masks, and earplugs or white noise machines to block disruptions that might wake you during the night.",
        icon: "🔇"
      },
      {
        title: "Invest in a comfortable mattress and pillows",
        description: "Your mattress and pillows should properly support your body. Replace your mattress every 7-10 years and pillows every 1-2 years for optimal comfort.",
        icon: "🛏️"
      },
      {
        title: "Keep electronics out of the bedroom",
        description: "The bedroom should be associated with sleep and relaxation only. Remove TVs, computers, and work materials to strengthen this association.",
        icon: "📵"
      }
    ]
  },
  {
    category: "Daily Habits",
    tips: [
      {
        title: "Maintain a consistent sleep schedule",
        description: "Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.",
        icon: "⏰"
      },
      {
        title: "Limit caffeine and alcohol",
        description: "Avoid caffeine at least 6 hours before bedtime and limit alcohol, which can disrupt sleep quality even if it initially makes you drowsy.",
        icon: "☕"
      },
      {
        title: "Exercise regularly",
        description: "Regular physical activity can help you fall asleep faster and enjoy deeper sleep. Just avoid vigorous exercise within 2-3 hours of bedtime.",
        icon: "🏃"
      },
      {
        title: "Manage stress with relaxation techniques",
        description: "Practice meditation, deep breathing, or progressive muscle relaxation to reduce stress and prepare your mind for sleep.",
        icon: "🧘"
      },
      {
        title: "Avoid large meals before bed",
        description: "Eating a heavy meal close to bedtime can cause discomfort and make it harder to fall asleep. If you're hungry, opt for a light snack.",
        icon: "🍽️"
      }
    ]
  },
  {
    category: "Pre-Sleep Routine",
    tips: [
      {
        title: "Establish a bedtime ritual",
        description: "Create a relaxing routine before bed, such as taking a warm bath, reading a book, or practicing gentle stretches to signal to your body it's time to wind down.",
        icon: "📖"
      },
      {
        title: "Limit screen time before bed",
        description: "Avoid screens (phones, tablets, computers) for at least 1 hour before bed. The blue light emitted suppresses melatonin production.",
        icon: "📱"
      },
      {
        title: "Try a sleep-promoting bedtime drink",
        description: "Certain herbal teas like chamomile, lavender, or valerian root can promote relaxation and better sleep quality.",
        icon: "🍵"
      },
      {
        title: "Write down worries or to-dos",
        description: "If racing thoughts keep you up, keep a notepad by your bed to jot them down. This helps clear your mind for sleep.",
        icon: "✏️"
      }
    ]
  },
  {
    category: "Sleep Science",
    tips: [
      {
        title: "Understand sleep cycles",
        description: "Sleep cycles last about 90 minutes and include light sleep, deep sleep, and REM sleep. Planning your sleep in multiples of these cycles can help you wake up feeling more refreshed.",
        icon: "🔄"
      },
      {
        title: "Expose yourself to natural light",
        description: "Get exposure to sunlight during the day to help regulate your circadian rhythm and improve sleep quality at night.",
        icon: "☀️"
      },
      {
        title: "Watch out for sleep debt",
        description: "Consistently getting insufficient sleep creates a 'sleep debt' that's difficult to repay. Prioritize adequate sleep on a regular basis rather than trying to catch up on weekends.",
        icon: "💤"
      },
      {
        title: "Listen to your chronotype",
        description: "Some people are naturally 'early birds' while others are 'night owls.' Work with your natural tendencies when possible rather than fighting against them.",
        icon: "🦉"
      }
    ]
  }
];

// Common sleep disorders information
const sleepDisorders = [
  {
    name: "Insomnia",
    description: "Difficulty falling asleep, staying asleep, or both. Affects approximately 30% of adults at some point in their lives.",
    symptoms: ["Difficulty falling asleep", "Waking up during the night and having trouble returning to sleep", "Waking up too early", "Not feeling well-rested after a night's sleep"],
    solutions: ["Cognitive Behavioral Therapy for Insomnia (CBT-I)", "Relaxation techniques", "Sleep restriction therapy", "Stimulus control therapy"]
  },
  {
    name: "Sleep Apnea",
    description: "A disorder where breathing repeatedly stops and starts during sleep, reducing oxygen levels and causing fragmented sleep.",
    symptoms: ["Loud snoring", "Episodes of stopped breathing during sleep", "Gasping for air during sleep", "Morning headache", "Excessive daytime sleepiness"],
    solutions: ["CPAP (Continuous Positive Airway Pressure) therapy", "Oral appliances", "Weight loss if overweight", "Surgery in severe cases"]
  },
  {
    name: "Restless Legs Syndrome (RLS)",
    description: "A condition that causes an uncontrollable urge to move your legs, usually due to an uncomfortable sensation.",
    symptoms: ["Uncomfortable sensations in legs", "Strong urge to move legs", "Symptoms worsen at night", "Relief with movement"],
    solutions: ["Iron supplements if deficient", "Regular exercise", "Avoiding caffeine and alcohol", "Medication in more severe cases"]
  },
  {
    name: "Narcolepsy",
    description: "A chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep.",
    symptoms: ["Excessive daytime sleepiness", "Sudden loss of muscle tone (cataplexy)", "Sleep paralysis", "Changes in REM sleep", "Hallucinations"],
    solutions: ["Stimulant medications", "Selective serotonin reuptake inhibitors (SSRIs)", "Lifestyle adjustments", "Regular sleep schedule"]
  }
];

export default function SleepTipsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(sleepTips[0].category);
  const [expandedDisorderIndex, setExpandedDisorderIndex] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Sleep quality self-assessment quiz questions
  const quizQuestions = [
    {
      question: "How long does it typically take you to fall asleep?",
      options: ["Less than 15 minutes", "15-30 minutes", "30-60 minutes", "More than 60 minutes"]
    },
    {
      question: "How often do you wake up during the night?",
      options: ["Rarely/never", "1-2 times", "3-4 times", "More than 4 times"]
    },
    {
      question: "How rested do you feel when you wake up?",
      options: ["Very rested", "Somewhat rested", "Somewhat tired", "Very tired"]
    },
    {
      question: "How often do you feel sleepy during the day?",
      options: ["Rarely/never", "Occasionally", "Frequently", "Almost constantly"]
    },
    {
      question: "How consistent is your sleep schedule?",
      options: ["Very consistent", "Somewhat consistent", "Inconsistent", "Very irregular"]
    }
  ];
  
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };
  
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };
  
  // Calculate sleep quality score based on quiz answers
  const calculateSleepQualityScore = () => {
    if (Object.keys(quizAnswers).length < quizQuestions.length) {
      return null;
    }
    
    // Calculate score (lower is better)
    const score = Object.values(quizAnswers).reduce((sum, current) => sum + current, 0);
    const maxScore = quizQuestions.length * 3;
    const percentageScore = ((maxScore - score) / maxScore) * 100;
    
    if (percentageScore >= 80) return { quality: "Excellent", tips: [0, 2] };
    if (percentageScore >= 60) return { quality: "Good", tips: [0, 3] };
    if (percentageScore >= 40) return { quality: "Fair", tips: [1, 2] };
    return { quality: "Poor", tips: [1, 3] };
  };
  
  // Get sleep quality result
  const sleepQualityResult = quizSubmitted ? calculateSleepQualityScore() : null;
  
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sleepTipsSchema) }}
      />
      
      <motion.div 
        className="flex flex-col items-center px-4 py-12 md:py-16 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sleep <span className="text-primary-400">Tips</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-300 text-center max-w-2xl mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Improve your sleep quality with these science-backed recommendations
        </motion.p>
        
        {/* 728x90 Ad Banner */}
        <motion.div
          className="w-full flex justify-center my-6 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <AdPlaceholder width={728} height={90} className="hidden md:flex" />
          <AdPlaceholder width={320} height={100} className="flex md:hidden" />
        </motion.div>
        
        {/* Sleep tips section */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
          <motion.div
            className="w-full md:w-2/3 mb-8 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {sleepTips.map((category, index) => (
                <motion.button
                  key={category.category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.category
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                  onClick={() => setActiveCategory(category.category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                >
                  {category.category}
                </motion.button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sleepTips
                .find(category => category.category === activeCategory)?.tips
                .map((tip, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-6 border-2 border-primary-400 rounded-xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start mb-3">
                      <span className="text-2xl mr-3">{tip.icon}</span>
                      <h3 className="text-lg font-semibold">{tip.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm">{tip.description}</p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
          
          {/* Sidebar with Ad */}
          <motion.div
            className="w-full md:w-1/3 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* 300x250 Ad in Sidebar */}
            <div className="flex justify-center mb-6">
              <AdPlaceholder width={300} height={250} />
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Sleep Facts</h3>
              <ul className="space-y-3">
                <li className="p-3 bg-dark-800/50 rounded-lg">
                  <div className="font-medium mb-1">Sleep Cycles</div>
                  <p className="text-sm text-gray-300">Each sleep cycle lasts around 90 minutes and consists of both REM and non-REM sleep</p>
                </li>
                <li className="p-3 bg-dark-800/50 rounded-lg">
                  <div className="font-medium mb-1">Ideal Duration</div>
                  <p className="text-sm text-gray-300">Most adults need 7-9 hours of sleep per night for optimal health</p>
                </li>
                <li className="p-3 bg-dark-800/50 rounded-lg">
                  <div className="font-medium mb-1">Blue Light Impact</div>
                  <p className="text-sm text-gray-300">Blue light from screens can suppress melatonin production by up to 80%</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Sleep disorder section */}
        <motion.div
          className="w-full max-w-4xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center mt-12">
            Common Sleep <span className="text-primary-400">Disorders</span>
          </h2>
          
          <div className="space-y-4">
            {sleepDisorders.map((disorder, index) => (
              <motion.div
                key={index}
                className="glass-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
              >
                <div 
                  className="p-5 cursor-pointer"
                  onClick={() => setExpandedDisorderIndex(expandedDisorderIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{disorder.name}</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${expandedDisorderIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 mt-1">{disorder.description}</p>
                </div>
                
                <AnimatePresence>
                  {expandedDisorderIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-dark-600">
                        <div className="mb-4">
                          <h4 className="font-semibold text-primary-400 mb-2">Common Symptoms</h4>
                          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                            {disorder.symptoms.map((symptom, idx) => (
                              <li key={idx}>{symptom}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary-400 mb-2">Potential Solutions</h4>
                          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                            {disorder.solutions.map((solution, idx) => (
                              <li key={idx}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Second 728x90 Ad Banner */}
        <motion.div
          className="w-full flex justify-center my-6 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <AdPlaceholder width={728} height={90} className="hidden md:flex" />
          <AdPlaceholder width={320} height={100} className="flex md:hidden" />
        </motion.div>
        
        {/* Sleep quality self-assessment quiz */}
        <motion.div
          className="w-full max-w-4xl mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Sleep Quality <span className="text-primary-400">Self-Assessment</span>
          </h2>
          
          <div className="glass-card p-6 md:p-8">
            {!quizSubmitted ? (
              <>
                <p className="text-gray-300 mb-6">
                  Answer these quick questions to assess your sleep quality and get personalized recommendations:
                </p>
                
                <div className="space-y-6">
                  {quizQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-6">
                      <h3 className="font-medium mb-3">{q.question}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            className={`p-3 rounded-lg text-sm text-left transition-colors ${
                              quizAnswers[qIndex] === oIndex
                                ? 'bg-primary-600/20 border border-primary-500'
                                : 'bg-dark-700 hover:bg-dark-600 border border-transparent'
                            }`}
                            onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <motion.button
                    onClick={handleQuizSubmit}
                    className={`px-8 py-3 rounded-lg font-medium ${
                      Object.keys(quizAnswers).length === quizQuestions.length
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-dark-700 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={Object.keys(quizAnswers).length === quizQuestions.length ? { scale: 1.05 } : {}}
                    whileTap={Object.keys(quizAnswers).length === quizQuestions.length ? { scale: 0.95 } : {}}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                  >
                    Get Results
                  </motion.button>
                </div>
              </>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Your Sleep Quality: {sleepQualityResult?.quality}</h3>
                
                <div className="w-full bg-dark-700 rounded-full h-4 mb-6">
                  <motion.div 
                    className={`h-4 rounded-full ${
                      sleepQualityResult?.quality === 'Excellent' ? 'bg-green-500' :
                      sleepQualityResult?.quality === 'Good' ? 'bg-blue-500' :
                      sleepQualityResult?.quality === 'Fair' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: sleepQualityResult?.quality === 'Excellent' ? '90%' :
                             sleepQualityResult?.quality === 'Good' ? '70%' :
                             sleepQualityResult?.quality === 'Fair' ? '50%' : '30%'
                    }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Recommended Focus Areas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sleepQualityResult?.tips.map(tipIndex => (
                      <div key={tipIndex} className="p-4 bg-dark-800 rounded-lg">
                        <h5 className="font-medium text-primary-400 mb-2">{sleepTips[tipIndex].category}</h5>
                        <p className="text-sm text-gray-300">Focus on improving your {sleepTips[tipIndex].category.toLowerCase()} habits for better sleep quality.</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <motion.button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="px-6 py-2 rounded-lg bg-dark-700 text-gray-300 hover:bg-dark-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Retake Assessment
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Sleep resource links */}
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Additional <span className="text-primary-400">Resources</span>
          </h2>
          
          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="https://www.sleepfoundation.org/" target="_blank" rel="noopener noreferrer" className="block group">
                <div className="p-4 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
                  <h3 className="font-semibold mb-2 group-hover:text-primary-400 transition-colors">National Sleep Foundation</h3>
                  <p className="text-sm text-gray-300">Expert information on sleep health and sleep disorders.</p>
                </div>
              </a>
              
              <a href="https://www.cdc.gov/sleep/index.html" target="_blank" rel="noopener noreferrer" className="block group">
                <div className="p-4 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
                  <h3 className="font-semibold mb-2 group-hover:text-primary-400 transition-colors">CDC Sleep and Sleep Disorders</h3>
                  <p className="text-sm text-gray-300">Public health resources and information on sleep.</p>
                </div>
              </a>
              
              <a href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379" target="_blank" rel="noopener noreferrer" className="block group">
                <div className="p-4 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
                  <h3 className="font-semibold mb-2 group-hover:text-primary-400 transition-colors">Mayo Clinic Sleep Guide</h3>
                  <p className="text-sm text-gray-300">Medical insights on healthy sleep habits.</p>
                </div>
              </a>
              
              <a href="https://www.sleepassociation.org/" target="_blank" rel="noopener noreferrer" className="block group">
                <div className="p-4 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors">
                  <h3 className="font-semibold mb-2 group-hover:text-primary-400 transition-colors">American Sleep Association</h3>
                  <p className="text-sm text-gray-300">Resources for sleep disorders and treatment options.</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <Footer />
    </main>
  );
} 