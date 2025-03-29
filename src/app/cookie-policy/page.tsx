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
  "name": "Cookie Policy - Sleep Calculator",
  "description": "Learn about how Sleep Calculator uses cookies to improve your browsing experience and provide personalized services."
};

export default function CookiePolicyPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
      {mounted && <Navbar />}
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiePolicySchema) }}
        />
        
        {/* Ad banner at top */}
        <div className="flex justify-center mb-8">
          <AdPlaceholder width={728} height={90} className="hidden md:flex" />
          <AdPlaceholder width={320} height={100} className="flex md:hidden" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <motion.div
            className="glass-card p-6 md:p-8 md:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Cookie Policy</h1>
            
            <p className="text-sm text-gray-400 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-gray-200">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">What Are Cookies</h2>
                <p className="mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">How We Use Cookies</h2>
                <p className="mb-4">
                  Sleep Calculator uses cookies to improve your browsing experience, analyze site traffic, personalize content, and remember your preferences. We may also use cookies to help us compile aggregate data about site traffic and interaction so we can offer better site experiences in the future.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">Types of Cookies We Use</h2>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be disabled in our systems.</li>
                  <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                  <li><strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
                  <li><strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">Managing Cookies</h2>
                <p className="mb-4">
                  Most web browsers allow some control of cookies through browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">www.allaboutcookies.org</a>.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">Your Choices</h2>
                <p className="mb-4">
                  If you disable cookies, some features will be disabled which may affect your browsing experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">Changes to Our Cookie Policy</h2>
                <p className="mb-4">
                  We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about our Cookie Policy, please contact us through our Contact page.
                </p>
              </section>
            </div>
          </motion.div>
          
          {/* Sidebar with ad */}
          <div className="md:w-1/4">
            <div className="sticky top-24">
              <div className="flex justify-center mb-6">
                <AdPlaceholder width={300} height={250} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Ad banner at bottom */}
        <div className="flex justify-center mt-8">
          <AdPlaceholder width={728} height={90} className="hidden md:flex" />
          <AdPlaceholder width={320} height={100} className="flex md:hidden" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 