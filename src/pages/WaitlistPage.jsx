import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import SuccessState from '../components/SuccessState';
import TyreMarksDivider from '../components/TyreMarksDivider';
import { adminStore } from '../data/adminStore';

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [interest, setInterest] = useState('both');
  const [timing, setTiming] = useState('this_month');
  const [preferenceText, setPreferenceText] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // Errors state
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
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

    adminStore.addWaitlist({
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      interest,
      timing,
      preferenceText: preferenceText.trim()
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
          title="You're on the list."
          message={`Thank you, ${fullName}! You have successfully reserved early access for ApniRide in Shivpuri. We will notify you on WhatsApp (${whatsapp}) with your 20% launch discount code.`}
          actionText="Explore Planned Vehicles"
          actionTo="/vehicles"
        />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#C89D3C]/40 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
          PRIORITY ACCESS PASS
        </div>
        <h1 className="font-display font-light text-3xl sm:text-5xl text-[#1E1B18] tracking-tight uppercase leading-tight">
          Join the <span className="text-[#E64A19] font-normal">Waitlist</span>
        </h1>
        <p className="font-body text-sm sm:text-base text-[#45413B] leading-relaxed">
          Be among the first residents in Shivpuri to get early booking access and 20% launch discount.
        </p>
      </div>

      {/* Ticket Pass Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#1E1B18]/15 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E1B18]/10">
          <span className="font-mono text-xs font-semibold text-[#E64A19] uppercase tracking-wider">
            [RESERVE EARLY ACCESS]
          </span>
          <span className="font-mono text-[11px] font-bold text-[#C89D3C] bg-[#0B132B] px-2.5 py-1 rounded">
            20% OFF DAY 01
          </span>
        </div>

        {/* 1. Primary Interest */}
        <div className="space-y-3">
          <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1B18]">
            1. What rentals are you most interested in? <span className="text-[#E64A19]">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SelectableOption
              icon="two_wheeler"
              title="Bikes"
              subtitle="Scooters & Bikes"
              selected={interest === 'bike'}
              onClick={() => setInterest('bike')}
            />
            <SelectableOption
              icon="directions_car"
              title="Cars"
              subtitle="Hatchback & SUVs"
              selected={interest === 'car'}
              onClick={() => setInterest('car')}
            />
            <SelectableOption
              icon="swap_horiz"
              title="Both"
              subtitle="Bikes & Cars"
              selected={interest === 'both'}
              onClick={() => setInterest('both')}
            />
          </div>
        </div>

        {/* 2. Rental Frequency */}
        <FormField
          label="2. How often would you likely need a vehicle?"
          id="timing"
          type="select"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
          options={[
            { value: 'this_week', label: 'Frequently (Weekly / Daily commutes)' },
            { value: 'this_month', label: 'Occasionally (1-2 times a month)' },
            { value: 'later', label: 'For outstation trips or specific events' },
            { value: 'exploring', label: 'Just exploring options for now' }
          ]}
        />

        {/* 3. Preferred Models */}
        <FormField
          label="Preferred vehicle models (Optional)"
          id="preference-text"
          placeholder="e.g. Activa 6G, Royal Enfield, Swift, Creta..."
          value={preferenceText}
          onChange={(e) => setPreferenceText(e.target.value)}
        />

        {/* 4. Contact Details */}
        <div className="border-t border-[#1E1B18]/10 pt-6 space-y-4">
          <span className="font-mono text-xs font-semibold text-[#1E1B18] uppercase tracking-wider block">
            Your Contact Information
          </span>

          <FormField
            label="Full Name"
            id="full-name"
            placeholder="e.g. Ankit Gupta"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            error={errors.fullName}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="WhatsApp Mobile Number"
              id="whatsapp"
              type="tel"
              placeholder="e.g. 9876543210"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              error={errors.whatsapp}
              helperText="We will send launch updates and discount pass to your WhatsApp"
            />
            <FormField
              label="Email Address (Optional)"
              id="email"
              type="email"
              placeholder="e.g. ankit@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E64A19] hover:bg-[#D84315] disabled:opacity-60 text-white font-mono text-xs font-semibold py-4 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <span>{loading ? 'RESERVING SPOT...' : 'JOIN THE WAITLIST'}</span>
            <span>→</span>
          </button>
        </div>

        <p className="text-xs text-center text-[#7C776E]">
          ✨ Pre-launch access. No upfront payment required.
        </p>
      </form>

      {/* TYRE MARKS DIVIDER */}
      <TyreMarksDivider variant="subtle" />
    </div>
  );
}
