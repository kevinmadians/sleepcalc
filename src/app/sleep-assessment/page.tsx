import type { Metadata } from "next";
import SleepAssessmentContent from './SleepAssessmentContent';

export const metadata: Metadata = {
  title: "Sleep Quality Self-Assessment - Sleep Calculator",
  description: "Assess your sleep quality with our interactive sleep assessment tool. Get personalized feedback and recommendations to improve your sleep.",
  keywords: "sleep quality assessment, sleep assessment tool, sleep quality checker, sleep self-assessment, sleep quality score, sleep health test, insomnia assessment, sleep disorder screening, sleep habit evaluation, personalized sleep recommendations, sleep improvement assessment, sleep quality index, sleep efficiency test, sleep pattern analysis, circadian rhythm assessment, sleep hygiene evaluation, sleep quality questionnaire, sleep health assessment, sleep quality measurement, sleep wellness assessment",
  openGraph: {
    title: "Sleep Quality Self-Assessment - Sleep Calculator",
    description: "Assess your sleep quality with our interactive sleep assessment tool. Get personalized feedback and recommendations to improve your sleep.",
    url: "https://sleepcalc.net/sleep-assessment",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "https://sleepcalc.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Sleep Quality Assessment"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Quality Self-Assessment - Sleep Calculator",
    description: "Assess your sleep quality with our interactive sleep assessment tool. Get personalized feedback and recommendations to improve your sleep.",
    images: ["https://sleepcalc.net/og-image.jpg"],
  }
};

export default function SleepAssessment() {
  // JSON-LD schema for SEO
  const sleepAssessmentSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sleep Quality Self-Assessment",
    "description": "Assess your sleep quality with our interactive sleep assessment tool. Get personalized feedback and recommendations to improve your sleep.",
    "mainEntity": {
      "@type": "HealthAndBeautyBusiness",
      "name": "Sleep Calculator",
      "description": "Calculate optimal sleep times and assess sleep quality."
    },
    "keywords": "sleep quality assessment, sleep assessment tool, sleep quality checker, sleep self-assessment, sleep quality score, sleep health test, insomnia assessment, sleep disorder screening, sleep habit evaluation, personalized sleep recommendations, sleep improvement assessment, sleep quality index, sleep efficiency test, sleep pattern analysis, circadian rhythm assessment, sleep hygiene evaluation, sleep quality questionnaire, sleep health assessment, sleep quality measurement, sleep wellness assessment"
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sleepAssessmentSchema) }}
      />
      <SleepAssessmentContent />
    </>
  );
} 
