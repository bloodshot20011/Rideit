import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleCard from './VehicleCard';

export default function VehicleGrid({ vehicles = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="bg-surface rounded-xl border border-outline-variant/30 h-80 animate-pulse p-4 flex flex-col justify-between">
            <div className="bg-surface-low rounded-lg h-40 w-full mb-4" />
            <div className="space-y-2">
              <div className="bg-surface-low h-5 w-3/4 rounded" />
              <div className="bg-surface-low h-4 w-1/2 rounded" />
            </div>
            <div className="bg-surface-low h-9 w-full rounded-lg mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-xl border border-outline-variant/30 p-12 text-center max-w-md mx-auto my-8 space-y-2"
      >
        <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">no_sim</span>
        <h3 className="font-headline font-semibold text-lg text-on-surface">No vehicles match this filter</h3>
        <p className="font-body text-sm text-on-surface-variant">Try selecting a different category or vehicle type above.</p>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      <AnimatePresence mode="popLayout">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
