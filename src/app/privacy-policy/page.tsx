"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function PrivacyPolicyPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
      {mounted && <Navbar />}
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
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
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Privacy Policy</h1>
            
            <p className="text-sm text-gray-400 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-gray-200">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to Sleep Calculator. We respect your privacy and are committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">2. Information We Collect</h2>
                <p className="mb-4">
                  <strong>Personal Data:</strong> We do not collect personally identifiable information such as your name, email address, or phone number unless you voluntarily provide it to us through the contact form.
                </p>
                <p className="mb-4">
                  <strong>Usage Data:</strong> We may collect information about how you interact with our website, such as the pages you visit, time spent on those pages, and other diagnostic data.
                </p>
                <p>
                  <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information to enhance your experience.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">3. How We Use Your Information</h2>
                <p className="mb-2">We use the information we collect in various ways, including to:</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Develop new features and functionality</li>
                  <li>Communicate with you, if you've contacted us</li>
                  <li>Monitor the usage of our website</li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">4. Data Sharing and Disclosure</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">5. Data Security</h2>
                <p>
                  We implement reasonable precautions and follow industry best practices to protect your information and ensure that it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">6. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">7. Children's Privacy</h2>
                <p>
                  Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">8. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">9. Contact Us</h2>
                <p>
                  If you have any questions or suggestions about our Privacy Policy, please contact us through the contact form on our website.
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