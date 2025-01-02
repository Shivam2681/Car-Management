"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    // Set initial visibility
    if (footerRef.current) {
      gsap.set(footerRef.current, { opacity: 1, y: 0 });
    }

    const ctx = gsap.context(() => {
      const animation = gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
          // markers: true, // Uncomment for debugging
          once: true // Makes the animation play only once
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      return () => animation.kill();
    }, footerRef);

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-[#1A1F2C] border-t border-[#9b87f5]/20 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#9b87f5]">FleetManager</h3>
            <p className="text-gray-400">Managing your fleet with excellence</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#9b87f5]/20 text-center text-gray-400">
          <p>&copy; 2024 FleetManager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;