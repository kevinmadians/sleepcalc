import SleepAssessmentContent from './SleepAssessmentContent';

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
