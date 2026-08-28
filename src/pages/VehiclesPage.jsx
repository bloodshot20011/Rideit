import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
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

      {/* 🛣️ TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="dark" />

      {/* Final Waitlist CTA */}
      <ScrollReveal>
        <CTASection
          title="Be first to ride when we launch in Shivpuri"
          description="Join the ApniRide waitlist to get early notification as soon as matching bikes or cars become available."
          primaryCtaText="Join the Waitlist"
          primaryCtaTo="/waitlist"
          secondaryCtaText=""
          secondaryCtaTo=""
        />
      </ScrollReveal>
    </div>
  );
}
