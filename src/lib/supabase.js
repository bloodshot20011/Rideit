import { createClient } from '@supabase/supabase-js';

// Read from env vars or localStorage fallback
export function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('apniride_supabase_url') || '' : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('apniride_supabase_anon_key') || '' : '';

  const url = envUrl || localUrl;
  const key = envKey || localKey;

  return {
    url,
    key,
    isFromEnv: Boolean(envUrl && envKey),
    isConfigured: Boolean(url && key)
  };
}

let activeClient = null;

export function getSupabaseClient() {
  const { url, key, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) return null;
  if (!activeClient) {
    try {
      activeClient = createClient(url, key);
    } catch (e) {
      console.warn('[Supabase] Failed to init client:', e);
      return null;
    }
  }
  return activeClient;
}

export const isSupabaseConfigured = Boolean(getSupabaseCredentials().isConfigured);
export const supabase = getSupabaseClient();

/**
 * Test Supabase Connection & Table Existence
 */
export async function testSupabaseConnection(testUrl, testKey) {
  try {
    const client = createClient(testUrl, testKey);
    const { data, error } = await client.from('vehicles').select('id').limit(1);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, count: data ? data.length : 0 };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to reach Supabase' };
  }
}

/**
 * Save credentials locally in browser
 */
export function saveSupabaseCredentials(url, key) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('apniride_supabase_url', url.trim());
    localStorage.setItem('apniride_supabase_anon_key', key.trim());
    activeClient = createClient(url.trim(), key.trim());
  }
}

/**
 * Clear credentials
 */
export function clearSupabaseCredentials() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('apniride_supabase_url');
    localStorage.removeItem('apniride_supabase_anon_key');
    activeClient = null;
  }
}

/**
 * Bulk Upsert All Vehicles to Supabase
 */
export async function pushAllVehiclesToSupabase(vehiclesList) {
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase client not configured' };
  try {
    const { data, error } = await client.from('vehicles').upsert(vehiclesList, { onConflict: 'id' });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Sync helper for Vehicle Catalog
 */
export async function syncVehiclesFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('vehicles').select('*').order('created_at', { ascending: false });
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
 * Upsert a single vehicle to Supabase
 */
export async function upsertVehicleToSupabase(vehicle) {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('vehicles').upsert([vehicle], { onConflict: 'id' });
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
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `vehicle-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await client.storage
      .from('vehicle-images')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.warn('[Supabase Storage] Upload error:', uploadError.message);
      return null;
    }

    const { data: publicUrlData } = client.storage
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
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('requirements').insert([requirement]);
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
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('host_vehicles').insert([hostVehicle]);
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
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client.from('waitlist').insert([waitlistEntry]);
    if (error) console.warn('[Supabase] Failed to save waitlist entry:', error.message);
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving waitlist:', err);
    return null;
  }
}
