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
      activeClient = createClient(url, key, {
        auth: {
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true
        }
      });
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
    activeClient = createClient(url.trim(), key.trim(), {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
    });
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
 * Google OAuth Sign In for Admin Panel
 */
export async function signInWithGoogle() {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client is not configured.');
  }

  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/admin`
    : 'http://localhost:5173/admin';

  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account'
      }
    }
  });

  if (error) throw error;
  return data;
}

/**
 * Admin Sign Out
 */
export async function signOutAdmin() {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn('[Supabase Auth] Error signing out:', e);
    }
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem('apniride_admin_session_time');
    localStorage.removeItem('apniride_admin_auth');
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
  if (!client || !requirement) return null;
  try {
    const payload = {
      id: requirement.id || `req-${Date.now()}`,
      fullName: requirement.fullName || requirement.name || '',
      whatsapp: requirement.whatsapp || requirement.phone || '',
      email: requirement.email || '',
      purpose: requirement.purpose || '',
      vehicleCategory: requirement.vehicleCategory || requirement.category || 'bike',
      subType: requirement.subType || requirement.model || '',
      pickupDate: requirement.pickupDate || '',
      returnDate: requirement.returnDate || '',
      location: requirement.location || '',
      notes: requirement.notes || '',
      status: requirement.status || 'New'
    };
    const { data, error } = await client.from('requirements').upsert([payload], { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase] Failed to save requirement:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving requirement:', err);
    return null;
  }
}

/**
 * Fetch all Requirements / Survey Submissions from Supabase
 */
export async function syncRequirementsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('requirements')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[Supabase] Failed to fetch requirements:', error.message);
      return null;
    }
    return (data || []).map(r => ({
      ...r,
      fullName: r.fullName || r.full_name || '',
      vehicleCategory: r.vehicleCategory || r.vehicle_category || 'bike',
      subType: r.subType || r.sub_type || '',
      pickupDate: r.pickupDate || r.pickup_date || '',
      returnDate: r.returnDate || r.return_date || '',
      createdAt: r.created_at || r.createdAt || new Date().toISOString()
    }));
  } catch (err) {
    console.warn('[Supabase] Error fetching requirements:', err);
    return null;
  }
}

/**
 * Save Host Vehicle submission to Supabase
 */
export async function saveHostVehicleToSupabase(hostVehicle) {
  const client = getSupabaseClient();
  if (!client || !hostVehicle) return null;
  try {
    const payload = {
      id: hostVehicle.id || `host-${Date.now()}`,
      fullName: hostVehicle.fullName || hostVehicle.name || '',
      whatsapp: hostVehicle.whatsapp || hostVehicle.phone || '',
      email: hostVehicle.email || '',
      vehicleCategory: hostVehicle.vehicleCategory || hostVehicle.category || 'bike',
      modelName: hostVehicle.modelName || hostVehicle.model || '',
      year: hostVehicle.year ? String(hostVehicle.year) : '',
      location: hostVehicle.location || '',
      photos: Array.isArray(hostVehicle.photos) ? hostVehicle.photos : [],
      notes: hostVehicle.notes || '',
      status: hostVehicle.status || 'New'
    };
    const { data, error } = await client.from('host_vehicles').upsert([payload], { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase] Failed to save host vehicle:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving host vehicle:', err);
    return null;
  }
}

/**
 * Fetch all Host Vehicle Registrations from Supabase
 */
export async function syncHostVehiclesFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('host_vehicles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[Supabase] Failed to fetch host vehicles:', error.message);
      return null;
    }
    return (data || []).map(h => ({
      ...h,
      fullName: h.fullName || h.full_name || '',
      vehicleCategory: h.vehicleCategory || h.vehicle_category || 'bike',
      modelName: h.modelName || h.model_name || '',
      photos: Array.isArray(h.photos) ? h.photos : (typeof h.photos === 'string' ? JSON.parse(h.photos || '[]') : []),
      createdAt: h.created_at || h.createdAt || new Date().toISOString()
    }));
  } catch (err) {
    console.warn('[Supabase] Error fetching host vehicles:', err);
    return null;
  }
}

/**
 * Save Waitlist entry to Supabase
 */
export async function saveWaitlistToSupabase(waitlistEntry) {
  const client = getSupabaseClient();
  if (!client || !waitlistEntry) return null;
  try {
    const payload = {
      id: waitlistEntry.id || `wait-${Date.now()}`,
      fullName: waitlistEntry.fullName || waitlistEntry.name || '',
      whatsapp: waitlistEntry.whatsapp || waitlistEntry.phone || '',
      email: waitlistEntry.email || '',
      interest: waitlistEntry.interest || 'both',
      timing: waitlistEntry.timing || '',
      preferenceText: waitlistEntry.preferenceText || '',
      status: waitlistEntry.status || 'New'
    };
    const { data, error } = await client.from('waitlist').upsert([payload], { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase] Failed to save waitlist entry:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase] Error saving waitlist:', err);
    return null;
  }
}

/**
 * Fetch all Waitlist Members from Supabase
 */
export async function syncWaitlistFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('[Supabase] Failed to fetch waitlist:', error.message);
      return null;
    }
    return (data || []).map(w => ({
      ...w,
      fullName: w.fullName || w.full_name || '',
      preferenceText: w.preferenceText || w.preference_text || '',
      createdAt: w.created_at || w.createdAt || new Date().toISOString()
    }));
  } catch (err) {
    console.warn('[Supabase] Error fetching waitlist:', err);
    return null;
  }
}

