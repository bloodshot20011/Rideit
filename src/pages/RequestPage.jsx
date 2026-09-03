import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import Button from '../components/Button';
import SuccessState from '../components/SuccessState';
import TyreMarksDivider from '../components/TyreMarksDivider';
import { IMAGES } from '../data/images';
import { adminStore } from '../data/adminStore';

export default function RequestPage() {
  const [searchParams] = useSearchParams();
  const prefilledVehicle = searchParams.get('vehicle') || '';
  const prefilledCategory = searchParams.get('category') || 'bikes';
  const prefilledPurpose = searchParams.get('purpose') || 'Daily Commute';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State for User Requirements
  const [purpose, setPurpose] = useState(prefilledPurpose === 'Quick Errand' ? 'Daily Commute' : prefilledPurpose);
  const [vehicleCategory, setVehicleCategory] = useState(prefilledCategory === 'cars' ? 'car' : 'bike');
  const [subType, setSubType] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [location, setLocation] = useState('Madhav Chowk');
  const [specificLocation, setSpecificLocation] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(prefilledVehicle ? `Preferred model: ${prefilledVehicle}` : '');

  // Errors state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (prefilledVehicle) {
      const lower = prefilledVehicle.toLowerCase();
      if (lower.includes('swift') || lower.includes('punch') || lower.includes('creta') || lower.includes('city') || lower.includes('car')) {
        setVehicleCategory('car');
      } else {
        setVehicleCategory('bike');
      }
    }
  }, [prefilledVehicle]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const newErrors = {};

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

    adminStore.addRequirement({
      fullName: fullName.trim() || 'Website Visitor',
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      purpose,
      vehicleCategory,
      subType,
      pickupDate,
      returnDate,
      location: location === 'Other Locality' ? specificLocation || 'Other' : location,
      notes
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const getSubtypeOptions = () => {
    if (vehicleCategory === 'bike') {
      return [
        { value: 'scooter', label: 'Scooter (e.g. Activa 6G, TVS Jupiter)' },
        { value: 'commuter', label: 'Commuter Bike (e.g. Hero Splendor+)' },
        { value: 'premium', label: 'Cruiser / Premium (e.g. Royal Enfield Classic 350)' },
        { value: 'street', label: 'Street Bike (e.g. Yamaha MT-15)' },
        { value: 'any_bike', label: 'Any available bike or scooter' }
      ];
    }
    return [
      { value: 'hatchback', label: 'Hatchback (e.g. Maruti Suzuki Swift)' },
      { value: 'compact_suv', label: 'Compact SUV (e.g. Tata Punch)' },
      { value: 'sedan', label: 'Sedan (e.g. Honda City)' },
      { value: 'suv', label: 'Mid-size SUV (e.g. Hyundai Creta)' },
      { value: 'any_car', label: 'Any available car or SUV' }
    ];
  };

  if (submitted) {
    const defaultMsg = encodeURIComponent(
      `Hi ApniRide! I submitted my rental requirements for ${fullName} (${purpose} in Shivpuri). Please update me regarding availability.`
    );
    return (
      <div className="py-16 px-4 max-w-lg mx-auto text-center">
        <SuccessState
          title="Requirements Received"
          message={`Thank you, ${fullName}! We have noted your travel requirements. When ApniRide launches in Shivpuri, our local team will contact you directly via WhatsApp (${whatsapp}).`}
          actionText="Back to Home"
          actionTo="/"
        />
        <div className="mt-6">
          <a
            href={`https://wa.me/918370092226?text=${defaultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono text-xs font-semibold px-6 py-3 rounded-full shadow-md transition-all"
          >
            <span>CONFIRM ON WHATSAPP (+91 8370092226)</span>
            <span>→</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 max-w-content mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#C89D3C]/40 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
          SHIVPURI REQUIREMENT SURVEY
        </div>
        <h1 className="font-display font-light text-3xl sm:text-5xl text-[#1E1B18] tracking-tight uppercase leading-tight">
          Check Your <span className="text-[#E64A19] font-normal">Requirements</span>
        </h1>
        <p className="font-body text-sm sm:text-base text-[#45413B] leading-relaxed">
          Tell us your vehicle preference and travel plan in Shivpuri. Submitting takes less than a minute.
        </p>
      </div>

      {/* 2-Column Neo-Mirai Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual Showcase & Local Guarantees */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-xl border border-[#1E1B18]/15 overflow-hidden shadow-sm">
            <img
              src={IMAGES.heroBackground}
              alt="Shivpuri Mobility Network"
              className="w-full h-56 sm:h-64 object-cover object-center"
            />
            <div className="p-6 space-y-4">
              <span className="font-mono text-[10px] font-bold text-[#E64A19] uppercase tracking-wider">
                [WHY SUBMIT YOUR REQUIREMENTS?]
              </span>
              <h3 className="font-display font-bold text-xl text-[#1E1B18]">
                Custom Fleet Tailored to You
              </h3>
              <ul className="space-y-2.5 font-body text-xs sm:text-sm text-[#45413B]">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base text-[#E64A19] shrink-0 mt-0.5">check_circle</span>
                  <span>Priority access and 20% discount on first booking in Shivpuri.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base text-[#E64A19] shrink-0 mt-0.5">check_circle</span>
                  <span>Vehicles allocated from your nearest pickup point (Madhav Chowk, Circular Rd, etc.).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-base text-[#E64A19] shrink-0 mt-0.5">check_circle</span>
                  <span>Verified vehicles with standard sanitization and clean helmets.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Interactive Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#1E1B18]/15 p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Vehicle Category */}
            <div className="space-y-3">
              <label className="block font-mono text-xs font-semibold uppercase text-[#1E1B18] tracking-wider">
                1. Select Vehicle Category <span className="text-[#E64A19]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectableOption
                  icon="two_wheeler"
                  title="Bikes & Scooters"
                  subtitle="From ₹399/day"
                  selected={vehicleCategory === 'bike'}
                  onClick={() => {
                    setVehicleCategory('bike');
                    setSubType('');
                  }}
                />
                <SelectableOption
                  icon="directions_car"
                  title="Cars & SUVs"
                  subtitle="From ₹1,499/day"
                  selected={vehicleCategory === 'car'}
                  onClick={() => {
                    setVehicleCategory('car');
                    setSubType('');
                  }}
                />
              </div>
            </div>

            {/* Step 2: Specific Model Type */}
            <div className="space-y-2">
              <FormField
                label="2. Preferred Vehicle Type (Optional)"
                type="select"
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                placeholder="Choose specific body type..."
                options={getSubtypeOptions()}
              />
            </div>

            {/* Step 3: Travel Purpose */}
            <div className="space-y-3">
              <label className="block font-mono text-xs font-semibold uppercase text-[#1E1B18] tracking-wider">
                3. Primary Travel Purpose <span className="text-[#E64A19]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {['Daily Commute', 'Weekend Trip', 'Outstation Tour'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-headline font-semibold transition-colors cursor-pointer text-center ${
                      purpose === p
                        ? 'bg-[#E64A19] text-white border-[#E64A19] shadow-xs'
                        : 'bg-[#F5F2EB] hover:bg-[#EFECE4] text-[#45413B] border-[#1E1B18]/15'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Estimated Dates & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Pickup Date (Planned)"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
              <FormField
                label="Return Date (Planned)"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <FormField
                label="Preferred Pickup Point in Shivpuri"
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
                  label="Specify Your Locality in Shivpuri"
                  placeholder="e.g. Near Shivpuri Railway Station"
                  value={specificLocation}
                  onChange={(e) => setSpecificLocation(e.target.value)}
                />
              )}
            </div>

            {/* Step 5: Contact Details */}
            <div className="border-t border-[#1E1B18]/10 pt-6 space-y-4">
              <span className="font-mono text-xs font-semibold text-[#E64A19] uppercase tracking-wider">
                [CONTACT INFORMATION FOR LAUNCH NOTIFICATION]
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Full Name"
                  required
                  placeholder="e.g. Rahul Sharma"
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
                  helperText="We will send vehicle match confirmation via WhatsApp"
                />
              </div>

              <FormField
                label="Email Address (Optional)"
                type="email"
                placeholder="e.g. rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormField
                label="Additional Notes or Specific Model Request (Optional)"
                type="textarea"
                rows={2}
                placeholder="e.g. Need vehicle with extra helmet / Looking for automatic car"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E64A19] hover:bg-[#D84315] disabled:opacity-60 text-white font-mono text-xs font-semibold py-4 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>{loading ? 'SUBMITTING REQUIREMENTS...' : 'SUBMIT REQUIREMENTS'}</span>
                <span>→</span>
              </button>
              <p className="font-body text-xs text-[#7C776E] text-center mt-3">
                🔒 Zero spam policy. ApniRide only contacts you regarding your Shivpuri rental request (+91 8370092226).
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
