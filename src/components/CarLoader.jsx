import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CarLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-12 bg-[#F5F2EB] text-[#1E1B18] overflow-hidden select-none"
        >
          {/* Top Brand Seal & Location Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between w-full max-w-content"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#1E1B18]/30 overflow-hidden relative flex flex-col shrink-0 shadow-2xs">
                <div className="h-1/2 w-full bg-[#E64A19]" />
                <div className="h-1/2 w-full flex">
                  <div className="w-1/2 bg-[#C89D3C]" />
                  <div className="w-1/2 bg-[#0B132B]" />
                </div>
                <div className="absolute inset-0 rounded-full border border-black/10" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#1E1B18]">APNI</span>
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#1E1B18]">RIDE</span>
              </div>
            </div>

            <div className="font-mono text-[10px] font-semibold text-[#7C776E] tracking-wider uppercase">
              SHIVPURI, MP • 2026
            </div>
          </motion.div>

          {/* Center: Animated Car & Road Track */}
          <div className="w-full max-w-md flex flex-col items-center space-y-6 my-auto">
            {/* Animated Car Track Container */}
            <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
              {/* Road Horizon Track */}
              <div className="absolute bottom-6 left-0 right-0 h-[2px] bg-[#1E1B18]/15" />
              
              {/* Speed Lines Dashes */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-between overflow-hidden opacity-30">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ x: [-40, 40] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="w-4 h-[2px] bg-[#E64A19]"
                  />
                ))}
              </div>

              {/* Sleek Driving Car SVG Animation */}
              <motion.div
                animate={{
                  x: [-60, 40, 0],
                  y: [0, -1.5, 0, 1.5, 0]
                }}
                transition={{
                  x: { duration: 1.2, ease: 'easeInOut' },
                  y: { repeat: Infinity, duration: 0.35, ease: 'easeInOut' }
                }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Stylized Modern Car Silhouette */}
                <svg
                  className="w-24 h-14 drop-shadow-md text-[#0B132B]"
                  viewBox="0 0 100 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Headlights Glow Beam */}
                  <polygon
                    points="78,28 98,22 98,34"
                    fill="url(#headlightBeam)"
                    opacity="0.8"
                  />
                  
                  {/* Car Main Body Chassis */}
                  <path
                    d="M12 32 C14 24 22 18 34 16 L62 16 C74 16 82 22 86 28 L92 30 C95 31 96 34 94 36 L8 36 C6 36 6 32 12 32 Z"
                    fill="#0B132B"
                  />

                  {/* Windshield & Cabin Glass */}
                  <path
                    d="M36 18 L60 18 C68 18 73 22 75 27 L30 27 C31 22 33 19 36 18 Z"
                    fill="#F5F2EB"
                    opacity="0.9"
                  />

                  {/* Solar Vermilion Racing Accent Line */}
                  <path
                    d="M18 30 L88 30"
                    stroke="#E64A19"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Amber Tail Light */}
                  <circle cx="12" cy="29" r="2" fill="#E64A19" />
                  
                  {/* Cyber Gold Headlight */}
                  <circle cx="90" cy="30" r="2.5" fill="#C89D3C" />

                  {/* Front Wheel */}
                  <circle cx="74" cy="36" r="6.5" fill="#1E1B18" stroke="#F5F2EB" strokeWidth="1.5" />
                  <circle cx="74" cy="36" r="2.5" fill="#C89D3C" />

                  {/* Rear Wheel */}
                  <circle cx="28" cy="36" r="6.5" fill="#1E1B18" stroke="#F5F2EB" strokeWidth="1.5" />
                  <circle cx="28" cy="36" r="2.5" fill="#C89D3C" />

                  <defs>
                    <linearGradient id="headlightBeam" x1="78" y1="28" x2="98" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#C89D3C" stopOpacity="0.7" />
                      <stop offset="1" stopColor="#C89D3C" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Road Shadow */}
                <div className="w-20 h-1.5 bg-[#1E1B18]/25 rounded-full blur-[1px] mt-0.5" />
              </motion.div>
            </div>

            {/* Loading Headline & Progress Counter */}
            <div className="w-full space-y-2 text-center">
              <div className="font-display font-light text-xl sm:text-2xl text-[#1E1B18] tracking-tight uppercase">
                Preparing <span className="text-[#E64A19] font-normal">ApniRide Fleet</span>
              </div>

              {/* Monospaced Progress Bar */}
              <div className="w-full h-1.5 bg-[#1E1B18]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#E64A19] via-[#C89D3C] to-[#E64A19]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] font-semibold text-[#7C776E] pt-1">
                <span>[SHIVPURI SELF-DRIVE]</span>
                <span className="text-[#E64A19] font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Calligraphy Stamp Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-xs text-[#45413B] flex items-center gap-2"
          >
            <span>आपकी अपनी सवारी, आपके रास्ते।</span>
            <span className="w-3.5 h-3.5 border border-[#E64A19] rounded-xs flex items-center justify-center text-[8px] text-[#E64A19] font-bold">
              印
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
