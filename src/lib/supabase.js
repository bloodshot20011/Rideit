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
