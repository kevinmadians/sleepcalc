import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caffeine Calculator - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times',
  description: 'Track caffeine intake, visualize caffeine half-life, and get personalized recommendations on when to stop consuming caffeine for better sleep quality.',
  keywords: 'caffeine calculator, caffeine half-life, sleep quality, caffeine intake tracker, caffeine and sleep, sleep optimization, when to stop drinking coffee',
  openGraph: {
    title: 'Caffeine Calculator - Sleep Calculator',
    description: 'Track caffeine intake, visualize caffeine half-life, and get personalized recommendations on when to stop consuming caffeine for better sleep quality.',
    url: 'https://sleepcalculator.com/caffeine-calculator',
    siteName: 'Sleep Calculator',
    images: [
      {
        url: 'https://sleepcalculator.com/images/og-caffeine-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Caffeine Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caffeine Calculator - Sleep Calculator',
    description: 'Track caffeine intake and get recommendations on when to stop consuming caffeine for better sleep quality.',
    images: ['https://sleepcalculator.com/images/og-caffeine-calculator.jpg'],
  },
}; 