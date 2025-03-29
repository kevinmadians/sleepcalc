import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SleepCalc - Calculate Your Best Sleep Cycle',
  description: 'Optimize your sleep schedule with SleepCalc\'s sleep cycle calculator. Find ideal bedtimes, wake-up times, and nap durations for better rest and productivity.',
  keywords: 'sleep calculator, best sleep calculator, sleep cycle calculator, bedtime calculator, wake-up time calculator, what time should I wake up, how much sleep do I need, sleep schedule calculator, REM sleep calculator, deep sleep calculator, best time to sleep calculator, sleep quality calculator, sleep duration calculator, ideal sleep time calculator, circadian rhythm calculator, sleep efficiency calculator, baby sleep calculator',
  authors: [{ name: 'SleepCalc Team' }],
  creator: 'SleepCalc',
  publisher: 'SleepCalc',
  metadataBase: new URL('https://sleepcalc.net'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: 'https://sleepcalc.net',
    title: 'SleepCalc - Calculate Your Best Sleep Cycle',
    description: 'Optimize your sleep schedule with SleepCalc\'s sleep cycle calculator. Find ideal bedtimes, wake-up times, and nap durations for better rest and productivity.',
    siteName: 'SleepCalc',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SleepCalc - Calculate Your Best Sleep Cycle',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SleepCalc - Calculate Your Best Sleep Cycle',
    description: 'Optimize your sleep schedule with SleepCalc\'s sleep cycle calculator. Find ideal bedtimes, wake-up times, and nap durations for better rest and productivity.',
    images: ['/twitter-image.png'],
    creator: '@sleepcalc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

// Viewport metadata
export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} bg-dark-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
} 