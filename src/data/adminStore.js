import { VEHICLES_DATA } from './vehicles';

const VEHICLES_KEY = 'apniride_vehicles_v2';
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
    fullName: 'Suresh Kumar',
    whatsapp: '9876512345',
    email: 'suresh.k@example.com',
    vehicleCategory: 'bike',
    modelName: 'TVS Jupiter 125',
    year: '2023',
    location: 'Madhav Chowk',
    photos: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80'],
    notes: 'Single owner, clean condition, valid comprehensive insurance till 2027.',
    status: 'New',
    createdAt: '2026-08-28T18:00:00Z'
  },
  {
    id: 'host-302',
    fullName: 'Ramesh Sen',
    whatsapp: '8370092226',
    email: 'ramesh.sen@example.com',
    vehicleCategory: 'car',
    modelName: 'Maruti Suzuki Swift VXi',
    year: '2022',
    location: 'Jhansi Road',
    photos: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80'],
    notes: 'Well maintained hatchback, regular servicing done at authorized service center.',
    status: 'Inspected',
    createdAt: '2026-08-28T20:30:00Z'
  }
];

class AdminStore {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l());
  }

  // --- VEHICLES CRUD ---
  getVehicles() {
    try {
      const stored = localStorage.getItem(VEHICLES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const verified = parsed.map(v => {
            const defaultMatch = VEHICLES_DATA.find(d => d.id === v.id || d.name === v.name);
            return {
              ...v,
              image: v.image || (defaultMatch ? defaultMatch.image : 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80')
            };
          });
          return verified;
        }
      }
    } catch (e) {
      console.error('Error reading vehicles from localStorage:', e);
    }
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(VEHICLES_DATA));
    return VEHICLES_DATA;
  }

  saveVehicles(vehicles) {
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
    return vehicleWithId;
  }

  updateVehicle(id, updatedFields) {
    const vehicles = this.getVehicles();
    const updated = vehicles.map(v => v.id === id ? { ...v, ...updatedFields } : v);
    this.saveVehicles(updated);
  }

  toggleVehicleStatus(id) {
    const vehicles = this.getVehicles();
    const updated = vehicles.map(v => {
      if (v.id === id) {
        const newStatus = v.status === 'Available' ? 'Coming Soon' : 'Available';
        return { ...v, status: newStatus };
      }
      return v;
    });
    this.saveVehicles(updated);
  }

  deleteVehicle(id) {
    const vehicles = this.getVehicles();
    const updated = vehicles.filter(v => v.id !== id);
    this.saveVehicles(updated);
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
    return newEntry;
  }

  updateRequirementStatus(id, status) {
    const reqs = this.getRequirements();
    const updated = reqs.map(r => r.id === id ? { ...r, status } : r);
    this.saveRequirements(updated);
  }

  deleteRequirement(id) {
    const reqs = this.getRequirements();
    const updated = reqs.filter(r => r.id !== id);
    this.saveRequirements(updated);
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
    return newEntry;
  }

  updateHostVehicleStatus(id, status) {
    const hosts = this.getHostVehicles();
    const updated = hosts.map(h => h.id === id ? { ...h, status } : h);
    this.saveHostVehicles(updated);
  }

  deleteHostVehicle(id) {
    const hosts = this.getHostVehicles();
    const updated = hosts.filter(h => h.id !== id);
    this.saveHostVehicles(updated);
  }

  // --- WAITLIST REGISTRATIONS CRUD ---
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

  saveWaitlist(entries) {
    try {
      localStorage.setItem(WAITLIST_KEY, JSON.stringify(entries));
      this.notify();
    } catch (e) {
      console.error('Error saving waitlist to localStorage:', e);
    }
  }

  addWaitlist(data) {
    const entries = this.getWaitlist();
    const newEntry = {
      ...data,
      id: `wait-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    const updated = [newEntry, ...entries];
    this.saveWaitlist(updated);
    return newEntry;
  }

  updateWaitlistStatus(id, status) {
    const entries = this.getWaitlist();
    const updated = entries.map(w => w.id === id ? { ...w, status } : w);
    this.saveWaitlist(updated);
  }

  deleteWaitlist(id) {
    const entries = this.getWaitlist();
    const updated = entries.filter(w => w.id !== id);
    this.saveWaitlist(updated);
  }
}

export const adminStore = new AdminStore();
