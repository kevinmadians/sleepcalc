"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';


// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });

// Chronotype Descriptions
const chronotypes = {
  lion: {
    name: "Lion (Early Bird)",
    description: "Lions are early risers who wake up naturally at dawn, feeling alert and energetic. You're most productive in the morning, with your peak cognitive performance occurring before noon. By evening, your energy starts to fade, and you typically prefer an early bedtime.",
    icon: "🦁",
    color: "text-yellow-400",
    characteristics: [
      "Natural wake time: 5-6 AM",
      "Peak productivity: 8 AM - 12 PM",
      "Energy dip: 2-4 PM",
      "Ideal bedtime: 9-10 PM",
      "Best for leadership roles and morning-heavy schedules"
    ],
    optimization: [
      "Schedule your most complex tasks before noon",
      "Plan important meetings mid-morning",
      "Exercise in the morning for best results",
      "Avoid late social engagements when possible",
      "Protect your sleep by maintaining consistent early bedtimes"
    ]
  },
  bear: {
    name: "Bear (Middle-of-the-Road)",
    description: "Bears follow the solar cycle, easily waking with the sun and sleeping shortly after sunset. Your energy and alertness gradually increase during the morning, peak around mid-day, and slowly decline in the evening. This is the most common chronotype, representing about 55% of the population.",
    icon: "🐻",
    color: "text-blue-400",
    characteristics: [
      "Natural wake time: 7-8 AM",
      "Peak productivity: 10 AM - 2 PM",
      "Energy dip: 3-5 PM",
      "Ideal bedtime: 11 PM - 12 AM",
      "Adaptable to standard 9-5 work schedules"
    ],
    optimization: [
      "Schedule important work during late morning and early afternoon",
      "Take a short break during your mid-afternoon dip",
      "Exercise between 12-4 PM for maximum benefits",
      "Allow yourself social time in early evening hours",
      "Aim for 8 hours of sleep to maintain your natural rhythm"
    ]
  },
  wolf: {
    name: "Wolf (Night Owl)",
    description: "Wolves are most energetic in the evening hours. You find it challenging to wake up early and often hit snooze multiple times. Your creativity and focus peak in the late afternoon and evening, making you most productive after most people have lost steam.",
    icon: "🐺",
    color: "text-purple-400",
    characteristics: [
      "Natural wake time: 8-9 AM (or later)",
      "Peak productivity: 4-9 PM",
      "Energy dip: 9-11 AM",
      "Ideal bedtime: 12-2 AM",
      "Best for creative roles and flexible schedules"
    ],
    optimization: [
      "Schedule creative or complex work in the late afternoon",
      "Use mornings for administrative or routine tasks",
      "Exercise in the evening when your physical performance peaks",
      "Negotiate flexible work hours if possible",
      "Create a calming bedtime routine to help wind down"
    ]
  },
  dolphin: {
    name: "Dolphin (Light Sleeper)",
    description: "Dolphins are light, sensitive sleepers who often struggle with insomnia. You tend to wake up feeling unrefreshed, but experience productivity peaks during mid-morning and early evening. Dolphins are often high-achievers despite irregular sleep patterns.",
    icon: "🐬",
    color: "text-green-400",
    characteristics: [
      "Natural wake time: Variable, often before full rest is achieved",
      "Peak productivity: 10 AM - 2 PM and again from 6-9 PM",
      "Energy dip: 2-4 PM",
      "Ideal bedtime: 11:30 PM - 12:30 AM (though often later due to insomnia)",
      "Best for detail-oriented and analytical work"
    ],
    optimization: [
      "Create a consistent sleep routine with extra wind-down time",
      "Keep your bedroom optimized for sleep (cool, dark, quiet)",
      "Schedule detailed work during your mid-morning peak",
      "Minimize caffeine after noon",
      "Use relaxation techniques before bed to calm an active mind"
    ]
  }
};

// Add helper functions for compatibility reasons
const getCompatibilityReason = (type1: string, type2: string): string => {
  const pairings: Record<string, Record<string, string>> = {
    lion: {
      bear: "Your early-morning energy complements their mid-day focus",
      dolphin: "Both tend to wake early and have similar energy patterns",
      wolf: "Your schedules are opposite, which can be challenging"
    },
    bear: {
      lion: "Their early energy pairs well with your mid-day productivity",
      bear: "Matching schedules make coordination easy",
      wolf: "Your evening wind-down overlaps with their productivity peak",
      dolphin: "Your steady energy can help balance their irregular patterns"
    },
    wolf: {
      bear: "Their adaptability works well with your evening preferences",
      wolf: "Similar schedules make coordination easy",
      lion: "Your sleep-wake preferences are opposite",
      dolphin: "Both can struggle with conventional schedules"
    },
    dolphin: {
      lion: "Their consistency helps balance your sleep variability",
      bear: "Their adaptability complements your irregular patterns",
      wolf: "Both have non-conventional sleep needs which can clash",
      dolphin: "Both have inconsistent sleep patterns which can amplify issues"
    }
  };
  
  return pairings[type1]?.[type2] || "Compatible energy patterns";
};

const getIncompatibilityReason = (type1: string, type2: string): string => {
  const pairings: Record<string, Record<string, string>> = {
    lion: {
      wolf: "Your early schedule conflicts with their late-night energy",
      dolphin: "Their irregular sleep can clash with your consistent patterns"
    },
    bear: {
      lion: "Their very early schedule may not align with your mid-day focus",
      wolf: "Their late night preference can be at odds with your schedule",
      dolphin: "Their sleep irregularity may disrupt your consistent rhythm"
    },
    wolf: {
      lion: "Their early morning energy conflicts with your night owl tendencies",
      bear: "Their mid-day peak might not align with your evening productivity",
      dolphin: "Their unpredictable sleep patterns add complexity"
    },
    dolphin: {
      lion: "Their rigid schedule may not accommodate your flexibility needs",
      bear: "Their consistent patterns may not adapt to your irregularity",
      wolf: "Both have sleep challenges that may compound each other"
    }
  };
  
  return pairings[type1]?.[type2] || "Potential schedule conflicts";
};

// Function to get emoji for chronotype
const getEmojiForChronotype = (type: string): string => {
  const emojis: Record<string, string> = {
    lion: "🦁",
    bear: "🐻",
    wolf: "🐺",
    dolphin: "🐬"
  };
  
  return emojis[type] || "🕓";
};

// Questions for the chronotype assessment
const questions = [
  {
    id: 1,
    text: "If you could choose your own schedule with no constraints, when would you naturally prefer to wake up?",
    options: [
      { id: 'a', text: "Before 6 AM", points: { lion: 4, bear: 2, wolf: 0, dolphin: 1 } },
      { id: 'b', text: "6-7 AM", points: { lion: 3, bear: 4, wolf: 1, dolphin: 2 } },
      { id: 'c', text: "7-8:30 AM", points: { lion: 1, bear: 3, wolf: 2, dolphin: 3 } },
      { id: 'd', text: "After 8:30 AM", points: { lion: 0, bear: 1, wolf: 4, dolphin: 2 } }
    ]
  },
  {
    id: 2,
    text: "When do you feel most alert and productive during the day?",
    options: [
      { id: 'a', text: "Early morning (6-9 AM)", points: { lion: 4, bear: 2, wolf: 0, dolphin: 1 } },
      { id: 'b', text: "Mid-morning to early afternoon (9 AM-2 PM)", points: { lion: 2, bear: 4, wolf: 1, dolphin: 3 } },
      { id: 'c', text: "Late afternoon to early evening (2-6 PM)", points: { lion: 1, bear: 2, wolf: 3, dolphin: 2 } },
      { id: 'd', text: "Evening (after 6 PM)", points: { lion: 0, bear: 1, wolf: 4, dolphin: 2 } }
    ]
  },
  {
    id: 3,
    text: "How easy is it for you to wake up in the morning without an alarm?",
    options: [
      { id: 'a', text: "Very easy - I often wake up before my alarm", points: { lion: 4, bear: 2, wolf: 0, dolphin: 1 } },
      { id: 'b', text: "Somewhat easy - I usually wake up with my first alarm", points: { lion: 3, bear: 4, wolf: 1, dolphin: 2 } },
      { id: 'c', text: "Somewhat difficult - I often hit snooze once or twice", points: { lion: 1, bear: 2, wolf: 3, dolphin: 2 } },
      { id: 'd', text: "Very difficult - I hit snooze multiple times or sleep through alarms", points: { lion: 0, bear: 1, wolf: 4, dolphin: 3 } }
    ]
  },
  {
    id: 4,
    text: "If you had to choose a 4-hour window to perform your most mentally demanding tasks, when would it be?",
    options: [
      { id: 'a', text: "6-10 AM", points: { lion: 4, bear: 1, wolf: 0, dolphin: 1 } },
      { id: 'b', text: "10 AM-2 PM", points: { lion: 3, bear: 4, wolf: 1, dolphin: 3 } },
      { id: 'c', text: "2-6 PM", points: { lion: 1, bear: 2, wolf: 3, dolphin: 2 } },
      { id: 'd', text: "6-10 PM", points: { lion: 0, bear: 1, wolf: 4, dolphin: 2 } }
    ]
  },
  {
    id: 5,
    text: "When do you naturally start to feel tired and ready for bed?",
    options: [
      { id: 'a', text: "8-9:30 PM", points: { lion: 4, bear: 2, wolf: 0, dolphin: 1 } },
      { id: 'b', text: "9:30-11 PM", points: { lion: 2, bear: 4, wolf: 1, dolphin: 2 } },
      { id: 'c', text: "11 PM-12:30 AM", points: { lion: 1, bear: 2, wolf: 3, dolphin: 3 } },
      { id: 'd', text: "After 12:30 AM", points: { lion: 0, bear: 1, wolf: 4, dolphin: 2 } }
    ]
  },
  {
    id: 6,
    text: "How would you describe your sleep quality?",
    options: [
      { id: 'a', text: "I fall asleep quickly and sleep deeply through the night", points: { lion: 3, bear: 4, wolf: 2, dolphin: 0 } },
      { id: 'b', text: "I usually sleep well but occasionally have restless nights", points: { lion: 2, bear: 3, wolf: 3, dolphin: 1 } },
      { id: 'c', text: "I often wake up during the night or have trouble falling asleep", points: { lion: 1, bear: 1, wolf: 2, dolphin: 3 } },
      { id: 'd', text: "I struggle with insomnia or consistently poor sleep", points: { lion: 0, bear: 0, wolf: 1, dolphin: 4 } }
    ]
  },
  {
    id: 7,
    text: "How do you feel during the mid-afternoon (2-4 PM)?",
    options: [
      { id: 'a', text: "Very sleepy, I often need a nap or caffeine", points: { lion: 4, bear: 2, wolf: 1, dolphin: 2 } },
      { id: 'b', text: "Slightly tired but can push through", points: { lion: 2, bear: 3, wolf: 2, dolphin: 3 } },
      { id: 'c', text: "Still fairly energetic and productive", points: { lion: 1, bear: 1, wolf: 3, dolphin: 1 } },
      { id: 'd', text: "This is when I start to feel most alert", points: { lion: 0, bear: 0, wolf: 4, dolphin: 1 } }
    ]
  },
  {
    id: 8,
    text: "When would you prefer to exercise, if entirely up to you?",
    options: [
      { id: 'a', text: "Early morning (5-8 AM)", points: { lion: 4, bear: 1, wolf: 0, dolphin: 1 } },
      { id: 'b', text: "Mid-day (11 AM-2 PM)", points: { lion: 2, bear: 4, wolf: 1, dolphin: 2 } },
      { id: 'c', text: "Afternoon to early evening (3-7 PM)", points: { lion: 1, bear: 2, wolf: 3, dolphin: 3 } },
      { id: 'd', text: "Evening (after 7 PM)", points: { lion: 0, bear: 1, wolf: 4, dolphin: 1 } }
    ]
  },
  {
    id: 9,
    text: "How would you describe your energy levels throughout the day?",
    options: [
      { id: 'a', text: "Highest in the morning, gradually decreasing throughout the day", points: { lion: 4, bear: 2, wolf: 0, dolphin: 1 } },
      { id: 'b', text: "Low in the morning, peaking mid-day, then gradually decreasing", points: { lion: 1, bear: 4, wolf: 1, dolphin: 2 } },
      { id: 'c', text: "Low in the morning, gradually increasing throughout the day", points: { lion: 0, bear: 1, wolf: 4, dolphin: 1 } },
      { id: 'd', text: "Unpredictable fluctuations throughout the day", points: { lion: 1, bear: 1, wolf: 1, dolphin: 4 } }
    ]
  },
  {
    id: 10,
    text: "On weekends or days off, do you tend to change your sleep schedule?",
    options: [
      { id: 'a', text: "No, I wake up and go to bed at roughly the same time", points: { lion: 4, bear: 3, wolf: 1, dolphin: 2 } },
      { id: 'b', text: "I sleep in a little later (1-2 hours)", points: { lion: 2, bear: 4, wolf: 2, dolphin: 2 } },
      { id: 'c', text: "I sleep in much later (3+ hours)", points: { lion: 0, bear: 1, wolf: 4, dolphin: 1 } },
      { id: 'd', text: "My schedule is completely different on days off", points: { lion: 1, bear: 1, wolf: 3, dolphin: 3 } }
    ]
  }
];

export default function ChronotypeAnalyzerContent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    scores: {[key: string]: number},
    topChronotype: string,
    secondChronotype: string | null,
    percentages: {[key: string]: number}
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [chronotypeCompatibility, setChronotypeCompatibility] = useState<{[key: string]: {compatible: string[], challenging: string[]}} | null>(null);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Define chronotype compatibility data
    setChronotypeCompatibility({
      lion: {
        compatible: ["bear", "dolphin"],
        challenging: ["wolf"]
      },
      bear: {
        compatible: ["lion", "bear", "wolf"],
        challenging: []
      },
      wolf: {
        compatible: ["bear", "wolf"],
        challenging: ["lion", "dolphin"]
      },
      dolphin: {
        compatible: ["lion", "bear"],
        challenging: ["wolf", "dolphin"]
      }
    });
  }, []);

  const handleAnswer = (questionId: number, optionId: string) => {
    // Store the answer
    setAnswers(prev => ({...prev, [questionId]: optionId}));
    
    // If at the last question, calculate results
    if (currentQuestionIndex === questions.length - 1) {
      calculateResults({...answers, [questionId]: optionId});
    } else {
      // Move to the next question with a slight delay for animation
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  };

  const calculateResults = (allAnswers: {[key: number]: string}) => {
    // Initialize scores for each chronotype
    const scores: {[key: string]: number} = {
      lion: 0,
      bear: 0,
      wolf: 0,
      dolphin: 0
    };

    // Calculate the total score for each chronotype
    questions.forEach(question => {
      const answer = allAnswers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.id === answer);
        if (option) {
          Object.entries(option.points).forEach(([chronotype, points]) => {
            scores[chronotype] += points;
          });
        }
      }
    });

    // Find the highest scoring chronotype
    let topChronotype = "bear"; // Default
    let topScore = 0;
    
    Object.entries(scores).forEach(([chronotype, score]) => {
      if (score > topScore) {
        topScore = score;
        topChronotype = chronotype;
      }
    });

    // Find second highest scoring chronotype
    let secondChronotype: string | null = null;
    let secondScore = 0;
    
    Object.entries(scores).forEach(([chronotype, score]) => {
      if (score > secondScore && chronotype !== topChronotype) {
        secondScore = score;
        secondChronotype = chronotype;
      }
    });
    
    // Calculate total possible points
    const totalPossiblePoints = questions.length * 4; // 4 is max points per question
    
    // Calculate percentage of each chronotype
    const percentages: {[key: string]: number} = {};
    Object.entries(scores).forEach(([chronotype, score]) => {
      percentages[chronotype] = Math.round((score / totalPossiblePoints) * 100);
    });

    // Set results
    setResults({
      scores,
      topChronotype,
      secondChronotype,
      percentages
    });
    
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  // If not mounted yet, don't render content
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
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
            <span className="text-primary-400">Chronotype</span> Analyzer
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Discover your natural sleep-wake cycle and optimize your daily schedule
          </motion.p>
          
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div 
                key="question"
                className="glass-card p-6 md:p-8 border-2 border-primary-400 rounded-xl mb-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                  <span className="text-sm text-gray-400">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                
                <div className="mb-4 h-2 bg-dark-700 rounded-full">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                
                <h3 className="text-lg md:text-xl mb-6">
                  {questions[currentQuestionIndex].text}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <motion.button
                      key={option.id}
                      className="w-full text-left p-4 rounded-lg bg-dark-800/80 hover:bg-dark-700 transition-colors flex items-center border border-dark-600"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(questions[currentQuestionIndex].id, option.id)}
                    >
                      <div className="w-6 h-6 rounded-full border-2 border-primary-400 flex items-center justify-center mr-3 flex-shrink-0">
                        {answers[questions[currentQuestionIndex].id] === option.id && (
                          <div className="w-3 h-3 rounded-full bg-primary-400" />
                        )}
                      </div>
                      <span>{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                className="glass-card p-6 md:p-8 border-2 border-primary-400 rounded-xl mb-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {results && (
                  <>
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">
                        {getEmojiForChronotype(results.topChronotype)}
                      </div>
                      <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${chronotypes[results.topChronotype as keyof typeof chronotypes].color}`}>
                        Your Chronotype: {chronotypes[results.topChronotype as keyof typeof chronotypes].name}
                      </h2>
                      <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                        {chronotypes[results.topChronotype as keyof typeof chronotypes].description}
                      </p>
                      
                      {results.secondChronotype && (
                        <p className="text-sm text-gray-400 mb-2">
                          You also show traits of the <span className={chronotypes[results.secondChronotype as keyof typeof chronotypes].color}>{chronotypes[results.secondChronotype as keyof typeof chronotypes].name}</span> chronotype
                        </p>
                      )}
                    </div>
                    
                    {/* Chronotype Distribution */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-center">Your Chronotype Distribution</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {Object.entries(chronotypes).map(([type, data]) => (
                          <div key={type} className="flex items-center p-4 bg-dark-800/50 rounded-lg">
                            <span className="text-2xl mr-3">{data.icon}</span>
                            <div className="flex-grow">
                              <div className="flex justify-between mb-1">
                                <span className={`font-medium ${results.topChronotype === type ? data.color : 'text-gray-300'}`}>
                                  {data.name}
                                </span>
                                <span className="text-sm">{results.percentages[type]}%</span>
                              </div>
                              <div className="h-2 bg-dark-700 rounded-full">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    results.topChronotype === type 
                                      ? 'bg-primary-500' 
                                      : 'bg-gray-500'
                                  }`}
                                  style={{ width: `${results.percentages[type]}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Chronotype Characteristics */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-primary-400">Your Chronotype Characteristics</h3>
                      <ul className="space-y-2 mb-6">
                        {chronotypes[results.topChronotype as keyof typeof chronotypes].characteristics.map((characteristic, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-400 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>{characteristic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Optimization Recommendations */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-primary-400">How to Optimize Your Day</h3>
                      <ul className="space-y-2 mb-6">
                        {chronotypes[results.topChronotype as keyof typeof chronotypes].optimization.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-400 mr-2 mt-1 flex-shrink-0">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Chronotype Compatibility */}
                    {chronotypeCompatibility && (
                      <div className="mb-8 bg-dark-800/60 p-5 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-primary-400">Chronotype Compatibility</h3>
                        
                        <div className="space-y-4">
                          {chronotypeCompatibility[results.topChronotype].compatible.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 text-green-400">Compatible With</h4>
                              <div className="flex flex-wrap gap-3">
                                {chronotypeCompatibility[results.topChronotype].compatible.map((type) => (
                                  <div key={type} className="flex items-center bg-dark-700/50 p-2 rounded-lg">
                                    <span className="text-xl mr-2">{getEmojiForChronotype(type)}</span>
                                    <span>{chronotypes[type as keyof typeof chronotypes].name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {chronotypeCompatibility[results.topChronotype].challenging.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 text-yellow-400">Challenging Matches</h4>
                              <div className="flex flex-wrap gap-3">
                                {chronotypeCompatibility[results.topChronotype].challenging.map((type) => (
                                  <div key={type} className="flex items-center bg-dark-700/50 p-2 rounded-lg">
                                    <span className="text-xl mr-2">{getEmojiForChronotype(type)}</span>
                                    <span>{chronotypes[type as keyof typeof chronotypes].name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Daily Energy Chart */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-center">Your Daily Energy Rhythm</h3>
                      
                      <div className="bg-dark-800/60 p-5 rounded-lg">
                        <div className="mb-3 flex justify-between items-center text-sm text-gray-400">
                          <span>Low Energy</span>
                          <span>Medium Energy</span>
                          <span>High Energy</span>
                        </div>
                        
                        <div className="space-y-4">
                          {['Morning (5-9 AM)', 'Mid-Morning (9 AM-12 PM)', 'Afternoon (12-5 PM)', 'Evening (5-9 PM)', 'Night (9 PM-12 AM)'].map((timeBlock, index) => {
                            let energyLevel = 0;
                            
                            // Determine energy level based on chronotype and time
                            if (results.topChronotype === 'lion') {
                              energyLevel = index === 0 ? 100 : 
                                          index === 1 ? 90 : 
                                          index === 2 ? 60 : 
                                          index === 3 ? 30 : 20;
                            } else if (results.topChronotype === 'bear') {
                              energyLevel = index === 0 ? 50 : 
                                          index === 1 ? 90 : 
                                          index === 2 ? 70 : 
                                          index === 3 ? 50 : 30;
                            } else if (results.topChronotype === 'wolf') {
                              energyLevel = index === 0 ? 20 : 
                                          index === 1 ? 40 : 
                                          index === 2 ? 70 : 
                                          index === 3 ? 90 : 70;
                            } else if (results.topChronotype === 'dolphin') {
                              energyLevel = index === 0 ? 40 : 
                                          index === 1 ? 80 : 
                                          index === 2 ? 50 : 
                                          index === 3 ? 75 : 40;
                            }
                            
                            return (
                              <div key={index} className="flex items-center">
                                <span className="w-32 text-sm mr-3">{timeBlock}</span>
                                <div className="flex-grow h-5 bg-dark-700 rounded-full">
                                  <div 
                                    className={`h-full rounded-full ${
                                      results.topChronotype === 'lion' ? 'bg-yellow-500' :
                                      results.topChronotype === 'bear' ? 'bg-blue-500' :
                                      results.topChronotype === 'wolf' ? 'bg-purple-500' :
                                      'bg-green-500'
                                    }`}
                                    style={{ width: `${energyLevel}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex justify-center">
                  <motion.button
                    onClick={resetAssessment}
                    className="bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Take the Assessment Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Informational section below the main card */}
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Understanding <span className="text-primary-400">Chronotypes</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-lg font-medium mb-3 text-primary-400">What is a Chronotype?</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Your chronotype is your body's natural inclination to sleep and wake at certain times. 
                  It's determined by your biological clock (circadian rhythm) and is influenced by genetics.
                </p>
                <p className="text-sm text-gray-300">
                  Unlike simple "night owl" or "early bird" labels, chronotypes exist on a spectrum and 
                  can influence your optimal times for mental focus, physical activity, creativity, and more.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-lg font-medium mb-3 text-primary-400">Why Your Chronotype Matters</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Working with your natural chronotype rather than against it can lead to:
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">•</span>
                    <span>Improved sleep quality and duration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">•</span>
                    <span>Enhanced productivity and performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">•</span>
                    <span>Reduced risk of sleep disorders and fatigue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-400 mr-2">•</span>
                    <span>Better physical and mental health</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center">The Four Chronotypes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(chronotypes).map(([type, data], index) => (
                  <motion.div 
                    key={type}
                    className="glass-card p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">{data.icon}</span>
                      <h4 className={`text-lg font-medium ${data.color}`}>{data.name}</h4>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {data.description.split('.')[0] + '.'}
                    </p>
                    <div className="text-sm">
                      <span className="text-primary-400 font-medium">Peak hours: </span>
                      <span className="text-gray-300">
                        {data.characteristics.find(c => c.includes('Peak productivity'))?.split(': ')[1] || 'Varies'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Chronotype Science */}
            <motion.div 
              className="glass-card p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3 className="text-lg font-medium mb-4 text-center text-primary-400">The Science Behind Chronotypes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-dark-800/40 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Genetic Factors</h4>
                  <p className="text-gray-300">
                    Research shows that your chronotype is influenced by a gene called PER3, which affects your circadian rhythm and sleep-wake preferences.
                  </p>
                </div>
                
                <div className="bg-dark-800/40 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Age-Related Changes</h4>
                  <p className="text-gray-300">
                    Chronotypes naturally evolve throughout your life. Teenagers tend to shift toward Wolf chronotypes, while older adults often become more Lion-like.
                  </p>
                </div>
                
                <div className="bg-dark-800/40 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Melatonin Production</h4>
                  <p className="text-gray-300">
                    Different chronotypes have varying timing of melatonin secretion, the hormone that regulates your sleep-wake cycle and body temperature.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Chronotype Adaptation Tips */}
            <motion.div 
              className="glass-card p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h3 className="text-lg font-medium mb-4 text-center text-primary-400">Working with Your Chronotype</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <div className="bg-primary-900/30 w-8 h-8 rounded-full flex items-center justify-center text-primary-400 font-bold mr-3 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium mb-1">Schedule Around Your Energy Peaks</h4>
                    <p className="text-gray-300">
                      Block your calendar for demanding tasks during your natural peak performance hours. Save administrative or routine tasks for your lower energy periods.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-900/30 w-8 h-8 rounded-full flex items-center justify-center text-primary-400 font-bold mr-3 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium mb-1">Optimize Your Sleep Environment</h4>
                    <p className="text-gray-300">
                      Adjust your bedroom for optimal sleep based on your chronotype needs. Some types need more darkness and quiet than others.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-900/30 w-8 h-8 rounded-full flex items-center justify-center text-primary-400 font-bold mr-3 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium mb-1">Strategic Light Exposure</h4>
                    <p className="text-gray-300">
                      Morning light helps reset your circadian clock. Night Owls can gradually shift earlier by getting bright light exposure immediately upon waking.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-900/30 w-8 h-8 rounded-full flex items-center justify-center text-primary-400 font-bold mr-3 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium mb-1">Time Your Exercise</h4>
                    <p className="text-gray-300">
                      Coordinate your workouts with your energy levels. Morning exercise benefits Lions and Bears, while Wolves perform better with evening workouts.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <p className="text-sm text-gray-400 italic">
              Note: This assessment provides general guidance based on chronotype research. Individual variation exists, and environmental factors can also influence your optimal sleep-wake patterns.
            </p>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
} 
