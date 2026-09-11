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
      const cardWidth = 360;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePlanRide = (destination) => {
    openSurvey({
      purpose: 'Weekend Trip',
      vehicle: destination.recommendedRide,
      category: destination.recommendedCategory,
      notes: `Interested in renting for a trip to ${destination.name} (${destination.distance})`
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F5F2EB] border-y border-[#1E1B18]/10 overflow-hidden text-[#1E1B18]">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#C89D3C]/30 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
              <span>DESTINATIONS & ROAD TRIPS</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1B18] tracking-tight uppercase">
              Top Places to Visit in Shivpuri
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#5C5852] leading-relaxed">
              From rocky river waterfalls to serene national park safaris and royal marble cenotaphs—pick your destination and rent the perfect ride.
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-[#1E1B18]/20 flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-white text-[#1E1B18] hover:bg-[#E64A19] hover:text-white hover:border-[#E64A19] shadow-xs'
                  : 'bg-black/5 text-[#1E1B18]/30 cursor-not-allowed border-transparent'
              }`}
              aria-label="Previous destination"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-[#1E1B18]/20 flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-white text-[#1E1B18] hover:bg-[#E64A19] hover:text-white hover:border-[#E64A19] shadow-xs'
                  : 'bg-black/5 text-[#1E1B18]/30 cursor-not-allowed border-transparent'
              }`}
              aria-label="Next destination"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHIVPURI_DESTINATIONS.map((dest) => (
            <motion.div
              key={dest.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-[85vw] sm:w-[360px] md:w-[380px] shrink-0 snap-start bg-[#FDFCFA] rounded-2xl border border-[#1E1B18]/15 shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Image Container with Zoom & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE4] group">
                  <img
                    src={dest.image}
                    alt={`${dest.name} in Shivpuri`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#0B132B]/85 backdrop-blur-sm text-[#C89D3C] text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-[#C89D3C]/30 shadow-xs uppercase tracking-wider">
                      {dest.categoryBadge}
                    </span>
                  </div>

                  {/* Top Distance Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#1E1B18]/80 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border border-white/20 shadow-xs flex items-center gap-1">
                      <span className="text-[#E64A19]">📍</span>
                      <span>{dest.distance}</span>
                    </span>
                  </div>

                  {/* Bottom Image Caption Bar */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
                    <div className="font-mono text-[10px] text-[#F5F2EB]/90 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[13px] text-[#C89D3C]">schedule</span>
                      <span>Ideal: {dest.idealDuration}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E1B18] tracking-tight leading-snug">
                      {dest.name}
                    </h3>
                    <p className="font-mono text-[11px] text-[#E64A19] font-medium mt-0.5">
                      {dest.tagline}
                    </p>
                  </div>

                  <p className="font-body text-xs sm:text-[13px] text-[#45413B] leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>

                  {/* Highlights Pill Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dest.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="bg-[#F5F2EB] text-[#5C5852] font-mono text-[10px] px-2 py-0.5 rounded border border-[#1E1B18]/10"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* Recommended Vehicle Box */}
                  <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#1E1B18]/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E64A19]/10 text-[#E64A19] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-base">
                          {dest.recommendedCategory === 'bike' ? 'two_wheeler' : 'directions_car'}
                        </span>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#7C776E] font-bold">
                          Recommended Ride
                        </div>
                        <div className="font-display font-bold text-xs text-[#1E1B18] leading-tight">
                          {dest.recommendedRide}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-4 sm:px-5 pb-4 pt-1">
                <button
                  type="button"
                  onClick={() => handlePlanRide(dest)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-sm">directions_car</span>
                  <span>Plan Ride for this Spot</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
