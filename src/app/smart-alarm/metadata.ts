import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Alarm Calculator - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times',
  description: 'Calculate your optimal wake-up time using sleep cycles, chronotype, and sleep inertia. Get personalized smart alarm recommendations for better morning energy and productivity.',
  keywords: 'smart alarm, sleep cycles, chronotype, sleep inertia, wake-up time calculator, optimal alarm time, sleep optimization, sleep science',
  openGraph: {
    title: 'Smart Alarm Calculator - Sleep Calculator',
    description: 'Calculate your optimal wake-up time using sleep cycles, chronotype, and sleep inertia. Get personalized smart alarm recommendations for better morning energy and productivity.',
    url: 'https://sleepcalculator.com/smart-alarm',
    siteName: 'Sleep Calculator',
    images: [
      {
        url: 'https://sleepcalculator.com/images/og-smart-alarm.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Alarm Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Alarm Calculator - Sleep Calculator',
    description: 'Calculate your optimal wake-up time using sleep cycles, chronotype, and sleep inertia for better mornings.',
    images: ['https://sleepcalculator.com/images/og-smart-alarm.jpg'],
  },
}; 