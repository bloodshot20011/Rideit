import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import FAQAccordion from '../components/FAQAccordion';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { FAQS_DATA } from '../data/faqs';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('renters');

  const renterSteps = [
    {
      step: '01',
      title: 'Choose',
      subtitle: 'Tell us what kind of bike or car you need.',
      description: 'Explore scooters, commuter motorcycles, cruiser bikes, and cars suited for your travel plans across Shivpuri.',
      icon: 'search'
    },
    {
      step: '02',
      title: 'Request',
      subtitle: 'Share your dates, location and preferences.',
      description: 'Submit your preferred rental timeline and pickup spot (such as Madhav Chowk or Jhansi Road) via our simple form.',
      icon: 'event_available'
    },
    {
      step: '03',
      title: 'Confirm',
      subtitle: "We'll confirm the vehicle and rental details.",
      description: 'Our team verifies vehicle readiness and confirms the pickup details directly with you on WhatsApp.',
      icon: 'key'
    },
    {
      step: '04',
      title: 'Ride',
      subtitle: 'Pick up your vehicle and get moving.',
      description: 'Collect your verified bike or car key and enjoy effortless, independent travel around Shivpuri.',
      icon: 'flag'
    }
  ];

  const ownerSteps = [
    {
      step: '01',
      title: 'Register',
      subtitle: 'Tell us about your vehicle.',
      description: 'Provide basic details about your bike or car, its manufacturing year, condition, and locality in Shivpuri.',
      icon: 'app_registration'
    },
    {
      step: '02',
      title: 'Verify',
      subtitle: 'We review the vehicle and owner information.',
      description: 'We ensure ownership documents and vehicle safety checks meet our trust guidelines for local community rentals.',
      icon: 'verified'
    },
    {
      step: '03',
      title: 'Match',
      subtitle: 'Connect with relevant rental demand.',
      description: 'When verified renters request a ride matching your vehicle availability, we arrange the rental handover.',
      icon: 'handshake'
    },
    {
      step: '04',
      title: 'Earn',
      subtitle: 'Receive your agreed share from successful rentals.',
      description: 'Turn an idle bike or car sitting in your driveway into passive income with transparent payout terms.',
      icon: 'payments'
    }
  ];

  const currentSteps = activeTab === 'renters' ? renterSteps : ownerSteps;

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section matching Stitch screenshot & code.html */}
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
          Whether you need a quick ride across town or want to earn by sharing your idle vehicle, we've streamlined the entire process.
        </p>

        {/* Audience Tab Switcher with Framer Motion glide pill */}
        <div className="relative flex items-center gap-1.5 p-1.5 bg-surface-low rounded-xl border border-outline-variant/40 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('renters')}
            className={`relative flex-1 py-2.5 px-5 rounded-lg text-sm font-headline font-bold transition-colors duration-200 flex items-center justify-center gap-2 z-10 cursor-pointer ${
              activeTab === 'renters' ? 'text-white' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {activeTab === 'renters' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-primary rounded-lg shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="material-symbols-outlined text-lg">two_wheeler</span>
            For Renters
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('owners')}
            className={`relative flex-1 py-2.5 px-5 rounded-lg text-sm font-headline font-bold transition-colors duration-200 flex items-center justify-center gap-2 z-10 cursor-pointer ${
              activeTab === 'owners' ? 'text-white' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {activeTab === 'owners' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-primary rounded-lg shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="material-symbols-outlined text-lg">key</span>
            For Vehicle Owners
          </button>
        </div>
      </section>

      {/* Main Flow Section with Animated Vertical Step Progression */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-2">
            {activeTab === 'renters' ? 'Need a ride?' : 'Got an idle vehicle?'}
          </h2>
          <p className="font-body text-base text-on-surface-variant">
            Get started in four simple steps.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 relative"
          >
            {currentSteps.map((stepItem, index) => (
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
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-10">
          {activeTab === 'renters' ? (
            <Button to="/request" variant="primary" size="lg" icon="arrow_forward" iconPosition="right">
              Request a Ride Now
            </Button>
          ) : (
            <Button to="/list-your-vehicle" variant="primary" size="lg" icon="app_registration">
              Register Your Vehicle
            </Button>
          )}
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
              <h3 className="font-headline font-bold text-lg text-on-surface">Verified Users & Vehicles</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Driving license verification for renters and document verification for vehicle owners ensure peace of mind.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-surface p-6 rounded-xl border border-outline-variant/40 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">sell</span>
              </div>
              <h3 className="font-headline font-bold text-lg text-on-surface">No Hidden Fees</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Clear rental pricing and owner earnings split agreed before every transaction with zero surprise charges.
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
          subtitle="Click any question to view clear details about our Shivpuri launch and service."
        />

        <FAQAccordion faqs={FAQS_DATA} />
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <CTASection />
      </section>
    </div>
  );
}
