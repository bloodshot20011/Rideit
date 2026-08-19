import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import CategorySelector from '../components/CategorySelector';
import VehicleGrid from '../components/VehicleGrid';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import { VEHICLES_DATA, BIKE_SUBCATEGORIES, CAR_SUBCATEGORIES } from '../data/vehicles';

export default function VehiclesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');

  const filteredVehicles = VEHICLES_DATA.filter((v) => {
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
      {/* Page Hero */}
      <section className="text-center pt-4">
        <ScrollReveal>
          <SectionHeading
            pillTag="Pre-Launch Catalog"
            pillIcon="two_wheeler"
            title="Explore Our Planned Mobility Fleet"
            subtitle="Discover scooters, commuter bikes, cruiser motorcycles, and cars being onboarded for Shivpuri, Madhya Pradesh."
          />
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

      {/* Vehicle Grid */}
      <VehicleGrid vehicles={filteredVehicles} />

      {/* Request Custom Vehicle Banner */}
      <ScrollReveal>
        <section className="bg-surface rounded-2xl border border-outline-variant/40 p-8 text-center max-w-3xl mx-auto shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">commute</span>
          </div>
          <h3 className="font-headline font-bold text-xl sm:text-2xl text-on-surface">
            Don't see the specific bike or car model you need?
          </h3>
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            Tell us what vehicle model, budget, or dates you require in Shivpuri. Your request helps us prioritize what we add to our fleet.
          </p>
          <div className="pt-2">
            <Button to="/request" variant="primary" size="md" icon="edit">
              Request a Specific Vehicle
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* Final Waitlist CTA */}
      <ScrollReveal>
        <CTASection
          title="Be first to ride when we launch in Shivpuri"
          description="Join the Ride It waitlist to get early notification as soon as matching bikes or cars become available."
          primaryCtaText="Join the Waitlist"
          primaryCtaTo="/waitlist"
          secondaryCtaText="Request a Ride"
          secondaryCtaTo="/request"
        />
      </ScrollReveal>
    </div>
  );
}
