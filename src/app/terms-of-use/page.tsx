"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function TermsOfUsePage() {
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
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Terms of Use</h1>
            
            <p className="text-sm text-gray-400 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-6 text-gray-200">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using this website (Sleep Calculator), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">2. Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily use this website for personal, non-commercial purposes only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p>
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by Sleep Calculator at any time.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">3. Disclaimer</h2>
                <p className="mb-4">
                  The materials on Sleep Calculator's website are provided "as is". Sleep Calculator makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p>
                  Furthermore, Sleep Calculator does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">4. Limitations</h2>
                <p>
                  In no event shall Sleep Calculator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sleep Calculator's website, even if Sleep Calculator or a Sleep Calculator authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">5. Accuracy of Materials</h2>
                <p>
                  The materials appearing on Sleep Calculator's website could include technical, typographical, or photographic errors. Sleep Calculator does not warrant that any of the materials on its website are accurate, complete, or current. Sleep Calculator may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">6. Links</h2>
                <p>
                  Sleep Calculator has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Sleep Calculator of the site. Use of any such linked website is at the user's own risk.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">7. Modifications</h2>
                <p>
                  Sleep Calculator may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">8. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws and any dispute relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">9. Medical Disclaimer</h2>
                <p>
                  The information provided by Sleep Calculator is for informational purposes only and is not intended as a substitute for advice from your physician or other healthcare professional. You should not use the information on this website for diagnosing or treating a health problem or disease. Always consult with a qualified healthcare professional before making any changes to your sleep routine, especially if you have an existing medical condition.
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