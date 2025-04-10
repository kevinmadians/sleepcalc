"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  // Set document title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Privacy Policy - Sleep Calculator";
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-card p-6 md:p-8 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary-400">Privacy Policy</h1>
            
            <div className="my-6"></div>
            
            <div className="prose prose-dark max-w-none">
              <p className="text-gray-300 mb-4">
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit Sleep Calculator ("we", "us", or "our"). We respect your privacy and are committed to protecting it through our compliance with this policy.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the site, and information about how you interact with the site. We refer to this automatically-collected information as "Device Information."
              </p>
              
              <h3 className="text-lg font-medium mb-2 text-gray-200">We collect Device Information using the following technologies:</h3>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li>"Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit our <Link href="/cookie-policy" className="text-primary-400 hover:underline">Cookie Policy</Link>.</li>
                <li>"Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
                <li>"Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
              </p>
              
              <p className="text-gray-300 mb-4">
                We also use this information to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li>Estimate our audience size and usage patterns.</li>
                <li>Store information about your preferences, allowing us to customize our website according to your individual interests.</li>
                <li>Speed up your searches.</li>
                <li>Recognize you when you return to our website.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Sharing Your Personal Information</h2>
              <p className="text-gray-300 mb-4">
                We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
              </p>
              
              <p className="text-gray-300 mb-4">
                Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Do Not Track</h2>
              <p className="text-gray-300 mb-4">
                Please note that we do not alter our Site's data collection and use practices when we see a Do Not Track signal from your browser.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Your Rights</h2>
              <p className="text-gray-300 mb-4">
                If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
              </p>
              
              <p className="text-gray-300 mb-4">
                Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Data Retention</h2>
              <p className="text-gray-300 mb-4">
                When you visit the website, we will maintain your Device Information for our records unless and until you ask us to delete this information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Changes</h2>
              <p className="text-gray-300 mb-4">
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Minors</h2>
              <p className="text-gray-300 mb-4">
                The Site is not intended for individuals under the age of 13.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail using our <Link href="/contact" className="text-primary-400 hover:underline">contact form</Link>.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-dark-800/50 rounded-lg border border-dark-700">
              <h3 className="text-lg font-semibold mb-4 text-primary-400">Related Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/cookie-policy" className="flex items-center p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors">
                  <div className="bg-primary-900/30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <span>Cookie Policy</span>
                </Link>
                <Link href="/terms-of-use" className="flex items-center p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors">
                  <div className="bg-primary-900/30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <span>Terms of Use</span>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mb-8">
            <Link href="/contact" className="inline-block btn-primary">Contact Us</Link>
            <p className="text-sm text-gray-400 mt-2">Have questions about our privacy practices? We're here to help.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
