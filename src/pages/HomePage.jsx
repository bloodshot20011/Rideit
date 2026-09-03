import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
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

  const handleWidgetSubmit = (e) => {
    e.preventDefault();
    navigate(`/request?category=${encodeURIComponent(widgetVehicleCategory)}&purpose=${encodeURIComponent(widgetPurpose)}&autoSubmit=true`);
  };

  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20 pb-10">
      {/* 1. EXACT NEO-MIRAI SPLIT HERO SECTION WITH COMPACT MOBILE SCALING */}
      <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-[#F5F2EB] text-[#1E1B18] -mt-16 pt-20 pb-12 sm:pb-16 border-b border-[#1E1B18]/10">
        {/* Right Side Indian City Retro-Futurist Artwork */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[68%] h-full overflow-hidden pointer-events-none z-0">
          <motion.img
            src={IMAGES.heroBackground}
            alt="Neo-Mirai Indian Retro-Futuristic Shivpuri Mobility Art"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full object-cover object-right opacity-40 lg:opacity-100"
          />
          {/* Seamless Left-Edge Paper Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EB] via-[#F5F2EB]/85 to-transparent w-full lg:w-2/5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EB] via-transparent to-transparent h-20 bottom-0 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full flex flex-col justify-between min-h-[60vh] sm:min-h-[70vh]">
          {/* Far Right Vertical Stamp Seal Box (Desktop) */}
          <div className="hidden xl:flex absolute top-4 right-6 flex-col items-center gap-2 p-2 bg-[#F5F2EB]/85 backdrop-blur-md border border-[#1E1B18]/20 rounded-md font-mono text-[9px] tracking-widest text-[#45413B] shadow-xs pointer-events-none">
            <div className="w-4 h-4 rounded-full border border-[#E64A19] flex items-center justify-center text-[#E64A19] font-bold">
              〇
            </div>
            <div className="[writing-mode:vertical-rl] py-1.5 font-semibold uppercase text-[#1E1B18]">
              नई गतिशीलता • शिवपुरी
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4 sm:pt-6">
            {/* Left Column: Hero Text & Calligraphy */}
            <div className="lg:col-span-8 flex flex-col items-start text-left relative">
              {/* Vertical Hindi Calligraphy Margin Stamp (Desktop/Tablet) */}
              <div className="hidden sm:flex absolute -left-12 top-2 flex-col items-center gap-2 font-serif text-xs text-[#45413B]/80 pointer-events-none">
                <span className="[writing-mode:vertical-rl] tracking-widest font-medium">
                  आपकी अपनी सवारी, आपके रास्ते।
                </span>
                <span className="w-4 h-4 border border-[#E64A19] rounded-xs flex items-center justify-center text-[9px] text-[#E64A19] font-bold">
                  印
                </span>
              </div>

              {/* Main Neo-Mirai Display Headline - SIMPLE EVERYDAY WORDS */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-light text-3xl sm:text-5xl lg:text-7xl text-[#1E1B18] tracking-tight leading-[1.04] sm:leading-[0.98] mb-3 uppercase"
              >
                APNIRIDE<br />
                BIKE & CAR<br />
                RENTALS
              </motion.h1>

              {/* Subtitle in Warm Terracotta Serif */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#D84315] font-semibold mb-2"
              >
                Shivpuri 2026
              </motion.div>

              {/* Clear, Jargon-Free Basic Business Info */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-body text-sm sm:text-base text-[#45413B] max-w-lg mb-6 leading-relaxed"
              >
                Shivpuri's first self-drive rental service. Rent scooters from ₹399/day and cars from ₹1,499/day with zero deposit hassles.
              </motion.p>

              {/* CTA Group */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6 sm:mb-8"
              >
                <Link
                  to="/waitlist"
                  className="inline-flex items-center justify-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-5 py-3 rounded-full shadow-sm transition-all hover:shadow-md tracking-wider"
                >
                  <span>JOIN THE WAITLIST</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/request"
                  className="inline-flex items-center justify-center gap-2 bg-white/90 text-[#1E1B18] border border-[#1E1B18]/25 hover:bg-[#EFECE4] font-mono text-xs font-semibold px-5 py-3 rounded-full backdrop-blur-sm transition-all shadow-2xs"
                >
                  <span className="material-symbols-outlined text-sm">checklist</span>
                  <span>CHECK REQUIREMENTS</span>
                </Link>
              </motion.div>

              {/* Bottom Metadata Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-mono text-[11px] font-semibold text-[#7C776E] space-y-0.5 uppercase tracking-wider"
              >
                <div>LAUNCHING Q3 2026</div>
                <div>SHIVPURI, MADHYA PRADESH</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TYRE MARKS SPEED DIVIDER */}
      <TyreMarksDivider variant="primary" />

      {/* 2. WELCOMING BRIDGE & CONTINUOUS ADVERTISEMENT STORYTELLING */}
      <section className="px-4 sm:px-6 max-w-content mx-auto space-y-6 sm:space-y-8">
        {/* Gentle Bridge Transition Line (Requested by User) */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-[11px] font-semibold text-[#E64A19] uppercase tracking-wider">
              [WELCOME TO SHIVPURI MOBILITY]
            </span>
            <h2 className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-[#1E1B18] tracking-tight uppercase">
              A Modern Way to Travel Across <span className="text-[#E64A19] font-normal">Shivpuri</span>
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed max-w-xl mx-auto">
              ApniRide is introducing convenient, verified self-drive bike and car rentals designed around everyday local routines.
            </p>
            {/* Continuous Ad Connecting Line */}
            <div className="pt-1">
              <div className="inline-block bg-[#0B132B] text-[#F5F2EB] px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-medium border border-[#C89D3C]/40 shadow-xs">
                ✨ Zero down payment, zero maintenance, 100% freedom. Shivpuri residents, get ready for affordable daily rentals.
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Practical Business Benefits Card */}
        <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#1E1B18]/15 p-4 sm:p-8 lg:p-10 shadow-xs space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="font-mono text-[10px] font-bold text-[#C89D3C] uppercase tracking-wider bg-[#0B132B] px-2.5 py-0.5 rounded">
                EASY & TRANSPARENT RENTALS
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E1B18] tracking-tight uppercase">
                Gaadi Kharidne ki Zaroorat Nahi. <br className="hidden sm:block" />
                <span className="text-[#D84315] font-serif normal-case text-base sm:text-xl font-normal block sm:inline">
                  Rent verified bikes and cars whenever you need.
                </span>
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed">
                Whether you live in Shivpuri or are visiting, ApniRide makes getting a vehicle as simple as booking in a few taps. No down payments, no maintenance worries.
              </p>
            </div>

            {/* 3 Everyday Use-Case Compact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 pt-2">
              <div className="bg-[#F5F2EB] p-4 sm:p-5 rounded-lg border border-[#1E1B18]/10 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-md bg-[#E64A19]/10 text-[#E64A19] flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">school</span>
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#1E1B18]">College & Daily Errands</h4>
                  <p className="font-body text-xs text-[#45413B] leading-relaxed">
                    Need an Activa or Jupiter for college, coaching, or market runs? Rent affordably from ₹399/day.
                  </p>
                </div>
                <div className="pt-1 font-mono text-[11px] font-semibold text-[#E64A19]">
                  Rates from ₹399/day →
                </div>
              </div>

              <div className="bg-[#F5F2EB] p-4 sm:p-5 rounded-lg border border-[#1E1B18]/10 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-md bg-[#C89D3C]/15 text-[#C89D3C] flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">luggage</span>
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#1E1B18]">Gwalior & Outstation Trips</h4>
                  <p className="font-body text-xs text-[#45413B] leading-relaxed">
                    Family trip to Gwalior, Jhansi, or Madhav National Park? Rent a clean Swift or Creta with AC.
                  </p>
                </div>
                <div className="pt-1 font-mono text-[11px] font-semibold text-[#C89D3C]">
                  Rates from ₹1,499/day →
                </div>
              </div>

              <div className="bg-[#F5F2EB] p-4 sm:p-5 rounded-lg border border-[#1E1B18]/10 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-md bg-[#0B132B]/10 text-[#0B132B] flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">celebration</span>
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#1E1B18]">Weddings & Special Events</h4>
                  <p className="font-body text-xs text-[#45413B] leading-relaxed">
                    Extra vehicles for visiting guests and family functions in Shivpuri without hefty security deposits.
                  </p>
                </div>
                <div className="pt-1 font-mono text-[11px] font-semibold text-[#1E1B18]">
                  Verified Fleet →
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. FAST 30-SECOND REQUIREMENT SURVEY WIDGET */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="bg-[#EFECE4] rounded-xl sm:rounded-2xl border border-[#C89D3C]/40 p-4 sm:p-8 shadow-xs relative overflow-hidden">
            <form onSubmit={handleWidgetSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center relative z-10">
              <div className="lg:col-span-4 space-y-1.5 text-center lg:text-left">
                <div className="inline-flex items-center gap-1 bg-[#0B132B] text-[#C89D3C] px-2 py-0.5 rounded font-mono text-[9px] font-semibold">
                  <span className="material-symbols-outlined text-[11px] text-[#E64A19]">tune</span>
                  30-SECOND SURVEY
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E1B18] tracking-tight uppercase">
                  Tell Us What You Need
                </h3>
                <p className="font-body text-xs text-[#45413B]">
                  Select your vehicle and travel plan. We will update you when matching rides launch in Shivpuri.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                <div>
                  <label className="block font-mono text-[10px] font-semibold uppercase text-[#45413B] mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={widgetVehicleCategory}
                    onChange={(e) => setWidgetVehicleCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-[#1E1B18] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                  >
                    <option value="bikes">Bike / Scooter (from ₹399/day)</option>
                    <option value="cars">Car / SUV (from ₹1,499/day)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-semibold uppercase text-[#45413B] mb-1">
                    Travel Plan
                  </label>
                  <select
                    value={widgetPurpose}
                    onChange={(e) => setWidgetPurpose(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-[#1E1B18] font-body text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                  >
                    <option value="Daily Commute">Daily City Commute</option>
                    <option value="Weekend Trip">Weekend Road Trip</option>
                    <option value="Outstation Tour">Outstation Tour (Gwalior/Jhansi)</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>CHECK AVAILABILITY</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. CHOOSE YOUR FREEDOM — COMPACT FLEET SHOWCASE */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <h2 className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-[#1E1B18] tracking-tight mb-1 uppercase">
              Choose your freedom
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#45413B]">
              Explore the bikes, scooters, and cars planned for Shivpuri
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Bikes & Scooters (Compact Mobile Image) */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-[#1E1B18]/15 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden bg-[#EFECE4] h-38 sm:h-48 md:h-56">
                  <img
                    src={IMAGES.bikesCategory}
                    alt="Bikes and Scooters in Shivpuri"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-[#0B132B]/90 backdrop-blur-md px-2 py-0.5 rounded font-mono text-[9px] font-bold text-[#C89D3C] border border-[#C89D3C]/40">
                    SHIVPURI FLEET
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B18] group-hover:text-[#E64A19] transition-colors uppercase">
                      Bikes & Scooters
                    </h3>
                    <span className="material-symbols-outlined text-[#E64A19] text-xl">two_wheeler</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed">
                    Nimble transport for daily commutes and quick city trips across Shivpuri.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] sm:text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#EFECE4] font-semibold uppercase text-[#45413B]">
                      ELECTRIC
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#EFECE4] font-semibold uppercase text-[#45413B]">
                      PETROL
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#E64A19]/10 font-bold text-[#E64A19]">
                      FROM ₹399/DAY
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                <Button to="/vehicles?category=bikes" variant="outline" size="sm" fullWidth icon="arrow_forward" iconPosition="right">
                  Explore Bikes
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Card 2: Cars & SUVs (Compact Mobile Image) */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-[#1E1B18]/15 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden bg-[#EFECE4] h-38 sm:h-48 md:h-56">
                  <img
                    src={IMAGES.carsCategory}
                    alt="Cars and SUVs in Shivpuri"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-[#0B132B]/90 backdrop-blur-md px-2 py-0.5 rounded font-mono text-[9px] font-bold text-[#C89D3C] border border-[#C89D3C]/40">
                    SHIVPURI FLEET
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B18] group-hover:text-[#E64A19] transition-colors uppercase">
                      Cars & SUVs
                    </h3>
                    <span className="material-symbols-outlined text-[#E64A19] text-xl">directions_car</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed">
                    Spacious options for family trips, weekend getaways, or professional needs.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px] sm:text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#EFECE4] font-semibold uppercase text-[#45413B]">
                      HATCHBACK
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#EFECE4] font-semibold uppercase text-[#45413B]">
                      SUV
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#E64A19]/10 font-bold text-[#E64A19]">
                      FROM ₹1,499/DAY
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                <Button to="/vehicles?category=cars" variant="outline" size="sm" fullWidth icon="arrow_forward" iconPosition="right">
                  Explore Cars
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="subtle" />

      {/* 5. 4-STEP EASY PROCESS (COMPACT) */}
      <section className="px-4 sm:px-6 max-w-content mx-auto text-center space-y-6 sm:space-y-8">
        <ScrollReveal>
          <div>
            <h2 className="font-display font-light text-2xl sm:text-3xl text-[#1E1B18] tracking-tight mb-1 uppercase">
              Simple. Fast. Yours.
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#45413B]">
              Rent in four clear steps without complex paperwork.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-xs flex items-center justify-center">
              01
            </div>
            <div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-[#1E1B18]">State Need</h3>
              <p className="font-body text-[11px] sm:text-xs text-[#45413B] leading-tight mt-1">
                Share trip dates & vehicle.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-xs flex items-center justify-center">
              02
            </div>
            <div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-[#1E1B18]">Get Match</h3>
              <p className="font-body text-[11px] sm:text-xs text-[#45413B] leading-tight mt-1">
                We check local fleet availability.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-xs flex items-center justify-center">
              03
            </div>
            <div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-[#1E1B18]">Confirm</h3>
              <p className="font-body text-[11px] sm:text-xs text-[#45413B] leading-tight mt-1">
                Quick digital verification.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-md bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-xs flex items-center justify-center">
              04
            </div>
            <div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-[#1E1B18]">Ride</h3>
              <p className="font-body text-[11px] sm:text-xs text-[#45413B] leading-tight mt-1">
                Pick up keys in Shivpuri & go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="dark" />

      {/* 6. HOST VEHICLE PORTAL (COMPACT) */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="relative bg-[#0B132B] text-[#F5F2EB] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm overflow-hidden border border-[#C89D3C]/40">
            <div className="space-y-3 relative z-10 max-w-xl">
              <span className="font-mono text-[10px] font-semibold text-[#C89D3C] uppercase tracking-wider">
                [EARN WITH YOUR VEHICLE]
              </span>
              <h2 className="font-display font-bold text-lg sm:text-2xl text-[#F5F2EB] tracking-tight uppercase">
                Have an idle bike or car in Shivpuri?
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#F5F2EB]/80 leading-relaxed">
                Turn your parked vehicle into a monthly earning source. List on ApniRide — we handle renter verification, agreements, and payouts.
              </p>
              <div className="pt-1">
                <Link
                  to="/list-your-vehicle"
                  className="inline-flex items-center gap-1.5 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs transition-all"
                >
                  <span>LIST YOUR VEHICLE (EARN ₹15,000+/MO)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. FINAL CTA */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#EFECE4] border border-[#C89D3C]/40 p-6 sm:p-10 text-center space-y-4">
            <div className="relative z-10 max-w-lg mx-auto space-y-3">
              <h2 className="font-display font-light text-2xl sm:text-3xl text-[#1E1B18] tracking-tight uppercase">
                Be among the first to <span className="font-normal text-[#E64A19]">ApniRide</span>
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#45413B]">
                Join our pre-launch waitlist today to receive priority access and exclusive 20% discount on day one in Shivpuri.
              </p>
              <div className="pt-2">
                <Link
                  to="/waitlist"
                  className="inline-flex items-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-6 py-3 rounded-full shadow-sm transition-all hover:shadow-md tracking-wider"
                >
                  <span>JOIN THE WAITLIST</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
