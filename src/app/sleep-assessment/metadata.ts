import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sleep Assessment - Sleep Calculator",
  description: "Take our free sleep quality assessment to evaluate your sleep habits and quality. Get personalized recommendations to improve your sleep health based on your results.",
  keywords: "sleep assessment, sleep quality quiz, sleep evaluation, sleep quality test, sleep habits assessment, sleep health assessment, insomnia assessment, sleep disorder screening, sleep questionnaire, sleep quality index, sleep assessment tool, personalized sleep recommendations, sleep quality score, sleep wellness assessment, sleep pattern analysis, sleep hygiene evaluation",
  alternates: {
    canonical: 'https://sleepcalc.net/sleep-assessment'
  },
  openGraph: {
    title: "Sleep Assessment - Sleep Calculator",
    description: "Take our free sleep quality assessment to evaluate your sleep habits and quality. Get personalized recommendations to improve your sleep health based on your results.",
    url: "https://sleepcalc.net/sleep-assessment",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Sleep Quality Assessment Quiz"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Assessment - Sleep Calculator",
    description: "Take our free sleep quality assessment to evaluate your sleep habits and get personalized recommendations to improve your sleep health.",
    images: ["/twitter-image.png"],
  }
}; 