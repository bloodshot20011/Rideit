import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import FormField from '../components/FormField';
import SelectableOption from '../components/SelectableOption';
import Button from '../components/Button';
import SuccessState from '../components/SuccessState';

export default function ListVehiclePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Form State
  const [vehicleType, setVehicleType] = useState('bike');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2022');
  const [fuelType, setFuelType] = useState('Petrol');
  const [condition, setCondition] = useState('Excellent');
  const [locality, setLocality] = useState('');
  const [preferredPickup, setPreferredPickup] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  
  // Mock image upload state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const processFiles = (files) => {
    const newFiles = Array.from(files).map((f) => ({
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
      preview: URL.createObjectURL(f)
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!brand.trim()) newErrors.brand = 'Brand / Make is required';
    if (!model.trim()) newErrors.model = 'Model name is required';
    if (!locality.trim()) newErrors.locality = 'Locality in Shivpuri is required';
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
          title="Thanks for registering."
          message="We've received your vehicle details. We'll contact you when Ride It moves closer to launch in Shivpuri."
          primaryActionTo="/"
          primaryActionText="Return to Home"
          secondaryActionTo="/how-it-works"
          secondaryActionText="See Owner Process"
        />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-2xl mx-auto space-y-8">
      <SectionHeading
        pillTag="Vehicle Owner Registration"
        pillIcon="key"
        title="List Your Vehicle in Shivpuri"
        subtitle="Earn revenue when your bike or car is not in use. Register your vehicle details for our upcoming launch."
      />

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-outline-variant/40 p-6 sm:p-8 shadow-sm space-y-6">
        {/* 1. Vehicle Type */}
        <div className="space-y-3">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            1. Select Vehicle Category <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <SelectableOption
              icon="two_wheeler"
              title="Bike / Scooter"
              subtitle="2-Wheeler listing"
              selected={vehicleType === 'bike'}
              onClick={() => setVehicleType('bike')}
            />
            <SelectableOption
              icon="directions_car"
              title="Car"
              subtitle="4-Wheeler listing"
              selected={vehicleType === 'car'}
              onClick={() => setVehicleType('car')}
            />
          </div>
        </div>

        {/* 2. Vehicle Info */}
        <div className="space-y-4 pt-2">
          <h4 className="font-headline font-semibold text-sm text-on-surface uppercase tracking-wider">
            Vehicle Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Brand / Make"
              id="brand"
              placeholder={vehicleType === 'bike' ? 'e.g. Honda, Hero, TVS' : 'e.g. Maruti, Tata, Hyundai'}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              error={errors.brand}
            />

            <FormField
              label="Model Name & Variant"
              id="model"
              placeholder={vehicleType === 'bike' ? 'e.g. Activa 6G, Splendor+' : 'e.g. Swift VXi, Punch Adventure'}
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              error={errors.model}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Manufacturing Year"
              id="year"
              type="select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              options={['2024', '2023', '2022', '2021', '2020', '2019', '2018 or earlier']}
            />

            <FormField
              label="Fuel Type"
              id="fuel"
              type="select"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              options={['Petrol', 'EV / Electric', 'Diesel', 'CNG']}
            />

            <FormField
              label="Overall Condition"
              id="condition"
              type="select"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              options={['Excellent', 'Good', 'Fair']}
            />
          </div>
        </div>

        {/* 3. Location in Shivpuri */}
        <div className="space-y-4 pt-2 border-t border-outline-variant/30">
          <h4 className="font-headline font-semibold text-sm text-on-surface uppercase tracking-wider">
            Location & Availability
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Area / Locality in Shivpuri"
              id="locality"
              placeholder="e.g. Physical Road, Madhav Chowk"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              required
              error={errors.locality}
            />

            <FormField
              label="Preferred Pickup Spot"
              id="preferred-pickup"
              placeholder="e.g. Near residence / main street"
              value={preferredPickup}
              onChange={(e) => setPreferredPickup(e.target.value)}
            />
          </div>
        </div>

        {/* 4. Enhanced Photo Upload UI with Drag & Drop */}
        <div className="space-y-3 border-t border-outline-variant/30 pt-4">
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            Vehicle Photos (Interactive Prototype Upload)
          </label>
          
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            animate={{ scale: isDragging ? 1.02 : 1 }}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-outline-variant/60 hover:border-primary/50 bg-surface-low/50'
            }`}
          >
            <span className="material-symbols-outlined text-3xl text-primary mb-2">add_a_photo</span>
            <p className="font-headline font-semibold text-sm text-on-surface">
              Drag & drop photos or click to select
            </p>
            <p className="font-body text-xs text-on-surface-variant mt-1">
              Supports exterior & interior photos.
            </p>
            
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="vehicle-photos-input"
            />
            <label
              htmlFor="vehicle-photos-input"
              className="inline-block mt-3 px-4 py-1.5 bg-surface text-primary border border-outline-variant/40 rounded-lg text-xs font-semibold hover:bg-surface-low cursor-pointer shadow-xs"
            >
              Select Files
            </label>
          </motion.div>

          <AnimatePresence>
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 pt-2"
              >
                <p className="text-xs font-semibold text-on-surface-variant">Uploaded Photos ({uploadedFiles.length}):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {uploadedFiles.map((file, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-3 bg-surface p-2.5 rounded-lg border border-outline-variant/30 text-xs shadow-xs"
                    >
                      {file.preview ? (
                        <img src={file.preview} alt="preview" className="w-10 h-10 object-cover rounded-md border border-outline-variant/30" />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-surface-low flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-lg">image</span>
                        </div>
                      )}
                      <div className="flex-grow min-w-0">
                        <p className="truncate font-medium text-on-surface">{file.name}</p>
                        <p className="text-[10px] text-on-surface-variant">{file.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-500 hover:text-red-700 p-1 text-xs font-bold shrink-0 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. Owner Contact Information */}
        <div className="border-t border-outline-variant/30 pt-6 space-y-4">
          <h4 className="font-headline font-semibold text-sm text-on-surface uppercase tracking-wider">
            Owner Contact Information
          </h4>

          <FormField
            label="Full Name"
            id="owner-name"
            placeholder="e.g. Vikrant Singh"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            error={errors.fullName}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="WhatsApp Mobile Number"
              id="owner-whatsapp"
              type="tel"
              placeholder="e.g. 9876543210"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              error={errors.whatsapp}
              helperText="For direct verification updates."
            />
            <FormField
              label="Email Address"
              id="owner-email"
              type="email"
              placeholder="owner@example.com"
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
            icon={loading ? 'sync' : 'app_registration'}
          >
            {loading ? 'Registering...' : 'Register My Vehicle'}
          </Button>
        </div>

        <p className="text-xs text-center text-on-surface-variant/80">
          🛡️ Your vehicle details are kept private and verified before any potential rental match.
        </p>
      </form>
    </div>
  );
}
