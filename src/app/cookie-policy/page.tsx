"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

// JSON-LD schema for SEO
const cookiePolicySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Cookie Policy - Sleep Calculator",
  "description": "Learn about how Sleep Calculator uses cookies to improve your browsing experience and provide personalized services."
};

export default function CookiePolicyPage() {
  // Set document title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Cookie Policy - Sleep Calculator";
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiePolicySchema) }}
        />
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-card p-6 md:p-8 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary-400">Cookie Policy</h1>
            
            <div className="my-6"></div>
            
            <div className="prose prose-dark max-w-none">
              <p className="text-gray-300 mb-4">
                This Cookie Policy explains how Sleep Calculator ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at sleepycalculator.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <p className="text-gray-300 mb-4">
                In some cases, we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">What are cookies?</h2>
              <p className="text-gray-300 mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              
              <p className="text-gray-300 mb-4">
                Cookies set by the website owner (in this case, Sleep Calculator) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Why do we use cookies?</h2>
              <p className="text-gray-300 mb-4">
                We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">The specific types of cookies served through our Website and the purposes they perform</h2>
              <p className="text-gray-300 mb-4">
                <strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
              </p>
              
              <p className="text-gray-300 mb-4">
                <strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <p className="text-gray-300 mb-4">
                <strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
              </p>
              
              <p className="text-gray-300 mb-4">
                <strong>Advertising cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">How can you control cookies?</h2>
              <p className="text-gray-300 mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
              </p>
              
              <p className="text-gray-300 mb-4">
                The Cookie Consent Manager can be found in the notification banner and on our website. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
              </p>
              
              <p className="text-gray-300 mb-4">
                The specific types of first and third-party cookies served through our Website and the purposes they perform are described in the table below:
              </p>
              
              <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 mb-4">
                <h3 className="text-lg font-semibold mb-2 text-white">Essential Website Cookies</h3>
                <p className="text-gray-300 mb-2">These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
                <p className="text-gray-400 text-sm"><strong>Provider:</strong> Sleep Calculator</p>
                <p className="text-gray-400 text-sm"><strong>Cookie Name:</strong> __session</p>
                <p className="text-gray-400 text-sm"><strong>Purpose:</strong> Used to maintain user session state across page requests.</p>
              </div>
              
              <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700 mb-4">
                <h3 className="text-lg font-semibold mb-2 text-white">Analytics and Customization Cookies</h3>
                <p className="text-gray-300 mb-2">These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</p>
                <p className="text-gray-400 text-sm"><strong>Provider:</strong> Google Analytics</p>
                <p className="text-gray-400 text-sm"><strong>Cookie Name:</strong> _ga, _gid, _gat</p>
                <p className="text-gray-400 text-sm"><strong>Purpose:</strong> Used to distinguish users and throttle request rate.</p>
              </div>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">How can I control cookies on my browser?</h2>
              <p className="text-gray-300 mb-4">
                As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. The following is information about how to manage cookies on the most popular browsers:
              </p>
              
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li><a href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Firefox</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Internet Explorer</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Edge</a></li>
                <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Opera</a></li>
              </ul>
              
              <p className="text-gray-300 mb-4">
                In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:
              </p>
              
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Digital Advertising Alliance</a></li>
                <li><a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Digital Advertising Alliance of Canada</a></li>
                <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">European Interactive Digital Advertising Alliance</a></li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">What about other tracking technologies, like web beacons?</h2>
              <p className="text-gray-300 mb-4">
                Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Website. This allows us, for example, to monitor the traffic patterns of users from one page within our Website to another, to deliver or communicate with cookies, to understand whether you have come to our Website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Do you use Flash cookies or Local Shared Objects?</h2>
              <p className="text-gray-300 mb-4">
                Our Website may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention, and for other site operations.
              </p>
              
              <p className="text-gray-300 mb-4">
                If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the <a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Website Storage Settings Panel</a>. You can also control Flash Cookies by going to the <a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Global Storage Settings Panel</a> and following the instructions.
              </p>
              
              <p className="text-gray-300 mb-4">
                Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Do you serve targeted advertising?</h2>
              <p className="text-gray-300 mb-4">
                Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other personal information unless you choose to provide these.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">How often will you update this Cookie Policy?</h2>
              <p className="text-gray-300 mb-4">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              
              <p className="text-gray-300 mb-4">
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3 text-white">Where can I get further information?</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about our use of cookies or other technologies, please contact us using our <Link href="/contact" className="text-primary-400 hover:underline">contact form</Link>.
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
            <p className="text-sm text-gray-400 mt-2">Have questions about our cookie policy? We're here to help.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
