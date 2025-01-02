"use client";
import { Car, Edit2, Trash2, Grid } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Car className="w-8 h-8" />,
    title: "Create Your Car",
    description: "Design and customize your perfect vehicle with our intuitive interface"
  },
  {
    icon: <Edit2 className="w-8 h-8" />,
    title: "Edit Car",
    description: "Update and modify your vehicle details anytime"
  },
  {
    icon: <Trash2 className="w-8 h-8" />,
    title: "Delete Car",
    description: "Remove vehicles from your collection with ease"
  },
  {
    icon: <Grid className="w-8 h-8" />,
    title: "See All Cars",
    description: "View and manage your entire fleet in one place"
  }
];

const Features = () => {
  const featuresRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Set initial visibility
    cardRefs.current.forEach(card => {
      if (card) {
        gsap.set(card, { opacity: 1, y: 0 });
      }
    });

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      
      cards.forEach((card, index) => {
        const animation = gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "bottom top+=100",
            toggleActions: "play none none reverse",
            // markers: true, // Uncomment for debugging
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        });

        return () => animation.kill();
      });
    }, featuresRef);

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={featuresRef} className="bg-[#232838] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Powerful <span className="text-[#9b87f5]">Features</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="bg-gradient-to-br from-[#2A303F] to-[#1A1F2C] p-6 rounded-xl border border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-[#9b87f5] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;