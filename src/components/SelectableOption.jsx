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
      className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 w-full cursor-pointer relative overflow-hidden ${
        selected
          ? 'bg-surface-low border-primary ring-2 ring-primary/20 text-primary shadow-xs'
          : 'bg-surface border-outline-variant/40 hover:border-outline text-on-surface'
      }`}
    >
      {icon && (
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            selected ? 'bg-primary text-white' : 'bg-surface-low text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      )}
      <div className="flex-grow">
        <div className="font-headline font-semibold text-sm">{title}</div>
        {subtitle && <div className="font-body text-xs text-on-surface-variant/80 mt-0.5">{subtitle}</div>}
      </div>
      <div className="shrink-0">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            selected ? 'border-primary bg-primary text-white' : 'border-outline-variant/60 bg-surface'
          }`}
        >
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="material-symbols-outlined text-xs"
            >
              check
            </motion.span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
