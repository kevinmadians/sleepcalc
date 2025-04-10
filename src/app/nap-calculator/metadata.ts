import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nap Calculator - Sleep Calculator",
  description: "Find your ideal nap duration with our nap calculator. Calculate perfect power nap, refresh nap, or full cycle nap times based on your schedule for maximum energy and alertness.",
  keywords: "nap calculator, power nap calculator, best nap duration, optimal nap time, how long should I nap, refresh nap, full cycle nap, nap schedule calculator, power nap benefits, midday nap, afternoon nap, quick nap timer, nap benefits calculator, short nap benefits, long nap benefits, sleep cycle nap, nap time optimization",
  alternates: {
    canonical: 'https://sleepcalc.net/nap-calculator'
  },
  openGraph: {
    title: "Nap Calculator - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "Find your ideal nap duration with our nap calculator. Calculate perfect power nap, refresh nap, or full cycle nap times based on your schedule for maximum energy and alertness.",
    url: "https://sleepcalc.net/nap-calculator",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "https://sleepcalc.net/images/nap-calculator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Nap Calculator"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nap Calculator - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "Find your ideal nap duration with our nap calculator. Calculate perfect power nap, refresh nap, or full cycle nap times based on your schedule.",
    images: ["https://sleepcalc.net/images/nap-calculator-og.jpg"],
  }
}; 