import React from 'react';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';

export default function VehicleCard({ vehicle, onSelect }) {
  const {
    name,
    type,
    pricePerDay = '₹399/day',
    badge,
    status = 'Coming Soon',
    image
  } = vehicle;

  const handleClick = () => {
    if (onSelect) {
      onSelect(vehicle);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="bg-white rounded-xl border border-[#1E1B18]/15 shadow-xs hover:shadow-md hover:border-[#E64A19]/50 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer select-none"
    >
      {/* 1. Vehicle Photo with Hover Zoom Effect */}
      <div className="relative overflow-hidden bg-[#EFECE4] aspect-[16/10]">
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-out">
          <ImagePlaceholder
            src={image}
            alt={name}
            type={type}
            title={name}
            aspectRatio="aspect-[16/10]"
          />
        </div>

        {/* Status Stamp */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold backdrop-blur-md shadow-2xs border ${
              status === 'Available'
                ? 'bg-emerald-600/90 text-white border-emerald-400'
                : 'bg-white/95 text-[#E64A19] border-[#E64A19]/30'
            }`}
          >
            {status === 'Available' ? '✓ Available' : 'Coming Soon'}
          </span>
        </div>

        {/* Price Tag Pill */}
        <div className="absolute top-2.5 right-2.5 bg-[#F5F2EB]/95 text-[#1E1B18] font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-[#E64A19]/30 shadow-2xs">
          <span className="text-[#E64A19]">{pricePerDay}</span>
        </div>

        {/* Badge Tag (if present) */}
        {badge && (
          <div className="absolute bottom-2.5 left-2.5 bg-[#0B132B]/80 backdrop-blur-md text-[#C89D3C] font-mono text-[9px] font-semibold px-2 py-0.5 rounded border border-[#C89D3C]/30">
            {badge}
          </div>
        )}
      </div>

      {/* 2. Minimal Clean Card Body (No Clutter) */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-3 bg-white text-[#1E1B18]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B18] group-hover:text-[#E64A19] transition-colors tracking-tight">
              {name}
            </h3>
            <span className="font-mono text-[10px] font-semibold text-[#45413B] bg-[#EFECE4] px-2 py-0.5 rounded uppercase shrink-0">
              {type}
            </span>
          </div>
        </div>

        {/* 3. Bottom Action Bar: Hover Affordance */}
        <div className="pt-2 border-t border-[#1E1B18]/10 flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] text-[#E64A19] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>View Full Details</span>
            <span>→</span>
          </span>

          <span className="font-mono text-[10px] text-[#7C776E] uppercase bg-[#F5F2EB] px-2 py-0.5 rounded">
            Self-Drive
          </span>
        </div>
      </div>
    </motion.div>
  );
}
