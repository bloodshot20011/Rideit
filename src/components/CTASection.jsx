import React from 'react';
import Button from './Button';

export default function CTASection({
  title = "Ready to experience effortless mobility in Shivpuri?",
  description = "Join our waitlist as a renter or register your vehicle to start earning when we launch.",
  primaryCtaText = "Join the Waitlist",
  primaryCtaTo = "/waitlist",
  secondaryCtaText = "List Your Vehicle",
  secondaryCtaTo = "/list-your-vehicle",
  variant = "primary" // "primary" | "surface"
}) {
  const isPrimary = variant === 'primary';

  return (
    <section className={`py-14 px-4 sm:px-6 rounded-2xl relative overflow-hidden my-12 border ${
      isPrimary
        ? 'bg-gradient-to-br from-primary-container via-primary to-secondary text-white border-primary/20 shadow-md'
        : 'bg-surface-low text-on-surface border-outline-variant/40 shadow-xs'
    }`}>
      {/* Abstract decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
        <h2 className={`font-headline font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight ${
          isPrimary ? 'text-white' : 'text-on-surface'
        }`}>
          {title}
        </h2>

        <p className={`font-body text-base sm:text-lg leading-relaxed ${
          isPrimary ? 'text-white/90' : 'text-on-surface-variant'
        }`}>
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {primaryCtaText && (
            <Button
              to={primaryCtaTo}
              variant={isPrimary ? 'outline' : 'primary'}
              size="lg"
              className={isPrimary ? 'bg-white text-primary border-white hover:bg-white/90 hover:border-white shadow-sm' : ''}
            >
              {primaryCtaText}
            </Button>
          )}

          {secondaryCtaText && (
            <Button
              to={secondaryCtaTo}
              variant={isPrimary ? 'ghost' : 'outline'}
              size="lg"
              className={isPrimary ? 'text-white hover:bg-white/10' : ''}
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
