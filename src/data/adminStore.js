import { VEHICLES_DATA } from './vehicles';

const VEHICLES_KEY = 'apniride_vehicles_v1';
const REQUIREMENTS_KEY = 'apniride_requirements_v1';
const WAITLIST_KEY = 'apniride_waitlist_v1';

// Initial sample requirement submissions for pre-launch testing
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
  },
  {
    id: 'req-103',
    fullName: 'Ankit Gupta',
    whatsapp: '9123456789',
    email: 'ankit.g@example.com',
    purpose: 'Outstation Tour',
    vehicleCategory: 'bike',
    subType: 'premium',
    pickupDate: '2026-09-10',
    returnDate: '2026-09-12',
    location: 'Collectorate Area',
    notes: 'Royal Enfield Classic 350 preference',
    status: 'Confirmed',
    createdAt: '2026-08-29T00:10:00Z'
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
  },
  {
    id: 'wait-202',
    fullName: 'Neha Jain',
    whatsapp: '9811223344',
    email: 'neha.j@example.com',
    interest: 'bike',
    timing: 'this_week',
    preferenceText: 'Scooter for daily commute',
    status: 'Contacted',
    createdAt: '2026-08-28T11:20:00Z'
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
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading vehicles from localStorage:', e);
    }
    // Fallback to default mock data
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
