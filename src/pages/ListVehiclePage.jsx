import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import Button from '../components/Button';
import SuccessState from '../components/SuccessState';
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
    }, 600);
  };

  if (submitted) {
    const whatsappMsg = encodeURIComponent(
      `Hi ApniRide! I registered my ${vehicleCategory} (${modelName}) to list as a vehicle host in Shivpuri.`
    );
    const whatsappLink = `https://wa.me/918370092226?text=${whatsappMsg}`;

    return (
      <div className="py-12 px-4 sm:px-6 max-w-content mx-auto">
        <SuccessState
          title="Vehicle Registration Received."
          message="Thanks for registering your vehicle with ApniRide. Our Shivpuri team will inspect details and contact you on WhatsApp."
          primaryActionTo="/"
          primaryActionText="Back to Home"
          secondaryActionTo="/vehicles"
          secondaryActionText="Explore Fleet"
        />

        <div className="text-center mt-6">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-headline font-semibold text-sm shadow-md hover:bg-[#20ba59] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Contact Owner Support on WhatsApp (+91 8370092226)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-2xl mx-auto space-y-8">
      <SectionHeading
        pillTag="Host Your Vehicle"
        pillIcon="key"
        title="Earn Money from Your Idle Vehicle"
        subtitle="List your bike, scooter, or car on ApniRide in Shivpuri. Turn your vehicle into a safe earning asset."
      />

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-sm space-y-6">
        {/* 1. Vehicle Category */}
        <div className="space-y-3">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            1. Select Vehicle Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectableOption
              icon="two_wheeler"
              title="Bike / Scooter"
              subtitle="2-wheeler listing"
              selected={vehicleCategory === 'bike'}
              onClick={() => setVehicleCategory('bike')}
            />
            <SelectableOption
              icon="directions_car"
              title="Car / SUV"
              subtitle="4-wheeler listing"
              selected={vehicleCategory === 'car'}
              onClick={() => setVehicleCategory('car')}
            />
          </div>
        </div>

        {/* 2. Vehicle Model & Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Vehicle Model Name"
            id="model-name"
            placeholder="e.g. Honda Activa 6G / Maruti Swift"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
            error={errors.modelName}
          />

          <FormField
            label="Registration Year"
            id="year"
            type="select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            options={['2024', '2023', '2022', '2021', '2020', '2019', 'Older']}
          />
        </div>

        {/* 3. Location in Shivpuri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Vehicle Location in Shivpuri"
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

        {/* 4. Photo Uploader UI */}
        <div className="space-y-3">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Upload Vehicle Photos (Optional)
          </label>
          <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-6 text-center hover:border-primary/50 transition-colors bg-surface-low/50">
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-primary">add_a_photo</span>
              <span className="font-headline font-semibold text-sm text-on-surface">Click to upload photos</span>
              <span className="text-xs text-on-surface-variant">Upload up to 4 photos of your bike or car</span>
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-4 gap-3 pt-2">
              {photos.map((url, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden border border-outline-variant/40 aspect-square group">
                  <img src={url} alt={`Vehicle photo ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. Owner Contact Details */}
        <div className="border-t border-outline-variant/30 pt-6 space-y-4">
          <h4 className="font-headline font-semibold text-sm text-on-surface uppercase tracking-wider">
            Owner Contact Information
          </h4>

          <FormField
            label="Full Name"
            id="full-name"
            placeholder="e.g. Suresh Kumar"
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
              helperText="We will contact you via WhatsApp (+91 8370092226)."
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
            label="Additional Notes / Vehicle Condition (Optional)"
            id="notes"
            type="textarea"
            placeholder="Mention insurance status, mileage, or special conditions..."
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
            icon={loading ? 'sync' : 'key'}
          >
            {loading ? 'Submitting Vehicle...' : 'Register Your Vehicle'}
          </Button>
        </div>

        <p className="text-xs text-center text-on-surface-variant/80">
          🔒 Zero setup fee. ApniRide verifies all renters and provides rental agreements.
        </p>
      </form>
    </div>
  );
}
