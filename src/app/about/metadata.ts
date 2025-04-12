import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Sleep Calculator",
  description: "Learn about Sleep Calculator, our mission to improve global sleep health, and the science behind our tools. Discover how we're helping millions sleep better.",
  keywords: "about sleep calculator, sleep calculator mission, sleep science, sleep cycle science, sleep health experts, sleep research, sleep technology, sleep health mission, sleep education, REM sleep science, NREM sleep stages, circadian rhythm research, sleep health tools, sleep science foundation",
  alternates: {
    canonical: 'https://sleepcalc.net/about'
  },
  openGraph: {
    title: "About - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "Learn about Sleep Calculator, our mission to improve global sleep health, and the science behind our tools. Discover how we're helping millions sleep better.",
    url: "https://sleepcalc.net/about",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Sleep Calculator - Our Mission & Sleep Science"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Sleep Calculator | Calculate Your Ideal Sleep & Wake Times",
    description: "Learn about Sleep Calculator, our mission to improve global sleep health, and the science behind our tools.",
    images: ["/twitter-image.png"],
  }
}; 