"use client"
import React, { useEffect, useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1526550517342-e086b387edda?q=80&w=3029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1570829053985-56e661df1ca2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1699017200186-cc4d9f7d569b?q=80&w=3015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1508698947694-5ae81f424907?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1686914687902-e58579225e84?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef();

  const getVisibleImages = () => {
    const lastIndex = images.length - 1;
    if (currentIndex === 0) return [lastIndex, 0, 1];
    if (currentIndex === lastIndex) return [lastIndex - 1, lastIndex, 0];
    return [currentIndex - 1, currentIndex, currentIndex + 1];
  };

  const animateSlide = () => {
    if (!carouselRef.current) return;
    
    const slides = Array.from(carouselRef.current.children);
    
    slides.forEach((slide, index) => {
      slide.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      if (index === 1) {
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1) translateX(0%)';
        slide.style.zIndex = '2';
      } else {
        slide.style.opacity = '0.5';
        slide.style.transform = `scale(0.7) translateX(${index === 0 ? '10%' : '-10%'})`;
        slide.style.zIndex = '1';
      }
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    animateSlide();
  }, [currentIndex]);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
      <div
        ref={carouselRef}
        className="relative w-full h-full flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >  
        {visibleImages.map((imageIndex, i) => (
          <div
            key={imageIndex}
            className="absolute w-[40%] md:w-[40%] h-[30%] md:h-[60%]"
            style={{
              left: `${i * 30}%`,
              transform: `scale(${i === 1 ? '1' : '0.7'}) translateX(${i === 0 ? '10%' : i === 2 ? '-10%' : '0%'})`,
              opacity: i === 1 ? '1' : '0.5',
              zIndex: i === 1 ? '2' : '1',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <img
              src={`${images[imageIndex]}?auto=format&fit=crop&w=1200&q=80`}
              alt={`Slide ${imageIndex + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;