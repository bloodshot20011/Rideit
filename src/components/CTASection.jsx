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
    <section className={`py-14 px-4 sm:px-6 rounded-2xl relative overflow-hidden my-12 border-2 ${
      isPrimary
        ? 'bg-[#0B132B] text-[#F5F2EB] border-[#C89D3C]/40 shadow-lg'
        : 'bg-[#EFECE4] text-[#1E1B18] border-[#1E1B18]/15 shadow-xs'
    }`}>
      {/* Neo-Mirai atmospheric glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E64A19]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C89D3C]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-6">
        <h2 className={`font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase ${
          isPrimary ? 'text-[#F5F2EB]' : 'text-[#1E1B18]'
        }`}>
          {title}
        </h2>

        <p className={`font-body text-base sm:text-lg leading-relaxed ${
          isPrimary ? 'text-[#F5F2EB]/80' : 'text-[#45413B]'
        }`}>
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {primaryCtaText && (
            <Button
              to={primaryCtaTo}
              variant="primary"
              size="lg"
              className="bg-[#E64A19] hover:bg-[#D84315] text-white shadow-sm"
            >
              {primaryCtaText}
            </Button>
          )}

          {secondaryCtaText && (
            <Button
              to={secondaryCtaTo}
              variant="outline"
              size="lg"
              className={isPrimary ? 'text-[#F5F2EB] border-[#C89D3C]/50 hover:bg-[#131E29]' : 'border-[#1E1B18]/20'}
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
