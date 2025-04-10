"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function TermsOfUsePage() {
  // Set document title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Terms of Use - Sleep Calculator";
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
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary-400">Terms of Use</h1>
            
            <div className="my-6"></div>
            
            <div className="prose prose-dark max-w-none">
              <p className="text-gray-300 mb-4">
                Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the Sleep Calculator website (the "Service") operated by Sleep Calculator ("us", "we", or "our").
              </p>
              
              <p className="text-gray-300 mb-4">
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              
              <p className="text-gray-300 mb-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Use of the Service</h2>
              <p className="text-gray-300 mb-4">
                The Service is designed to provide informational content about sleep patterns, sleep cycles, and sleep hygiene. The sleep cycle calculations and recommendations provided by the Service are based on general sleep science research and are intended for informational purposes only.
              </p>
              
              <p className="text-gray-300 mb-4">
                You are responsible for your use of the Service and for any consequences thereof. You may use the Service only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Intellectual Property</h2>
              <p className="text-gray-300 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Sleep Calculator and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sleep Calculator.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Medical Disclaimer</h2>
              <p className="text-gray-300 mb-4">
                The content provided on the Service is for informational and educational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
              
              <p className="text-gray-300 mb-4">
                Never disregard professional medical advice or delay in seeking it because of something you have read on the Service. If you think you may have a medical emergency, call your doctor or 911 immediately.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Links to Other Websites</h2>
              <p className="text-gray-300 mb-4">
                Our Service may contain links to third-party websites or services that are not owned or controlled by Sleep Calculator.
              </p>
              
              <p className="text-gray-300 mb-4">
                Sleep Calculator has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Sleep Calculator shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
              
              <p className="text-gray-300 mb-4">
                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                In no event shall Sleep Calculator, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Indemnification</h2>
              <p className="text-gray-300 mb-4">
                You agree to defend, indemnify, and hold harmless Sleep Calculator and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms; or c) content posted on the Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Changes</h2>
              <p className="text-gray-300 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              
              <p className="text-gray-300 mb-4">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Governing Law</h2>
              <p className="text-gray-300 mb-4">
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
              
              <p className="text-gray-300 mb-4">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms, please contact us using our <Link href="/contact" className="text-primary-400 hover:underline">contact form</Link>.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-dark-800/50 rounded-lg border border-dark-700">
              <h3 className="text-lg font-semibold mb-4 text-primary-400">Related Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/privacy-policy" className="flex items-center p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors">
                  <div className="bg-primary-900/30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <span>Privacy Policy</span>
                </Link>
                <Link href="/cookie-policy" className="flex items-center p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors">
                  <div className="bg-primary-900/30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <span>Cookie Policy</span>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mb-8">
            <Link href="/contact" className="inline-block btn-primary">Contact Us</Link>
            <p className="text-sm text-gray-400 mt-2">Have questions about our terms? We're here to help.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
