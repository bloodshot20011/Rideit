import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`bg-surface rounded-xl border transition-colors duration-200 overflow-hidden ${
              isOpen
                ? 'border-primary/50 shadow-sm'
                : 'border-outline-variant/30 hover:border-outline-variant'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-headline font-semibold text-base sm:text-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl cursor-pointer select-none"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="material-symbols-outlined text-primary text-2xl shrink-0"
              >
                keyboard_arrow_down
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 text-on-surface-variant font-body text-sm sm:text-base leading-relaxed">
                    <div className="border-t border-outline-variant/20 pt-3">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
