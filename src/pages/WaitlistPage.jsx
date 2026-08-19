import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import Button from '../components/Button';
import SuccessState from '../components/SuccessState';

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [interest, setInterest] = useState('both'); // 'bike' | 'car' | 'both'
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

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="py-12 px-4 sm:px-6 max-w-content mx-auto">
        <SuccessState
          title="You're in."
          message="Thanks for joining the Ride It waitlist. Your response helps us understand what Shivpuri needs."
          primaryActionTo="/"
          primaryActionText="Return to Home"
          secondaryActionTo="/vehicles"
          secondaryActionText="Explore Vehicles"
        />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-xl mx-auto space-y-8">
      <SectionHeading
        pillTag="Early Access Waitlist"
        pillIcon="star"
        title="Get Early Access to Ride It"
        subtitle="Be among the first residents in Shivpuri to get notified when our bike and car rentals go live."
      />

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-sm space-y-6">
        {/* 1. Primary Interest */}
        <div className="space-y-3">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            1. What rentals are you most interested in? <span className="text-red-500">*</span>
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

        {/* 2. Rental Timing */}
        <FormField
          label="2. How often would you likely need a rental?"
          id="timing"
          type="select"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
          options={[
            { value: 'this_week', label: 'Frequently (Weekly / Multiple times a week)' },
            { value: 'this_month', label: 'Occasionally (1-2 times a month)' },
            { value: 'later', label: 'For specific trips or travel' },
            { value: 'exploring', label: 'Just exploring options for now' }
          ]}
        />

        {/* 3. Vehicle Preference text */}
        <FormField
          label="Specific vehicle models you prefer (Optional)"
          id="preference-text"
          placeholder="e.g. Activa, Royal Enfield, Swift, Thar..."
          value={preferenceText}
          onChange={(e) => setPreferenceText(e.target.value)}
        />

        {/* 4. Contact Details */}
        <div className="border-t border-outline-variant/30 pt-6 space-y-4">
          <h4 className="font-headline font-semibold text-sm text-on-surface uppercase tracking-wider">
            Your Contact Information
          </h4>

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
              helperText="We'll send launch updates to your WhatsApp."
            />
            <FormField
              label="Email Address (Optional)"
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            icon={loading ? 'sync' : 'star'}
          >
            {loading ? 'Joining Waitlist...' : 'Join the Waitlist'}
          </Button>
        </div>

        <p className="text-xs text-center text-on-surface-variant/80">
          ✨ Pre-launch access. No obligation or payment required.
        </p>
      </form>
    </div>
  );
}
