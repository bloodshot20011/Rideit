import React from 'react';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';
import Button from './Button';

export default function VehicleCard({ vehicle }) {
  const {
    name,
    type,
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
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="bg-surface rounded-xl border border-outline-variant/40 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Vehicle Image */}
      <div className="relative overflow-hidden">
        <ImagePlaceholder
          src={image}
          alt={name}
          type={type}
          title={name}
          aspectRatio="aspect-[16/10]"
        />
        
        {/* Status Badge with subtle pulse */}
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-primary border border-outline-variant/40 flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {status}
        </div>

        {/* Feature/Badge Tag */}
        {badge && (
          <div className="absolute bottom-3 right-3 bg-on-surface/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md">
            {badge}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="text-xs font-medium text-on-surface-variant bg-surface-low px-2 py-0.5 rounded border border-outline-variant/30 shrink-0">
              {type}
            </span>
          </div>

          <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-3">
            {tagline}
          </p>

          {/* Specs tags */}
          <div className="flex flex-wrap gap-1.5 text-xs text-on-surface-variant">
            <span className="inline-flex items-center gap-1 bg-surface-low px-2 py-1 rounded-md border border-outline-variant/20">
              <span className="material-symbols-outlined text-xs">local_gas_station</span>
              {fuel}
            </span>
            <span className="inline-flex items-center gap-1 bg-surface-low px-2 py-1 rounded-md border border-outline-variant/20">
              <span className="material-symbols-outlined text-xs">settings</span>
              {transmission}
            </span>
            <span className="inline-flex items-center gap-1 bg-surface-low px-2 py-1 rounded-md border border-outline-variant/20">
              <span className="material-symbols-outlined text-xs">group</span>
              {capacity}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary">location_on</span>
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
