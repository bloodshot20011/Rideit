import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export default function SuccessState({
  title = "You're on the list.",
  message = "Thanks for helping us build Ride It. We'll get in touch when a matching rental becomes available.",
  primaryActionTo = "/",
  primaryActionText = "Back to Home",
  secondaryActionTo = "/vehicles",
  secondaryActionText = "Explore Vehicles"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="bg-surface rounded-2xl border border-outline-variant/40 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-md"
    >
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto mb-6 shadow-xs border border-primary/20"
      >
        <span className="material-symbols-outlined text-3xl font-bold" data-weight="fill">
          check_circle
        </span>
      </motion.div>

      <h3 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-3 tracking-tight">
        {title}
      </h3>

      <p className="font-body text-base text-on-surface-variant leading-relaxed mb-8">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {primaryActionTo && (
          <Button to={primaryActionTo} variant="primary" size="md">
            {primaryActionText}
          </Button>
        )}
        {secondaryActionTo && (
          <Button to={secondaryActionTo} variant="outline" size="md">
            {secondaryActionText}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
