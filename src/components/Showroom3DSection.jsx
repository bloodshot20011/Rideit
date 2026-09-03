import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Car3DViewer from './Car3DViewer';
import Button from './Button';

export default function Showroom3DSection() {
  const [selectedAngle, setSelectedAngle] = useState('front-left');

  const ANGLE_CARDS = [
    { id: 'front', label: 'Front View', icon: 'directions_car', desc: 'Aggressive mesh grille & matrix LED headlights' },
    { id: 'front-left', label: 'Front-Left (3/4)', icon: 'explore', desc: 'Aerodynamic sport silhouette & side contours' },
    { id: 'side-left', label: 'Side View (Left)', icon: 'sync_alt', desc: 'Extended wheelbase & 18" diamond-cut alloys' },
    { id: 'top', label: 'Top View', icon: 'grid_view', desc: 'Panoramic gloss black roof & aerodynamic roofline' },
    { id: 'rear', label: 'Rear View', icon: 'view_agenda', desc: 'Connected LED lightbar & dual sport exhaust' },
    { id: 'rear-right', label: 'Rear-Right', icon: 'rotate_right', desc: 'Sculpted rear fenders & rear diffuser' },
    { id: 'side-right', label: 'Side View (Right)', icon: 'swap_horiz', desc: 'Balanced road presence & chrome window trim' },
    { id: 'interior', label: 'Interior / Cabin', icon: 'airline_seat_recline_extra', desc: 'Premium 5-seat leather upholstery & infotainment' }
  ];

  return (
    <section className="px-4 sm:px-6 max-w-content mx-auto space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold border border-primary/20 shadow-xs">
          <span className="material-symbols-outlined text-sm font-bold animate-spin" style={{ animationDuration: '6s' }}>
            360
          </span>
          <span className="uppercase tracking-wider">Interactive 3D Fleet Experience</span>
        </div>
        <h2 className="font-headline font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">
          Explore Our Premium Fleet in Realtime 3D
        </h2>
        <p className="font-body text-base text-on-surface-variant leading-relaxed">
          Interact with our planned executive mobility sedan in 360 degrees. Rotate, customize metallic colors, toggle matrix headlights, and inspect every angle.
        </p>
      </div>

      {/* Main 3D Three.js WebGL Interactive Viewer */}
      <Car3DViewer className="shadow-2xl" />

      {/* 8-Angle Studio Turntable Grid (Matching Reference Specification) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">view_in_ar</span>
            Multi-Angle Inspection Studio
          </h3>
          <span className="text-xs text-on-surface-variant font-medium hidden sm:inline">
            360° Studio Photography & 3D WebGL Inspection
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {ANGLE_CARDS.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedAngle(card.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedAngle === card.id
                  ? 'bg-surface-low border-primary shadow-sm'
                  : 'bg-surface border-outline-variant/40 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline font-bold text-sm text-on-surface">
                  {card.label}
                </span>
                <span className={`material-symbols-outlined text-lg ${
                  selectedAngle === card.id ? 'text-primary' : 'text-on-surface-variant/70'
                }`}>
                  {card.icon}
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking CTA Bar */}
      <div className="bg-surface rounded-2xl border border-outline-variant/40 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-headline font-bold text-lg text-on-surface">
            Want to rent this executive sedan in Shivpuri?
          </h4>
          <p className="font-body text-sm text-on-surface-variant">
            Check local availability and reserve your preferred dates during our pre-launch phase.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button to="/request?vehicle=Executive%20Sport%20Sedan&category=cars" variant="primary" size="md" icon="checklist">
            Check Requirements
          </Button>
          <Button to="/vehicles?category=cars" variant="outline" size="md">
            View All Cars
          </Button>
        </div>
      </div>
    </section>
  );
}
