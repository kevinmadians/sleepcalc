import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Sleep Calculator",
  description: "Get in touch with the Sleep Calculator team. Contact us with your questions, feedback, partnership inquiries, or sleep science suggestions.",
  keywords: "contact sleep calculator, sleep calculator support, sleep calculator help, sleep questions, sleep advice contact, sleep expert contact, sleep science questions, sleep app feedback, sleep tool suggestions, sleep calculator feedback, sleep health contact, sleep research contact",
  alternates: {
    canonical: 'https://sleepcalc.net/contact'
  },
  openGraph: {
    title: "Contact Us - Sleep Calculator",
    description: "Have questions about our sleep calculator or sleep tools? Contact our team for support, feedback, or inquiries about sleep science and sleep optimization.",
    url: "https://sleepcalc.net/contact",
    siteName: "Sleep Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sleep Calculator - Contact Us"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Sleep Calculator",
    description: "Have questions about our sleep calculator or sleep tools? Contact our team for support, feedback, or inquiries about sleep science and optimization.",
    images: ["/twitter-image.png"],
  }
}; 