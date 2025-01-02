"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set initial visibility while GSAP loads
    setIsLoaded(true);
    let gsapInstance;
    let animationCleanup;

    const setupAnimation = async () => {
      try {
        const { gsap } = await import('gsap');
        gsapInstance = gsap;

        // Create the timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Ensure elements stay visible after animation
            if (headerRef.current) gsap.set(headerRef.current, { clearProps: "all" });
            if (imageRef.current) gsap.set(imageRef.current, { clearProps: "all" });
            if (contentRef.current) gsap.set(contentRef.current, { clearProps: "all" });
          }
        });

        tl.fromTo([headerRef.current, imageRef.current, contentRef.current], 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        animationCleanup = () => {
          tl.kill();
        };
      } catch (error) {
        console.error('Failed to load GSAP:', error);
        // Ensure content is visible even if GSAP fails
        [headerRef, imageRef, contentRef].forEach(ref => {
          if (ref.current) ref.current.style.opacity = "1";
        });
      }
    };

    setupAnimation();

    // Cleanup function
    return () => {
      if (animationCleanup) animationCleanup();
      if (gsapInstance) gsapInstance.killTweensOf([headerRef.current, imageRef.current, contentRef.current]);
    };
  }, []);

  // Base classes without opacity
  const baseClasses = {
    header: "text-5xl md:text-7xl font-bold text-center mb-8 text-white",
    image: "relative w-full h-[300px] md:h-[500px] my-12",
    content: "max-w-2xl mx-auto text-center"
  };

  // Add opacity based on load state
  const classes = {
    header: `${baseClasses.header} ${!isLoaded ? 'opacity-0' : ''}`,
    image: `${baseClasses.image} ${!isLoaded ? 'opacity-0' : ''}`,
    content: `${baseClasses.content} ${!isLoaded ? 'opacity-0' : ''}`
  };

  return (
    <div className="relative min-h-screen bg-[#1A1F2C]">
      <div className="container mx-auto px-4 py-20">
        <h1 ref={headerRef} className={classes.header}>
          Manage Your Fleet
          <span className="text-[#9b87f5]"> With Style</span>
        </h1>
        
        <div ref={imageRef} className={classes.image}>
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"
            alt="Luxury Car"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-60 rounded-lg" />
        </div>

        <div ref={contentRef} className={classes.content}>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Experience the future of fleet management with our intuitive dashboard and real-time analytics.
          </p>
          
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;