import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import Button from '../components/Button';
import SuccessState from '../components/SuccessState';

export default function RequestPage() {
  const [searchParams] = useSearchParams();
  const prefilledVehicle = searchParams.get('vehicle') || '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [vehicleCategory, setVehicleCategory] = useState('bike'); // 'bike' | 'car' | 'notsure'
  const [subType, setSubType] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [location, setLocation] = useState('Madhav Chowk');
  const [specificLocation, setSpecificLocation] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(prefilledVehicle ? `Interested in: ${prefilledVehicle}` : '');

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
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^[0-9+\-\s]{10,15}$/.test(whatsapp.trim())) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }
    if (!pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!returnDate) newErrors.returnDate = 'Return date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate validation & brief loading
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const getSubtypeOptions = () => {
    if (vehicleCategory === 'bike') {
      return [
        { value: 'scooter', label: 'Scooter (e.g. Activa, Jupiter)' },
        { value: 'commuter', label: 'Commuter Bike (e.g. Splendor, Shine)' },
        { value: 'premium', label: 'Cruiser / Premium (e.g. Royal Enfield)' },
        { value: 'street', label: 'Street / Sports (e.g. MT-15, Pulsar)' },
        { value: 'any_bike', label: 'Any available bike' }
      ];
    } else if (vehicleCategory === 'car') {
      return [
        { value: 'hatchback', label: 'Hatchback (e.g. Swift, i20)' },
        { value: 'compact_suv', label: 'Compact SUV (e.g. Punch, Brezza)' },
        { value: 'sedan', label: 'Sedan (e.g. City, Verna)' },
        { value: 'suv', label: 'Full SUV (e.g. Creta, Thar)' },
        { value: 'any_car', label: 'Any available car' }
      ];
    }
    return [
      { value: 'open', label: 'Open to recommendation based on availability' }
    ];
  };

  if (submitted) {
    return (
      <div className="py-12 px-4 sm:px-6 max-w-content mx-auto">
        <SuccessState
          title="You're on the list."
          message="Thanks for helping us build Ride It. We'll get in touch when a matching rental becomes available in Shivpuri."
          primaryActionTo="/"
          primaryActionText="Back to Home"
          secondaryActionTo="/vehicles"
          secondaryActionText="Explore Vehicles"
        />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-2xl mx-auto space-y-8">
      <SectionHeading
        pillTag="Demand Request"
        pillIcon="edit_note"
        title="Request a Ride"
        subtitle="Tell us what vehicle you need and when. We'll match you with available options in Shivpuri."
      />

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Prefilled indicator if coming from vehicle card */}
        {prefilledVehicle && (
          <div className="p-3 bg-surface-low rounded-xl border border-primary/30 flex items-center gap-2 text-xs text-primary font-medium">
            <span className="material-symbols-outlined text-sm">info</span>
            Requesting interest for: <strong>{prefilledVehicle}</strong>
          </div>
        )}

        {/* 1. Vehicle Selection */}
        <div className="space-y-3">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            1. What kind of vehicle do you need? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SelectableOption
              icon="two_wheeler"
              title="Bike / Scooter"
              subtitle="Quick 2-wheeler"
              selected={vehicleCategory === 'bike'}
              onClick={() => {
                setVehicleCategory('bike');
                setSubType('scooter');
              }}
            />
            <SelectableOption
              icon="directions_car"
              title="Car"
              subtitle="4-wheeler travel"
              selected={vehicleCategory === 'car'}
              onClick={() => {
                setVehicleCategory('car');
                setSubType('hatchback');
              }}
            />
            <SelectableOption
              icon="help_outline"
              title="Not Sure"
              subtitle="Open options"
              selected={vehicleCategory === 'notsure'}
              onClick={() => {
                setVehicleCategory('notsure');
                setSubType('open');
              }}
            />
          </div>
        </div>

        {/* 2. Vehicle Subtype */}
        <FormField
          label="Vehicle Type / Preference"
          id="vehicle-subtype"
          type="select"
          value={subType}
          onChange={(e) => setSubType(e.target.value)}
          options={getSubtypeOptions()}
          helperText="Select your preferred style or body type."
        />

        {/* 3. Dates Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Pickup Date"
            id="pickup-date"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
            error={errors.pickupDate}
          />
          <FormField
            label="Return Date"
            id="return-date"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
            error={errors.returnDate}
          />
        </div>

        {/* 4. Location in Shivpuri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Preferred Location in Shivpuri"
            id="location"
            type="select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={[
              'Madhav Chowk',
              'Jhansi Road',
              'AB Road',
              'Physical Road',
              'Collectorate Area',
              'Shivpuri Bus Stand Area',
              'Other Locality'
            ]}
          />
          {location === 'Other Locality' && (
            <FormField
              label="Specify Locality"
              id="specific-location"
              placeholder="e.g. Circular Road, Shivpuri"
              value={specificLocation}
              onChange={(e) => setSpecificLocation(e.target.value)}
            />
          )}
        </div>

        {/* 5. Customer Contact Info */}
        <div className="border-t border-outline-variant/30 pt-6 space-y-4">
          <h4 className="font-headline font-semibold text-sm text-on-surface uppercase tracking-wider">
            Your Contact Information
          </h4>

          <FormField
            label="Full Name"
            id="full-name"
            placeholder="e.g. Rahul Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            error={errors.fullName}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="WhatsApp Number"
              id="whatsapp"
              type="tel"
              placeholder="e.g. 9876543210"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              error={errors.whatsapp}
              helperText="We'll contact you on WhatsApp when a matching ride is ready."
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

          <FormField
            label="Additional Notes (Optional)"
            id="notes"
            type="textarea"
            placeholder="Any specific requests, time preferences, or budget range..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            icon={loading ? 'sync' : 'send'}
          >
            {loading ? 'Submitting Request...' : 'Request a Ride'}
          </Button>
        </div>

        <p className="text-xs text-center text-on-surface-variant/80">
          🔒 Zero spam policy. We only contact you regarding your Shivpuri rental request.
        </p>
      </form>
    </div>
  );
}
