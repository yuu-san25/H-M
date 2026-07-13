import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { FLEET } from '../data';
import { Car } from '../types';

interface RideSlideshowProps {
  onBook: (car: Car) => void;
  onViewAll: () => void;
}

export default function RideSlideshow({ onBook, onViewAll }: RideSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Dynamically update visible cards depending on viewport size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = FLEET.length;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  // Ensure index remains in bounds when resized
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, currentIndex, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="py-20 bg-neutral-950 border-t border-b border-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.015),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-2">
              — OUR VEHICLES —
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-black text-white leading-none tracking-tight uppercase">
              Choose Your Perfect Ride
            </h2>
            <div className="w-16 h-1 bg-amber-500 mt-4 rounded-full" />
          </div>

          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold text-xs uppercase tracking-widest transition-colors font-mono cursor-pointer self-start md:self-auto"
          >
            <span>View All Vehicles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Slideshow Container */}
        <div className="relative group">
          
          {/* Navigation Arrows (Float on sides of container on desktop) */}
          <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-900/90 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:border-amber-500 hover:bg-amber-500/10 transition-all cursor-pointer shadow-xl backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-900/90 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:border-amber-500 hover:bg-amber-500/10 transition-all cursor-pointer shadow-xl backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Mask / Viewport */}
          <div className="overflow-hidden py-4 px-1">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {FLEET.map((car) => (
                <div
                  key={car.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* Card Design from user screenshot */}
                  <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-2xl p-5 flex flex-col justify-between h-full group transition-all duration-300 hover:border-amber-500/40 relative overflow-hidden text-center shadow-xl hover:shadow-2xl hover:scale-[1.01] min-h-[360px]">
                    
                    {/* Subtle upper light beam */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-20 bg-amber-500/5 blur-xl rounded-full group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

                    <div>
                      {/* Car visual image container */}
                      <div className="aspect-[16/10] overflow-hidden rounded-xl bg-neutral-950 flex items-center justify-center p-2 mb-4 relative">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elegant floating tag */}
                        <div className="absolute top-2 left-2 bg-neutral-950/80 backdrop-blur border border-neutral-800/80 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-neutral-400 uppercase">
                          {car.category}
                        </div>
                      </div>

                      {/* Info lines */}
                      <h3 className="font-sans text-base sm:text-lg font-black text-white tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">
                        {car.name}
                      </h3>

                      <div className="mt-2 mb-4">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">
                          Daily Rent
                        </span>
                        <strong className="text-sm font-mono font-black text-amber-500 block mt-0.5">
                          Rs. {car.pkrRatePerDay.toLocaleString()}
                        </strong>
                      </div>
                    </div>

                    {/* Book Now Button matching exact design */}
                    <button
                      onClick={() => onBook(car)}
                      className="w-full bg-transparent group-hover:bg-amber-500 text-neutral-300 group-hover:text-neutral-950 border border-neutral-800 group-hover:border-amber-500 py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      Book Now
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicators at bottom */}
          <div className="flex justify-center items-center gap-2.5 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={`transition-all duration-300 h-1.5 rounded-full ${
                  currentIndex === dotIndex
                    ? 'w-8 bg-amber-500'
                    : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
