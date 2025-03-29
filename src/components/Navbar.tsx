"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  // Define navigation links
  const navigationLinks = [
    { name: 'Sleep Calculator', href: '/' },
    { name: 'Nap Calculator', href: '/nap-calculator' },
    { name: 'Sleep Tips', href: '/sleep-tips' },
  ];
  
  // Define mobile menu links (including the extra pages)
  const mobileMenuLinks = [
    ...navigationLinks,
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
  ];
  
  return (
    <nav className="sticky top-0 z-40 w-full bg-dark-900 border-b border-dark-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-primary-400">Sleep</span>Calc
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-sm">
          {navigationLinks.map((link) => (
            !isActive(link.href) && (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            )
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu - Full Screen Overlay with Animation */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <h1 className="text-xl font-bold">
              <span className="text-primary-400">Sleep</span>Calc
            </h1>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-white hover:text-primary-400 focus:outline-none"
            aria-label="Close menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="container mx-auto px-4 mt-12">
          <ul className="space-y-6 text-lg">
            {navigationLinks.map((link) => (
              !isActive(link.href) && (
                <li key={link.href} className="text-center">
                  <Link 
                    href={link.href} 
                    className="block py-4 px-4 rounded-lg text-white text-xl hover:bg-primary-600/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            ))}
            
            <li><div className="my-6 border-t border-dark-700"></div></li>
            
            {mobileMenuLinks.slice(navigationLinks.length).map((link) => (
              !isActive(link.href) && (
                <li key={link.href} className="text-center">
                  <Link 
                    href={link.href} 
                    className="block py-3 px-4 rounded-lg text-white text-lg hover:bg-primary-600/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
} 