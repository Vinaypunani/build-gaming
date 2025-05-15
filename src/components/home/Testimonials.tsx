"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rahul Singh",
      role: "Professional Gamer",
      content: "Build Gaming built me a custom PC that handles everything I throw at it - from competitive gaming to streaming. The build quality is exceptional, and their customer service was outstanding throughout the process.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Video Editor",
      content: "As a video editor, I needed a powerful workstation that could handle 4K editing without breaking a sweat. The custom PC from Build Gaming has exceeded all my expectations. Render times are incredibly fast!",
      rating: 5
    },
    {
      id: 3,
      name: "Arjun Mehta",
      role: "Software Developer",
      content: "I was hesitant about buying a pre-built PC, but Build Gaming proved me wrong. The attention to detail in the cable management and component selection is impressive. It's been running flawlessly for months.",
      rating: 4
    },
    {
      id: 4,
      name: "Neha Sharma",
      role: "3D Artist",
      content: "The PC Builder tool made it so easy to configure exactly what I needed for 3D modeling and rendering. The team even followed up to suggest some optimizations that saved me money. Highly recommended!",
      rating: 5
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentTestimonial = testimonials[currentIndex];
  
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from gamers, content creators, and professionals who trust Build Gaming for their PC needs
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-card border border-border p-8 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-primary/20 flex-shrink-0 overflow-hidden relative flex items-center justify-center">
                  <User size={40} className="text-primary/60" />
                </div>
                
                <div className="flex-1">
                  {/* Rating */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${i < currentTestimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'} mr-1`}
                      />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <blockquote className="text-lg italic mb-6">
                    "{currentTestimonial.content}"
                  </blockquote>
                  
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                    <p className="text-gray-400">{currentTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-card border border-border hover:bg-card/80 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Indicators */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'w-6 bg-primary' : 'bg-gray-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-card border border-border hover:bg-card/80 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 