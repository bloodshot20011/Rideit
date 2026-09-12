import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder';
import { useSurvey } from '../context/SurveyContext';

export default function VehicleDetailModal({ vehicle, onClose }) {
  const { openSurvey } = useSurvey();
  if (!vehicle) return null;


  const getWhatsAppBookingLink = () => {
    const text = `Hi ApniRide team! I am interested in renting the *${vehicle.name}* (${vehicle.pricePerDay}) in Shivpuri. Please share availability & booking details.`;
    return `https://wa.me/9183892226?text=${encodeURIComponent(text)}`;
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
          className="relative z-10 bg-[#F5F2EB] text-[#1E1B18] rounded-2xl border border-[#1E1B18]/20 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto overflow-x-hidden p-5 sm:p-7 space-y-5"
        >
          {/* Top Bar: Brand Stamp & Close Button */}
          <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-3">
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
              className="p-1 rounded-full text-[#7C776E] hover:text-[#1E1B18] hover:bg-[#EFECE4] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* 50% Reduced Compact Vehicle Image Header */}
          <div className="relative rounded-xl overflow-hidden border border-[#1E1B18]/15 bg-[#EFECE4] max-w-xs mx-auto w-full aspect-[16/10] shadow-xs">
            <ImagePlaceholder
              src={vehicle.image}
              alt={vehicle.name}
              type={vehicle.type}
              title={vehicle.name}
              aspectRatio="aspect-[16/10]"
            />

            {/* Availability Status Tag */}
            <div className="absolute top-2 left-2">
              <span
                className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold backdrop-blur-md border shadow-xs ${
                  vehicle.status === 'Available'
                    ? 'bg-emerald-600/90 text-white border-emerald-400'
                    : 'bg-white/95 text-[#E64A19] border-[#E64A19]/30'
                }`}
              >
                {vehicle.status === 'Available' ? '✓ Available Now' : '⌛ Planned Fleet Model'}
              </span>
            </div>

            {/* Price Tag Pill */}
            <div className="absolute top-2 right-2 bg-[#1E1B18]/90 text-[#F5F2EB] font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#C89D3C]/40 shadow-xs">
              {vehicle.pricePerDay}
            </div>
          </div>

          {/* Vehicle Title & Pricing */}
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#E64A19] font-semibold">
                  {vehicle.subcategory || vehicle.category}
                </span>
                <h2 className="font-display font-bold text-2xl text-[#1E1B18] uppercase tracking-tight">
                  {vehicle.name}
                </h2>
              </div>
              <div className="sm:text-right">
                <div className="font-mono text-xl font-bold text-[#E64A19]">
                  {vehicle.pricePerDay}
                </div>
                <div className="font-mono text-[10px] text-[#7C776E] uppercase">Self-Drive Daily Rate</div>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed pt-1">
              {vehicle.tagline ||
                'Verified, well-maintained self-drive rental vehicle ready for daily commutes, college runs, or outstation tours in Shivpuri.'}
            </p>

            <div className="flex items-center gap-1.5 font-mono text-xs text-[#7C776E] pt-1 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-sm text-[#E64A19]">location_on</span>
              <span>Pickup Hub: <strong>{vehicle.location ? vehicle.location.split(',')[0] : 'Shivpuri Center'}</strong></span>
            </div>
          </div>

          {/* Rental Assurances Box */}
          <div className="bg-[#EFECE4] p-3.5 rounded-xl border border-[#1E1B18]/10 space-y-2 font-body text-xs text-[#45413B]">
            <h4 className="font-mono text-[11px] font-bold text-[#1E1B18] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#E64A19]">verified</span>
              ApniRide Rental Guarantee
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px]">
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Zero deposit hassle</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Verified safety check</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>1-Tap Instant Handover</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: 1-Tap WhatsApp Booking & Survey Link */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <a
              href={getWhatsAppBookingLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-xs font-semibold py-3 px-4 rounded-xl shadow-xs hover:shadow-md transition-all uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>BOOK / INQUIRE ON WHATSAPP</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                openSurvey({ vehicle: vehicle.name, category: vehicle.category });
              }}
              className="inline-flex items-center justify-center gap-1 bg-white text-[#1E1B18] border border-[#1E1B18]/25 hover:bg-[#EFECE4] font-mono text-xs font-semibold py-3 px-4 rounded-xl transition-colors uppercase tracking-wider cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm text-[#E64A19]">assignment</span>
              <span>CUSTOM NEED</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
