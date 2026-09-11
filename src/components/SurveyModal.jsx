import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurvey } from '../context/SurveyContext';
import { adminStore } from '../data/adminStore';

const VEHICLE_OPTIONS = [
  { id: 'scooter', label: 'Scooter / Scooty', sub: 'Activa 6G, Jupiter 125, Ntorq', icon: 'moped', cat: 'bike' },
  { id: 'commuter_bike', label: 'Commuter Bike', sub: 'Hero Splendor+, HF Deluxe, Shine', icon: 'two_wheeler', cat: 'bike' },
  { id: 'cruiser_bike', label: 'Cruiser / Royal Enfield', sub: 'Classic 350, Hunter, Meteor', icon: 'motorcycle', cat: 'bike' },
  { id: 'hatchback_car', label: 'Hatchback Car', sub: 'Maruti Swift, WagonR, Tiago', icon: 'directions_car', cat: 'car' },
  { id: 'suv_car', label: 'Compact SUV', sub: 'Tata Punch, Brezza, Creta', icon: 'directions_car_filled', cat: 'car' },
  { id: 'other', label: 'Other Custom Model', sub: 'Tell us in details below', icon: 'more_horiz', cat: 'other' }
];

const PURPOSE_OPTIONS = [
  { id: 'Daily Commute', label: 'Daily Commute / City Run', icon: 'commute' },
  { id: 'Weekend Trip', label: 'Weekend Trip / Tourism', icon: 'landscape' },
  { id: 'Wedding / Event', label: 'Wedding / Family Function', icon: 'celebration' },
  { id: 'Business Trip', label: 'Business / Official Visit', icon: 'work' },
  { id: 'Trial & Testing', label: 'Testing Before Buying', icon: 'speed' }
];

const SHIVPURI_LOCATIONS = [
  'Madhav Chowk (Main Circle)',
  'Jhansi Road (Near Bus Stand)',
  'AB Road / Bypass',
  'Circular Road',
  'Fatehpur / ITI Area',
  'Madhav National Park Gate',
  'Doorstep Delivery (Home / Hotel)'
];

export default function SurveyModal() {
  const { isOpen, closeSurvey, initialData } = useSurvey();

  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState('scooter');
  const [customVehicleName, setCustomVehicleName] = useState('');
  const [purpose, setPurpose] = useState('Daily Commute');
  const [rentalDuration, setRentalDuration] = useState('1-3 Days');
  const [pickupDate, setPickupDate] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('Madhav Chowk (Main Circle)');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initialData if provided when opening modal
  useEffect(() => {
    if (isOpen) {
      if (initialData?.vehicle) {
        setCustomVehicleName(initialData.vehicle);
        const lower = initialData.vehicle.toLowerCase();
        if (lower.includes('swift') || lower.includes('wagon') || lower.includes('car')) {
          setSelectedVehicle('hatchback_car');
        } else if (lower.includes('creta') || lower.includes('punch') || lower.includes('suv')) {
          setSelectedVehicle('suv_car');
        } else if (lower.includes('bullet') || lower.includes('classic') || lower.includes('enfield')) {
          setSelectedVehicle('cruiser_bike');
        } else if (lower.includes('splendor') || lower.includes('shine')) {
          setSelectedVehicle('commuter_bike');
        } else {
          setSelectedVehicle('scooter');
        }
      } else if (initialData?.category === 'cars') {
        setSelectedVehicle('hatchback_car');
      } else if (initialData?.category === 'bikes') {
        setSelectedVehicle('scooter');
      }
      setStep(1);
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isOpen, initialData]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeSurvey();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSurvey]);

  if (!isOpen) return null;

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }
    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'Please enter your WhatsApp number';
    } else if (!/^[0-9+\-\s]{10,15}$/.test(whatsapp.trim())) {
      newErrors.whatsapp = 'Please enter a valid 10-digit number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const vehicleObj = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle);
    const category = vehicleObj?.cat || 'bike';
    const chosenModel = customVehicleName.trim()
      ? `${vehicleObj?.label || 'Custom'} (${customVehicleName.trim()})`
      : vehicleObj?.label || selectedVehicle;

    try {
      await adminStore.addRequirement({
        fullName: fullName.trim(),
        whatsapp: whatsapp.trim(),
        email: '',
        purpose: `${purpose} (${rentalDuration})`,
        vehicleCategory: category,
        subType: chosenModel,
        pickupDate: pickupDate || 'Flexible',
        returnDate: '',
        location: preferredLocation,
        notes: notes.trim()
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Survey submission error:', err);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste ApniRide! I just filled the quick survey on your website.\n*Name:* ${fullName.trim()}\n*Vehicle Needed:* ${customVehicleName || selectedVehicle}\n*Purpose:* ${purpose}\n*Location:* ${preferredLocation}`
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSurvey}
          className="fixed inset-0 bg-[#1E1B18]/70 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 bg-[#FDFCFA] w-full max-w-xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#1E1B18]/15 flex flex-col overflow-hidden text-[#1E1B18]"
        >
          {/* Header */}
          <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-[#1E1B18]/10 bg-[#F5F2EB]/80 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E64A19] animate-pulse" />
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#E64A19] uppercase">
                  Shivpuri Pilot Fleet
                </span>
              </div>
              <h3 className="font-display font-black text-lg sm:text-xl text-[#1E1B18] tracking-tight mt-0.5">
                {isSubmitted ? 'Survey Received!' : 'Quick Vehicle Survey'}
              </h3>
              {!isSubmitted && (
                <p className="font-mono text-[11px] sm:text-xs text-[#7C776E] mt-0.5">
                  Help us prioritize the exact self-drive vehicles you want in Shivpuri.
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeSurvey}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#7C776E] hover:text-[#1E1B18] transition-colors cursor-pointer"
              aria-label="Close survey"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Step Progress Bar (Hidden if Submitted) */}
          {!isSubmitted && (
            <div className="px-5 sm:px-7 pt-3 pb-1 bg-[#FAF8F5] border-b border-[#1E1B18]/5 flex items-center justify-between">
              <div className="flex items-center gap-2 w-full">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex-1 flex items-center gap-1.5">
                    <div
                      className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                        step >= num ? 'bg-[#E64A19]' : 'bg-[#1E1B18]/15'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <span className="font-mono text-[10px] font-bold text-[#7C776E] ml-4 shrink-0">
                STEP {step}/3
              </span>
            </div>
          )}

          {/* Modal Body */}
          <div className="px-5 sm:px-7 py-5 overflow-y-auto flex-grow">
            {isSubmitted ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 flex items-center justify-center mx-auto shadow-sm">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-[#1E1B18]">
                    Dhanyawad, {fullName || 'Friend'}!
                  </h4>
                  <p className="font-mono text-xs sm:text-sm text-[#5C5852] max-w-md mx-auto">
                    Your preferences have been logged directly into our Shivpuri fleet dispatch roster.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#1E1B18]/10 text-left max-w-md mx-auto space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7C776E] font-mono">Vehicle requested:</span>
                    <span className="font-bold text-[#1E1B18] capitalize">
                      {customVehicleName || selectedVehicle.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7C776E] font-mono">WhatsApp:</span>
                    <span className="font-bold text-[#1E1B18] font-mono">{whatsapp}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7C776E] font-mono">Location:</span>
                    <span className="font-bold text-[#1E1B18]">{preferredLocation}</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/918370092226?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono text-xs font-bold px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Chat Directly on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={closeSurvey}
                    className="w-full sm:w-auto px-5 py-3 border border-[#1E1B18]/20 hover:bg-[#1E1B18]/5 font-mono text-xs font-bold rounded-xl text-[#1E1B18] transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Steps */
              <div>
                {/* STEP 1: Vehicle Choice */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-display font-bold text-sm text-[#1E1B18]">
                        1. Which vehicle do you need most in Shivpuri?
                      </label>
                      <p className="font-mono text-[11px] text-[#7C776E] mt-0.5">
                        Select your preferred class or suggest a specific model.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {VEHICLE_OPTIONS.map((opt) => {
                        const isSel = selectedVehicle === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedVehicle(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer relative ${
                              isSel
                                ? 'bg-[#E64A19]/5 border-[#E64A19] ring-2 ring-[#E64A19]/20 shadow-xs'
                                : 'bg-white border-[#1E1B18]/15 hover:border-[#1E1B18]/30'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                isSel ? 'bg-[#E64A19] text-white' : 'bg-[#EFECE4] text-[#45413B]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-lg">{opt.icon}</span>
                            </div>
                            <div className="min-w-0 pr-4">
                              <div className="font-display font-bold text-xs sm:text-sm text-[#1E1B18] leading-tight">
                                {opt.label}
                              </div>
                              <div className="font-mono text-[10px] text-[#7C776E] mt-0.5 truncate">
                                {opt.sub}
                              </div>
                            </div>
                            <div className="absolute top-2.5 right-2.5">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSel ? 'border-[#E64A19] bg-[#E64A19] text-white' : 'border-[#1E1B18]/30 bg-white'
                                }`}
                              >
                                {isSel && (
                                  <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Specific Model Name / Note */}
                    <div className="pt-2">
                      <label className="block font-mono text-xs font-semibold text-[#1E1B18] mb-1">
                        Specific model preference (Optional):
                      </label>
                      <input
                        type="text"
                        value={customVehicleName}
                        onChange={(e) => setCustomVehicleName(e.target.value)}
                        placeholder="e.g. Activa 6G White, Thar 4x4, Royal Enfield Hunter 350"
                        className="w-full bg-white border border-[#1E1B18]/20 rounded-xl px-3.5 py-2.5 font-sans text-xs sm:text-sm text-[#1E1B18] focus:border-[#E64A19] focus:ring-2 focus:ring-[#E64A19]/20 outline-none transition-all placeholder:text-[#9E9B94]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Purpose & Duration */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-display font-bold text-sm text-[#1E1B18]">
                        2. Rental Purpose & Duration
                      </label>
                      <p className="font-mono text-[11px] text-[#7C776E] mt-0.5">
                        Tell us how you intend to use the vehicle.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs font-semibold text-[#1E1B18]">
                        Primary Purpose:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PURPOSE_OPTIONS.map((p) => {
                          const isSel = purpose === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setPurpose(p.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                                isSel
                                  ? 'bg-[#E64A19]/5 border-[#E64A19] ring-1 ring-[#E64A19]'
                                  : 'bg-white border-[#1E1B18]/15 hover:border-[#1E1B18]/30'
                              }`}
                            >
                              <span
                                className={`material-symbols-outlined text-base ${
                                  isSel ? 'text-[#E64A19]' : 'text-[#7C776E]'
                                }`}
                              >
                                {p.icon}
                              </span>
                              <span className="font-display font-medium text-xs text-[#1E1B18]">
                                {p.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block font-mono text-xs font-semibold text-[#1E1B18] mb-1">
                          Estimated Duration:
                        </label>
                        <select
                          value={rentalDuration}
                          onChange={(e) => setRentalDuration(e.target.value)}
                          className="w-full bg-white border border-[#1E1B18]/20 rounded-xl px-3 py-2 font-mono text-xs text-[#1E1B18] focus:border-[#E64A19] outline-none cursor-pointer"
                        >
                          <option value="Few Hours (Half Day)">Few Hours (Half Day)</option>
                          <option value="1 Day (24 Hours)">1 Day (24 Hours)</option>
                          <option value="2-3 Days (Weekend)">2-3 Days (Weekend)</option>
                          <option value="1 Week (7 Days)">1 Week (7 Days)</option>
                          <option value="Monthly Long-Term">Monthly Long-Term</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-[#1E1B18] mb-1">
                          Approx Date / Timing:
                        </label>
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full bg-white border border-[#1E1B18]/20 rounded-xl px-3 py-2 font-mono text-xs text-[#1E1B18] focus:border-[#E64A19] outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact Details */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block font-display font-bold text-sm text-[#1E1B18]">
                        3. Contact Details
                      </label>
                      <p className="font-mono text-[11px] text-[#7C776E] mt-0.5">
                        We will notify you the moment this vehicle class is available for pickup.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block font-mono text-xs font-semibold text-[#1E1B18] mb-1">
                          Full Name <span className="text-[#E64A19]">*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: null });
                          }}
                          placeholder="Enter your full name"
                          className={`w-full bg-white border rounded-xl px-3.5 py-2.5 font-sans text-xs sm:text-sm text-[#1E1B18] outline-none transition-all ${
                            errors.fullName ? 'border-red-500 ring-2 ring-red-500/20' : 'border-[#1E1B18]/20 focus:border-[#E64A19]'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="font-mono text-[10px] text-red-600 mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-[#1E1B18] mb-1">
                          WhatsApp Mobile Number <span className="text-[#E64A19]">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-[#7C776E] font-bold">
                            +91
                          </span>
                          <input
                            type="tel"
                            value={whatsapp}
                            onChange={(e) => {
                              setWhatsapp(e.target.value);
                              if (errors.whatsapp) setErrors({ ...errors, whatsapp: null });
                            }}
                            placeholder="98765 43210"
                            className={`w-full bg-white border rounded-xl pl-12 pr-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#1E1B18] outline-none transition-all ${
                              errors.whatsapp ? 'border-red-500 ring-2 ring-red-500/20' : 'border-[#1E1B18]/20 focus:border-[#E64A19]'
                            }`}
                          />
                        </div>
                        {errors.whatsapp && (
                          <p className="font-mono text-[10px] text-red-600 mt-1">{errors.whatsapp}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-[#1E1B18] mb-1">
                          Preferred Pickup Area in Shivpuri:
                        </label>
                        <select
                          value={preferredLocation}
                          onChange={(e) => setPreferredLocation(e.target.value)}
                          className="w-full bg-white border border-[#1E1B18]/20 rounded-xl px-3 py-2.5 font-sans text-xs sm:text-sm text-[#1E1B18] focus:border-[#E64A19] outline-none cursor-pointer"
                        >
                          {SHIVPURI_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-[#1E1B18] mb-1">
                          Special Note / Query (Optional):
                        </label>
                        <input
                          type="text"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Need helmet included, or need it early morning at 7 AM"
                          className="w-full bg-white border border-[#1E1B18]/20 rounded-xl px-3.5 py-2 font-sans text-xs text-[#1E1B18] focus:border-[#E64A19] outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Footer Navigation Buttons */}
          {!isSubmitted && (
            <div className="px-5 sm:px-7 py-3.5 bg-[#F5F2EB]/80 border-t border-[#1E1B18]/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-[#45413B] hover:text-[#1E1B18] font-mono text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>←</span>
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <span>Next Step</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 bg-[#E64A19] hover:bg-[#D84315] disabled:opacity-50 text-white font-mono text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Survey</span>
                      <span>✓</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
