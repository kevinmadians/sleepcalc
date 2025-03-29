"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function TestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center flex-grow w-full px-4 py-12 md:py-24">
        <h1 className="text-4xl font-bold mb-8">Test Page</h1>
        <p className="mb-8">This is a simple test page to verify routing is working.</p>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/" className="bg-primary-600 text-white py-2 px-4 rounded-lg">
            Sleep Calculator
          </Link>
          <Link href="/nap-calculator" className="bg-primary-600 text-white py-2 px-4 rounded-lg">
            Nap Calculator
          </Link>
          <Link href="/sleep-tips" className="bg-primary-600 text-white py-2 px-4 rounded-lg">
            Sleep Tips
          </Link>
          <Link href="/sleep-results" className="bg-primary-600 text-white py-2 px-4 rounded-lg">
            Sleep Results
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 