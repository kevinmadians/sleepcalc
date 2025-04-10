/**
 * Website Schema utility for structured data
 * This creates a comprehensive schema for the entire website that can be used in the layout
 */

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sleep Calculator",
  "url": "https://sleepcalc.net",
  "description": "Free online Sleep Calculator helps you find the best time to sleep and wake up. Uses sleep cycles to determine optimal bedtime and wake-up times for better rest and energy.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://sleepcalc.net/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Sleep Calculator",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sleepcalc.net/logo.png",
      "width": 180,
      "height": 60
    },
    "sameAs": [
      "https://twitter.com/sleepcalculator",
      "https://www.facebook.com/sleepcalculator",
      "https://www.instagram.com/sleepcalculator"
    ]
  },
  "author": {
    "@type": "Organization",
    "name": "Sleep Calculator Team",
    "url": "https://sleepcalc.net/about"
  },
  "creator": {
    "@type": "Organization",
    "name": "Sleep Calculator",
    "url": "https://sleepcalc.net"
  },
  "keywords": [
    "sleep calculator", 
    "sleep cycle calculator", 
    "bedtime calculator", 
    "wake-up time calculator",
    "nap calculator",
    "sleep debt calculator",
    "chronotype analyzer",
    "sleep assessment",
    "sleep tips",
    "better sleep"
  ],
  "inLanguage": "en-US",
  "copyrightYear": "2023",
  "dateCreated": "2023-09-01T00:00:00Z",
  "dateModified": "2024-05-01T00:00:00Z"
}; 