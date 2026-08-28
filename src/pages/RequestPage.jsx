import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import Button from '../components/Button';
import SuccessState from '../components/SuccessState';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { IMAGES } from '../data/images';
import { adminStore } from '../data/adminStore';

export default function RequestPage() {
  const [searchParams] = useSearchParams();
  const prefilledVehicle = searchParams.get('vehicle') || '';
  const prefilledCategory = searchParams.get('category') || 'bikes';
  const prefilledPurpose = searchParams.get('purpose') || 'Daily Commute';
  const autoSubmitParam = searchParams.get('autoSubmit') === 'true';

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

    if (!fullName.trim() && !autoSubmitParam) newErrors.fullName = 'Full name is required';
    if (!whatsapp.trim() && !autoSubmitParam) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (whatsapp.trim() && !/^[0-9+\-\s]{10,15}$/.test(whatsapp.trim())) {
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
      whatsapp: whatsapp.trim() || 'Not Provided',
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
    }
    return [
      { value: 'hatchback', label: 'Hatchback (e.g. Maruti Suzuki Swift)' },
      { value: 'compact_suv', label: 'Compact SUV (e.g. Tata Punch)' },
      { value: 'sedan', label: 'Sedan (e.g. Honda City)' },
      { value: 'suv', label: 'Mid-size SUV (e.g. Hyundai Creta)' },
      { value: 'any_car', label: 'Any available car' }
    ];
  };

  if (submitted) {
    const categoryName = vehicleCategory === 'car' ? 'Car / SUV' : 'Bike / Scooter';
    const whatsappMsg = encodeURIComponent(
      `Hi ApniRide! I want to submit my travel requirements in Shivpuri:\n- Category: ${categoryName}\n- Trip Purpose: ${purpose}\n- Dates: ${pickupDate || 'Flexible'} to ${returnDate || 'Flexible'}\n- Name: ${fullName || 'Interested Renter'}`
    );
    const whatsappLink = `https://wa.me/918370092226?text=${whatsappMsg}`;

    return (
      <div className="py-12 px-4 sm:px-6 max-w-content mx-auto">
        <SuccessState
          title="Requirements Submitted."
          message="Thanks for sharing your travel requirements with ApniRide. Our Shivpuri team will review your requirements and contact you."
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
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-headline font-semibold text-sm shadow-md hover:bg-[#20ba59] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Send Requirements to WhatsApp (+91 8370092226)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-content mx-auto space-y-10">
      <SectionHeading
        pillTag="User Requirement Checker"
        pillIcon="checklist"
        title="Submit Your Vehicle Requirements"
        subtitle="Tell us your travel plan and vehicle preferences. ApniRide checks local availability in Shivpuri to fulfill your request."
      />

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Showcase & Feature Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Visual Image Card */}
          <div className="relative rounded-2xl overflow-hidden border border-outline-variant/40 shadow-sm group">
            <ImagePlaceholder
              src={IMAGES.shivpuriLandscape}
              alt="Shivpuri Mountain Highway Travel"
              type="map"
              title="Shivpuri Travel Showcase"
              aspectRatio="aspect-[16/10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="bg-primary/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                SHIVPURI NETWORK
              </span>
              <h3 className="font-headline font-bold text-lg text-white">
                Tailored Mobility Solutions
              </h3>
              <p className="text-xs text-white/80">
                Scooters, bikes, and cars onboarded for local commuters & travelers.
              </p>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="bg-surface rounded-2xl border border-outline-variant/40 p-6 shadow-xs space-y-4">
            <h4 className="font-headline font-bold text-base text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
              Why Submit Your Requirements?
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                </div>
                <div>
                  <div className="font-headline font-semibold text-on-surface">Instant Availability Match</div>
                  <div className="font-body text-xs text-on-surface-variant">We match your request with verified vehicles in Shivpuri within minutes.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">sell</span>
                </div>
                <div>
                  <div className="font-headline font-semibold text-on-surface">Zero Hidden Charges</div>
                  <div className="font-body text-xs text-on-surface-variant">Transparent pricing terms agreed upfront before any confirmation.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">chat</span>
                </div>
                <div>
                  <div className="font-headline font-semibold text-on-surface">WhatsApp Updates (+91 8370092226)</div>
                  <div className="font-body text-xs text-on-surface-variant">Get vehicle confirmation directly on your mobile.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-launch Trust Badge */}
          <div className="bg-surface-low rounded-xl border border-primary/20 p-4 text-center space-y-1">
            <span className="material-symbols-outlined text-primary text-2xl">verified</span>
            <div className="font-headline font-bold text-sm text-on-surface">100% Free & Zero Obligation</div>
            <p className="font-body text-xs text-on-surface-variant">
              Submitting requirements during our pre-launch phase is completely free.
            </p>
          </div>
        </div>

        {/* Right Column: Requirements Checker Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-sm space-y-6">
            {/* 1. Travel Purpose */}
            <div className="space-y-3">
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                1. What is the main purpose of your trip? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'Daily Commute', label: 'Daily Commute', icon: 'directions_bus' },
                  { id: 'Weekend Trip', label: 'Weekend Trip', icon: 'landscape' },
                  { id: 'Outstation Tour', label: 'Outstation Tour', icon: 'map' }
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

            {/* 2. Vehicle Selection (2 Clean Options) */}
            <div className="space-y-3 pt-2">
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                2. Select Vehicle Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              </div>
            </div>

            {/* 3. Subtype Dropdown */}
            <FormField
              label="Specific Vehicle Style / Model"
              id="vehicle-subtype"
              type="select"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              options={getSubtypeOptions()}
              helperText="Select your preferred model or style."
            />

            {/* 4. Dates Selection */}
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

            {/* 5. Location in Shivpuri */}
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

            {/* 6. Customer Contact Info */}
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
                  helperText="We'll send availability updates to your WhatsApp."
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
                icon={loading ? 'sync' : 'send'}
              >
                {loading ? 'Submitting...' : 'Submit Requirements'}
              </Button>
            </div>

            <p className="text-xs text-center text-on-surface-variant/80">
              🔒 Zero spam policy. ApniRide only contacts you regarding your Shivpuri rental request (+91 8370092226).
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
