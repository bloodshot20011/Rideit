import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminStore } from '../data/adminStore';
import {
  getSupabaseCredentials,
  getSupabaseClient,
  saveSupabaseCredentials,
  clearSupabaseCredentials,
  testSupabaseConnection,
  pushAllVehiclesToSupabase,
  uploadVehicleImageToSupabase,
  signInWithGoogle,
  signOutAdmin
} from '../lib/supabase';
import Button from '../components/Button';
import FormField from '../components/FormField';
import ImagePlaceholder from '../components/ImagePlaceholder';

// 3 Days Session Duration in Milliseconds (3 * 24 * 60 * 60 * 1000)
const THREE_DAYS_MS = 259200000;

export default function AdminPage() {
  // Google Authentication & Whitelist State (PIN Removed)
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [unauthorizedEmail, setUnauthorizedEmail] = useState('');

  // Whitelisted Emails String for Settings Modal
  const [whitelistInput, setWhitelistInput] = useState(() => {
    const envEmails = import.meta.env.VITE_ADMIN_EMAILS || '';
    const stored = typeof window !== 'undefined' ? localStorage.getItem('apniride_admin_whitelist') || '' : '';
    return stored || envEmails;
  });

  // Cloud Database Connection State
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [cloudUrl, setCloudUrl] = useState(() => getSupabaseCredentials().url);
  const [cloudKey, setCloudKey] = useState(() => getSupabaseCredentials().key);
  const [cloudTesting, setCloudTesting] = useState(false);
  const [cloudTestResult, setCloudTestResult] = useState(null);
  const [pushingFleet, setPushingFleet] = useState(false);
  const [pushResult, setPushResult] = useState(null);
  const [cloudConfigured, setCloudConfigured] = useState(() => getSupabaseCredentials().isConfigured);

  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState('overview'); // overview, vehicles, requirements, hosts, waitlist

  // Store Data States
  const [vehicles, setVehicles] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [hostVehicles, setHostVehicles] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [syncingCloud, setSyncingCloud] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Vehicle Modals
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // In-Line Quick Price Edit Modal
  const [quickPriceVehicle, setQuickPriceVehicle] = useState(null);
  const [quickPriceValue, setQuickPriceValue] = useState('');

  // In-Line Quick Image Edit Modal
  const [quickImageVehicle, setQuickImageVehicle] = useState(null);
  const [quickImageUrl, setQuickImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Requirement Detail Modal
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  // Host Detail & Photo Modal
  const [selectedHost, setSelectedHost] = useState(null);

  // Form State for Vehicle Modal
  const [vName, setVName] = useState('');
  const [vCategory, setVCategory] = useState('bikes');
  const [vSubcategory, setVSubcategory] = useState('scooter');
  const [vType, setVType] = useState('Scooter');
  const [vPrice, setVPrice] = useState('399');
  const [vFuel, setVFuel] = useState('Petrol');
  const [vTransmission, setVTransmission] = useState('Automatic');
  const [vCapacity, setVCapacity] = useState('2 Passengers');
  const [vBadge, setVBadge] = useState('Popular Choice');
  const [vStatus, setVStatus] = useState('Coming Soon');
  const [vLocation, setVLocation] = useState('Madhav Chowk, Shivpuri');
  const [vTagline, setVTagline] = useState('');
  const [vImage, setVImage] = useState('');

  // Helper to parse whitelisted emails list
  const getWhitelistedList = () => {
    const envEmails = import.meta.env.VITE_ADMIN_EMAILS || '';
    const stored = typeof window !== 'undefined' ? localStorage.getItem('apniride_admin_whitelist') || '' : '';
    const merged = `${envEmails},${stored}`
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);
    return merged;
  };

  // Check Google Auth session & 3-day expiration
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      setAuthChecking(false);
      return;
    }

    const verifySession = async () => {
      try {
        const { data: { session }, error } = await client.auth.getSession();
        if (error || !session) {
          setCurrentUser(null);
          setAuthChecking(false);
          return;
        }

        // Check 3-day session expiry
        const sessionTime = localStorage.getItem('apniride_admin_session_time');
        if (sessionTime && (Date.now() - Number(sessionTime) > THREE_DAYS_MS)) {
          await signOutAdmin();
          setCurrentUser(null);
          setAuthError('Your 3-day administrator session has expired. Please sign in with Google again.');
          setAuthChecking(false);
          return;
        }

        const userEmail = session.user.email?.toLowerCase();
        const whitelist = getWhitelistedList();

        if (whitelist.length > 0 && !whitelist.includes(userEmail)) {
          setCurrentUser(null);
          setUnauthorizedEmail(session.user.email || '');
          setAuthError(`Access Denied: ${session.user.email} is not in the authorized administrator whitelist.`);
          setAuthChecking(false);
          return;
        }

        if (!sessionTime) {
          localStorage.setItem('apniride_admin_session_time', Date.now().toString());
        }
        setCurrentUser(session.user);
        setUnauthorizedEmail('');
        setAuthError('');
      } catch (err) {
        console.warn('[Admin Auth] Session verification error:', err);
      } finally {
        setAuthChecking(false);
      }
    };

    verifySession();

    const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userEmail = session.user.email?.toLowerCase();
        const whitelist = getWhitelistedList();

        if (whitelist.length > 0 && !whitelist.includes(userEmail)) {
          setCurrentUser(null);
          setUnauthorizedEmail(session.user.email || '');
          setAuthError(`Access Denied: ${session.user.email} is not authorized as an administrator.`);
          return;
        }

        localStorage.setItem('apniride_admin_session_time', Date.now().toString());
        setCurrentUser(session.user);
        setUnauthorizedEmail('');
        setAuthError('');
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Subscribe to adminStore updates
  useEffect(() => {
    const syncData = () => {
      setVehicles(adminStore.getVehicles());
      setRequirements(adminStore.getRequirements());
      setHostVehicles(adminStore.getHostVehicles());
      setWaitlist(adminStore.getWaitlist());
    };

    syncData();
    const unsubscribe = adminStore.subscribe(syncData);
    return () => unsubscribe();
  }, []);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setAuthError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setAuthError(err.message || 'Failed to connect to Google OAuth. Please check Supabase configuration.');
      setSigningIn(false);
    }
  };

  // Handle Sign Out
  const handleAdminLogout = async () => {
    await signOutAdmin();
    setCurrentUser(null);
    setUnauthorizedEmail('');
  };

  // Save Whitelist to LocalStorage
  const handleSaveWhitelist = (e) => {
    e.preventDefault();
    localStorage.setItem('apniride_admin_whitelist', whitelistInput.trim());
    setAuthError('');
    alert('Whitelist updated successfully!');
  };

  // Smart price auto-formatter (supports 2XX, X99, 9X7, 399, ₹1,499/day)
  const formatPriceString = (input) => {
    if (!input) return '₹399/day';
    let str = String(input).trim();
    if (!str.startsWith('₹') && !str.toLowerCase().startsWith('rs')) {
      str = `₹${str}`;
    }
    if (!str.includes('/')) {
      str = `${str}/day`;
    }
    return str;
  };

  // Manual Cloud Sync
  const handleCloudSync = async () => {
    setSyncingCloud(true);
    await adminStore.initSupabaseSync();
    setVehicles(adminStore.getVehicles());
    setTimeout(() => {
      setSyncingCloud(false);
    }, 600);
  };

  // Test connection to Supabase
  const handleTestCloudConnection = async () => {
    if (!cloudUrl.trim() || !cloudKey.trim()) {
      setCloudTestResult({ success: false, message: 'Please enter both Supabase Project URL and Anon Public Key.' });
      return;
    }
    setCloudTesting(true);
    setCloudTestResult(null);
    const res = await testSupabaseConnection(cloudUrl.trim(), cloudKey.trim());
    setCloudTesting(false);
    if (res.success) {
      setCloudTestResult({ success: true, message: '✓ Successfully connected to Supabase database!' });
    } else {
      setCloudTestResult({ success: false, message: `Connection failed: ${res.error}` });
    }
  };

  // Save Supabase credentials
  const handleSaveCloudCredentials = async (e) => {
    e.preventDefault();
    if (!cloudUrl.trim() || !cloudKey.trim()) return;
    saveSupabaseCredentials(cloudUrl, cloudKey);
    setCloudConfigured(true);
    setCloudTestResult({ success: true, message: '✓ Credentials saved in browser! Syncing fleet...' });
    await adminStore.initSupabaseSync();
    setVehicles(adminStore.getVehicles());
    setTimeout(() => {
      setShowCloudModal(false);
    }, 1200);
  };

  // Push all local vehicles to Supabase
  const handlePushAllToCloud = async () => {
    setPushingFleet(true);
    setPushResult(null);
    const currentVehicles = adminStore.getVehicles();
    const res = await pushAllVehiclesToSupabase(currentVehicles);
    setPushingFleet(false);
    if (res.success) {
      setPushResult({ success: true, message: `✓ Successfully synced ${currentVehicles.length} vehicles to Supabase Cloud!` });
      await adminStore.initSupabaseSync();
      setVehicles(adminStore.getVehicles());
    } else {
      setPushResult({ success: false, message: `Failed to push: ${res.error}` });
    }
  };

  // In-Line Quick Price Edit Submit
  const handleSaveQuickPrice = (e) => {
    e.preventDefault();
    if (!quickPriceVehicle) return;
    const formatted = formatPriceString(quickPriceValue);
    adminStore.updateVehicle(quickPriceVehicle.id, { pricePerDay: formatted });
    setQuickPriceVehicle(null);
  };

  // In-Line Quick Image Edit Submit
  const handleSaveQuickImage = (e) => {
    e.preventDefault();
    if (!quickImageVehicle) return;
    adminStore.updateVehicle(quickImageVehicle.id, { image: quickImageUrl });
    setQuickImageVehicle(null);
  };

  // Handle Image File Upload (Supabase Storage / Local Fallback)
  const handleImageUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const cloudUrl = await uploadVehicleImageToSupabase(file);
    if (cloudUrl) {
      callback(cloudUrl);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setUploadingImage(false);
  };

  // Open modal for Adding New Vehicle
  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setVName('');
    setVCategory('bikes');
    setVSubcategory('scooter');
    setVType('Scooter');
    setVPrice('399');
    setVFuel('Petrol');
    setVTransmission('Automatic');
    setVCapacity('2 Passengers');
    setVBadge('Popular Choice');
    setVStatus('Coming Soon');
    setVLocation('Madhav Chowk, Shivpuri');
    setVTagline('Reliable mobility for daily city runs across Shivpuri.');
    setVImage('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80');
    setShowVehicleModal(true);
  };

  // Open modal for Editing Vehicle (preserves 2XX, X99 without stripping)
  const handleOpenEditModal = (v) => {
    setEditingVehicle(v);
    setVName(v.name || '');
    setVCategory(v.category || 'bikes');
    setVSubcategory(v.subcategory || 'scooter');
    setVType(v.type || 'Scooter');
    setVPrice(v.pricePerDay ? v.pricePerDay.replace(/^₹\s*/, '').replace(/\s*\/day$/, '').trim() : '399');
    setVFuel(v.fuel || 'Petrol');
    setVTransmission(v.transmission || 'Automatic');
    setVCapacity(v.capacity || '2 Passengers');
    setVBadge(v.badge || '');
    setVStatus(v.status || 'Coming Soon');
    setVLocation(v.location || 'Madhav Chowk, Shivpuri');
    setVTagline(v.tagline || '');
    setVImage(v.image || '');
    setShowVehicleModal(true);
  };

  // Save Vehicle (Add or Edit)
  const handleSaveVehicle = (e) => {
    e.preventDefault();
    if (!vName.trim()) return;

    const payload = {
      name: vName.trim(),
      category: vCategory,
      subcategory: vSubcategory,
      type: vType,
      pricePerDay: formatPriceString(vPrice),
      fuel: vFuel,
      transmission: vTransmission,
      capacity: vCapacity,
      badge: vBadge,
      status: vStatus,
      location: vLocation,
      tagline: vTagline,
      image: vImage || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    };

    if (editingVehicle) {
      adminStore.updateVehicle(editingVehicle.id, payload);
    } else {
      adminStore.addVehicle(payload);
    }

    setShowVehicleModal(false);
  };

  // Delete Handlers
  const handleDeleteVehicle = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the vehicle catalog?`)) {
      adminStore.deleteVehicle(id);
    }
  };

  const handleDeleteRequirement = (id, name) => {
    if (window.confirm(`Delete requirement submission from ${name}?`)) {
      adminStore.deleteRequirement(id);
    }
  };

  const handleDeleteHostVehicle = (id, model) => {
    if (window.confirm(`Delete host registration for ${model}?`)) {
      adminStore.deleteHostVehicle(id);
    }
  };

  // Export Data to CSV (Excel format)
  const handleExportCSV = (datasetName) => {
    let rows = [];
    let filename = `apniride_${datasetName}_${new Date().toISOString().slice(0, 10)}.csv`;

    if (datasetName === 'requirements') {
      rows = [
        ['Customer Name', 'WhatsApp', 'Email', 'Purpose', 'Category', 'SubType', 'Pickup Date', 'Return Date', 'Locality', 'Status', 'Notes', 'Submitted At'],
        ...requirements.map(r => [
          `"${r.fullName || ''}"`,
          `"${r.whatsapp || ''}"`,
          `"${r.email || ''}"`,
          `"${r.purpose || ''}"`,
          `"${r.vehicleCategory || ''}"`,
          `"${r.subType || ''}"`,
          `"${r.pickupDate || ''}"`,
          `"${r.returnDate || ''}"`,
          `"${r.location || ''}"`,
          `"${r.status || ''}"`,
          `"${(r.notes || '').replace(/"/g, '""')}"`,
          `"${r.createdAt || ''}"`
        ])
      ];
    } else if (datasetName === 'vehicles') {
      rows = [
        ['Model Name', 'Category', 'Type', 'Price Per Day', 'Fuel', 'Transmission', 'Capacity', 'Status', 'Location'],
        ...vehicles.map(v => [
          `"${v.name || ''}"`,
          `"${v.category || ''}"`,
          `"${v.type || ''}"`,
          `"${v.pricePerDay || ''}"`,
          `"${v.fuel || ''}"`,
          `"${v.transmission || ''}"`,
          `"${v.capacity || ''}"`,
          `"${v.status || ''}"`,
          `"${v.location || ''}"`
        ])
      ];
    } else {
      rows = [
        ['Full Name', 'WhatsApp', 'Email', 'Interest', 'Frequency', 'Preference', 'Status', 'Submitted At'],
        ...waitlist.map(w => [
          `"${w.fullName || ''}"`,
          `"${w.whatsapp || ''}"`,
          `"${w.email || ''}"`,
          `"${w.interest || ''}"`,
          `"${w.timing || ''}"`,
          `"${(w.preferenceText || '').replace(/"/g, '""')}"`,
          `"${w.status || ''}"`,
          `"${w.createdAt || ''}"`
        ])
      ];
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Helper WhatsApp Link Generator
  const getWhatsAppLink = (phone, text) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
  };

  // Filtered Lists
  const filteredVehiclesList = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredRequirementsList = requirements.filter(r => {
    const matchesSearch = r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || r.whatsapp.includes(searchQuery) || (r.location && r.location.toLowerCase().includes(searchQuery.toLowerCase())) || (r.purpose && r.purpose.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredHostVehiclesList = hostVehicles.filter(h => {
    const matchesSearch = h.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || h.modelName.toLowerCase().includes(searchQuery.toLowerCase()) || h.whatsapp.includes(searchQuery) || (h.location && h.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredWaitlistList = waitlist.filter(w => {
    const matchesSearch = w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || w.whatsapp.includes(searchQuery) || (w.preferenceText && w.preferenceText.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 1. AUTH CHECKING SPINNER
  if (authChecking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#E64A19] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-[#7C776E] uppercase tracking-wider">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // 2. GOOGLE OAUTH SIGN-IN GATE (PIN REMOVED)
  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-[#1E1B18]/15 p-8 sm:p-10 max-w-md w-full shadow-lg text-center space-y-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#0B132B] text-[#C89D3C] mx-auto flex items-center justify-center border border-[#C89D3C]/30 shadow-xs">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#E64A19]/10 text-[#E64A19] px-2.5 py-0.5 rounded font-mono text-[10px] font-bold border border-[#E64A19]/25">
              [SECURE PORTAL]
            </div>
            <h2 className="font-display font-bold text-2xl text-[#1E1B18] uppercase tracking-tight">
              ApniRide Admin Studio
            </h2>
            <p className="font-body text-xs text-[#7C776E] leading-relaxed">
              Protected operations portal for Shivpuri vehicle pricing & survey CRM.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-mono text-left space-y-1">
              <div className="font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>Access Denied</span>
              </div>
              <p className="font-body text-xs leading-relaxed">{authError}</p>
              {unauthorizedEmail && (
                <p className="font-mono text-[10px] text-red-800 pt-1">
                  Logged in as: <strong>{unauthorizedEmail}</strong>
                </p>
              )}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full bg-white hover:bg-[#F5F2EB] text-[#1E1B18] border border-[#1E1B18]/25 hover:border-[#E64A19] font-mono text-xs font-semibold py-3.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              {/* Google SVG Logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{signingIn ? 'Connecting to Google...' : (unauthorizedEmail ? 'Sign In with Different Account' : 'Continue with Google')}</span>
            </button>

            <div className="bg-[#F5F2EB] p-3.5 rounded-lg border border-[#1E1B18]/10 text-left space-y-1.5">
              <div className="font-mono text-[10px] font-bold text-[#45413B] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#E64A19]">verified_user</span>
                <span>Security Policies</span>
              </div>
              <ul className="font-body text-[11px] text-[#7C776E] space-y-0.5 list-disc list-inside">
                <li>Email Whitelist Verification</li>
                <li>Session automatically expires in 3 days</li>
                <li>Single Sign-On (SSO) Protected</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. MAIN COMPLETED ADMIN PANEL (AUTHENTICATED)
  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 max-w-content mx-auto space-y-6 sm:space-y-8">
      {/* Studio Header with Supabase Live Cloud Sync Bar */}
      <div className="bg-white rounded-2xl border border-[#1E1B18]/15 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md font-mono text-[10px] font-semibold uppercase tracking-wider border border-[#C89D3C]/40 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E64A19] animate-pulse" />
              APNIRIDE OPERATIONS SUITE
            </div>
            <h1 className="font-display font-light text-2xl sm:text-3xl text-[#1E1B18] uppercase tracking-tight mt-1">
              Control Panel & Fleet Manager
            </h1>
            <p className="font-body text-xs sm:text-sm text-[#45413B]">
              Real-time management of vehicle catalog, pricing, customer requirements survey, and host registrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Authenticated Admin Badge */}
            {currentUser && (
              <div className="flex items-center gap-2 bg-[#F5F2EB] border border-[#1E1B18]/15 px-2.5 py-1.5 rounded-lg shadow-2xs">
                {currentUser.user_metadata?.avatar_url ? (
                  <img src={currentUser.user_metadata.avatar_url} alt="Admin Avatar" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-[#E64A19] text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.email?.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="text-left">
                  <div className="font-mono text-[11px] text-[#1E1B18] font-semibold truncate max-w-[130px] sm:max-w-[170px]" title={currentUser.email}>
                    {currentUser.email}
                  </div>
                  <div className="font-mono text-[9px] text-emerald-700 font-bold uppercase">
                    3-Day Session Active
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setShowCloudModal(true);
                setCloudTestResult(null);
                setPushResult(null);
              }}
              className="px-3 py-1.5 rounded-lg border border-[#C89D3C]/50 bg-[#0B132B] text-[#C89D3C] hover:bg-[#E64A19] hover:text-white hover:border-[#E64A19] font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Configure Supabase Cloud Settings"
            >
              <span className="material-symbols-outlined text-sm">cloud_sync</span>
              <span>{cloudConfigured ? 'Cloud Configured' : 'Connect Cloud'}</span>
            </button>
            <Button variant="outline" size="sm" icon="sync" onClick={handleCloudSync} disabled={syncingCloud} className="flex-1 sm:flex-initial">
              {syncingCloud ? 'Syncing...' : 'Sync Cloud'}
            </Button>
            <Button variant="primary" size="sm" icon="add" onClick={handleOpenAddModal} className="flex-1 sm:flex-initial">
              Add Vehicle
            </Button>
            <button
              onClick={handleAdminLogout}
              className="p-2 rounded-lg text-[#7C776E] hover:bg-[#EFECE4] hover:text-red-600 transition-colors cursor-pointer"
              title="Sign Out from Admin Panel"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>

        {/* Database Live Status Indicator Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-[#1E1B18]/10 text-xs font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`w-2.5 h-2.5 rounded-full ${cloudConfigured ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
            <span className="text-[#45413B]">
              Database Status: <strong className={cloudConfigured ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                {cloudConfigured ? '🟢 Connected to Supabase Cloud' : '🟡 Local Storage Mode (Only saves on this device)'}
              </strong>
            </span>
            {!cloudConfigured && (
              <button
                onClick={() => setShowCloudModal(true)}
                className="text-[#E64A19] underline font-bold cursor-pointer hover:text-[#D84315] ml-1"
              >
                Connect to save across all phones & devices →
              </button>
            )}
          </div>

          <div className="text-[#7C776E]">
            Shivpuri Hub: <strong>+91 8370092226</strong>
          </div>
        </div>
      </div>

      {/* Responsive Horizontal Tabs Switcher */}
      <div className="flex border-b border-[#1E1B18]/15 overflow-x-auto no-scrollbar gap-2 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 text-sm font-medium">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: 'dashboard', count: null },
          { id: 'vehicles', label: 'Fleet & Price Editor', icon: 'two_wheeler', count: vehicles.length },
          { id: 'requirements', label: 'Requirements CRM', icon: 'checklist', count: requirements.length },
          { id: 'hosts', label: 'Host Partner Listings', icon: 'key', count: hostVehicles.length },
          { id: 'waitlist', label: 'Waitlist Pass', icon: 'star', count: waitlist.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchQuery('');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? 'border-[#E64A19] text-[#E64A19] bg-[#EFECE4] rounded-t-lg'
                : 'border-transparent text-[#45413B] hover:text-[#1E1B18] hover:border-[#1E1B18]/20'
            }`}
          >
            <span className="material-symbols-outlined text-base sm:text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === tab.id ? 'bg-[#E64A19] text-white' : 'bg-[#EFECE4] text-[#45413B]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6 sm:space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#1E1B18]/15 shadow-xs flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase text-[#7C776E]">Total Fleet Models</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] mt-1">{vehicles.length}</h3>
                <p className="font-body text-xs text-[#E64A19] font-medium mt-1">
                  {vehicles.filter(v => v.status === 'Available').length} Ready for Rent
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#E64A19]/10 text-[#E64A19] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">two_wheeler</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#1E1B18]/15 shadow-xs flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase text-[#7C776E]">Requirement Surveys</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] mt-1">{requirements.length}</h3>
                <p className="font-body text-xs text-amber-700 font-medium mt-1">
                  {requirements.filter(r => r.status === 'New').length} New Submissions
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">checklist</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#1E1B18]/15 shadow-xs flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase text-[#7C776E]">Host Partner Vehicles</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] mt-1">{hostVehicles.length}</h3>
                <p className="font-body text-xs text-blue-700 font-medium mt-1">Registered Owners</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">key</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#1E1B18]/15 shadow-xs flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase text-[#7C776E]">Early Waitlist Passes</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B18] mt-1">{waitlist.length}</h3>
                <p className="font-body text-xs text-emerald-700 font-medium mt-1">20% Voucher Members</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">star</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-xl border border-[#1E1B18]/15 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B18] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#E64A19]">schedule</span>
                  Recent Customer Travel Inquiries
                </h3>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('requirements')}>
                  View All ({requirements.length})
                </Button>
              </div>

              {/* Mobile Card Stack */}
              <div className="md:hidden space-y-3">
                {requirements.slice(0, 3).map(req => (
                  <div key={req.id} className="p-4 rounded-lg border border-[#1E1B18]/15 bg-[#F5F2EB]/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-[#1E1B18]">{req.fullName}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        req.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                        req.status === 'Contacted' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-[#E64A19]">{req.whatsapp}</div>
                    <div className="text-xs text-[#45413B]">
                      <strong>{req.purpose}</strong> ({req.vehicleCategory}) • 📍 {req.location || 'Shivpuri'}
                    </div>
                    <div className="pt-2">
                      <a
                        href={getWhatsAppLink(req.whatsapp, `Hi ${req.fullName}! This is ApniRide Shivpuri team regarding your ${req.purpose} rental requirement.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2 rounded-lg text-xs font-semibold"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#1E1B18]/15 text-xs uppercase text-[#7C776E] bg-[#EFECE4]">
                      <th className="p-3">Customer</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Trip Purpose</th>
                      <th className="p-3">Locality</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E1B18]/10">
                    {requirements.slice(0, 5).map(req => (
                      <tr key={req.id} className="hover:bg-[#EFECE4]/50 transition-colors">
                        <td className="p-3 font-semibold text-[#1E1B18]">
                          <div>{req.fullName}</div>
                          <div className="text-xs text-[#E64A19] font-mono">{req.whatsapp}</div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                            req.vehicleCategory === 'car' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {req.vehicleCategory}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-[#1E1B18]">{req.purpose}</td>
                        <td className="p-3 text-[#45413B]">{req.location || 'Shivpuri'}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            req.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                            req.status === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <a
                            href={getWhatsAppLink(req.whatsapp, `Hi ${req.fullName}! This is ApniRide Shivpuri team regarding your ${req.purpose} rental requirement.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#20ba59] transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">chat</span>
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Export Tools */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-[#1E1B18]/15 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-base text-[#1E1B18] uppercase tracking-wider">
                Export Operations Data
              </h3>
              <p className="font-body text-xs text-[#7C776E]">
                Download live survey and fleet data directly into Excel/CSV spreadsheets.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleExportCSV('requirements')}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-[#1E1B18]/15 hover:bg-[#F5F2EB] text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  <span>Export Customer Surveys (.csv)</span>
                  <span className="material-symbols-outlined text-sm text-[#E64A19]">download</span>
                </button>

                <button
                  onClick={() => handleExportCSV('vehicles')}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-[#1E1B18]/15 hover:bg-[#F5F2EB] text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  <span>Export Vehicle Catalog (.csv)</span>
                  <span className="material-symbols-outlined text-sm text-[#E64A19]">download</span>
                </button>

                <button
                  onClick={() => handleExportCSV('waitlist')}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-[#1E1B18]/15 hover:bg-[#F5F2EB] text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  <span>Export Waitlist Signups (.csv)</span>
                  <span className="material-symbols-outlined text-sm text-[#E64A19]">download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VEHICLE FLEET & DIRECT IN-LINE PRICE EDITOR */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
              <input
                type="text"
                placeholder="Search vehicle model or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-3.5 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
              />

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
              >
                <option value="all">All Categories</option>
                <option value="bikes">Bikes & Scooters</option>
                <option value="cars">Cars & SUVs</option>
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
              >
                <option value="all">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">In Maintenance</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" icon="download" onClick={() => handleExportCSV('vehicles')}>
                Export
              </Button>
              <Button variant="primary" size="sm" icon="add" onClick={handleOpenAddModal}>
                Add Vehicle Model
              </Button>
            </div>
          </div>

          {/* Vehicle Grid with In-Line Price Tagger */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehiclesList.map(v => (
              <div key={v.id} className="bg-white rounded-xl border border-[#1E1B18]/15 shadow-xs overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative">
                    <ImagePlaceholder src={v.image} alt={v.name} type={v.type} title={v.name} aspectRatio="aspect-[16/10]" />
                    
                    {/* Status Dropdown Indicator */}
                    <div className="absolute top-3 left-3">
                      <select
                        value={v.status || 'Coming Soon'}
                        onChange={e => adminStore.updateVehicle(v.id, { status: e.target.value })}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-xs cursor-pointer ${
                          v.status === 'Available' ? 'bg-emerald-500/90 text-white border-emerald-400' :
                          v.status === 'Booked' ? 'bg-blue-600/90 text-white border-blue-400' :
                          v.status === 'Maintenance' ? 'bg-amber-600/90 text-white border-amber-400' :
                          'bg-white/90 text-[#E64A19] border-[#1E1B18]/20'
                        }`}
                      >
                        <option value="Available">✓ Available</option>
                        <option value="Booked">🚗 Booked / Out</option>
                        <option value="Maintenance">🔧 In Maintenance</option>
                        <option value="Coming Soon">⌛ Coming Soon</option>
                      </select>
                    </div>

                    {/* Direct In-Line Price Editor Button */}
                    <button
                      onClick={() => {
                        setQuickPriceVehicle(v);
                        setQuickPriceValue(v.pricePerDay ? v.pricePerDay.replace(/^₹\s*/, '').replace(/\s*\/day$/, '').trim() : '399');
                      }}
                      className="absolute top-3 right-3 bg-[#0B132B]/90 hover:bg-[#E64A19] backdrop-blur-md text-[#C89D3C] hover:text-white font-mono text-xs font-bold px-2.5 py-1 rounded border border-[#C89D3C]/30 shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                      title="Click to edit price directly"
                    >
                      <span>{v.pricePerDay}</span>
                      <span className="material-symbols-outlined text-[11px]">edit</span>
                    </button>

                    {/* Direct In-Line Photo Editor Button */}
                    <button
                      onClick={() => {
                        setQuickImageVehicle(v);
                        setQuickImageUrl(v.image || '');
                      }}
                      className="absolute bottom-2.5 right-2.5 bg-[#0B132B]/85 hover:bg-[#E64A19] backdrop-blur-md text-[#F5F2EB] font-mono text-[11px] font-semibold px-2.5 py-1 rounded border border-white/20 shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                      title="Change vehicle photo"
                    >
                      <span className="material-symbols-outlined text-xs">photo_camera</span>
                      <span>Change Photo</span>
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-base text-[#1E1B18]">{v.name}</h4>
                      <span className="font-mono text-[11px] bg-[#EFECE4] text-[#45413B] px-2 py-0.5 rounded uppercase">
                        {v.subcategory || v.category}
                      </span>
                    </div>

                    <p className="font-body text-xs text-[#45413B] line-clamp-2">
                      {v.tagline || 'Reliable rental vehicle available in Shivpuri.'}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-[#7C776E]">
                      <span>⚙️ {v.fuel}</span>
                      <span>•</span>
                      <span>🔄 {v.transmission}</span>
                      <span>•</span>
                      <span>👥 {v.capacity}</span>
                    </div>

                    <div className="text-[11px] text-[#7C776E] pt-1">
                      📍 {v.location}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-[#1E1B18]/10 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEditModal(v)}
                    className="text-xs font-mono font-semibold text-[#E64A19] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Full Edit
                  </button>

                  <button
                    onClick={() => handleDeleteVehicle(v.id, v.name)}
                    className="text-xs font-mono font-semibold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REQUIREMENTS CRM & SURVEY MANAGER */}
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
              <input
                type="text"
                placeholder="Search name, phone, or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-3.5 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
              />

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-[#7C776E] font-medium">
                {filteredRequirementsList.length} Submissions
              </span>
              <Button variant="outline" size="sm" icon="download" onClick={() => handleExportCSV('requirements')}>
                Export CSV
              </Button>
            </div>
          </div>

          {/* Mobile Card Stack */}
          <div className="md:hidden space-y-4">
            {filteredRequirementsList.map(req => (
              <div key={req.id} className="bg-white p-5 rounded-xl border border-[#1E1B18]/15 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-[#1E1B18]">{req.fullName}</h4>
                    <div className="font-mono text-xs text-[#E64A19]">{req.whatsapp}</div>
                    {req.email && <div className="text-xs text-[#7C776E]">{req.email}</div>}
                  </div>
                  <select
                    value={req.status}
                    onChange={e => adminStore.updateRequirementStatus(req.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                      req.status === 'New' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                      req.status === 'Contacted' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                      req.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      'bg-gray-100 text-gray-800 border-gray-300'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="bg-[#F5F2EB] p-3 rounded-lg text-xs space-y-1 font-body text-[#45413B]">
                  <div><strong>Trip Purpose:</strong> {req.purpose} ({req.vehicleCategory})</div>
                  <div><strong>Dates:</strong> {req.pickupDate || 'Flexible'} → {req.returnDate || 'Flexible'}</div>
                  <div><strong>Locality:</strong> {req.location || 'Shivpuri'}</div>
                  {req.notes && <div className="text-[#7C776E] italic pt-1">Note: {req.notes}</div>}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={getWhatsAppLink(req.whatsapp, `Hi ${req.fullName}! This is ApniRide Shivpuri team regarding your ${req.purpose} rental requirement.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2 rounded-lg text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    WhatsApp
                  </a>
                  <button
                    onClick={() => setSelectedRequirement(req)}
                    className="px-3 py-2 text-xs font-mono font-semibold text-[#E64A19] hover:bg-[#EFECE4] rounded-lg"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDeleteRequirement(req.id, req.fullName)}
                    className="px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl border border-[#1E1B18]/15 p-6 shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1E1B18]/15 text-xs uppercase text-[#7C776E] bg-[#EFECE4]">
                  <th className="p-3">Customer Info</th>
                  <th className="p-3">Category / Subtype</th>
                  <th className="p-3">Trip Purpose</th>
                  <th className="p-3">Dates & Locality</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1B18]/10">
                {filteredRequirementsList.map(req => (
                  <tr key={req.id} className="hover:bg-[#EFECE4]/50 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-[#1E1B18]">{req.fullName}</div>
                      <div className="text-xs text-[#E64A19] font-mono">{req.whatsapp}</div>
                      {req.email && <div className="text-[11px] text-[#7C776E]">{req.email}</div>}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold uppercase text-xs text-[#1E1B18]">{req.vehicleCategory}</span>
                      {req.subType && <div className="text-xs text-[#7C776E]">{req.subType}</div>}
                    </td>
                    <td className="p-3 font-medium text-[#1E1B18]">{req.purpose}</td>
                    <td className="p-3 text-xs text-[#45413B] space-y-0.5">
                      <div>📅 {req.pickupDate || 'Flexible'} → {req.returnDate || 'Flexible'}</div>
                      <div>📍 {req.location || 'Shivpuri'}</div>
                    </td>
                    <td className="p-3 text-xs text-[#45413B] max-w-xs truncate">
                      {req.notes || 'No extra notes'}
                    </td>
                    <td className="p-3">
                      <select
                        value={req.status}
                        onChange={e => adminStore.updateRequirementStatus(req.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                          req.status === 'New' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                          req.status === 'Contacted' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                          req.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          'bg-gray-100 text-gray-800 border-gray-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <a
                        href={getWhatsAppLink(req.whatsapp, `Hi ${req.fullName}! This is ApniRide Shivpuri team regarding your ${req.purpose} rental requirement.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2.5 py-1 rounded text-xs font-semibold hover:bg-[#20ba59]"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        WhatsApp
                      </a>
                      <button
                        onClick={() => setSelectedRequirement(req)}
                        className="text-xs text-[#E64A19] hover:underline p-1 cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDeleteRequirement(req.id, req.fullName)}
                        className="text-xs text-red-600 hover:underline p-1 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: HOST PARTNER LISTINGS */}
      {activeTab === 'hosts' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 shadow-xs flex justify-between items-center">
            <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B18]">Registered Host Vehicles</h3>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#E64A19]">{filteredHostVehiclesList.length} Submissions</span>
              <Button variant="outline" size="sm" icon="download" onClick={() => handleExportCSV('hosts')}>
                Export CSV
              </Button>
            </div>
          </div>

          {/* Mobile Card Stack */}
          <div className="md:hidden space-y-4">
            {filteredHostVehiclesList.map(h => (
              <div key={h.id} className="bg-white p-5 rounded-xl border border-[#1E1B18]/15 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-[#1E1B18]">{h.modelName} ({h.year})</h4>
                    <div className="text-xs text-[#45413B]">Owner: <strong>{h.fullName}</strong></div>
                    <div className="font-mono text-xs text-[#E64A19]">{h.whatsapp}</div>
                  </div>
                  <select
                    value={h.status}
                    onChange={e => adminStore.updateHostVehicleStatus(h.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                      h.status === 'New' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                      h.status === 'Inspected' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                      h.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      'bg-red-100 text-red-800 border-red-300'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Inspected">Inspected</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="text-xs text-[#45413B] space-y-1 bg-[#F5F2EB] p-3 rounded-lg">
                  <div><strong>Locality:</strong> 📍 {h.location}</div>
                  {h.notes && <div><strong>Notes:</strong> {h.notes}</div>}
                  {h.photos && h.photos.length > 0 && (
                    <div className="text-[11px] text-[#E64A19] font-mono pt-1">
                      📸 {h.photos.length} photos attached (tap inspect)
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={getWhatsAppLink(h.whatsapp, `Hi ${h.fullName}! This is ApniRide team regarding your ${h.modelName} host registration in Shivpuri.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2 rounded-lg text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    WhatsApp
                  </a>
                  <button
                    onClick={() => setSelectedHost(h)}
                    className="px-3 py-2 text-xs font-mono font-semibold text-[#E64A19] hover:bg-[#EFECE4] rounded-lg"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => handleDeleteHostVehicle(h.id, h.modelName)}
                    className="px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl border border-[#1E1B18]/15 p-6 shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1E1B18]/15 text-xs uppercase text-[#7C776E] bg-[#EFECE4]">
                  <th className="p-3">Owner Details</th>
                  <th className="p-3">Vehicle Model & Year</th>
                  <th className="p-3">Category & Locality</th>
                  <th className="p-3">Photos</th>
                  <th className="p-3">Condition / Notes</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1B18]/10">
                {filteredHostVehiclesList.map(h => (
                  <tr key={h.id} className="hover:bg-[#EFECE4]/50 transition-colors">
                    <td className="p-3 font-bold text-[#1E1B18]">
                      <div>{h.fullName}</div>
                      <div className="text-xs text-[#E64A19] font-mono">{h.whatsapp}</div>
                      {h.email && <div className="text-[11px] text-[#7C776E]">{h.email}</div>}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-[#1E1B18]">{h.modelName}</div>
                      <div className="text-xs text-[#7C776E]">Year: {h.year}</div>
                    </td>
                    <td className="p-3 text-xs">
                      <span className="font-semibold uppercase text-[#E64A19]">{h.vehicleCategory}</span>
                      <div>📍 {h.location}</div>
                    </td>
                    <td className="p-3">
                      {h.photos && h.photos.length > 0 ? (
                        <button onClick={() => setSelectedHost(h)} className="flex gap-1 hover:opacity-80">
                          {h.photos.slice(0, 3).map((pUrl, i) => (
                            <img key={i} src={pUrl} alt="Host photo" className="w-8 h-8 rounded object-cover border border-[#1E1B18]/20" />
                          ))}
                        </button>
                      ) : (
                        <span className="text-xs text-[#7C776E]">No photos</span>
                      )}
                    </td>
                    <td className="p-3 text-xs text-[#45413B] max-w-xs truncate">
                      {h.notes || 'Clean condition'}
                    </td>
                    <td className="p-3">
                      <select
                        value={h.status}
                        onChange={e => adminStore.updateHostVehicleStatus(h.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                          h.status === 'New' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                          h.status === 'Inspected' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          h.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          'bg-red-100 text-red-800 border-red-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Inspected">Inspected</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <a
                        href={getWhatsAppLink(h.whatsapp, `Hi ${h.fullName}! This is ApniRide team regarding your ${h.modelName} host registration in Shivpuri.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2.5 py-1 rounded text-xs font-semibold hover:bg-[#20ba59]"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        WhatsApp
                      </a>
                      <button
                        onClick={() => setSelectedHost(h)}
                        className="text-xs text-[#E64A19] hover:underline p-1 cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleDeleteHostVehicle(h.id, h.modelName)}
                        className="text-xs text-red-600 hover:underline p-1 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: WAITLIST EARLY PASS SIGNUPS */}
      {activeTab === 'waitlist' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-[#1E1B18]/15 shadow-xs flex justify-between items-center">
            <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B18]">Waitlist Registrations</h3>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#E64A19]">{filteredWaitlistList.length} Signups</span>
              <Button variant="outline" size="sm" icon="download" onClick={() => handleExportCSV('waitlist')}>
                Export CSV
              </Button>
            </div>
          </div>

          {/* Mobile Card Stack */}
          <div className="md:hidden space-y-4">
            {filteredWaitlistList.map(w => (
              <div key={w.id} className="bg-white p-5 rounded-xl border border-[#1E1B18]/15 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-[#1E1B18]">{w.fullName}</h4>
                    <div className="font-mono text-xs text-[#E64A19]">{w.whatsapp}</div>
                    {w.email && <div className="text-xs text-[#7C776E]">{w.email}</div>}
                  </div>
                  <span className="font-mono text-xs uppercase bg-[#EFECE4] px-2 py-0.5 rounded font-semibold text-[#45413B]">
                    {w.interest}
                  </span>
                </div>

                <div className="text-xs text-[#45413B] bg-[#F5F2EB] p-3 rounded-lg space-y-1">
                  <div><strong>Frequency:</strong> {w.timing}</div>
                  {w.preferenceText && <div><strong>Preference:</strong> {w.preferenceText}</div>}
                </div>

                <div className="pt-1">
                  <a
                    href={getWhatsAppLink(w.whatsapp, `Hi ${w.fullName}! Congratulations, you have priority access for ApniRide Shivpuri launch with 20% discount.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2 rounded-lg text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Send 20% Discount Code
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl border border-[#1E1B18]/15 p-6 shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1E1B18]/15 text-xs uppercase text-[#7C776E] bg-[#EFECE4]">
                  <th className="p-3">Member Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Interest</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Model Preference</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1B18]/10">
                {filteredWaitlistList.map(w => (
                  <tr key={w.id} className="hover:bg-[#EFECE4]/50 transition-colors">
                    <td className="p-3 font-bold text-[#1E1B18]">{w.fullName}</td>
                    <td className="p-3 text-xs">
                      <div className="font-mono text-[#E64A19]">{w.whatsapp}</div>
                      {w.email && <div className="text-[#7C776E]">{w.email}</div>}
                    </td>
                    <td className="p-3 capitalize font-medium">{w.interest}</td>
                    <td className="p-3 text-xs text-[#45413B]">{w.timing}</td>
                    <td className="p-3 text-xs text-[#45413B]">{w.preferenceText || 'General'}</td>
                    <td className="p-3 text-right">
                      <a
                        href={getWhatsAppLink(w.whatsapp, `Hi ${w.fullName}! Congratulations, you have priority access for ApniRide Shivpuri launch with 20% discount.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2.5 py-1 rounded text-xs font-semibold hover:bg-[#20ba59]"
                      >
                        <span className="material-symbols-outlined text-sm">chat</span>
                        Send 20% Pass
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUICK IN-LINE PRICE EDIT MODAL */}
      <AnimatePresence>
        {quickPriceVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-[#1E1B18]/20 shadow-xl max-w-sm w-full p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-3">
                <h3 className="font-display font-bold text-lg text-[#1E1B18]">
                  Edit Rate: {quickPriceVehicle.name}
                </h3>
                <button
                  onClick={() => setQuickPriceVehicle(null)}
                  className="text-[#7C776E] hover:bg-[#EFECE4] p-1 rounded-lg"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveQuickPrice} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-[#45413B] mb-1">
                    Rental Rate per Day
                  </label>
                  <input
                    type="text"
                    value={quickPriceValue}
                    onChange={e => setQuickPriceValue(e.target.value)}
                    placeholder="e.g. 399, 499, 1499"
                    autoFocus
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1E1B18]/20 font-mono text-base font-bold text-[#E64A19] focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                  />
                  <p className="font-body text-[11px] text-[#7C776E] mt-1">
                    Auto-formats to ₹X/day (e.g. 399 → ₹399/day)
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" size="sm" fullWidth onClick={() => setQuickPriceVehicle(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" fullWidth icon="check">
                    Save Price
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK IMAGE EDIT MODAL */}
      <AnimatePresence>
        {quickImageVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-[#1E1B18]/20 shadow-xl max-w-md w-full p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1E1B18]">
                    Update Vehicle Photo
                  </h3>
                  <p className="font-body text-xs text-[#7C776E]">{quickImageVehicle.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickImageVehicle(null)}
                  className="text-[#7C776E] hover:bg-[#EFECE4] p-1 rounded-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Live Preview */}
              {quickImageUrl && (
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#EFECE4] border border-[#1E1B18]/15 shadow-inner">
                  <img src={quickImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <form onSubmit={handleSaveQuickImage} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-[#45413B] mb-1.5">
                    Upload Image or Paste URL
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={quickImageUrl}
                      onChange={(e) => setQuickImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-lg border border-[#1E1B18]/20 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                    />

                    <label className="bg-[#EFECE4] hover:bg-[#E64A19] hover:text-white px-3 py-2.5 rounded-lg border border-[#1E1B18]/20 cursor-pointer flex items-center justify-center gap-1.5 text-xs font-mono font-semibold transition-colors">
                      <span className="material-symbols-outlined text-sm">upload_file</span>
                      <span>{uploadingImage ? 'Uploading Image...' : 'Upload Photo from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, (url) => setQuickImageUrl(url))}
                      />
                    </label>
                  </div>
                  <p className="font-body text-[11px] text-[#7C776E] mt-1.5">
                    Images upload to Supabase cloud storage automatically.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => setQuickImageVehicle(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    fullWidth
                    icon="check"
                    disabled={uploadingImage}
                  >
                    Save Photo
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REQUIREMENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedRequirement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-[#1E1B18]/20 shadow-xl max-w-lg w-full p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-3">
                <h3 className="font-display font-bold text-xl text-[#1E1B18]">
                  Survey: {selectedRequirement.fullName}
                </h3>
                <button
                  onClick={() => setSelectedRequirement(null)}
                  className="text-[#7C776E] hover:bg-[#EFECE4] p-1 rounded-lg"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div className="space-y-3 font-body text-xs sm:text-sm text-[#45413B]">
                <div className="grid grid-cols-2 gap-2 bg-[#F5F2EB] p-3 rounded-lg">
                  <div><strong>WhatsApp:</strong> <span className="font-mono text-[#E64A19]">{selectedRequirement.whatsapp}</span></div>
                  <div><strong>Email:</strong> {selectedRequirement.email || 'N/A'}</div>
                  <div><strong>Vehicle Category:</strong> <span className="uppercase font-semibold">{selectedRequirement.vehicleCategory}</span></div>
                  <div><strong>Preferred Subtype:</strong> {selectedRequirement.subType || 'Any'}</div>
                  <div><strong>Planned Dates:</strong> {selectedRequirement.pickupDate || 'Flexible'} → {selectedRequirement.returnDate || 'Flexible'}</div>
                  <div><strong>Shivpuri Pickup:</strong> {selectedRequirement.location || 'City Center'}</div>
                </div>

                <div>
                  <strong>Customer Special Notes:</strong>
                  <p className="bg-[#F5F2EB] p-3 rounded-lg mt-1 italic text-[#1E1B18]">
                    {selectedRequirement.notes || 'No extra notes submitted.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={getWhatsAppLink(selectedRequirement.whatsapp, `Hi ${selectedRequirement.fullName}! This is ApniRide team regarding your ${selectedRequirement.purpose} rental requirement in Shivpuri.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 rounded-lg text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Message on WhatsApp
                </a>
                <Button variant="outline" size="sm" onClick={() => setSelectedRequirement(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HOST INSPECTION & PHOTO MODAL */}
      <AnimatePresence>
        {selectedHost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-[#1E1B18]/20 shadow-xl max-w-lg w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-3">
                <h3 className="font-display font-bold text-xl text-[#1E1B18]">
                  Host: {selectedHost.modelName} ({selectedHost.year})
                </h3>
                <button
                  onClick={() => setSelectedHost(null)}
                  className="text-[#7C776E] hover:bg-[#EFECE4] p-1 rounded-lg"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div className="space-y-3 font-body text-xs sm:text-sm text-[#45413B]">
                <div className="bg-[#F5F2EB] p-3 rounded-lg space-y-1">
                  <div><strong>Owner:</strong> {selectedHost.fullName}</div>
                  <div><strong>WhatsApp:</strong> <span className="font-mono text-[#E64A19]">{selectedHost.whatsapp}</span></div>
                  <div><strong>Locality:</strong> 📍 {selectedHost.location}</div>
                  {selectedHost.notes && <div><strong>Condition Notes:</strong> {selectedHost.notes}</div>}
                </div>

                {selectedHost.photos && selectedHost.photos.length > 0 && (
                  <div>
                    <strong>Uploaded Vehicle Photos:</strong>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {selectedHost.photos.map((src, i) => (
                        <img key={i} src={src} alt="Host Vehicle" className="w-full h-32 object-cover rounded-lg border border-[#1E1B18]/15" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={getWhatsAppLink(selectedHost.whatsapp, `Hi ${selectedHost.fullName}! This is ApniRide team regarding your ${selectedHost.modelName} host registration in Shivpuri.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 rounded-lg text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Contact Owner
                </a>
                <Button variant="outline" size="sm" onClick={() => setSelectedHost(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD / FULL EDIT VEHICLE MODAL */}
      <AnimatePresence>
        {showVehicleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-[#1E1B18]/20 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-4">
                <h3 className="font-display font-bold text-xl text-[#1E1B18]">
                  {editingVehicle ? `Edit Vehicle: ${editingVehicle.name}` : 'Add New Vehicle to Catalog'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowVehicleModal(false)}
                  className="p-1 rounded-lg text-[#7C776E] hover:bg-[#EFECE4] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveVehicle} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Vehicle Model Name"
                    id="v-name"
                    value={vName}
                    onChange={e => setVName(e.target.value)}
                    placeholder="e.g. Honda Activa 6G"
                    required
                  />

                  <FormField
                    label="Category"
                    id="v-category"
                    type="select"
                    value={vCategory}
                    onChange={e => setVCategory(e.target.value)}
                    options={[
                      { value: 'bikes', label: 'Bikes & Scooters' },
                      { value: 'cars', label: 'Cars & SUVs' }
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Rental Price per Day"
                    id="v-price"
                    value={vPrice}
                    onChange={e => setVPrice(e.target.value)}
                    placeholder="e.g. 399, 499, 1499"
                    helperText="Auto-formats to ₹X/day (e.g. 399 → ₹399/day)"
                    required
                  />

                  <FormField
                    label="Type Tag"
                    id="v-type"
                    value={vType}
                    onChange={e => setVType(e.target.value)}
                    placeholder="e.g. Scooter / SUV"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Fuel Type"
                    id="v-fuel"
                    value={vFuel}
                    onChange={e => setVFuel(e.target.value)}
                    placeholder="Petrol / Electric"
                  />

                  <FormField
                    label="Transmission"
                    id="v-transmission"
                    value={vTransmission}
                    onChange={e => setVTransmission(e.target.value)}
                    placeholder="Automatic / Manual"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Capacity"
                    id="v-capacity"
                    value={vCapacity}
                    onChange={e => setVCapacity(e.target.value)}
                    placeholder="2 Passengers / 5 Passengers"
                  />

                  <FormField
                    label="Badge / Feature Tag"
                    id="v-badge"
                    value={vBadge}
                    onChange={e => setVBadge(e.target.value)}
                    placeholder="Popular Choice / 5-Star Safety"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Availability Status"
                    id="v-status"
                    type="select"
                    value={vStatus}
                    onChange={e => setVStatus(e.target.value)}
                    options={['Coming Soon', 'Available', 'Booked', 'Maintenance']}
                  />

                  <FormField
                    label="Shivpuri Location"
                    id="v-location"
                    value={vLocation}
                    onChange={e => setVLocation(e.target.value)}
                    placeholder="Madhav Chowk, Shivpuri"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-mono text-xs font-semibold uppercase text-[#45413B]">
                      Vehicle Image (URL or Upload)
                    </label>
                    <label className="bg-[#EFECE4] hover:bg-[#E64A19] hover:text-white px-2.5 py-1 rounded border border-[#1E1B18]/20 cursor-pointer flex items-center gap-1 text-[11px] font-mono font-semibold transition-colors">
                      <span className="material-symbols-outlined text-xs">upload_file</span>
                      <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, (url) => setVImage(url))}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    id="v-image"
                    value={vImage}
                    onChange={(e) => setVImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1E1B18]/20 bg-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                  />
                  {vImage && (
                    <div className="mt-2.5 h-28 w-44 rounded-lg overflow-hidden border border-[#1E1B18]/15 bg-[#EFECE4] shadow-xs">
                      <img src={vImage} alt="Vehicle preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <p className="font-body text-[11px] text-[#7C776E] mt-1">
                    Enter high-res image URL or upload directly from your device.
                  </p>
                </div>

                <FormField
                  label="Tagline / Description"
                  id="v-tagline"
                  type="textarea"
                  value={vTagline}
                  onChange={e => setVTagline(e.target.value)}
                  placeholder="Short summary describing vehicle use in Shivpuri..."
                  rows={2}
                />

                <div className="pt-4 border-t border-[#1E1B18]/15 flex justify-end gap-3">
                  <Button type="button" variant="outline" size="md" onClick={() => setShowVehicleModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon="check">
                    {editingVehicle ? 'Save Changes' : 'Publish Vehicle'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUPABASE CLOUD SETUP & SYNC MODAL */}
      <AnimatePresence>
        {showCloudModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-[#1E1B18]/20 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#1E1B18]/15 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#0B132B] text-[#C89D3C] flex items-center justify-center border border-[#C89D3C]/30">
                    <span className="material-symbols-outlined text-xl">cloud_sync</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E1B18]">
                      Cloud Database & Sync Setup
                    </h3>
                    <p className="font-body text-xs text-[#7C776E]">Sync catalog, prices & surveys across all phones globally</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCloudModal(false)}
                  className="text-[#7C776E] hover:bg-[#EFECE4] p-1.5 rounded-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Status Alert */}
              <div className={`p-4 rounded-xl border text-xs font-mono flex items-start gap-3 ${
                cloudConfigured ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">
                  {cloudConfigured ? 'check_circle' : 'info'}
                </span>
                <div className="space-y-1">
                  <strong className="block text-sm font-semibold">
                    {cloudConfigured ? 'Cloud Connection Active' : 'Running in Local Storage Mode'}
                  </strong>
                  <p className="font-body text-xs leading-relaxed">
                    {cloudConfigured
                      ? 'Edits to vehicles, prices, and status update Supabase in real-time and reflect across all phones.'
                      : 'Changes are currently stored in this browser only. Connect your Supabase project below to save changes globally.'}
                  </p>
                </div>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleSaveCloudCredentials} className="space-y-4">
                <FormField
                  label="Supabase Project URL"
                  id="cloud-url"
                  value={cloudUrl}
                  onChange={e => setCloudUrl(e.target.value)}
                  placeholder="https://abcdefghijklm.supabase.co"
                  helperText="Found in Supabase Dashboard → Project Settings → API"
                  required
                />

                <FormField
                  label="Supabase Anon / Public Key"
                  id="cloud-key"
                  type="textarea"
                  rows={2}
                  value={cloudKey}
                  onChange={e => setCloudKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  helperText="Found in Supabase Dashboard → Project Settings → API → anon public key"
                  required
                />

                {cloudTestResult && (
                  <div className={`p-3 rounded-lg text-xs font-mono border ${
                    cloudTestResult.success ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-red-50 text-red-800 border-red-300'
                  }`}>
                    {cloudTestResult.message}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon="wifi_tethering"
                    onClick={handleTestCloudConnection}
                    disabled={cloudTesting}
                  >
                    {cloudTesting ? 'Testing...' : 'Test Connection'}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    fullWidth
                    icon="save"
                  >
                    Save & Activate
                  </Button>
                </div>
              </form>

              {/* Seed / Bulk Sync Section */}
              <div className="bg-[#F5F2EB] p-4 rounded-xl border border-[#1E1B18]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#1E1B18]">Push Local Fleet to Cloud</h4>
                    <p className="font-body text-xs text-[#7C776E]">Upload all current vehicles and prices into your Supabase database table.</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon="cloud_upload"
                    onClick={handlePushAllToCloud}
                    disabled={pushingFleet || !cloudConfigured}
                  >
                    {pushingFleet ? 'Uploading...' : 'Push All'}
                  </Button>
                </div>
                {pushResult && (
                  <div className={`p-2.5 rounded-lg text-xs font-mono border ${
                    pushResult.success ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-red-100 text-red-900 border-red-300'
                  }`}>
                    {pushResult.message}
                  </div>
                )}
              </div>

              {/* Email Whitelist Manager Section */}
              <div className="bg-[#F5F2EB] p-4 rounded-xl border border-[#1E1B18]/15 space-y-3">
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1E1B18]">Authorized Admin Emails (Whitelist)</h4>
                  <p className="font-body text-xs text-[#7C776E]">Only Google accounts with these email addresses can access the Admin Studio.</p>
                </div>
                <form onSubmit={handleSaveWhitelist} className="space-y-2">
                  <input
                    type="text"
                    value={whitelistInput}
                    onChange={e => setWhitelistInput(e.target.value)}
                    placeholder="e.g. admin@gmail.com, your-email@gmail.com"
                    className="w-full px-3 py-2 rounded-lg border border-[#1E1B18]/20 bg-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#E64A19]/30"
                  />
                  <p className="font-body text-[11px] text-[#7C776E]">Separate multiple emails with commas. You can also set `VITE_ADMIN_EMAILS` in Vercel.</p>
                  <Button type="submit" variant="outline" size="sm" icon="check">
                    Save Whitelist
                  </Button>
                </form>
              </div>

              {/* Vercel Permanent Auto-Sync Guide */}
              <div className="border-t border-[#1E1B18]/15 pt-4 space-y-2 font-body text-xs text-[#45413B]">
                <strong className="block font-display text-sm text-[#1E1B18]">
                  📌 How to enable automatic sync for all visitors on Vercel:
                </strong>
                <ol className="list-decimal list-inside space-y-1 bg-[#EFECE4] p-3.5 rounded-lg text-[#1E1B18]">
                  <li>Open <strong>vercel.com</strong> → Select your <strong>Ride it</strong> project.</li>
                  <li>Go to <strong>Settings</strong> → <strong>Environment Variables</strong>.</li>
                  <li>Add <strong>`VITE_SUPABASE_URL`</strong> with your project URL.</li>
                  <li>Add <strong>`VITE_SUPABASE_ANON_KEY`</strong> with your anon public key.</li>
                  <li>Go to <strong>Deployments</strong> → Click <strong>Redeploy</strong> to apply.</li>
                </ol>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-[#1E1B18]/10">
                {cloudConfigured && (
                  <button
                    type="button"
                    onClick={() => {
                      clearSupabaseCredentials();
                      setCloudConfigured(false);
                      setCloudUrl('');
                      setCloudKey('');
                    }}
                    className="text-xs font-mono text-red-600 hover:underline cursor-pointer"
                  >
                    Disconnect Cloud
                  </button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCloudModal(false)}
                  className="ml-auto"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
