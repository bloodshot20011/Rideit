import React from 'react';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-content mx-auto">
      {/* Page Hero */}
      <section className="text-center pt-4">
        <SectionHeading
          pillTag="About Ride It"
          pillIcon="info"
          title="Bringing Modern Mobility to Shivpuri"
          subtitle="Ride It is a pre-launch mobility platform built specifically to make bike and car rentals simple, accessible, and community-driven in Shivpuri, India."
        />
      </section>

      {/* Mission & Story Grid */}
      <section className="bg-surface rounded-2xl border border-outline-variant/40 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Our Mission</span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface">
            Solving everyday transport challenges in tier-2 cities.
          </h2>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            In cities like Shivpuri, mobility options are often limited to purchasing personal vehicles or relying on erratic public transit. Meanwhile, hundreds of private bikes and cars sit unused in driveways most days of the week.
          </p>
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            Ride It bridges this gap by enabling seamless peer-to-peer and managed vehicle rentals—empowering commuters with flexible rides while allowing vehicle owners to monetize idle assets.
          </p>
        </div>

        <div className="relative">
          <ImagePlaceholder type="scooter" title="Shivpuri Mobility Ecosystem" aspectRatio="aspect-[4/3]" />
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface mb-2">Why Ride It</h2>
          <p className="font-body text-base text-on-surface-variant">Our core values for building a trusted mobility platform in Shivpuri.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface p-6 rounded-xl border border-outline-variant/40 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">location_city</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Local-First Approach</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              We design every pickup point, pricing tier, and vehicle recommendation around Shivpuri's geography and daily routines.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-outline-variant/40 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">touch_app</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Simple Experience</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              No endless paperwork or complex security deposits. Request a ride or list your vehicle in just a few taps.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-xl border border-outline-variant/40 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">groups</span>
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface">Community-Driven</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              We build strong relationships with verified local vehicle owners and early adopters to maintain standard quality.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options (Clean Marked Placeholders) */}
      <section className="bg-surface-low rounded-2xl border border-outline-variant/40 p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Get In Touch</span>
          <h3 className="font-headline font-bold text-2xl text-on-surface">Have questions or feedback?</h3>
          <p className="font-body text-sm text-on-surface-variant max-w-lg mx-auto">
            We are actively gathering input from Shivpuri residents, students, and vehicle owners to refine Ride It before launch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
          <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <div>
              <div className="font-headline font-semibold text-sm text-on-surface">WhatsApp Support</div>
              <div className="font-body text-xs text-on-surface-variant">[Placeholder: +91 98XXX XXXXX]</div>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <div className="font-headline font-semibold text-sm text-on-surface">Official Email</div>
              <div className="font-body text-xs text-on-surface-variant">[Placeholder: hello@rideit-shivpuri.in]</div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button to="/waitlist" variant="primary" size="md">
            Join the Waitlist
          </Button>
          <Button to="/list-your-vehicle" variant="outline" size="md">
            List Your Vehicle
          </Button>
        </div>
      </section>

      {/* Final Waitlist CTA */}
      <CTASection />
    </div>
  );
}
