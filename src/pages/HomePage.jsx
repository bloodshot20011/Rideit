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
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. EXACT NEO-MIRAI SPLIT HERO SECTION WITH THIN GEOMETRIC TYPOGRAPHY */}
      <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#F5F2EB] text-[#1E1B18] -mt-16 pt-20 pb-16 border-b border-[#1E1B18]/10">
        {/* Right Side Indian City Retro-Futurist Artwork */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[68%] h-full overflow-hidden pointer-events-none z-0">
          <motion.img
            src={IMAGES.heroBackground}
            alt="Neo-Mirai Indian Retro-Futuristic Shivpuri Mobility Art"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full object-cover object-right"
          />
          {/* Seamless Left-Edge Paper Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EB] via-[#F5F2EB]/80 to-transparent w-full lg:w-2/5 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EB] via-transparent to-transparent h-24 bottom-0 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full flex flex-col justify-between min-h-[72vh]">
          {/* Far Right Vertical Stamp Seal Box (Desktop) */}
          <div className="hidden xl:flex absolute top-4 right-6 flex-col items-center gap-2 p-2.5 bg-[#F5F2EB]/85 backdrop-blur-md border border-[#1E1B18]/20 rounded-md font-mono text-[10px] tracking-widest text-[#45413B] shadow-xs pointer-events-none">
            <div className="w-5 h-5 rounded-full border border-[#E64A19] flex items-center justify-center text-[#E64A19] font-bold">
              〇
            </div>
            <div className="[writing-mode:vertical-rl] py-2 font-semibold uppercase text-[#1E1B18]">
              नई गतिशीलता • शिवपुरी
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
            {/* Left Column: Hero Text & Calligraphy */}
            <div className="lg:col-span-8 flex flex-col items-start text-left relative">
              {/* Vertical Hindi Calligraphy Margin Stamp */}
              <div className="hidden sm:flex absolute -left-12 top-2 flex-col items-center gap-2 font-serif text-xs text-[#45413B]/80 pointer-events-none">
                <span className="[writing-mode:vertical-rl] tracking-widest font-medium">
                  आपकी अपनी सवारी, आपके रास्ते।
                </span>
                <span className="w-4 h-4 border border-[#E64A19] rounded-xs flex items-center justify-center text-[9px] text-[#E64A19] font-bold">
                  印
                </span>
              </div>

              {/* Main Neo-Mirai Display Headline - THIN ARCHITECTURAL STROKES (Matching Reference) */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-display font-light text-5xl sm:text-7xl lg:text-8xl text-[#1E1B18] tracking-tight leading-[0.96] mb-4 uppercase"
              >
                APNIRIDE<br />
                MOBILITY<br />
                PLATFORM
              </motion.h1>

              {/* Subtitle in Warm Terracotta Serif */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#D84315] font-semibold mb-2"
              >
                Shivpuri 2026
              </motion.div>

              {/* Relatable, Jargon-Free Subtext for Local Visitors */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-body text-base sm:text-lg text-[#45413B] max-w-lg mb-8 leading-relaxed"
              >
                Rent verified bikes, scooters, and cars in Shivpuri without the cost of buying. Transparent per-day pricing from ₹399.
              </motion.p>

              {/* CTA Group */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-10"
              >
                <Link
                  to="/waitlist"
                  className="inline-flex items-center justify-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-6 py-3.5 rounded-full shadow-md transition-all hover:shadow-lg tracking-wider"
                >
                  <span>JOIN THE WAITLIST</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/request"
                  className="inline-flex items-center justify-center gap-2 bg-white/90 text-[#1E1B18] border border-[#1E1B18]/25 hover:bg-[#EFECE4] font-mono text-xs font-semibold px-6 py-3.5 rounded-full backdrop-blur-sm transition-all shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">checklist</span>
                  <span>CHECK REQUIREMENTS</span>
                </Link>
              </motion.div>

              {/* Bottom Metadata Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="font-mono text-xs font-semibold text-[#7C776E] space-y-0.5 uppercase tracking-wider"
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

      {/* 2. LOCAL BUSINESS EXPLANATION — SIMPLE & RELATABLE (ZERO JARGON) */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-[#1E1B18]/15 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-xs font-semibold text-[#E64A19] uppercase tracking-wider">
                [SHIVPURI MOBILITY MADE SIMPLE]
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B18] tracking-tight uppercase">
                Gadi Kharidne ki Zaroorat Nahi. <br />
                <span className="text-[#D84315] font-serif normal-case">Rent verified bikes and cars whenever you need.</span>
              </h2>
              <p className="font-body text-base text-[#45413B] leading-relaxed">
                Whether you live in Shivpuri or are visiting, ApniRide makes getting a vehicle as simple as booking in a few taps. No heavy down payments, no maintenance worries.
              </p>
            </div>

            {/* 3 Everyday Use-Case Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-[#F5F2EB] p-6 rounded-xl border border-[#1E1B18]/10 space-y-3 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E64A19]/10 text-[#E64A19] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">school</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1E1B18]">College & Daily Errands</h3>
                  <p className="font-body text-sm text-[#45413B] leading-relaxed">
                    Need a scooter like Activa or Jupiter for college, coaching, or daily market work? Rent affordably from ₹399/day.
                  </p>
                </div>
                <div className="pt-2 font-mono text-xs font-semibold text-[#E64A19]">
                  Rates from ₹399/day →
                </div>
              </div>

              <div className="bg-[#F5F2EB] p-6 rounded-xl border border-[#1E1B18]/10 space-y-3 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C89D3C]/15 text-[#C89D3C] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">luggage</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1E1B18]">Gwalior, Jhansi & Outstation</h3>
                  <p className="font-body text-sm text-[#45413B] leading-relaxed">
                    Planning a family trip to Gwalior, Jhansi, or Madhav National Park? Rent a clean Swift or Creta with comfortable AC.
                  </p>
                </div>
                <div className="pt-2 font-mono text-xs font-semibold text-[#C89D3C]">
                  Rates from ₹1,499/day →
                </div>
              </div>

              <div className="bg-[#F5F2EB] p-6 rounded-xl border border-[#1E1B18]/10 space-y-3 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0B132B]/10 text-[#0B132B] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">celebration</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1E1B18]">Weddings & Special Events</h3>
                  <p className="font-body text-sm text-[#45413B] leading-relaxed">
                    Need extra vehicles for visiting relatives, marriage functions, or business guests in Shivpuri? Book in advance.
                  </p>
                </div>
                <div className="pt-2 font-mono text-xs font-semibold text-[#1E1B18]">
                  Verified Fleet →
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. FAST 30-SECOND REQUIREMENT MATCHER (SURVEY CURIOSITY HOOK) */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="bg-[#EFECE4] rounded-2xl border-2 border-[#C89D3C]/40 p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E64A19]/5 rounded-full blur-2xl pointer-events-none" />
            <form onSubmit={handleWidgetSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              <div className="lg:col-span-4 space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 bg-[#0B132B] text-[#C89D3C] px-2.5 py-0.5 rounded font-mono text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-xs text-[#E64A19]">tune</span>
                  30-SECOND SURVEY
                </div>
                <h3 className="font-display font-bold text-2xl text-[#1E1B18] tracking-tight uppercase">
                  Tell Us What You Need
                </h3>
                <p className="font-body text-sm text-[#45413B]">
                  Select your vehicle type and travel plan. We will notify you with matching options when we launch in Shivpuri.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block font-mono text-[11px] font-semibold uppercase text-[#45413B] mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={widgetVehicleCategory}
                    onChange={(e) => setWidgetVehicleCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1E1B18]/20 bg-white text-[#1E1B18] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                  >
                    <option value="bikes">Bike / Scooter (from ₹399/day)</option>
                    <option value="cars">Car / SUV (from ₹1,499/day)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-semibold uppercase text-[#45413B] mb-1">
                    Travel Plan
                  </label>
                  <select
                    value={widgetPurpose}
                    onChange={(e) => setWidgetPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1E1B18]/20 bg-white text-[#1E1B18] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                  >
                    <option value="Daily Commute">Daily City Commute</option>
                    <option value="Weekend Trip">Weekend Road Trip</option>
                    <option value="Outstation Tour">Outstation Tour (Gwalior/Jhansi)</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-4 py-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
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

      {/* 4. CHOOSE YOUR FREEDOM — FLEET SHOWCASE WITH INDIAN NEO-MIRAI ART */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B18] tracking-tight mb-2 uppercase">
              Choose your freedom
            </h2>
            <p className="font-body text-base text-[#45413B]">
              Explore the bikes, scooters, and cars planned for Shivpuri
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Bikes & Scooters */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl border border-[#1E1B18]/15 overflow-hidden shadow-sm hover:shadow-md hover:border-[#E64A19]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden bg-[#EFECE4]">
                  <ImagePlaceholder
                    src={IMAGES.bikesCategory}
                    alt="Bikes and Scooters in Shivpuri"
                    type="scooter"
                    title="Bikes and Scooters"
                    aspectRatio="aspect-[16/10]"
                  />
                  <span className="absolute top-3 right-3 bg-[#0B132B]/90 backdrop-blur-md px-3 py-1 rounded font-mono text-[10px] font-bold text-[#C89D3C] border border-[#C89D3C]/40">
                    SHIVPURI FLEET
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl text-[#1E1B18] group-hover:text-[#E64A19] transition-colors uppercase">
                      Bikes & Scooters
                    </h3>
                    <span className="material-symbols-outlined text-[#E64A19] text-2xl">two_wheeler</span>
                  </div>
                  <p className="font-body text-sm text-[#45413B] leading-relaxed">
                    Nimble, efficient transport for daily commutes and quick city trips across Shivpuri.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#EFECE4] text-[11px] font-semibold uppercase text-[#45413B] border border-[#1E1B18]/10">
                      ELECTRIC
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#EFECE4] text-[11px] font-semibold uppercase text-[#45413B] border border-[#1E1B18]/10">
                      PETROL
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#E64A19]/10 text-[11px] font-bold text-[#E64A19] border border-[#E64A19]/30">
                      FROM ₹399/DAY
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
              className="bg-white rounded-xl border border-[#1E1B18]/15 overflow-hidden shadow-sm hover:shadow-md hover:border-[#E64A19]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden bg-[#EFECE4]">
                  <ImagePlaceholder
                    src={IMAGES.carsCategory}
                    alt="Cars and SUVs in Shivpuri"
                    type="car"
                    title="Cars and SUVs"
                    aspectRatio="aspect-[16/10]"
                  />
                  <span className="absolute top-3 right-3 bg-[#0B132B]/90 backdrop-blur-md px-3 py-1 rounded font-mono text-[10px] font-bold text-[#C89D3C] border border-[#C89D3C]/40">
                    SHIVPURI FLEET
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl text-[#1E1B18] group-hover:text-[#E64A19] transition-colors uppercase">
                      Cars & SUVs
                    </h3>
                    <span className="material-symbols-outlined text-[#E64A19] text-2xl">directions_car</span>
                  </div>
                  <p className="font-body text-sm text-[#45413B] leading-relaxed">
                    Comfortable, spacious options for family trips, weekend getaways, or professional needs.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#EFECE4] text-[11px] font-semibold uppercase text-[#45413B] border border-[#1E1B18]/10">
                      HATCHBACK
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#EFECE4] text-[11px] font-semibold uppercase text-[#45413B] border border-[#1E1B18]/10">
                      SUV
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#E64A19]/10 text-[11px] font-bold text-[#E64A19] border border-[#E64A19]/30">
                      FROM ₹1,499/DAY
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

      {/* 5. 4-STEP EASY PROCESS */}
      <section className="px-4 sm:px-6 max-w-content mx-auto text-center space-y-12">
        <ScrollReveal>
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B18] tracking-tight mb-2 uppercase">
              Simple. Fast. Yours.
            </h2>
            <p className="font-body text-base text-[#45413B]">
              Rent in four clear steps without complex paperwork.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#E64A19]/20 via-[#C89D3C]/40 to-[#E64A19]/20 z-0 pointer-events-none" />

          <ScrollReveal delay={0.1} className="relative z-10">
            <div className="bg-white p-6 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-[#E64A19]/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-lg bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-lg flex items-center justify-center shadow-xs border border-[#C89D3C]/30">
                01
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#1E1B18] mb-1">State Need</h3>
                <p className="font-body text-sm text-[#45413B] leading-relaxed">
                  Share your trip purpose, dates and preferred vehicle.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="relative z-10">
            <div className="bg-white p-6 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-[#E64A19]/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-lg bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-lg flex items-center justify-center shadow-xs border border-[#C89D3C]/30">
                02
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#1E1B18] mb-1">Get Match</h3>
                <p className="font-body text-sm text-[#45413B] leading-relaxed">
                  ApniRide checks verified local fleet availability.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="relative z-10">
            <div className="bg-white p-6 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-[#E64A19]/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-lg bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-lg flex items-center justify-center shadow-xs border border-[#C89D3C]/30">
                03
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#1E1B18] mb-1">Confirm</h3>
                <p className="font-body text-sm text-[#45413B] leading-relaxed">
                  Quick digital verification via WhatsApp or phone.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="relative z-10">
            <div className="bg-white p-6 rounded-xl border border-[#1E1B18]/15 flex flex-col items-center text-center space-y-3 shadow-xs hover:border-[#E64A19]/40 transition-colors h-full justify-between">
              <div className="w-12 h-12 rounded-lg bg-[#0B132B] text-[#C89D3C] font-mono font-bold text-lg flex items-center justify-center shadow-xs border border-[#C89D3C]/30">
                04
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#1E1B18] mb-1">Ride</h3>
                <p className="font-body text-sm text-[#45413B] leading-relaxed">
                  Pick up keys at your nearest Shivpuri location and go.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="dark" />

      {/* 6. HOST VEHICLE PORTAL CALLOUT */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="relative bg-[#0B132B] text-[#F5F2EB] rounded-2xl p-8 sm:p-12 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-2 border-[#C89D3C]/40">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
              style={{ backgroundImage: `url(${IMAGES.ownerBanner})` }}
            />

            <div className="lg:col-span-8 space-y-4 relative z-10">
              <span className="font-mono text-xs font-semibold text-[#C89D3C] uppercase tracking-wider">
                [EARN WITH YOUR VEHICLE]
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F2EB] tracking-tight uppercase">
                Have an idle bike or car in Shivpuri?
              </h2>
              <p className="font-body text-sm sm:text-base text-[#F5F2EB]/80 leading-relaxed max-w-xl">
                Turn your parked vehicle into a monthly earning source. List your bike or car on ApniRide — we handle renter verification, rental agreements, and payouts.
              </p>
              <div className="pt-2">
                <Link
                  to="/list-your-vehicle"
                  className="inline-flex items-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-6 py-3 rounded-full shadow-sm transition-all"
                >
                  <span>LIST YOUR VEHICLE (EARN ₹15,000+/MO)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end relative z-10">
              <div className="w-28 h-28 rounded-xl bg-[#131E29] border border-[#C89D3C]/50 flex items-center justify-center text-[#E64A19] shadow-md">
                <span className="material-symbols-outlined text-5xl">key</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. FINAL CTA: BE AMONG THE FIRST TO APNIRIDE */}
      <section className="px-4 sm:px-6 max-w-content mx-auto">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden bg-[#EFECE4] border-2 border-[#C89D3C]/40 p-10 sm:p-16 text-center space-y-6">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
              style={{ backgroundImage: `url(${IMAGES.finalCtaBackground})` }}
            />

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B18] tracking-tight uppercase">
                Be among the first to ApniRide.
              </h2>
              <p className="font-body text-sm sm:text-base text-[#45413B]">
                Join our pre-launch waitlist today to receive priority access and exclusive 20% discount on day one in Shivpuri.
              </p>
              <div>
                <Link
                  to="/waitlist"
                  className="inline-flex items-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-8 py-4 rounded-full shadow-md transition-all hover:shadow-lg tracking-wider"
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
