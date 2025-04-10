/**
 * Breadcrumb Schema utility for structured data
 * Used to generate breadcrumb schemas for better SEO and search result display
 */

export const createBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Pre-defined breadcrumb paths for common pages
 */

// Home page breadcrumb
export const homeBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" }
]);

// Sleep Calculator results page breadcrumb
export const sleepResultsBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "Sleep Results", url: "https://sleepcalc.net/sleep-results" }
]);

// Nap Calculator page breadcrumb
export const napCalculatorBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "Nap Calculator", url: "https://sleepcalc.net/nap-calculator" }
]);

// Sleep Tips page breadcrumb
export const sleepTipsBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "Sleep Tips", url: "https://sleepcalc.net/sleep-tips" }
]);

// Sleep Debt page breadcrumb
export const sleepDebtBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "Sleep Debt Calculator", url: "https://sleepcalc.net/sleep-debt" }
]);

// Sleep Assessment page breadcrumb
export const sleepAssessmentBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "Sleep Assessment", url: "https://sleepcalc.net/sleep-assessment" }
]);

// Chronotype Analyzer page breadcrumb
export const chronotypeBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "Chronotype Analyzer", url: "https://sleepcalc.net/chronotype-analyzer" }
]);

// About page breadcrumb
export const aboutBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "About", url: "https://sleepcalc.net/about" }
]);

// Contact page breadcrumb
export const contactBreadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://sleepcalc.net" },
  { name: "Contact", url: "https://sleepcalc.net/contact" }
]); 