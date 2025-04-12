import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Calculator - Calculate Your Ideal Sleep & Wake Times",
  description: "Free online Sleep Calculator helps you find the best time to sleep and wake up. Uses sleep cycles to determine optimal bedtime and wake-up times for better rest and energy.",
  keywords: "sleep calculator, best sleep calculator, sleep cycle calculator, bedtime calculator, wake-up time calculator, what time should I wake up, how much sleep do I need, sleep schedule calculator, REM sleep calculator, deep sleep calculator, best time to sleep calculator, sleep quality calculator, sleep duration calculator, ideal sleep time calculator, circadian rhythm calculator, sleep efficiency calculator",
  alternates: {
    canonical: 'https://sleepcalc.net'
  },
  openGraph: {
    title: "Sleep Calculator - Calculate Your Ideal Sleep & Wake Times",
    description: "Free online Sleep Calculator helps you find the best time to sleep and wake up. Uses sleep cycles to determine optimal bedtime and wake-up times for better rest and energy.",
    url: "https://sleepcalc.net",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Find Your Ideal Sleep Schedule"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Calculator - Calculate Your Ideal Sleep & Wake Times",
    description: "Free online Sleep Calculator helps you find the best time to sleep and wake up based on 90-minute sleep cycles.",
    images: ["/twitter-image.png"],
    creator: "@sleepcalculator",
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
  verification: {
    google: "REPLACE_WITH_YOUR_GOOGLE_SITE_VERIFICATION",
    yandex: "REPLACE_WITH_YOUR_YANDEX_VERIFICATION",
    yahoo: "REPLACE_WITH_YOUR_YAHOO_VERIFICATION",
    other: {
      me: ["REPLACE_WITH_YOUR_PERSONAL_SITE"],
    },
  }
}; 