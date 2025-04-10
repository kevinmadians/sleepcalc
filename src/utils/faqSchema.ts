/**
 * FAQ Schema utility for structured data
 * This file contains FAQ schemas that can be reused across different pages
 */

// Base FAQ schema creator
export const createFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Sleep Calculator main FAQs
export const sleepCalculatorFAQs = [
  {
    question: "How does the Sleep Calculator work?",
    answer: "The Sleep Calculator works by counting backwards in 90-minute sleep cycles from your desired wake-up time, or forwards from your bedtime. Each 90-minute cycle represents a complete sleep cycle including light sleep, deep sleep, and REM sleep phases. The calculator suggests times that allow you to wake up between cycles rather than during a cycle to avoid sleep inertia and morning grogginess."
  },
  {
    question: "How many hours of sleep do I need?",
    answer: "Most adults need 7-9 hours of sleep per night. Teenagers need 8-10 hours, school-age children need 9-12 hours, and infants and toddlers need even more. However, individual needs vary. The Sleep Calculator helps you optimize your sleep timing regardless of your sleep duration preference."
  },
  {
    question: "What is a sleep cycle?",
    answer: "A sleep cycle is a progression through different stages of sleep, including light sleep (N1 and N2), deep sleep (N3), and REM sleep. A typical cycle lasts about 90 minutes, and adults typically go through 4-6 cycles per night. Waking at the end of a cycle rather than in the middle typically leads to feeling more refreshed."
  },
  {
    question: "What's the best time to go to sleep?",
    answer: "The best time to go to sleep depends on when you need to wake up and your individual chronotype (natural sleep tendency). For most adults with a typical schedule, going to sleep between 9 PM and midnight allows for adequate sleep cycles before a morning wake-up time. The Sleep Calculator can help you find the optimal bedtime based on your preferred wake-up time."
  },
  {
    question: "Why do I still feel tired after 8 hours of sleep?",
    answer: "Feeling tired after adequate sleep duration can be due to several factors: poor sleep quality, sleep disorders like sleep apnea, waking during a deep sleep stage, inconsistent sleep schedule, or health issues. Using the Sleep Calculator to align your wake-up time with the end of a sleep cycle can help, but if persistent tiredness continues, consider consulting a healthcare provider."
  }
];

// Nap Calculator FAQs
export const napCalculatorFAQs = [
  {
    question: "How long should a power nap be?",
    answer: "A power nap should be 10-20 minutes long. This short duration provides a quick boost of alertness and energy without causing sleep inertia (post-nap grogginess) because it keeps you in the lighter stages of sleep."
  },
  {
    question: "What's the best time of day to take a nap?",
    answer: "The best time to nap is typically in the early to mid-afternoon (1:00-3:00 PM), during the post-lunch dip in alertness. Napping later in the day can interfere with nighttime sleep. Avoid napping within 3 hours of your bedtime."
  },
  {
    question: "Why do I feel groggy after napping?",
    answer: "Feeling groggy after a nap (sleep inertia) usually happens when you wake up during deep sleep. This typically occurs with naps lasting 30-60 minutes. To avoid this, either keep naps shorter (20 minutes or less) or longer (90 minutes) to complete a full sleep cycle."
  },
  {
    question: "Are naps good for you?",
    answer: "Yes, naps can be beneficial when taken properly. Benefits include improved alertness, mood, performance, memory consolidation, and stress reduction. Regular short naps may even have heart health benefits. However, they should complement, not replace, adequate nighttime sleep."
  },
  {
    question: "How can I fall asleep quickly for a nap?",
    answer: "To fall asleep quickly for a nap: find a dark, quiet environment; use an eye mask and earplugs if needed; recline or lie down; practice deep breathing; try progressive muscle relaxation; maintain a cool room temperature; and establish a brief pre-nap routine to signal your body it's time to rest."
  }
];

// Sleep Debt FAQs
export const sleepDebtFAQs = [
  {
    question: "What is sleep debt?",
    answer: "Sleep debt is the accumulated sleep deficit that occurs when you consistently get less sleep than your body needs. For example, if you need 8 hours of sleep but only get 6 hours each night, you'll accumulate a sleep debt of 14 hours after one week."
  },
  {
    question: "Can you repay sleep debt?",
    answer: "Yes, you can repay sleep debt, but it's best done gradually. For short-term debt (a few days), you can catch up with extra sleep on weekends. For long-term chronic sleep debt, a more systematic approach is needed, such as adding 15-30 minutes of sleep each night until you reach your optimal duration."
  },
  {
    question: "How does sleep debt affect health?",
    answer: "Sleep debt can negatively impact many aspects of health, including cognitive function, mood regulation, immune system, metabolism, cardiovascular health, and hormone regulation. Chronic sleep debt is associated with increased risk of obesity, diabetes, heart disease, depression, and reduced life expectancy."
  },
  {
    question: "How much sleep do I need to avoid sleep debt?",
    answer: "Most adults need 7-9 hours of sleep per night to avoid accumulating sleep debt. Teenagers need 8-10 hours, school-age children need 9-12 hours, and preschoolers need 10-13 hours. Individual needs can vary, so pay attention to how you feel to determine your ideal amount."
  },
  {
    question: "Is sleeping in on weekends a good way to catch up on sleep?",
    answer: "Sleeping in on weekends can help repay short-term sleep debt, but it's not an ideal long-term solution. This pattern, known as 'social jetlag,' disrupts your circadian rhythm and can cause sleep problems. A more consistent sleep schedule across all days is generally better for sleep health."
  }
];

// Chronotype FAQs
export const chronotypeFAQs = [
  {
    question: "What is a chronotype?",
    answer: "A chronotype is your body's natural preference for sleeping and waking at certain times, determined by your biological clock. The four main chronotypes are: bear (most common, follows solar cycle), wolf (evening preference), lion (morning preference), and dolphin (light sleepers with irregular patterns)."
  },
  {
    question: "Can I change my chronotype?",
    answer: "Your chronotype is largely determined by genetics and tends to remain relatively stable, though it can change somewhat with age. While you cannot completely change your inherent chronotype, you can make lifestyle adjustments to better accommodate work/life demands or to slightly shift your sleep-wake patterns."
  },
  {
    question: "How does knowing my chronotype help me?",
    answer: "Knowing your chronotype helps you understand your body's natural energy patterns and optimal times for sleep, focus, creativity, and exercise. Aligning your daily schedule with your chronotype can improve sleep quality, productivity, mood, and overall well-being."
  },
  {
    question: "What's the difference between chronotype and being a morning or night person?",
    answer: "Chronotype is a more comprehensive and scientific concept than simply being a 'morning' or 'night' person. Chronotypes encompass not just sleep preferences but entire 24-hour biological rhythms that affect hormones, body temperature, cognitive function, and physical performance throughout the day."
  },
  {
    question: "Do chronotypes change with age?",
    answer: "Yes, chronotypes naturally shift throughout the lifespan. Children tend to be early birds, teenagers shift to later chronotypes (night owls), adults gradually move earlier again, and older adults often become morning types. Significant changes to your long-established chronotype can also sometimes indicate health issues."
  }
]; 