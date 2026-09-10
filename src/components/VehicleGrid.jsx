import React, { useState } from 'react';
import VehicleCard from './VehicleCard';
import VehicleDetailModal from './VehicleDetailModal';

export default function VehicleGrid({ vehicles = [], loading = false }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="bg-white rounded-xl border border-[#1E1B18]/10 h-80 animate-pulse p-4 flex flex-col justify-between">
            <div className="bg-[#EFECE4] rounded-lg h-40 w-full mb-4" />
            <div className="space-y-2">
              <div className="bg-[#EFECE4] h-5 w-3/4 rounded" />
              <div className="bg-[#EFECE4] h-4 w-1/2 rounded" />
            </div>
            <div className="bg-[#EFECE4] h-9 w-full rounded-lg mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#1E1B18]/15 p-12 text-center max-w-md mx-auto my-8 space-y-2">
        <span className="material-symbols-outlined text-4xl text-[#7C776E] mb-2">no_sim</span>
        <h3 className="font-display font-bold text-lg text-[#1E1B18]">No vehicles match this filter</h3>
        <p className="font-body text-xs sm:text-sm text-[#45413B]">Try selecting a different category or vehicle type above.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onSelect={(v) => setSelectedVehicle(v)}
          />
        ))}
      </div>

      {/* Interactive Vehicle Detail Modal */}
      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </>
  );
}
