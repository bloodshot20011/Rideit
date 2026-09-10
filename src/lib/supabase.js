import { createClient } from '@supabase/supabase-js';

// Read environment variables (supports Vite & Vercel deployment)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Initialize Supabase Client (or null if unconfigured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Sync helper for Vehicle Catalog
 */
export async function syncVehiclesFromSupabase() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('[Supabase] Failed to fetch vehicles:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase] Error fetching vehicles:', err);
    return null;
  }
}

/**
 * Upsert a vehicle to Supabase
 */
export async function upsertVehicleToSupabase(vehicle) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('vehicles').upsert([vehicle], { onConflict: 'id' });
    if (error) console.warn('[Supabase] Failed to upsert vehicle:', error.message);
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving vehicle:', err);
    return null;
  }
}

/**
 * Upload Image File directly to Supabase Storage Bucket ('vehicle-images')
 * Returns the public image URL
 */
export async function uploadVehicleImageToSupabase(file) {
  if (!supabase) return null;
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `vehicle-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('vehicle-images')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.warn('[Supabase Storage] Upload error:', uploadError.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('vehicle-images')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.warn('[Supabase Storage] Image upload failed:', err);
    return null;
  }
}

/**
 * Save Requirement Survey submission to Supabase
 */
export async function saveRequirementToSupabase(requirement) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('requirements').insert([requirement]);
    if (error) console.warn('[Supabase] Failed to save requirement:', error.message);
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving requirement:', err);
    return null;
  }
}

/**
 * Save Host Vehicle submission to Supabase
 */
export async function saveHostVehicleToSupabase(hostVehicle) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('host_vehicles').insert([hostVehicle]);
    if (error) console.warn('[Supabase] Failed to save host vehicle:', error.message);
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving host vehicle:', err);
    return null;
  }
}

/**
 * Save Waitlist entry to Supabase
 */
export async function saveWaitlistToSupabase(waitlistEntry) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('waitlist').insert([waitlistEntry]);
    if (error) console.warn('[Supabase] Failed to save waitlist entry:', error.message);
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving waitlist:', err);
    return null;
  }
}
