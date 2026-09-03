import { VEHICLES_DATA } from './vehicles';
import {
  supabase,
  isSupabaseConfigured,
  syncVehiclesFromSupabase,
  upsertVehicleToSupabase,
  saveRequirementToSupabase,
  saveHostVehicleToSupabase,
  saveWaitlistToSupabase
} from '../lib/supabase';

const VEHICLES_KEY = 'apniride_vehicles_v3';
const REQUIREMENTS_KEY = 'apniride_requirements_v1';
const WAITLIST_KEY = 'apniride_waitlist_v1';
const HOST_VEHICLES_KEY = 'apniride_host_vehicles_v1';

// Initial sample requirement submissions
const INITIAL_REQUIREMENTS = [
  {
    id: 'req-101',
    fullName: 'Rahul Sharma',
    whatsapp: '9876543210',
    email: 'rahul.s@example.com',
    purpose: 'Daily Commute',
    vehicleCategory: 'bike',
    subType: 'scooter',
    pickupDate: '2026-09-01',
    returnDate: '2026-09-05',
    location: 'Madhav Chowk',
    notes: 'Need automatic scooter for quick local runs',
    status: 'New',
    createdAt: '2026-08-28T14:30:00Z'
  },
  {
    id: 'req-102',
    fullName: 'Priya Verma',
    whatsapp: '8370092226',
    email: 'priya.v@example.com',
    purpose: 'Weekend Trip',
    vehicleCategory: 'car',
    subType: 'suv',
    pickupDate: '2026-09-05',
    returnDate: '2026-09-07',
    location: 'Jhansi Road',
    notes: 'Prefer Hyundai Creta or Tata Punch for family trip to Madhav National Park',
    status: 'Contacted',
    createdAt: '2026-08-28T16:15:00Z'
  }
];

// Initial sample waitlist entries
const INITIAL_WAITLIST = [
  {
    id: 'wait-201',
    fullName: 'Vikram Singh',
    whatsapp: '9988776655',
    email: 'vikram@example.com',
    interest: 'both',
    timing: 'this_month',
    preferenceText: 'Honda Activa & Maruti Swift',
    status: 'New',
    createdAt: '2026-08-27T10:00:00Z'
  }
];

// Initial sample host vehicle listings
const INITIAL_HOST_VEHICLES = [
  {
    id: 'host-301',
    fullName: 'Rameshwar Dayal',
    whatsapp: '9826012345',
    email: 'rameshwar@example.com',
    vehicleCategory: 'bike',
    modelName: 'Royal Enfield Classic 350',
    year: '2023',
    location: 'Circular Road, Shivpuri',
    photos: [],
    notes: 'Mint condition, serviced last week.',
    status: 'Approved',
    createdAt: '2026-08-26T12:00:00Z'
  }
];

class AdminStore {
  constructor() {
    this.listeners = [];
    this.initSupabaseSync();
  }

  // Subscribe to changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l());
  }

  async initSupabaseSync() {
    if (isSupabaseConfigured) {
      const cloudVehicles = await syncVehiclesFromSupabase();
      if (cloudVehicles && cloudVehicles.length > 0) {
        this.saveVehicles(cloudVehicles, false);
      }
    }
  }

  // --- VEHICLE CATALOG CRUD ---
  getVehicles() {
    try {
      const stored = localStorage.getItem(VEHICLES_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading vehicles from localStorage:', e);
    }
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(VEHICLES_DATA));
    return VEHICLES_DATA;
  }

  saveVehicles(vehicles, syncCloud = true) {
    try {
      localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles));
      this.notify();
    } catch (e) {
      console.error('Error saving vehicles to localStorage:', e);
    }
  }

  addVehicle(newVehicle) {
    const vehicles = this.getVehicles();
    const vehicleWithId = {
      ...newVehicle,
      id: `v-${Date.now()}`
    };
    const updated = [vehicleWithId, ...vehicles];
    this.saveVehicles(updated);

    // Sync to Supabase
    if (isSupabaseConfigured) {
      upsertVehicleToSupabase(vehicleWithId);
    }

    return vehicleWithId;
  }

  updateVehicle(id, updatedFields) {
    const vehicles = this.getVehicles();
    let updatedVehicle = null;
    const updated = vehicles.map(v => {
      if (v.id === id) {
        updatedVehicle = { ...v, ...updatedFields };
        return updatedVehicle;
      }
      return v;
    });
    this.saveVehicles(updated);

    // Sync to Supabase
    if (isSupabaseConfigured && updatedVehicle) {
      upsertVehicleToSupabase(updatedVehicle);
    }
  }

  toggleVehicleStatus(id) {
    const vehicles = this.getVehicles();
    let target = null;
    const updated = vehicles.map(v => {
      if (v.id === id) {
        const newStatus = v.status === 'Available' ? 'Coming Soon' : 'Available';
        target = { ...v, status: newStatus };
        return target;
      }
      return v;
    });
    this.saveVehicles(updated);

    if (isSupabaseConfigured && target) {
      upsertVehicleToSupabase(target);
    }
  }

  deleteVehicle(id) {
    const vehicles = this.getVehicles();
    const updated = vehicles.filter(v => v.id !== id);
    this.saveVehicles(updated);

    if (isSupabaseConfigured && supabase) {
      supabase.from('vehicles').delete().eq('id', id).then(() => {});
    }
  }

  // --- REQUIREMENT SUBMISSIONS CRUD ---
  getRequirements() {
    try {
      const stored = localStorage.getItem(REQUIREMENTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading requirements from localStorage:', e);
    }
    localStorage.setItem(REQUIREMENTS_KEY, JSON.stringify(INITIAL_REQUIREMENTS));
    return INITIAL_REQUIREMENTS;
  }

  saveRequirements(reqs) {
    try {
      localStorage.setItem(REQUIREMENTS_KEY, JSON.stringify(reqs));
      this.notify();
    } catch (e) {
      console.error('Error saving requirements to localStorage:', e);
    }
  }

  addRequirement(data) {
    const reqs = this.getRequirements();
    const newEntry = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    const updated = [newEntry, ...reqs];
    this.saveRequirements(updated);

    // Sync to Supabase
    if (isSupabaseConfigured) {
      saveRequirementToSupabase(newEntry);
    }

    return newEntry;
  }

  updateRequirementStatus(id, status) {
    const reqs = this.getRequirements();
    const updated = reqs.map(r => r.id === id ? { ...r, status } : r);
    this.saveRequirements(updated);

    if (isSupabaseConfigured && supabase) {
      supabase.from('requirements').update({ status }).eq('id', id).then(() => {});
    }
  }

  deleteRequirement(id) {
    const reqs = this.getRequirements();
    const updated = reqs.filter(r => r.id !== id);
    this.saveRequirements(updated);

    if (isSupabaseConfigured && supabase) {
      supabase.from('requirements').delete().eq('id', id).then(() => {});
    }
  }

  // --- HOST VEHICLE SUBMISSIONS CRUD ---
  getHostVehicles() {
    try {
      const stored = localStorage.getItem(HOST_VEHICLES_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading host vehicles from localStorage:', e);
    }
    localStorage.setItem(HOST_VEHICLES_KEY, JSON.stringify(INITIAL_HOST_VEHICLES));
    return INITIAL_HOST_VEHICLES;
  }

  saveHostVehicles(hosts) {
    try {
      localStorage.setItem(HOST_VEHICLES_KEY, JSON.stringify(hosts));
      this.notify();
    } catch (e) {
      console.error('Error saving host vehicles to localStorage:', e);
    }
  }

  addHostVehicle(data) {
    const hosts = this.getHostVehicles();
    const newEntry = {
      ...data,
      id: `host-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    const updated = [newEntry, ...hosts];
    this.saveHostVehicles(updated);

    // Sync to Supabase
    if (isSupabaseConfigured) {
      saveHostVehicleToSupabase(newEntry);
    }

    return newEntry;
  }

  updateHostVehicleStatus(id, status) {
    const hosts = this.getHostVehicles();
    const updated = hosts.map(h => h.id === id ? { ...h, status } : h);
    this.saveHostVehicles(updated);

    if (isSupabaseConfigured && supabase) {
      supabase.from('host_vehicles').update({ status }).eq('id', id).then(() => {});
    }
  }

  deleteHostVehicle(id) {
    const hosts = this.getHostVehicles();
    const updated = hosts.filter(h => h.id !== id);
    this.saveHostVehicles(updated);

    if (isSupabaseConfigured && supabase) {
      supabase.from('host_vehicles').delete().eq('id', id).then(() => {});
    }
  }

  // --- WAITLIST CRUD ---
  getWaitlist() {
    try {
      const stored = localStorage.getItem(WAITLIST_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading waitlist from localStorage:', e);
    }
    localStorage.setItem(WAITLIST_KEY, JSON.stringify(INITIAL_WAITLIST));
    return INITIAL_WAITLIST;
  }

  saveWaitlist(list) {
    try {
      localStorage.setItem(WAITLIST_KEY, JSON.stringify(list));
      this.notify();
    } catch (e) {
      console.error('Error saving waitlist to localStorage:', e);
    }
  }

  addWaitlist(data) {
    const list = this.getWaitlist();
    const newEntry = {
      ...data,
      id: `wait-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    const updated = [newEntry, ...list];
    this.saveWaitlist(updated);

    // Sync to Supabase
    if (isSupabaseConfigured) {
      saveWaitlistToSupabase(newEntry);
    }

    return newEntry;
  }

  deleteWaitlist(id) {
    const list = this.getWaitlist();
    const updated = list.filter(w => w.id !== id);
    this.saveWaitlist(updated);

    if (isSupabaseConfigured && supabase) {
      supabase.from('waitlist').delete().eq('id', id).then(() => {});
    }
  }
}

export const adminStore = new AdminStore();
