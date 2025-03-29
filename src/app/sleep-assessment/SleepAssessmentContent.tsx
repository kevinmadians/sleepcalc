"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// Assessment questions
const questions = [
  {
    id: 1,
    text: "How long does it usually take you to fall asleep at night?",
    options: [
      { id: 'a', text: "Less than 15 minutes", score: 3 },
      { id: 'b', text: "15-30 minutes", score: 2 },
      { id: 'c', text: "30-60 minutes", score: 1 },
      { id: 'd', text: "More than 60 minutes", score: 0 }
    ],
    category: "sleep_latency"
  },
  {
    id: 2,
    text: "How many hours of sleep do you typically get per night?",
    options: [
      { id: 'a', text: "Less than 5 hours", score: 0 },
      { id: 'b', text: "5-6 hours", score: 1 },
      { id: 'c', text: "7-8 hours", score: 3 },
      { id: 'd', text: "More than 8 hours", score: 2 }
    ],
    category: "sleep_duration"
  },
  {
    id: 3,
    text: "How would you rate the quality of your sleep?",
    options: [
      { id: 'a', text: "Very poor", score: 0 },
      { id: 'b', text: "Poor", score: 1 },
      { id: 'c', text: "Good", score: 2 },
      { id: 'd', text: "Very good", score: 3 }
    ],
    category: "sleep_quality"
  },
  {
    id: 4,
    text: "How often do you wake up during the night?",
    options: [
      { id: 'a', text: "Never or rarely", score: 3 },
      { id: 'b', text: "Sometimes (1-2 times a week)", score: 2 },
      { id: 'c', text: "Often (3-5 times a week)", score: 1 },
      { id: 'd', text: "Every night or almost every night", score: 0 }
    ],
    category: "sleep_disturbance"
  },
  {
    id: 5,
    text: "Do you feel refreshed when you wake up in the morning?",
    options: [
      { id: 'a', text: "Always or almost always", score: 3 },
      { id: 'b', text: "Often", score: 2 },
      { id: 'c', text: "Sometimes", score: 1 },
      { id: 'd', text: "Never or rarely", score: 0 }
    ],
    category: "daytime_function"
  },
  {
    id: 6,
    text: "Do you experience daytime sleepiness or fatigue?",
    options: [
      { id: 'a', text: "Never or rarely", score: 3 },
      { id: 'b', text: "Sometimes", score: 2 },
      { id: 'c', text: "Often", score: 1 },
      { id: 'd', text: "Always or almost always", score: 0 }
    ],
    category: "daytime_function"
  },
  {
    id: 7,
    text: "How consistent is your sleep schedule (going to bed and waking up at the same time)?",
    options: [
      { id: 'a', text: "Very consistent (same times every day)", score: 3 },
      { id: 'b', text: "Somewhat consistent (varies by 1 hour or less)", score: 2 },
      { id: 'c', text: "Not very consistent (varies by 1-2 hours)", score: 1 },
      { id: 'd', text: "Not at all consistent (varies by more than 2 hours)", score: 0 }
    ],
    category: "sleep_regularity"
  },
  {
    id: 8,
    text: "Do you use electronic devices (phone, TV, computer) in bed before sleeping?",
    options: [
      { id: 'a', text: "Never or rarely", score: 3 },
      { id: 'b', text: "Sometimes", score: 2 },
      { id: 'c', text: "Often", score: 1 },
      { id: 'd', text: "Always or almost always", score: 0 }
    ],
    category: "sleep_hygiene"
  },
  {
    id: 9,
    text: "Do you consume caffeine (coffee, tea, energy drinks, etc.) in the afternoon or evening?",
    options: [
      { id: 'a', text: "Never or rarely", score: 3 },
      { id: 'b', text: "Sometimes", score: 2 },
      { id: 'c', text: "Often", score: 1 },
      { id: 'd', text: "Always or almost always", score: 0 }
    ],
    category: "sleep_hygiene"
  },
  {
    id: 10,
    text: "Do you ever feel anxious or stressed about falling asleep?",
    options: [
      { id: 'a', text: "Never or rarely", score: 3 },
      { id: 'b', text: "Sometimes", score: 2 },
      { id: 'c', text: "Often", score: 1 },
      { id: 'd', text: "Always or almost always", score: 0 }
    ],
    category: "sleep_anxiety"
  }
];

// Result interpretations
const resultInterpretations = {
  excellent: {
    title: "Excellent Sleep Quality",
    description: "Your sleep quality is excellent! You're getting consistent, restorative sleep that leaves you feeling refreshed and energized. Keep up your healthy sleep habits.",
    icon: "✨",
    color: "text-green-400",
    recommendations: [
      "Maintain your consistent sleep schedule",
      "Continue prioritizing sleep as part of your overall health",
      "Share your good sleep habits with others who might be struggling"
    ]
  },
  good: {
    title: "Good Sleep Quality",
    description: "Your sleep quality is good. You're generally sleeping well, but there may be small improvements you can make to optimize your rest.",
    icon: "😊",
    color: "text-blue-400",
    recommendations: [
      "Try to make your sleep schedule slightly more consistent",
      "Consider limiting screen time in the hour before bed",
      "Ensure your bedroom is optimized for sleep (cool, dark, and quiet)"
    ]
  },
  fair: {
    title: "Fair Sleep Quality",
    description: "Your sleep quality is fair. While you're getting some good rest, there are several areas where improvements could significantly enhance your sleep quality.",
    icon: "🤔",
    color: "text-yellow-400",
    recommendations: [
      "Establish a consistent bedtime routine to signal your body it's time to sleep",
      "Limit caffeine after 2pm and avoid alcohol close to bedtime",
      "Try relaxation techniques like deep breathing or meditation before bed",
      "Make your bedroom environment more conducive to sleep"
    ]
  },
  poor: {
    title: "Poor Sleep Quality",
    description: "Your sleep quality needs improvement. You're likely experiencing the effects of poor sleep in your daily life, including fatigue, mood changes, and reduced performance.",
    icon: "😴",
    color: "text-orange-400",
    recommendations: [
      "Establish a strict sleep schedule, even on weekends",
      "Create a calming bedtime routine and stick to it",
      "Eliminate electronic devices from your bedroom",
      "Avoid caffeine after noon and limit alcohol consumption",
      "Consider discussing your sleep issues with a healthcare provider"
    ]
  },
  veryPoor: {
    title: "Very Poor Sleep Quality",
    description: "Your sleep quality is significantly impaired. Poor sleep is likely affecting many aspects of your life, including your health, mood, and cognitive function.",
    icon: "⚠️",
    color: "text-red-400",
    recommendations: [
      "Consult with a healthcare provider or sleep specialist",
      "Implement strict sleep hygiene practices including consistent bedtime and wake times",
      "Create an optimal sleep environment (cool, dark, quiet)",
      "Eliminate all electronic devices from your bedroom",
      "Practice stress-reduction techniques like meditation or deep breathing",
      "Consider tracking your sleep with a sleep diary or app"
    ]
  }
};

// Category analysis for detailed feedback
const categoryAnalysis = {
  sleep_latency: {
    low: "You're having trouble falling asleep. Try establishing a relaxing pre-sleep routine and avoid screens before bed.",
    medium: "You sometimes struggle to fall asleep. Consider a consistent bedtime routine to help signal your body it's time to sleep.",
    high: "You fall asleep quickly, which is a sign of healthy sleep patterns."
  },
  sleep_duration: {
    low: "You're not getting enough sleep. Most adults need 7-9 hours for optimal health.",
    medium: "You're getting some sleep, but might benefit from a little more. Aim for 7-9 hours nightly.",
    high: "You're getting an ideal amount of sleep for most adults."
  },
  sleep_quality: {
    low: "You perceive your sleep quality as poor, which can affect your overall well-being.",
    medium: "Your sleep quality is moderate. Small improvements to your sleep environment could help.",
    high: "You feel your sleep quality is good, which is beneficial for physical and mental health."
  },
  sleep_disturbance: {
    low: "Frequent night awakenings are disrupting your sleep. Consider factors like noise, light, temperature, or potential medical issues.",
    medium: "You occasionally wake during the night. Try optimizing your sleep environment.",
    high: "You sleep through the night well, allowing for deeper, more restorative sleep cycles."
  },
  daytime_function: {
    low: "Daytime fatigue suggests your sleep isn't restorative. This affects productivity and well-being.",
    medium: "You have some energy issues during the day. Better sleep quality might help.",
    high: "You feel energized during the day, indicating good restorative sleep."
  },
  sleep_regularity: {
    low: "Your inconsistent sleep schedule is disrupting your circadian rhythm. Try to maintain consistent bedtimes and wake times.",
    medium: "Your sleep schedule has some consistency but could be improved. Regular sleep times help optimize your sleep quality.",
    high: "Your consistent sleep schedule supports your body's natural rhythms. This is excellent for sleep quality."
  },
  sleep_hygiene: {
    low: "Your habits around bedtime may be interfering with sleep. Avoid screens, caffeine, and stimulating activities before bed.",
    medium: "Some of your pre-sleep habits are good, but there's room for improvement in your sleep hygiene.",
    high: "Your sleep hygiene practices are helping you achieve good sleep."
  },
  sleep_anxiety: {
    low: "Anxiety about sleep is likely making it harder to sleep well. Breaking this cycle is important.",
    medium: "Some sleep anxiety is present. Relaxation techniques before bed might help.",
    high: "You don't experience anxiety about sleeping, which helps your mind and body transition to sleep naturally."
  }
};

export default function SleepAssessmentContent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    totalScore: number;
    maxScore: number;
    percentage: number;
    interpretation: string;
    categoryScores: {[key: string]: {score: number; maxScore: number; percentage: number; level: string}};
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnswer = (questionId: number, optionId: string, score: number) => {
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
    let totalScore = 0;
    const maxScore = questions.length * 3; // Maximum possible score
    const categoryScores: {[key: string]: {score: number; maxScore: number; count: number}} = {};

    // Calculate scores by category and total
    questions.forEach(question => {
      const answer = allAnswers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.id === answer);
        if (option) {
          totalScore += option.score;
          
          // Update category scores
          if (!categoryScores[question.category]) {
            categoryScores[question.category] = {score: 0, maxScore: 0, count: 0};
          }
          categoryScores[question.category].score += option.score;
          categoryScores[question.category].maxScore += 3; // Max score per question
          categoryScores[question.category].count += 1;
        }
      }
    });

    // Calculate percentage score
    const percentage = (totalScore / maxScore) * 100;

    // Determine interpretation level
    let interpretation;
    if (percentage >= 90) {
      interpretation = "excellent";
    } else if (percentage >= 75) {
      interpretation = "good";
    } else if (percentage >= 60) {
      interpretation = "fair";
    } else if (percentage >= 40) {
      interpretation = "poor";
    } else {
      interpretation = "veryPoor";
    }

    // Calculate percentage and level for each category
    const categoryScoresWithLevels: {[key: string]: {score: number; maxScore: number; percentage: number; level: string}} = {};
    
    Object.entries(categoryScores).forEach(([category, data]) => {
      const categoryPercentage = (data.score / data.maxScore) * 100;
      let level;
      
      if (categoryPercentage >= 75) {
        level = "high";
      } else if (categoryPercentage >= 50) {
        level = "medium";
      } else {
        level = "low";
      }
      
      categoryScoresWithLevels[category] = {
        score: data.score,
        maxScore: data.maxScore,
        percentage: categoryPercentage,
        level
      };
    });

    // Set results and show results view
    setResults({
      totalScore,
      maxScore,
      percentage,
      interpretation,
      categoryScores: categoryScoresWithLevels
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
            <span className="text-primary-400">Sleep Quality</span> Self-Assessment
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Analyze your sleep quality and get personalized recommendations to improve your rest
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
                      onClick={() => handleAnswer(questions[currentQuestionIndex].id, option.id, option.score)}
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
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">
                    {results && resultInterpretations[results.interpretation as keyof typeof resultInterpretations].icon}
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${results && resultInterpretations[results.interpretation as keyof typeof resultInterpretations].color}`}>
                    {results && resultInterpretations[results.interpretation as keyof typeof resultInterpretations].title}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {results && resultInterpretations[results.interpretation as keyof typeof resultInterpretations].description}
                  </p>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-44 h-44">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#1e293b"
                          strokeWidth="10"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${results ? 2 * Math.PI * 45 : 0}`}
                          strokeDashoffset={`${results ? 2 * Math.PI * 45 * (1 - results.percentage / 100) : 0}`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold">{results ? Math.round(results.percentage) : 0}</span>
                        <span className="text-sm text-gray-400">out of 100</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary-400">Personalized Recommendations</h3>
                  <ul className="space-y-2">
                    {results && resultInterpretations[results.interpretation as keyof typeof resultInterpretations].recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-400 mr-2 mt-1 flex-shrink-0">✓</span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary-400">Detailed Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results && Object.entries(results.categoryScores).map(([category, data]) => (
                      <div key={category} className="bg-dark-800/60 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                        <div className="h-2 bg-dark-700 rounded-full mb-2">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              data.level === 'high' ? 'bg-green-500' : 
                              data.level === 'medium' ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-300">
                          {categoryAnalysis[category as keyof typeof categoryAnalysis][data.level as keyof typeof categoryAnalysis.sleep_anxiety]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
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
            <h2 className="text-2xl font-semibold mb-4 text-center">Understanding Your Sleep Quality</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="glass-card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="text-center mb-3">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">What We Assess</h3>
                <p className="text-sm text-gray-300">
                  Our assessment evaluates key factors of sleep quality including how long it takes you to fall asleep, 
                  sleep duration, sleep disturbances, daytime function, sleep consistency, and sleep habits.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="text-center mb-3">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">How It Works</h3>
                <p className="text-sm text-gray-300">
                  Your answers are analyzed across multiple sleep quality dimensions. 
                  We calculate category-specific scores and provide targeted recommendations 
                  based on your personal sleep profile.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="text-center mb-3">
                  <span className="text-3xl">🛌</span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-center">Taking Action</h3>
                <p className="text-sm text-gray-300">
                  Use your personalized results to make targeted improvements to your sleep habits. 
                  Small changes can often lead to significant improvements in sleep quality and overall health.
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <p className="text-sm text-gray-400 italic">
              Note: This assessment is for informational purposes only and is not intended to diagnose sleep disorders. 
              If you have serious concerns about your sleep, please consult a healthcare professional.
            </p>
          </div>
          
          {/* 728x90 Ad Banner */}
          <motion.div
            className="w-full flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AdPlaceholder width={728} height={90} className="hidden md:flex" />
            <AdPlaceholder width={320} height={100} className="flex md:hidden" />
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
} 