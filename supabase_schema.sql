-- ==============================================================================
-- APNIRIDE SHIVPURI — SUPABASE SQL SCHEMA & STORAGE BUCKET
-- Run this in your Supabase Project -> SQL Editor -> Click 'Run'
-- ==============================================================================

-- 1. VEHICLE FLEET & PRICING CATALOG (Stores Image URL in "image" column)
CREATE TABLE IF NOT EXISTS public.vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'bikes',
  subcategory TEXT,
  type TEXT,
  "pricePerDay" TEXT NOT NULL DEFAULT '₹399/day',
  fuel TEXT DEFAULT 'Petrol',
  transmission TEXT DEFAULT 'Automatic',
  capacity TEXT DEFAULT '2 Passengers',
  badge TEXT,
  status TEXT DEFAULT 'Coming Soon',
  location TEXT DEFAULT 'Madhav Chowk, Shivpuri',
  tagline TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. REQUIREMENT SURVEY RESPONSES
CREATE TABLE IF NOT EXISTS public.requirements (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  purpose TEXT NOT NULL,
  "vehicleCategory" TEXT NOT NULL,
  "subType" TEXT,
  "pickupDate" TEXT,
  "returnDate" TEXT,
  location TEXT,
  notes TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HOST VEHICLE REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.host_vehicles (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  "vehicleCategory" TEXT NOT NULL,
  "modelName" TEXT NOT NULL,
  year TEXT,
  location TEXT,
  photos JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRE-LAUNCH WAITLIST MEMBERS
CREATE TABLE IF NOT EXISTS public.waitlist (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  interest TEXT DEFAULT 'both',
  timing TEXT,
  "preferenceText" TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Allow Anonymous Inserts for Validation
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on vehicles" ON public.vehicles FOR ALL USING (true);

CREATE POLICY "Allow public read on requirements" ON public.requirements FOR SELECT USING (true);
CREATE POLICY "Allow public insert on requirements" ON public.requirements FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update/delete on requirements" ON public.requirements FOR ALL USING (true);

CREATE POLICY "Allow public read on host_vehicles" ON public.host_vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public insert on host_vehicles" ON public.host_vehicles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update/delete on host_vehicles" ON public.host_vehicles FOR ALL USING (true);

CREATE POLICY "Allow public read on waitlist" ON public.waitlist FOR SELECT USING (true);
CREATE POLICY "Allow public insert on waitlist" ON public.waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update/delete on waitlist" ON public.waitlist FOR ALL USING (true);

-- 5. SUPABASE STORAGE BUCKET FOR VEHICLE PHOTOS
-- Creates a public 'vehicle-images' storage bucket for direct photo uploads from Admin Studio
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public read on vehicle-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicle-images');

CREATE POLICY "Allow public uploads to vehicle-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vehicle-images');

CREATE POLICY "Allow public update/delete on vehicle-images"
ON storage.objects FOR ALL
USING (bucket_id = 'vehicle-images');

-- 6. RELOAD SCHEMA CACHE (Makes tables visible immediately to API)
NOTIFY pgrst, 'reload schema';
