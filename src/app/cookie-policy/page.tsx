"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

// JSON-LD schema for SEO
const cookiePolicySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Cookie Policy - SleepCalc",
  "description": "Learn about how SleepCalc uses cookies to improve your browsing experience and provide personalized services."
};

export default function CookiePolicyPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiePolicySchema) }}
      />
      
      <main className="flex min-h-screen flex-col">
        <Navbar />
        
        <motion.div 
          className="container mx-auto px-4 py-8 flex-grow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Cookie Policy
          </motion.h1>
          
          <div className="bg-dark-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary-400">What Are Cookies</h2>
            <p className="mb-4">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6 text-primary-400">How We Use Cookies</h2>
            <p className="mb-4">
              SleepCalc uses cookies to improve your browsing experience, analyze site traffic, personalize content, and remember your preferences. We may also use cookies to help us compile aggregate data about site traffic and interaction so we can offer better site experiences in the future.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6 text-primary-400">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be disabled in our systems.</li>
              <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li><strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
              <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-6 text-primary-400">Managing Cookies</h2>
            <p className="mb-4">
              Most web browsers allow some control of cookies through browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">www.allaboutcookies.org</a>.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6 text-primary-400">Your Choices</h2>
            <p className="mb-4">
              If you disable cookies, some features will be disabled which may affect your browsing experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6 text-primary-400">Changes to Our Cookie Policy</h2>
            <p className="mb-4">
              We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6 text-primary-400">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our Cookie Policy, please contact us through our Contact page.
            </p>
          </div>
        </motion.div>
        
        <AdPlaceholder width={728} height={90} className="mx-auto my-8 hidden md:flex" />
        <AdPlaceholder width={320} height={100} className="mx-auto my-8 flex md:hidden" />
        
        <Footer />
      </main>
    </>
  );
} 