import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SHIVPURI_DESTINATIONS } from '../data/destinations';
import { useSurvey } from '../context/SurveyContext';

export default function ShivpuriDestinationsCarousel() {
  const scrollContainerRef = useRef(null);
  const { openSurvey } = useSurvey();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePlanRide = (destination) => {
    openSurvey({
      purpose: 'Weekend Trip',
      vehicle: destination.recommendedRide,
      category: destination.recommendedCategory,
      notes: `Trip to ${destination.name} (${destination.distance})`
    });
  };

  return (
    <section className="py-10 sm:py-14 bg-[#F5F2EB] border-y border-[#1E1B18]/10 overflow-hidden text-[#1E1B18]">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        {/* Minimal Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[#E64A19] font-mono text-[11px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
              <span>EXPLORE SHIVPURI</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] tracking-tight uppercase">
              Top Places to Visit in Shivpuri
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#5C5852]">
              Pick your scenic destination and rent the ideal self-drive bike or car for the ride.
            </p>
          </div>

          {/* Minimal Arrow Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-full border border-[#1E1B18]/20 flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-white text-[#1E1B18] hover:bg-[#E64A19] hover:text-white hover:border-[#E64A19] shadow-xs'
                  : 'bg-black/5 text-[#1E1B18]/25 cursor-not-allowed border-transparent'
              }`}
              aria-label="Previous destination"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-full border border-[#1E1B18]/20 flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-white text-[#1E1B18] hover:bg-[#E64A19] hover:text-white hover:border-[#E64A19] shadow-xs'
                  : 'bg-black/5 text-[#1E1B18]/25 cursor-not-allowed border-transparent'
              }`}
              aria-label="Next destination"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Horizontal Minimal Card Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHIVPURI_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="w-[78vw] sm:w-[300px] md:w-[320px] shrink-0 snap-start bg-white rounded-xl border border-[#1E1B18]/12 shadow-2xs hover:shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                {/* 16:9 Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE4]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#0B132B]/90 backdrop-blur-xs text-[#C89D3C] text-[10px] font-mono font-semibold px-2 py-0.5 rounded shadow-xs">
                      {dest.categoryBadge}
                    </span>
                  </div>

                  {/* Distance Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      📍 {dest.distance}
                    </span>
                  </div>
                </div>

                {/* Minimal Card Details */}
                <div className="p-3.5 space-y-1.5">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#1E1B18] tracking-tight leading-snug">
                    {dest.name}
                  </h3>
                  <p className="font-body text-xs text-[#5C5852] line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>
              </div>

              {/* Minimal Bottom Bar */}
              <div className="p-3.5 pt-0 border-t border-[#1E1B18]/5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#7C776E] pt-1.5">
                  <span>Ride:</span>
                  <span className="font-semibold text-[#1E1B18] truncate ml-1">{dest.recommendedRide}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handlePlanRide(dest)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold py-2 px-3 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Plan Ride for this Spot</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
