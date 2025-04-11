"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMoreToolsOpen, setMobileMoreToolsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);
  
  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setMobileMoreToolsOpen(false);
  }, [pathname]);
  
  // Close dropdown when clicking outside (for mobile/tablet where hover isn't available)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    // Only add click listener for touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [mobileMenuOpen]);
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  // Define main navigation links
  const mainNavigationLinks = [
    { name: 'Sleep Calculator', href: '/' },
    { name: 'Nap Calculator', href: '/nap-calculator' },
    { name: 'Sleep Debt', href: '/sleep-debt' },
    { name: 'Chronotype Analyzer', href: '/chronotype-analyzer' },
  ];
  
  // Define More Tools dropdown links
  const moreToolsLinks = [
    { name: 'Sleep Tips', href: '/sleep-tips' },
    { name: 'Sleep Assessment', href: '/sleep-assessment' },
    { name: 'Sleep Tracker', href: '/sleep-tracker' },
    { name: 'Smart Alarm Calculator', href: '/smart-alarm' },
    { name: 'Caffeine Calculator', href: '/caffeine-calculator' },
  ];
  
  // Define mobile menu links (including the extra pages)
  const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ];
  
  return (
    <nav className="sticky top-0 z-40 w-full bg-dark-900 border-b border-dark-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-primary-400">Sleep</span> Calculator
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-sm">
          {mainNavigationLinks.map((link) => (
            !isActive(link.href) && (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-white hover:text-primary-400 transition-colors font-bold"
                >
                  {link.name}
                </Link>
              </li>
            )
          ))}
          
          {/* More Tools Dropdown - Hover Version */}
          <li className="relative group" ref={dropdownRef}>
            <button
              className="text-white hover:text-primary-400 transition-colors font-bold flex items-center focus:outline-none focus:text-primary-400"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onMouseOver={() => setDropdownOpen(true)}
              onFocus={() => setDropdownOpen(true)}
              onClick={() => setDropdownOpen(!dropdownOpen)} // For touch devices
            >
              More Tools
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Dropdown Menu - Shows on Hover or Focus */}
            <div 
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-800 ring-1 ring-dark-700 z-50 transition-opacity duration-150 ease-in-out ${
                dropdownOpen ? 'opacity-100' : 'opacity-0 invisible'
              }`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {moreToolsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm ${
                      isActive(link.href) 
                        ? 'bg-primary-600/50 text-white' 
                        : 'text-white hover:bg-primary-600/30'
                    } transition-colors`}
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
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
              <span className="text-primary-400">Sleep</span> Calculator
            </h1>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-white hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
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
        
        <div className="container mx-auto px-4 mt-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          <ul className="space-y-4 text-lg">
            {mainNavigationLinks.map((link) => (
              <li key={link.href} className="text-center">
                {!isActive(link.href) ? (
                  <Link 
                    href={link.href} 
                    className="block py-3 px-4 rounded-lg text-white text-xl hover:bg-primary-600/30 font-bold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <span className="block py-3 px-4 rounded-lg bg-primary-600/50 text-white text-xl font-bold">
                    {link.name}
                  </span>
                )}
              </li>
            ))}
            
            {/* More Tools Section in Mobile Menu - Enhanced with Dropdown */}
            <li className="text-center">
              <button 
                onClick={() => setMobileMoreToolsOpen(!mobileMoreToolsOpen)}
                className="w-full flex justify-center items-center py-3 px-4 text-white text-xl font-bold hover:bg-primary-600/30 rounded-lg transition-colors"
                aria-expanded={mobileMoreToolsOpen}
                aria-controls="mobile-more-tools-menu"
              >
                <span>More Tools</span>
                <svg
                  className={`ml-2 h-5 w-5 transition-transform duration-200 ${mobileMoreToolsOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Mobile More Tools Dropdown Items */}
              <div 
                id="mobile-more-tools-menu"
                className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileMoreToolsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-2 bg-dark-800/50 rounded-lg py-2">
                  {moreToolsLinks.map((link) => (
                    <li key={link.href} className="text-center">
                      {!isActive(link.href) ? (
                        <Link 
                          href={link.href} 
                          className="block py-2 px-4 text-white text-lg hover:bg-primary-600/30 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <span className="block py-2 px-4 bg-primary-600/50 text-white text-lg">
                          {link.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            
            <li><div className="my-4 border-t border-dark-700"></div></li>
            
            {/* Footer Links */}
            {footerLinks.map((link) => (
              <li key={link.href} className="text-center">
                {!isActive(link.href) ? (
                  <Link 
                    href={link.href} 
                    className="block py-2 px-4 rounded-lg text-white text-base hover:bg-primary-600/30 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <span className="block py-2 px-4 rounded-lg bg-primary-600/50 text-white text-base">
                    {link.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
} 