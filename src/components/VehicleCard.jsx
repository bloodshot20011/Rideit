import React from 'react';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';
import Button from './Button';

export default function VehicleCard({ vehicle }) {
  const {
    name,
    type,
    pricePerDay = '₹399/day',
    fuel,
    transmission,
    capacity,
    badge,
    status = 'Coming Soon',
    location,
    tagline,
    image
  } = vehicle;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-[#1E1B18]/15 shadow-sm hover:shadow-md hover:border-[#E64A19]/50 transition-all duration-300 flex flex-col overflow-hidden group opacity-100 relative"
    >
      {/* Top Ticket Header Graphic */}
      <div className="relative overflow-hidden bg-[#EFECE4]">
        <ImagePlaceholder
          src={image}
          alt={name}
          type={type}
          title={name}
          aspectRatio="aspect-[16/10]"
        />
        
        {/* Status Stamp Seal */}
        <div className="absolute top-3 left-3 bg-[#0B132B]/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-[#F5F2EB] border border-[#C89D3C]/40 flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
          {status}
        </div>

        {/* Prominent Neo-Mirai Ticket Price Tag */}
        <div className="absolute top-3 right-3 bg-[#F5F2EB] text-[#1E1B18] font-mono font-bold text-xs px-3 py-1 rounded-md border-2 border-[#C89D3C] shadow-sm flex items-center gap-1">
          <span className="text-[#E64A19]">{pricePerDay}</span>
        </div>

        {/* Feature / Badge Tag */}
        {badge && (
          <div className="absolute bottom-3 right-3 bg-[#0B132B]/90 backdrop-blur-md text-[#C89D3C] font-mono text-[10px] font-semibold px-2 py-0.5 rounded border border-[#C89D3C]/30">
            [{badge}]
          </div>
        )}
      </div>

      {/* Ticket Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4 bg-white text-[#1E1B18]">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display font-bold text-lg text-[#1E1B18] group-hover:text-[#E64A19] transition-colors tracking-tight">
              {name}
            </h3>
            <span className="font-mono text-[11px] font-semibold text-[#45413B] bg-[#EFECE4] px-2 py-0.5 rounded border border-[#1E1B18]/10 shrink-0 uppercase">
              {type}
            </span>
          </div>

          <p className="font-body text-xs text-[#45413B] line-clamp-2 mb-3 leading-relaxed">
            {tagline}
          </p>

          {/* Neo-Mirai Technical Spec Badges */}
          <div className="flex flex-wrap gap-1.5 text-xs text-[#45413B]">
            <span className="inline-flex items-center gap-1 bg-[#EFECE4] px-2 py-1 rounded font-mono text-[11px] border border-[#1E1B18]/10">
              <span className="material-symbols-outlined text-xs text-[#E64A19]">local_gas_station</span>
              {fuel}
            </span>
            <span className="inline-flex items-center gap-1 bg-[#EFECE4] px-2 py-1 rounded font-mono text-[11px] border border-[#1E1B18]/10">
              <span className="material-symbols-outlined text-xs text-[#E64A19]">settings</span>
              {transmission}
            </span>
            <span className="inline-flex items-center gap-1 bg-[#EFECE4] px-2 py-1 rounded font-mono text-[11px] border border-[#1E1B18]/10">
              <span className="material-symbols-outlined text-xs text-[#E64A19]">group</span>
              {capacity}
            </span>
          </div>
        </div>

        {/* Card Footer & Action */}
        <div className="pt-3 border-t border-[#1E1B18]/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 font-mono text-[11px] text-[#45413B]">
            <span className="material-symbols-outlined text-sm text-[#E64A19]">location_on</span>
            <span className="truncate max-w-[120px]">{location}</span>
          </div>

          <Button
            to={`/request?vehicle=${encodeURIComponent(name)}`}
            variant="outline"
            size="sm"
            icon="checklist"
          >
            Check Requirements
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
