import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sleep Calculator - Calculate Your Best Sleep Cycle',
  description: 'Optimize your sleep schedule with Sleep Calculator\'s sleep cycle calculator. Find ideal bedtimes, wake-up times, and nap durations for better rest and productivity.',
  keywords: 'sleep calculator, best sleep calculator, sleep cycle calculator, bedtime calculator, wake-up time calculator, what time should I wake up, how much sleep do I need, sleep schedule calculator, REM sleep calculator, deep sleep calculator, best time to sleep calculator, sleep quality calculator, sleep duration calculator, ideal sleep time calculator, circadian rhythm calculator, sleep efficiency calculator, baby sleep calculator',
  authors: [{ name: 'Sleep Calculator Team' }],
  creator: 'Sleep Calculator',
  publisher: 'Sleep Calculator',
  metadataBase: new URL('https://sleepcalc.net'),
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/icons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/icons/favicon-16x16.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://sleepcalc.net',
    title: 'Sleep Calculator - Calculate Your Best Sleep Cycle',
    description: 'Optimize your sleep schedule with Sleep Calculator\'s sleep cycle calculator. Find ideal bedtimes, wake-up times, and nap durations for better rest and productivity.',
    siteName: 'Sleep Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sleep Calculator - Calculate Your Best Sleep Cycle',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep Calculator - Calculate Your Best Sleep Cycle',
    description: 'Optimize your sleep schedule with Sleep Calculator\'s sleep cycle calculator. Find ideal bedtimes, wake-up times, and nap durations for better rest and productivity.',
    images: ['/twitter-image.png'],
    creator: '@sleepcalculator',
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
      <head>
        {/* Google Analytics */}
        <Script 
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JYRG2NF1Q1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JYRG2NF1Q1');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-dark-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
} 