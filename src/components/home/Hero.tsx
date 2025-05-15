"use client";

import { useEffect, useState } from 'react';
import Button from '../ui/Button';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Build Your Dream Gaming PC",
      subtitle: "Customizable high-performance computers for gamers and creators",
      cta: "Build Now",
      link: "/pc-builder"
    },
    {
      title: "Premium PC Components",
      subtitle: "The latest and greatest parts for your perfect build",
      cta: "Shop Components",
      link: "/products/components"
    },
    {
      title: "Ready-to-Play Gaming PCs",
      subtitle: "Pre-built systems with powerful performance right out of the box",
      cta: "Browse Pre-Builts",
      link: "/products/prebuilt"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Slide Backgrounds */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src="/images/Hero.jpg"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative w-full h-full bg-gradient-to-r from-background via-background/90 to-background/60">
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="container-custom">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    <span className="text-white">{slide.title.split(' ').slice(0, -1).join(' ')} </span>
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {slide.title.split(' ').slice(-1)}
                    </span>
                  </h1>
                  <p className="text-lg text-gray-300 mb-8">
                    {slide.subtitle}
                  </p>
                  <Button href={slide.link} size="lg">
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-primary w-10' 
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero; 