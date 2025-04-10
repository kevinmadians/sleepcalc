"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';

// Dynamically import Navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setIsSubmitting(false);
      
      // Reset form after successful submission
      if (Math.random() > 0.3) { // Simulate 70% success rate
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus({
          success: false,
          message: 'There was an error sending your message. Please try again later.'
        });
      }
    }, 1500);
  };
  
  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    
    // Force set the document title directly
    if (typeof window !== 'undefined') {
      document.title = "Contact - Sleep Calculator";
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-dark-900 to-dark-800">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Page Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">Contact Us</h1>
            
            <div className="mb-8 text-gray-200">
              <p className="mb-4">
                Have questions, feedback, or suggestions about Sleep Calculator? We'd love to hear from you! 
                Fill out the form below, and we'll get back to you as soon as possible.
              </p>
              
              {/* Social links */}
              <div className="flex justify-center space-x-4 mb-8">
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            {formStatus && (
              <motion.div 
                className={`p-4 mb-6 rounded-md ${formStatus.success ? 'bg-green-800/30' : 'bg-red-800/30'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className={`text-sm ${formStatus.success ? 'text-green-300' : 'text-red-300'}`}>
                  {formStatus.message}
                </p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name <span className="text-primary-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email <span className="text-primary-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="General Question">General Question</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message <span className="text-primary-400">*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-dark-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                ></textarea>
              </div>
              
              <div>
                <motion.button 
                  type="submit"
                  className="btn-primary w-full sm:w-auto px-6 py-3 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </motion.div>
          
          {/* Additional Information Box */}
          <motion.div
            className="glass-card p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="bg-primary-900/30 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-400">support@sleepcalc.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-900/30 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Privacy</h3>
                  <p className="text-gray-400">Your data is always protected</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary-900/30 p-2 rounded-full mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Response Time</h3>
                  <p className="text-gray-400">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* FAQs */}
          <motion.div
            className="glass-card p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-dark-800/50 p-4 rounded-lg">
                <h3 className="font-medium text-primary-400 mb-2">How accurate is the Sleep Calculator?</h3>
                <p className="text-sm text-gray-300">Our calculator is based on the science of 90-minute sleep cycles and provides recommendations based on average sleep patterns. Individual results may vary.</p>
              </div>
              
              <div className="bg-dark-800/50 p-4 rounded-lg">
                <h3 className="font-medium text-primary-400 mb-2">Is my data stored or shared?</h3>
                <p className="text-sm text-gray-300">All calculations are performed client-side in your browser. We do not store your sleep preferences or personal information.</p>
              </div>
              
              <div className="bg-dark-800/50 p-4 rounded-lg">
                <h3 className="font-medium text-primary-400 mb-2">I have suggestions for improvement</h3>
                <p className="text-sm text-gray-300">We love hearing from our users! Please use the contact form to send us your ideas and feedback.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
