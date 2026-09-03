import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
import ScrollReveal from '../components/ScrollReveal';
import TyreMarksDivider from '../components/TyreMarksDivider';
import { IMAGES } from '../data/images';

export default function HomePage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Widget state for requirements checker
  const [widgetVehicleCategory, setWidgetVehicleCategory] = useState('bikes');
  const [widgetPurpose, setWidgetPurpose] = useState('Daily Commute');

  // Parallax scroll effect for Shivpuri section
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0.5, 0.9], [0, -10]);

  const handleWidgetSubmit = (e) => {
    e.preventDefault();
    navigate(`/request?category=${encodeURIComponent(widgetVehicleCategory)}&purpose=${encodeURIComponent(widgetPurpose)}&autoSubmit=true`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. CINEMATIC EDGE-TO-EDGE HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-on-surface text-white -mt-16 pt-20 pb-16">
        {/* Slow Ken Burns Background Image Zoom */}
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.04] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${IMAGES.heroBackground})` }}
        />

        {/* Subtle Light Overlay for Bright Landscape and High Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-black/10 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full text-center py-12 flex flex-col items-center">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-4 py-1.5 rounded-full mb-6 border border-white/20 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm text-primary-fixed font-bold" data-weight="fill">
              location_on
            </span>
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-white">
              COMING TO SHIVPURI
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-headline font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl mb-6 drop-shadow-sm"
          >
            Your ride. <span className="text-primary-fixed">Your way.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-base sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-xs"
          >
            ApniRide brings convenient, reliable mobility whenever you need a bike for quick city runs or a car for weekend getaways in Shivpuri.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
            <Button to="/waitlist" variant="primary" size="lg" className="shadow-md">
              Join the Waitlist
            </Button>
            <Button to="/request" variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm" icon="checklist">
              Check Your Requirements
            </Button>
          </motion.div>
        </div>
      </section>

      {/* TYRE MARKS DIVIDER (BELOW HERO) */}
      <TyreMarksDivider variant="dark" className="-mt-20 z-20" />

      {/* 2. CHOOSE YOUR FREEDOM SECTION */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight mb-2">
              Choose your freedom
            </h2>
            <p className="font-body text-base text-on-surface-variant">
              Find the perfect vehicle for any journey in Shivpuri
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Bikes & Scooters */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
              className="bg-surface rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden">
                  <ImagePlaceholder
                    src={IMAGES.bikesCategory}
                    alt="Bikes & Scooters"
                    type="scooter"
                    title="Bikes & Scooters"
                    aspectRatio="aspect-[16/10]"
                  />
                  <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary border border-outline-variant/30">
                    SHIVPURI FLEET
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-bold text-xl text-on-surface group-hover:text-primary transition-colors">
                      Bikes & Scooters
                    </h3>
                    <span className="material-symbols-outlined text-primary text-2xl">two_wheeler</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    Nimble, efficient transport for daily commutes and quick city trips across Shivpuri.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-md bg-surface-low text-[11px] font-semibold uppercase text-on-surface-variant border border-outline-variant/30">
                      ELECTRIC
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-low text-[11px] font-semibold uppercase text-on-surface-variant border border-outline-variant/30">
                      PETROL
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Button to="/vehicles?category=bikes" variant="outline" size="md" fullWidth icon="arrow_forward" iconPosition="right">
                  Explore Bikes
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Card 2: Cars & SUVs */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
              className="bg-surface rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden">
                  <ImagePlaceholder
                    src={IMAGES.carsCategory}
                    alt="Cars & SUVs"
                    type="car"
                    title="Cars & SUVs"
                    aspectRatio="aspect-[16/10]"
                  />
                  <span className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary border border-outline-variant/30">
                    SHIVPURI FLEET
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-bold text-xl text-on-surface group-hover:text-primary transition-colors">
                      Cars & SUVs
                    </h3>
                    <span className="material-symbols-outlined text-primary text-2xl">directions_car</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    Comfortable, spacious options for family trips, weekend getaways, or professional needs.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-md bg-surface-low text-[11px] font-semibold uppercase text-on-surface-variant border border-outline-variant/30">
                      HATCHBACK
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-low text-[11px] font-semibold uppercase text-on-surface-variant border border-outline-variant/30">
                      SEDAN
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-low text-[11px] font-semibold uppercase text-on-surface-variant border border-outline-variant/30">
                      SUV
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Button to="/vehicles?category=cars" variant="outline" size="md" fullWidth icon="arrow_forward" iconPosition="right">
                  Explore Cars
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="subtle" />

      {/* 3. CHECK YOUR REQUIREMENTS (SUBMITS BOTH FIELDS) */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="bg-surface-low rounded-2xl border border-primary/30 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleWidgetSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 space-y-1.5 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  <span className="material-symbols-outlined text-xs">tune</span>
                  Requirement Matcher
                </div>
                <h3 className="font-headline font-bold text-xl sm:text-2xl text-on-surface">
                  Check your requirements
                </h3>
                <p className="font-body text-sm text-on-surface-variant">
                  Tell us your travel plan and submit both fields to match available vehicles.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-on-surface-variant mb-1">Vehicle Category</label>
                  <select
                    value={widgetVehicleCategory}
                    onChange={(e) => setWidgetVehicleCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-on-surface font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="bikes">Bike / Scooter</option>
                    <option value="cars">Car / SUV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-on-surface-variant mb-1">Travel Purpose</label>
                  <select
                    value={widgetPurpose}
                    onChange={(e) => setWidgetPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-on-surface font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Daily Commute">Daily City Commute</option>
                    <option value="Weekend Trip">Weekend Road Trip</option>
                    <option value="Outstation Tour">Outstation Tour</option>
                  </select>
                </div>

                <div>
                  <Button type="submit" variant="primary" size="md" fullWidth icon="send">
                    Submit Requirements
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. SIMPLE. FAST. YOURS. */}
      <section className="px-4 sm:px-6 max-w-content mx-auto text-center space-y-12">
        <ScrollReveal>
          <div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight mb-2">
              Simple. Fast. Yours.
            </h2>
            <p className="font-body text-base text-on-surface-variant">
              Get moving in four clear steps.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 z-0 pointer-events-none" />

          <ScrollReveal delay={0.1} className="relative z-10">
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-primary text-white font-headline font-bold text-lg flex items-center justify-center shadow-xs">
                01
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1">State Need</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  Share your trip purpose, dates and vehicle choice.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="relative z-10">
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-primary text-white font-headline font-bold text-lg flex items-center justify-center shadow-xs">
                02
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Get Match</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  ApniRide suggests verified matching vehicles.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="relative z-10">
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-primary text-white font-headline font-bold text-lg flex items-center justify-center shadow-xs">
                03
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Confirm</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  We verify availability and confirm booking.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="relative z-10">
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-full bg-primary text-white font-headline font-bold text-lg flex items-center justify-center shadow-xs">
                04
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1">Ride</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  Pick up key and enjoy your trip in Shivpuri.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="dark" />

      {/* 5. BUILT FOR A BETTER RENTAL EXPERIENCE */}
      <section className="px-4 sm:px-6 max-w-content mx-auto text-center space-y-12">
        <ScrollReveal>
          <div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight mb-2">
              Built for a better rental experience
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollReveal delay={0.1}>
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 text-left space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">Verified Vehicles</h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Every vehicle undergoes safety inspection.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 text-left space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">sell</span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">Clear Pricing</h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                No hidden fees. What you see is what you pay.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 text-left space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">support_agent</span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">Local Support</h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Our Shivpuri team is ready to help whenever you need.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 text-left space-y-3 shadow-xs hover:border-primary/40 transition-colors h-full">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">shield</span>
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface">Safer Booking</h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Direct support and easy digital verification.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. USER REQUIREMENT HIGHLIGHT BANNER */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="relative bg-[#1e2330] text-white rounded-2xl p-8 sm:p-12 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url(${IMAGES.ownerBanner})` }}
            />

            <div className="lg:col-span-8 space-y-4 relative z-10">
              <span className="text-xs font-semibold text-primary-fixed uppercase tracking-wider">Custom Mobility Demand</span>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Need a vehicle tailored to your exact journey?
              </h2>
              <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                Tell us your travel plan, dates, and preferred bike or car. ApniRide checks local availability and matches you with verified options in Shivpuri.
              </p>
              <div className="pt-2">
                <Button to="/request" variant="primary" size="md" icon="checklist">
                  Submit Your Requirements
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end relative z-10">
              <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80 backdrop-blur-xs">
                <span className="material-symbols-outlined text-5xl">tune</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. STARTING IN SHIVPURI. GOING FURTHER */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <ScrollReveal className="lg:col-span-6">
            <motion.div
              style={{ y: shouldReduceMotion ? 0 : parallaxY }}
              className="rounded-2xl overflow-hidden border border-outline-variant/40 shadow-sm"
            >
              <ImagePlaceholder
                src={IMAGES.shivpuriLandscape}
                alt="Shivpuri Mountain Highway"
                type="map"
                title="Shivpuri Mountain Highway"
                aspectRatio="aspect-[4/3]"
              />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-6 space-y-4">
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight leading-snug">
              Starting in Shivpuri. <br />
              <span className="text-primary">Going further.</span>
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">
              ApniRide is launching our premier rental service right here in Shivpuri. Experience the beauty of the region or manage your daily commute with vehicles you can trust.
            </p>
            <div className="pt-2">
              <Button to="/waitlist" variant="primary" size="md">
                Join the Waitlist
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL TYRE MARKS DIVIDER BEFORE FOOTER CTA */}
      <TyreMarksDivider variant="subtle" />

      {/* 8. FINAL CTA: BE AMONG THE FIRST TO APNIRIDE */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden bg-surface-low border border-outline-variant/40 p-10 sm:p-16 text-center space-y-6">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
              style={{ backgroundImage: `url(${IMAGES.finalCtaBackground})` }}
            />

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">
                Be among the first to ApniRide.
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant">
                Join our pre-launch waitlist today to receive priority access when matching rentals go live in Shivpuri.
              </p>
              <div>
                <Button to="/waitlist" variant="primary" size="lg">
                  Join the Waitlist
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
