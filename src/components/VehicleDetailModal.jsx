import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder';

export default function VehicleDetailModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  const getWhatsAppBookingLink = () => {
    const text = `Hi ApniRide team! I am interested in renting the *${vehicle.name}* (${vehicle.pricePerDay}) in Shivpuri. Please share availability & booking details.`;
    return `https://wa.me/918370092226?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs select-none">
        {/* Modal Backdrop Click to Close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 bg-[#F5F2EB] text-[#1E1B18] rounded-2xl border border-[#1E1B18]/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden p-5 sm:p-8 space-y-6"
        >
          {/* Top Bar: Brand Stamp & Close Button */}
          <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[#E64A19] text-white px-2.5 py-0.5 rounded shadow-2xs">
                [SHIVPURI FLEET SPECIFICATION]
              </span>
              <span className="font-mono text-xs text-[#7C776E] hidden sm:inline">
                • 2026 EDITION
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#7C776E] hover:text-[#1E1B18] hover:bg-[#EFECE4] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Vehicle High-Res Image Header */}
          <div className="relative rounded-xl overflow-hidden border border-[#1E1B18]/15 bg-[#EFECE4]">
            <ImagePlaceholder
              src={vehicle.image}
              alt={vehicle.name}
              type={vehicle.type}
              title={vehicle.name}
              aspectRatio="aspect-[16/10]"
            />

            {/* Availability Status Tag */}
            <div className="absolute top-3 left-3">
              <span
                className={`px-3 py-1 rounded-full font-mono text-xs font-semibold backdrop-blur-md border shadow-xs ${
                  vehicle.status === 'Available'
                    ? 'bg-emerald-600/90 text-white border-emerald-400'
                    : 'bg-white/95 text-[#E64A19] border-[#E64A19]/30'
                }`}
              >
                {vehicle.status === 'Available' ? '✓ Available Now' : '⌛ Planned Fleet Model'}
              </span>
            </div>

            {/* Price Tag Pill */}
            <div className="absolute top-3 right-3 bg-[#1E1B18]/90 text-[#F5F2EB] font-mono text-xs sm:text-sm font-bold px-3 py-1 rounded-full border border-[#C89D3C]/40 shadow-xs">
              {vehicle.pricePerDay}
            </div>
          </div>

          {/* Vehicle Title & Overview */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#E64A19] font-semibold">
                  {vehicle.subcategory || vehicle.category}
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] uppercase tracking-tight">
                  {vehicle.name}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-lg sm:text-2xl font-bold text-[#E64A19]">
                  {vehicle.pricePerDay}
                </div>
                <div className="font-mono text-[10px] text-[#7C776E] uppercase">Self-Drive Daily Rate</div>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed">
              {vehicle.tagline ||
                'Verified, well-maintained self-drive rental vehicle ready for daily commutes, college runs, or outstation tours in Shivpuri.'}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#1E1B18]/15 shadow-2xs font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-[#7C776E] uppercase font-semibold">Fuel System</span>
              <div className="font-bold text-[#1E1B18] flex items-center gap-1">
                <span>⛽ {vehicle.fuel || 'Petrol'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#7C776E] uppercase font-semibold">Gearbox</span>
              <div className="font-bold text-[#1E1B18] flex items-center gap-1">
                <span>🔄 {vehicle.transmission || 'Automatic'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#7C776E] uppercase font-semibold">Seating</span>
              <div className="font-bold text-[#1E1B18] flex items-center gap-1">
                <span>👥 {vehicle.capacity || '2 Seats'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#7C776E] uppercase font-semibold">Hub Location</span>
              <div className="font-bold text-[#1E1B18] truncate" title={vehicle.location || 'Shivpuri'}>
                <span>📍 {vehicle.location ? vehicle.location.split(',')[0] : 'Shivpuri'}</span>
              </div>
            </div>
          </div>

          {/* Rental Assurances Box */}
          <div className="bg-[#EFECE4] p-4 rounded-xl border border-[#1E1B18]/10 space-y-2.5 font-body text-xs text-[#45413B]">
            <h4 className="font-mono text-[11px] font-bold text-[#1E1B18] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#E64A19]">verified</span>
              ApniRide Rental Guarantee
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Zero security deposit hassle</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Verified documents & safety</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>1-Tap Instant Key Handover</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: 1-Tap WhatsApp Booking & Survey Link */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={getWhatsAppBookingLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-xs font-semibold py-3.5 px-5 rounded-xl shadow-xs hover:shadow-md transition-all uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              <span>BOOK / INQUIRE ON WHATSAPP</span>
            </a>

            <Link
              to="/request"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 bg-white text-[#1E1B18] border border-[#1E1B18]/25 hover:bg-[#EFECE4] font-mono text-xs font-semibold py-3.5 px-5 rounded-xl transition-colors uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-sm text-[#E64A19]">checklist</span>
              <span>CUSTOM REQUIREMENT</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
