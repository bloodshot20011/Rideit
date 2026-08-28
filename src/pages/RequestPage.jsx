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
  const prefilledCategory = searchParams.get('category') || 'bikes';
  const prefilledPurpose = searchParams.get('purpose') || 'Daily Commute';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State for User Requirements
  const [purpose, setPurpose] = useState(prefilledPurpose);
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

  // Dynamic recommendation based on requirement choices
  const getRecommendation = () => {
    if (vehicleCategory === 'bike') {
      if (purpose === 'Daily Commute' || purpose === 'Quick Errand') {
        return {
          title: 'Honda Activa 6G / TVS Jupiter 125',
          tag: 'Recommended for City Commutes',
          reason: 'Automatic transmission, high mileage, and effortless parking across Shivpuri.'
        };
      } else if (purpose === 'Outstation Tour' || purpose === 'Weekend Trip') {
        return {
          title: 'Royal Enfield Classic 350 / Yamaha MT-15',
          tag: 'Recommended for Long Rides',
          reason: 'High comfort, superior highway stability, and cruising power.'
        };
      }
      return {
        title: 'Hero Splendor Plus / Honda Activa 6G',
        tag: 'Versatile 2-Wheeler Match',
        reason: 'Maximum fuel efficiency and reliable performance.'
      };
    } else if (vehicleCategory === 'car') {
      if (purpose === 'Weekend Trip' || purpose === 'Outstation Tour') {
        return {
          title: 'Hyundai Creta / Tata Punch',
          tag: 'Recommended for Group & Highway Travel',
          reason: 'Spacious seating, high ground clearance, and luggage space.'
        };
      }
      return {
        title: 'Maruti Suzuki Swift / Honda City',
        tag: 'Recommended for City Comfort',
        reason: 'Easy handling, smooth automatic/manual options, and executive comfort.'
      };
    }
    return {
      title: 'Custom Vehicle Recommendation',
      tag: 'Tailored Match',
      reason: 'Our Shivpuri team will recommend the optimal vehicle upon review.'
    };
  };

  const recommendation = getRecommendation();

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

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const getSubtypeOptions = () => {
    if (vehicleCategory === 'bike') {
      return [
        { value: 'scooter', label: 'Scooter (e.g. Activa 6G, TVS Jupiter)' },
        { value: 'commuter', label: 'Commuter Bike (e.g. Hero Splendor+)' },
        { value: 'premium', label: 'Cruiser / Premium (e.g. Royal Enfield Classic 350)' },
        { value: 'street', label: 'Street Bike (e.g. Yamaha MT-15)' },
        { value: 'any_bike', label: 'Any available bike / scooter' }
      ];
    } else if (vehicleCategory === 'car') {
      return [
        { value: 'hatchback', label: 'Hatchback (e.g. Maruti Suzuki Swift)' },
        { value: 'compact_suv', label: 'Compact SUV (e.g. Tata Punch)' },
        { value: 'sedan', label: 'Sedan (e.g. Honda City)' },
        { value: 'suv', label: 'Mid-size SUV (e.g. Hyundai Creta)' },
        { value: 'any_car', label: 'Any available car' }
      ];
    }
    return [
      { value: 'open', label: 'Open to recommendation based on trip requirements' }
    ];
  };

  if (submitted) {
    const whatsappMsg = encodeURIComponent(
      `Hi ApniRide! I registered my travel requirements for ${recommendation.title} in Shivpuri (Dates: ${pickupDate} to ${returnDate}).`
    );
    const whatsappLink = `https://wa.me/919876543210?text=${whatsappMsg}`;

    return (
      <div className="py-12 px-4 sm:px-6 max-w-content mx-auto">
        <SuccessState
          title="Requirements Registered."
          message="Thanks for sharing your travel requirements with ApniRide. Our Shivpuri team will match your request and contact you on WhatsApp."
          primaryActionTo="/"
          primaryActionText="Back to Home"
          secondaryActionTo="/vehicles"
          secondaryActionText="Explore Vehicles"
        />

        <div className="text-center mt-6">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-headline font-semibold text-sm shadow-md hover:bg-[#20ba59] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Connect Directly on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-2xl mx-auto space-y-8">
      <SectionHeading
        pillTag="User Requirement Checker"
        pillIcon="checklist"
        title="Check Your Vehicle Requirements"
        subtitle="Tell us your travel plan and preferences. ApniRide checks local availability in Shivpuri to provide the ideal vehicle match."
      />

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-sm space-y-6">
        {/* 1. Travel Purpose */}
        <div className="space-y-3">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            1. What is the main purpose of your trip? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'Daily Commute', label: 'Daily Commute', icon: 'directions_bus' },
              { id: 'Weekend Trip', label: 'Weekend Trip', icon: 'landscape' },
              { id: 'Outstation Tour', label: 'Outstation Tour', icon: 'map' },
              { id: 'Quick Errand', label: 'Quick Errand', icon: 'shopping_bag' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPurpose(item.id)}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  purpose === item.id
                    ? 'bg-surface-low border-primary text-primary shadow-xs'
                    : 'bg-surface border-outline-variant/40 text-on-surface-variant hover:border-outline'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Vehicle Selection */}
        <div className="space-y-3 pt-2">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            2. Preferred Vehicle Category <span className="text-red-500">*</span>
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
              title="Car / SUV"
              subtitle="4-wheeler travel"
              selected={vehicleCategory === 'car'}
              onClick={() => {
                setVehicleCategory('car');
                setSubType('hatchback');
              }}
            />
            <SelectableOption
              icon="help_outline"
              title="Open / Advice"
              subtitle="Need recommendation"
              selected={vehicleCategory === 'notsure'}
              onClick={() => {
                setVehicleCategory('notsure');
                setSubType('open');
              }}
            />
          </div>
        </div>

        {/* 3. Live Recommendation Match Box */}
        <div className="bg-primary/5 rounded-xl border border-primary/20 p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>{recommendation.tag}</span>
          </div>
          <p className="font-headline font-bold text-base text-on-surface">
            {recommendation.title}
          </p>
          <p className="font-body text-xs text-on-surface-variant">
            {recommendation.reason}
          </p>
        </div>

        {/* 4. Subtype Dropdown */}
        <FormField
          label="Specific Vehicle Style / Model"
          id="vehicle-subtype"
          type="select"
          value={subType}
          onChange={(e) => setSubType(e.target.value)}
          options={getSubtypeOptions()}
          helperText="Select your preferred model or style."
        />

        {/* 5. Dates Selection */}
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

        {/* 6. Location in Shivpuri */}
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

        {/* 7. Customer Contact Info */}
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
              helperText="We'll send matched vehicle details to your WhatsApp."
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
            label="Additional Notes / Budget Preferences (Optional)"
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
            icon={loading ? 'sync' : 'checklist'}
          >
            {loading ? 'Checking Availability...' : 'Submit Requirements'}
          </Button>
        </div>

        <p className="text-xs text-center text-on-surface-variant/80">
          🔒 Zero spam policy. ApniRide only contacts you regarding your Shivpuri rental request.
        </p>
      </form>
    </div>
  );
}
