import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import TyreMarksDivider from '../components/TyreMarksDivider';
import { IMAGES } from '../data/images';

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-content mx-auto">
      {/* Page Hero - Thin Neo-Mirai Display */}
      <section className="text-center pt-6 max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#C89D3C]/40 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
          ABOUT APNIRIDE
        </div>
        <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1E1B18] tracking-tight uppercase leading-tight">
          Bringing Modern Mobility to <br className="hidden sm:block" />
          <span className="text-[#E64A19] font-normal">Shivpuri, India</span>
        </h1>
        <p className="font-body text-base sm:text-lg text-[#45413B] leading-relaxed max-w-2xl mx-auto">
          ApniRide is a pre-launch mobility platform built specifically to make bike and car rentals simple, transparent, and requirement-focused in Shivpuri, Madhya Pradesh.
        </p>
      </section>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="primary" />

      {/* Mission & Story Grid with Indian Neo-Mirai Art */}
      <section className="bg-white rounded-2xl border border-[#1E1B18]/15 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="font-mono text-xs font-semibold text-[#E64A19] uppercase tracking-wider">
            [OUR MISSION]
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] tracking-tight uppercase">
            Solving Everyday Transport Challenges in Tier-2 Cities.
          </h2>
          <p className="font-body text-sm sm:text-base text-[#45413B] leading-relaxed">
            In cities like Shivpuri, mobility options are often limited to purchasing personal vehicles or relying on erratic public transit.
          </p>
          <p className="font-body text-sm sm:text-base text-[#45413B] leading-relaxed">
            ApniRide bridges this gap by offering a transparent vehicle rental service tailored to your exact travel requirements, whether you need a scooter for daily errands or a car for outstation travel.
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-[#1E1B18]/15 shadow-sm">
          <img
            src={IMAGES.shivpuriLandscape}
            alt="ApniRide Shivpuri Network"
            className="w-full h-72 object-cover"
          />
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-mono text-xs font-semibold text-[#C89D3C] uppercase tracking-wider">
            [CORE FOUNDATIONS]
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] tracking-tight uppercase">
            Why Choose ApniRide
          </h2>
          <p className="font-body text-sm text-[#45413B]">
            Our core values for building a trusted mobility network in Shivpuri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#1E1B18]/15 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#E64A19] bg-[#E64A19]/10 px-2 py-0.5 rounded">01</span>
              <span className="material-symbols-outlined text-2xl text-[#E64A19]">location_city</span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E1B18]">Local-First Approach</h3>
            <p className="font-body text-sm text-[#45413B] leading-relaxed">
              We design every pickup point, pricing tier, and vehicle recommendation around Shivpuri geography and daily routines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#1E1B18]/15 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#C89D3C] bg-[#C89D3C]/10 px-2 py-0.5 rounded">02</span>
              <span className="material-symbols-outlined text-2xl text-[#C89D3C]">touch_app</span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E1B18]">Simple Experience</h3>
            <p className="font-body text-sm text-[#45413B] leading-relaxed">
              No endless paperwork or complex security deposits. Check your requirements and book your ride in just a few taps.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#1E1B18]/15 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#1E1B18] bg-[#1E1B18]/10 px-2 py-0.5 rounded">03</span>
              <span className="material-symbols-outlined text-2xl text-[#1E1B18]">groups</span>
            </div>
            <h3 className="font-display font-bold text-lg text-[#1E1B18]">Community-Driven</h3>
            <p className="font-body text-sm text-[#45413B] leading-relaxed">
              We build strong relationships with verified local vehicle owners and early adopters to maintain standard quality.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-[#EFECE4] rounded-2xl border border-[#1E1B18]/15 p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-[#E64A19] uppercase tracking-wider">
            [GET IN TOUCH]
          </span>
          <h3 className="font-display font-bold text-2xl text-[#1E1B18] uppercase">
            Have questions or feedback?
          </h3>
          <p className="font-body text-sm text-[#45413B] max-w-lg mx-auto">
            We are actively gathering input from Shivpuri residents, students, and commuters to refine ApniRide before launch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
          <a
            href="https://wa.me/918370092226?text=Hi%20ApniRide,%20I%20have%20a%20query."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 flex items-center gap-3 hover:border-[#25D366] transition-colors shadow-2xs"
          >
            <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#1E1B18]">WhatsApp Support</div>
              <div className="font-mono text-xs text-[#45413B]">+91 8370092226 (Chat Now)</div>
            </div>
          </a>

          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#E64A19]/10 text-[#E64A19] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#1E1B18]">Official Email</div>
              <div className="font-mono text-xs text-[#45413B]">hello@apniride.in</div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/waitlist"
            className="inline-flex items-center justify-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-6 py-3 rounded-full shadow-xs"
          >
            <span>JOIN THE WAITLIST</span>
            <span>→</span>
          </Link>
          <Link
            to="/request"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#1E1B18] border border-[#1E1B18]/20 hover:bg-[#EFECE4] font-mono text-xs font-semibold px-6 py-3 rounded-full"
          >
            <span>SUBMIT REQUIREMENTS</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="subtle" />

      {/* Final Waitlist CTA */}
      <CTASection
        title="Be among the first to experience ApniRide"
        description="Join our Shivpuri pre-launch waitlist to get early notification as soon as matching rentals go live."
        primaryCtaText="Join the Waitlist"
        primaryCtaTo="/waitlist"
        secondaryCtaText="Submit Requirements"
        secondaryCtaTo="/request"
      />
    </div>
  );
}
