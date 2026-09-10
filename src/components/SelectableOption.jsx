import React from 'react';
import { motion } from 'framer-motion';

export default function SelectableOption({
  icon,
  title,
  subtitle,
  selected = false,
  onClick
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 sm:gap-3 w-full cursor-pointer relative overflow-hidden ${
        selected
          ? 'bg-[#E64A19]/5 border-[#E64A19] ring-2 ring-[#E64A19]/20 text-[#1E1B18] shadow-xs'
          : 'bg-white border-[#1E1B18]/15 hover:border-[#1E1B18]/30 text-[#1E1B18]'
      }`}
    >
      {/* Icon */}
      {icon && (
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            selected ? 'bg-[#E64A19] text-white' : 'bg-[#EFECE4] text-[#45413B]'
          }`}
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">{icon}</span>
        </div>
      )}

      {/* Label Text - with right padding to clear the radio button */}
      <div className="flex-grow min-w-0 pr-6">
        <div className="font-display font-bold text-xs sm:text-sm text-[#1E1B18] leading-tight">
          {title}
        </div>
        {subtitle && (
          <div className="font-mono text-[10px] sm:text-xs text-[#7C776E] mt-0.5 truncate">
            {subtitle}
          </div>
        )}
      </div>

      {/* Radio Circle - Cleanly pinned to top-right corner */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
        <div
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center transition-colors ${
            selected
              ? 'border-[#E64A19] bg-[#E64A19] text-white'
              : 'border-[#1E1B18]/30 bg-white'
          }`}
        >
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="material-symbols-outlined text-[10px] sm:text-xs font-bold text-white"
            >
              check
            </motion.span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
