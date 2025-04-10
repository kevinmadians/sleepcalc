"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';


// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });

export default function NotFound() {
  const router = useRouter();
  
  // Redirect to cookie-policy page after a short delay
  useEffect(() => {
    // Force set the document title directly
    if (typeof window !== 'undefined') {
      document.title = "Page Not Found - Sleep Calculator";
    }

    const redirectTimer = setTimeout(() => {
      router.push('/cookie-policy');
    }, 3000); // 3 second delay before redirect
    
    return () => clearTimeout(redirectTimer);
  }, [router]);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      
      <motion.div 
        className="flex flex-col items-center justify-center flex-grow w-full px-4 py-12 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="text-gradient">Redirecting</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          You will be redirected to our Cookie Policy page in a few seconds...
        </motion.p>
        
        {/* Loading indicator */}
        <motion.div
          className="w-16 h-16 my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ delay: 0.5, duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border-4 border-t-primary-400 border-r-primary-400/70 border-b-primary-400/40 border-l-primary-400/10 rounded-full"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6"
        >
          <button
            onClick={() => router.push('/cookie-policy')}
            className="bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Go to Cookie Policy Now
          </button>
        </motion.div>
      </motion.div>
      
      <Footer />
    </main>
  );
} 
