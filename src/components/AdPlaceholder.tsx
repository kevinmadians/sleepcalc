"use client";

import { motion } from 'framer-motion';

interface AdPlaceholderProps {
  width: number;
  height: number;
  className?: string;
  showAds?: boolean; // Control whether to show the ad or not
  adSlot?: string;   // Google AdSense ad slot ID
}

const AdPlaceholder = ({ 
  width, 
  height, 
  className = '', 
  showAds = false, // Default to hiding ads
  adSlot = '' 
}: AdPlaceholderProps) => {
  
  // When ads are disabled, return null (hidden)
  if (!showAds) {
    return null;
  }
  
  // If we're showing ads and have an adSlot, render Google AdSense
  if (adSlot) {
    return (
      <div 
        className={`ad-container mx-auto ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Google AdSense code will go here */}
        {/* Example implementation: */}
        {/* <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        /> */}
        
        {/* This script would need to be added when ready */}
        {/* {useEffect(() => {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error('AdSense error:', error);
          }
        }, []);} */}
      </div>
    );
  }
  
  // Otherwise show placeholder for development
  return (
    <motion.div
      className={`ad-placeholder bg-dark-800/50 border border-dashed border-dark-600 flex items-center justify-center mx-auto ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs text-gray-500">
        Advertisement {width}x{height}
      </p>
    </motion.div>
  );
};

export default AdPlaceholder; 