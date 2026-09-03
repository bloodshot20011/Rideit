import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import SuccessState from '../components/SuccessState';
import TyreMarksDivider from '../components/TyreMarksDivider';
import { IMAGES } from '../data/images';
import { adminStore } from '../data/adminStore';

export default function ListVehiclePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [vehicleCategory, setVehicleCategory] = useState('bike');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState('2023');
  const [location, setLocation] = useState('Madhav Chowk');
  const [specificLocation, setSpecificLocation] = useState('');
  const [photos, setPhotos] = useState([]);
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Errors state
  const [errors, setErrors] = useState({});

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPhotoUrls = files.map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotoUrls].slice(0, 4));
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!modelName.trim()) newErrors.modelName = 'Vehicle model is required';
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^[0-9+\-\s]{10,15}$/.test(whatsapp.trim())) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    adminStore.addHostVehicle({
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      vehicleCategory,
      modelName: modelName.trim(),
      year,
      location: location === 'Other Locality' ? specificLocation || 'Other' : location,
      photos,
      notes: notes.trim()
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="py-16 px-4 max-w-lg mx-auto text-center">
        <SuccessState
          title="Vehicle Registered Successfully"
          message={`Thank you, ${fullName}! Your ${modelName} has been submitted for review. Our Shivpuri host onboarding team will contact you on WhatsApp (${whatsapp}) to complete verification and set your rental rates.`}
          actionText="Back to Home"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 max-w-content mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#C89D3C]/40 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
          SHIVPURI HOST PARTNER PROGRAM
        </div>
        <h1 className="font-display font-light text-3xl sm:text-5xl text-[#1E1B18] tracking-tight uppercase leading-tight">
          List Your Vehicle & <span className="text-[#E64A19] font-normal">Earn Monthly</span>
        </h1>
        <p className="font-body text-sm sm:text-base text-[#45413B] leading-relaxed">
          Have an idle scooter, bike, or car in Shivpuri? Earn ₹15,000+ per month safely through ApniRide.
        </p>
      </div>

      {/* 2-Column Neo-Mirai Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Earning Estimate & Host Security */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-xl border border-[#1E1B18]/15 overflow-hidden shadow-sm">
            <img
              src={IMAGES.ownerBanner}
              alt="Earn With Your Vehicle in Shivpuri"
              className="w-full h-52 object-cover object-center"
            />
            <div className="p-6 space-y-5">
              <div className="bg-[#0B132B] text-white p-4 rounded-lg border border-[#C89D3C]/30 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] text-[#C89D3C] uppercase tracking-wider">ESTIMATED EARNINGS</div>
                  <div className="font-display font-bold text-2xl text-white">₹15,000 - ₹35,000<span className="text-xs font-normal text-white/70">/mo</span></div>
                </div>
                <span className="material-symbols-outlined text-[#E64A19] text-3xl">payments</span>
              </div>

              <div className="space-y-3 font-body text-xs sm:text-sm text-[#45413B]">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-base text-[#E64A19] shrink-0 mt-0.5">verified</span>
                  <div>
                    <strong className="text-[#1E1B18] block font-display">Full Renter Verification</strong>
                    Every renter is verified via Aadhaar & Driving License before keys are handed over.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-base text-[#E64A19] shrink-0 mt-0.5">description</span>
                  <div>
                    <strong className="text-[#1E1B18] block font-display">Standard Rental Agreement</strong>
                    ApniRide handles all legal documentation, security deposits, and handover checks.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-base text-[#E64A19] shrink-0 mt-0.5">account_balance_wallet</span>
                  <div>
                    <strong className="text-[#1E1B18] block font-display">Guaranteed Timely Payouts</strong>
                    Direct bank transfer or UPI payout at the end of every rental cycle.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Host Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#1E1B18]/15 p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <span className="font-mono text-xs font-semibold text-[#E64A19] uppercase tracking-wider block">
              [VEHICLE & OWNER REGISTRATION]
            </span>

            {/* Vehicle Category */}
            <div className="space-y-2">
              <label className="block font-mono text-xs font-semibold uppercase text-[#1E1B18] tracking-wider">
                1. Vehicle Category <span className="text-[#E64A19]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <SelectableOption
                  icon="two_wheeler"
                  title="Bike / Scooter"
                  selected={vehicleCategory === 'bike'}
                  onClick={() => setVehicleCategory('bike')}
                />
                <SelectableOption
                  icon="directions_car"
                  title="Car / SUV"
                  selected={vehicleCategory === 'car'}
                  onClick={() => setVehicleCategory('car')}
                />
              </div>
            </div>

            {/* Model & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Vehicle Model Name"
                required
                placeholder="e.g. Honda Activa 6G / Maruti Swift"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                error={errors.modelName}
              />
              <FormField
                label="Manufacturing Year"
                type="select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                options={['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018']}
              />
            </div>

            {/* Locality */}
            <div className="space-y-3">
              <FormField
                label="Your Shivpuri Locality"
                type="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={[
                  'Madhav Chowk',
                  'Court Road / Collectorate',
                  'Circular Road',
                  'Physical Road',
                  'Jhansi Road',
                  'AB Road bypass',
                  'Other Locality'
                ]}
              />

              {location === 'Other Locality' && (
                <FormField
                  label="Specify Your Exact Area"
                  placeholder="e.g. Near Shivpuri Bus Stand"
                  value={specificLocation}
                  onChange={(e) => setSpecificLocation(e.target.value)}
                />
              )}
            </div>

            {/* Photo Upload Dropzone */}
            <div className="space-y-2">
              <label className="block font-mono text-xs font-semibold uppercase text-[#1E1B18] tracking-wider">
                Upload Vehicle Photos (Optional, Up to 4)
              </label>
              <div className="border-2 border-dashed border-[#1E1B18]/20 rounded-xl p-5 text-center bg-[#F5F2EB]/50 hover:bg-[#F5F2EB] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="vehicle-photos"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <label htmlFor="vehicle-photos" className="cursor-pointer flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-3xl text-[#E64A19]">add_a_photo</span>
                  <span className="font-mono text-xs font-semibold text-[#1E1B18]">Click to Upload Images</span>
                  <span className="font-body text-[11px] text-[#7C776E]">PNG, JPG up to 5MB each</span>
                </label>
              </div>

              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {photos.map((src, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#1E1B18]/20 group">
                      <img src={src} alt="Uploaded vehicle preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Owner Contact */}
            <div className="border-t border-[#1E1B18]/10 pt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Owner Full Name"
                  required
                  placeholder="e.g. Amit Verma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={errors.fullName}
                />
                <FormField
                  label="WhatsApp Number"
                  required
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  error={errors.whatsapp}
                />
              </div>

              <FormField
                label="Email Address (Optional)"
                type="email"
                placeholder="e.g. amit@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormField
                label="Special Features or Availability Notes (Optional)"
                type="textarea"
                rows={2}
                placeholder="e.g. Available on weekdays / New tyres installed"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E64A19] hover:bg-[#D84315] disabled:opacity-60 text-white font-mono text-xs font-semibold py-4 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>{loading ? 'REGISTERING VEHICLE...' : 'REGISTER YOUR VEHICLE'}</span>
                <span>→</span>
              </button>
              <p className="font-body text-xs text-[#7C776E] text-center mt-3">
                🔒 Zero setup fee. ApniRide verifies all renters and provides legal rental agreements.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="subtle" />
    </div>
  );
}
