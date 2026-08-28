import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import FAQAccordion from '../components/FAQAccordion';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { FAQS_DATA } from '../data/faqs';

export default function HowItWorksPage() {
  const renterSteps = [
    {
      step: '01',
      title: 'State Requirement',
      subtitle: 'Tell us what kind of bike or car you need.',
      description: 'Explore scooters, commuter motorcycles, cruiser bikes, and cars suited for your travel plans across Shivpuri.',
      icon: 'search'
    },
    {
      step: '02',
      title: 'Get Recommendation',
      subtitle: 'Share your dates, location and preferences.',
      description: 'Submit your preferred rental timeline and pickup spot (such as Madhav Chowk or Jhansi Road) via our requirement checker.',
      icon: 'checklist'
    },
    {
      step: '03',
      title: 'Confirm Booking',
      subtitle: "We'll confirm the vehicle and rental details.",
      description: 'Our team verifies vehicle readiness and confirms the pickup details directly with you on WhatsApp.',
      icon: 'task_alt'
    },
    {
      step: '04',
      title: 'Ride Freely',
      subtitle: 'Pick up your vehicle and get moving.',
      description: 'Collect your verified bike or car key and enjoy effortless, independent travel around Shivpuri.',
      icon: 'flag'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section matching Stitch screenshot */}
      <section className="px-4 sm:px-6 max-w-content mx-auto pt-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-surface-low px-3.5 py-1.5 rounded-full mb-6 border border-outline-variant/40 shadow-xs"
        >
          <span className="material-symbols-outlined text-primary text-sm font-bold" data-weight="fill">
            bolt
          </span>
          <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">
            Effortless Mobility
          </span>
        </motion.div>

        <h1 className="font-headline font-bold text-3xl sm:text-5xl text-on-surface mb-4 tracking-tight">
          Simple by design.
        </h1>

        <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-lg mx-auto mb-8 leading-relaxed">
          Whether you need a quick ride across town or a comfortable car for outstation travel, ApniRide streamlines the entire rental process in Shivpuri.
        </p>
      </section>

      {/* Main Flow Section with Vertical Step Progression */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-2">
            Need a ride in Shivpuri?
          </h2>
          <p className="font-body text-base text-on-surface-variant">
            Get started in four simple steps.
          </p>
        </div>

        <div className="flex flex-col gap-6 relative">
          {renterSteps.map((stepItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              {/* Circle Badge Number */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-headline font-bold text-lg shrink-0 border-2 border-surface shadow-xs z-10 ${
                  index === 0
                    ? 'bg-primary text-white'
                    : 'bg-surface-high text-on-surface-variant'
                }`}
              >
                {index + 1}
              </div>

              {/* Card Content */}
              <div className="bg-surface p-5 sm:p-6 rounded-xl border border-outline-variant/40 shadow-xs flex-grow w-full space-y-2 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2 text-primary font-headline font-bold text-base">
                  <span className="material-symbols-outlined text-xl">{stepItem.icon}</span>
                  <h3 className="text-on-surface">{stepItem.title}</h3>
                </div>
                <p className="font-headline font-semibold text-sm text-primary">
                  {stepItem.subtitle}
                </p>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button to="/request" variant="primary" size="lg" icon="checklist">
            Check Your Requirements Now
          </Button>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-surface-low py-14 border-y border-outline-variant/30">
        <div className="px-4 sm:px-6 max-w-content mx-auto">
          <SectionHeading
            pillTag="Built On Trust"
            pillIcon="shield"
            title="Safe, transparent mobility for Shivpuri"
            subtitle="We prioritize community trust, clear terms, and local accountability at every stage."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -4 }} className="bg-surface p-6 rounded-xl border border-outline-variant/40 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface">Verified Vehicles</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Driving license verification for renters and quality inspection for all bikes and cars ensure peace of mind.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-surface p-6 rounded-xl border border-outline-variant/40 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">sell</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface">No Hidden Fees</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Clear rental pricing agreed before every transaction with zero surprise charges.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-surface p-6 rounded-xl border border-outline-variant/40 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface">Local Shivpuri Support</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                On-ground assistance in Shivpuri to facilitate smooth handovers and answer any questions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <SectionHeading
          pillTag="Frequently Asked Questions"
          pillIcon="help"
          title="Everything you need to know"
          subtitle="Click any question to view clear details about ApniRide launch and rental requirements."
        />

        <FAQAccordion faqs={FAQS_DATA} />
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <CTASection
          title="Ready for effortless mobility in Shivpuri?"
          description="Join our waitlist or state your travel requirements to get early access when matching rentals go live."
          primaryCtaText="Join the Waitlist"
          primaryCtaTo="/waitlist"
          secondaryCtaText="Check Requirements"
          secondaryCtaTo="/request"
        />
      </section>
    </div>
  );
}
