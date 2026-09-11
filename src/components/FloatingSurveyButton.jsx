import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSurvey } from '../context/SurveyContext';

export default function FloatingSurveyButton() {
  const { openSurvey } = useSurvey();
  const location = useLocation();

  // Hide on Admin Page
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex items-center"
    >
      <motion.button
        type="button"
        onClick={() => openSurvey()}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 bg-[#1E1B18] hover:bg-[#E64A19] text-[#F5F2EB] hover:text-white px-4 py-3 rounded-full shadow-xl border border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
        aria-label="Open Quick Survey"
      >
        {/* Glowing Orange Pulse Indicator */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E64A19] group-hover:bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E64A19] group-hover:bg-white" />
        </span>

        {/* Icon */}
        <span className="material-symbols-outlined text-lg sm:text-xl text-[#E64A19] group-hover:text-white transition-colors">
          assignment
        </span>

        {/* Label */}
        <div className="flex flex-col text-left leading-tight pr-1">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#C89D3C] group-hover:text-white/80 uppercase font-bold">
            Tell Us
          </span>
          <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-white">
            Quick Survey
          </span>
        </div>

        {/* Small Arrow indicator */}
        <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-[10px] text-white">
          →
        </span>
      </motion.button>
    </motion.div>
  );
}
