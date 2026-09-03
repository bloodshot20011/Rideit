import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CategorySelector from '../components/CategorySelector';
import VehicleGrid from '../components/VehicleGrid';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import TyreMarksDivider from '../components/TyreMarksDivider';
import { BIKE_SUBCATEGORIES, CAR_SUBCATEGORIES } from '../data/vehicles';
import { adminStore } from '../data/adminStore';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');

  useEffect(() => {
    const syncVehicles = () => {
      setVehicles(adminStore.getVehicles());
    };
    syncVehicles();
    const unsubscribe = adminStore.subscribe(syncVehicles);
    return () => unsubscribe();
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    if (activeCategory !== 'all' && v.category !== activeCategory) return false;
    if (activeSubcategory !== 'all' && v.subcategory !== activeSubcategory) return false;
    return true;
  });

  const currentSubcategories =
    activeCategory === 'bikes'
      ? BIKE_SUBCATEGORIES
      : activeCategory === 'cars'
      ? CAR_SUBCATEGORIES
      : [];

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 max-w-content mx-auto">
      {/* Page Hero - Thin Neo-Mirai Display Header */}
      <section className="text-center pt-6 max-w-3xl mx-auto space-y-4">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md font-mono text-[11px] font-semibold uppercase tracking-wider mb-2 border border-[#C89D3C]/40 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
            SHIVPURI PLANNED FLEET
          </div>

          <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1E1B18] tracking-tight leading-[1.05] uppercase">
            Explore Our Planned <br className="hidden sm:block" />
            <span className="text-[#E64A19] font-normal">Mobility Fleet</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-[#45413B] leading-relaxed max-w-xl mx-auto">
            Discover scooters, commuter bikes, cruiser motorcycles, and cars being onboarded for Shivpuri, Madhya Pradesh.
          </p>
        </ScrollReveal>
      </section>

      {/* Filter Tabs */}
      <ScrollReveal delay={0.1}>
        <CategorySelector
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeSubcategory={activeSubcategory}
          onSubcategoryChange={setActiveSubcategory}
          subcategories={currentSubcategories}
        />
      </ScrollReveal>

      {/* Vehicle Grid (Ticket-styled cards) */}
      <VehicleGrid vehicles={filteredVehicles} />

      {/* TYRE MARKS SPEED DIVIDER */}
      <TyreMarksDivider variant="primary" />

      {/* Final Waitlist CTA */}
      <ScrollReveal>
        <CTASection
          title="Be first to ride when we launch in Shivpuri"
          description="Join the ApniRide waitlist to get priority notification and early booking discounts as soon as rentals go live."
          primaryCtaText="Join the Waitlist"
          primaryCtaTo="/waitlist"
          secondaryCtaText="Check Requirements"
          secondaryCtaTo="/request"
        />
      </ScrollReveal>
    </div>
  );
}
