import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminStore } from '../data/adminStore';
import Button from '../components/Button';
import FormField from '../components/FormField';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, vehicles, requirements, hosts, waitlist

  // Store data states
  const [vehicles, setVehicles] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [hostVehicles, setHostVehicles] = useState([]);
  const [waitlist, setWaitlist] = useState([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Form State for Vehicle Modal
  const [vName, setVName] = useState('');
  const [vCategory, setVCategory] = useState('bikes');
  const [vSubcategory, setVSubcategory] = useState('scooter');
  const [vType, setVType] = useState('Scooter');
  const [vFuel, setVFuel] = useState('Petrol');
  const [vTransmission, setVTransmission] = useState('Automatic');
  const [vCapacity, setVCapacity] = useState('2 Passengers');
  const [vBadge, setVBadge] = useState('Popular Choice');
  const [vStatus, setVStatus] = useState('Coming Soon');
  const [vLocation, setVLocation] = useState('Madhav Chowk, Shivpuri');
  const [vTagline, setVTagline] = useState('');
  const [vImage, setVImage] = useState('');

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

  // Open modal for Adding New Vehicle
  const handleOpenAddModal = () => {
    setEditingVehicle(null);
    setVName('');
    setVCategory('bikes');
    setVSubcategory('scooter');
    setVType('Scooter');
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

  // Open modal for Editing Vehicle
  const handleOpenEditModal = (v) => {
    setEditingVehicle(v);
    setVName(v.name || '');
    setVCategory(v.category || 'bikes');
    setVSubcategory(v.subcategory || 'scooter');
    setVType(v.type || 'Scooter');
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

  // Delete Vehicle
  const handleDeleteVehicle = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the vehicle catalog?`)) {
      adminStore.deleteVehicle(id);
    }
  };

  // Delete Requirement
  const handleDeleteRequirement = (id, name) => {
    if (window.confirm(`Delete requirement submission from ${name}?`)) {
      adminStore.deleteRequirement(id);
    }
  };

  // Delete Host Vehicle
  const handleDeleteHostVehicle = (id, model) => {
    if (window.confirm(`Delete host registration for ${model}?`)) {
      adminStore.deleteHostVehicle(id);
    }
  };

  // Export JSON/CSV
  const handleExportData = () => {
    const exportObj = {
      vehicles,
      requirements,
      hostVehicles,
      waitlist,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `apniride_admin_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
    const matchesSearch = r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || r.whatsapp.includes(searchQuery) || (r.location && r.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredHostVehiclesList = hostVehicles.filter(h => {
    const matchesSearch = h.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || h.modelName.toLowerCase().includes(searchQuery.toLowerCase()) || h.whatsapp.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredWaitlistList = waitlist.filter(w => {
    const matchesSearch = w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || w.whatsapp.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-8 px-4 sm:px-6 max-w-content mx-auto space-y-8">
      {/* Studio Header */}
      <div className="bg-surface rounded-2xl border border-outline-variant/40 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            Management Studio
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface">
            ApniRide Control Panel
          </h1>
          <p className="font-body text-sm text-on-surface-variant">
            Manage Shivpuri vehicle fleet, customer travel requirements, host vehicle listings, and waitlist signups.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" icon="download" onClick={handleExportData}>
            Export Data
          </Button>
          <Button variant="primary" size="sm" icon="add" onClick={handleOpenAddModal}>
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-outline-variant/30 overflow-x-auto gap-2 text-sm font-medium">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: 'dashboard', count: null },
          { id: 'vehicles', label: 'Vehicle Catalog', icon: 'two_wheeler', count: vehicles.length },
          { id: 'requirements', label: 'Requirements Survey', icon: 'checklist', count: requirements.length },
          { id: 'hosts', label: 'Host Vehicles List', icon: 'key', count: hostVehicles.length },
          { id: 'waitlist', label: 'Waitlist Signups', icon: 'star', count: waitlist.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchQuery('');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}
            className={`px-4 py-3 border-b-2 font-headline text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary text-primary bg-surface-low rounded-t-lg'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
            {tab.label}
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-primary text-white' : 'bg-surface-high text-on-surface-variant'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-on-surface-variant">Fleet Vehicles</p>
                <h3 className="font-headline font-bold text-3xl text-on-surface mt-1">{vehicles.length}</h3>
                <p className="text-xs text-primary font-medium mt-1">
                  {vehicles.filter(v => v.status === 'Available').length} Available now
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">two_wheeler</span>
              </div>
            </div>

            <div className="bg-surface p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-on-surface-variant">Requirement Submissions</p>
                <h3 className="font-headline font-bold text-3xl text-on-surface mt-1">{requirements.length}</h3>
                <p className="text-xs text-yellow-600 font-medium mt-1">
                  {requirements.filter(r => r.status === 'New').length} New pending contact
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">checklist</span>
              </div>
            </div>

            <div className="bg-surface p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-on-surface-variant">Host Vehicle Listings</p>
                <h3 className="font-headline font-bold text-3xl text-on-surface mt-1">{hostVehicles.length}</h3>
                <p className="text-xs text-blue-600 font-medium mt-1">Owner Registrations</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">key</span>
              </div>
            </div>

            <div className="bg-surface p-5 rounded-2xl border border-outline-variant/40 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-on-surface-variant">Waitlist Signups</p>
                <h3 className="font-headline font-bold text-3xl text-on-surface mt-1">{waitlist.length}</h3>
                <p className="text-xs text-emerald-600 font-medium mt-1">Early Access Members</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">star</span>
              </div>
            </div>
          </div>

          {/* Recent Requirements Table */}
          <div className="bg-surface rounded-2xl border border-outline-variant/40 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                Recent Travel Requirements
              </h3>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('requirements')}>
                View All ({requirements.length})
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/40 text-xs uppercase text-on-surface-variant bg-surface-low">
                    <th className="p-3">Customer</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Trip Purpose</th>
                    <th className="p-3">Locality</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {requirements.slice(0, 5).map(req => (
                    <tr key={req.id} className="hover:bg-surface-low/50 transition-colors">
                      <td className="p-3 font-semibold text-on-surface">
                        <div>{req.fullName}</div>
                        <div className="text-xs text-on-surface-variant font-normal">{req.whatsapp}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                          req.vehicleCategory === 'car' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.vehicleCategory}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-on-surface">{req.purpose}</td>
                      <td className="p-3 text-on-surface-variant">{req.location || 'Shivpuri'}</td>
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
        </div>
      )}

      {/* TAB 2: VEHICLE CATALOG (CRUD) */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="bg-surface p-4 rounded-2xl border border-outline-variant/40 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
              <input
                type="text"
                placeholder="Search vehicle model or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-outline-variant/50 bg-surface text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Categories</option>
                <option value="bikes">Bikes & Scooters</option>
                <option value="cars">Cars & SUVs</option>
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>

            <Button variant="primary" size="sm" icon="add" onClick={handleOpenAddModal}>
              Add Vehicle Model
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehiclesList.map(v => (
              <div key={v.id} className="bg-surface rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative">
                    <ImagePlaceholder src={v.image} alt={v.name} type={v.type} title={v.name} aspectRatio="aspect-[16/10]" />
                    
                    <button
                      onClick={() => adminStore.toggleVehicleStatus(v.id)}
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-xs transition-colors cursor-pointer ${
                        v.status === 'Available'
                          ? 'bg-emerald-500/90 text-white border-emerald-400'
                          : 'bg-surface/90 text-primary border-outline-variant/40'
                      }`}
                      title="Click to toggle status"
                    >
                      {v.status === 'Available' ? '✓ Available' : '⌛ Coming Soon'}
                    </button>

                    {v.badge && (
                      <span className="absolute bottom-3 right-3 bg-on-surface/80 text-white text-[11px] font-medium px-2 py-0.5 rounded">
                        {v.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline font-bold text-lg text-on-surface">{v.name}</h3>
                      <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-surface-low text-primary border border-outline-variant/30">
                        {v.category}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant line-clamp-2">{v.tagline}</p>

                    <div className="flex flex-wrap gap-1.5 text-xs text-on-surface-variant">
                      <span className="bg-surface-low px-2 py-0.5 rounded border border-outline-variant/20">{v.fuel}</span>
                      <span className="bg-surface-low px-2 py-0.5 rounded border border-outline-variant/20">{v.transmission}</span>
                      <span className="bg-surface-low px-2 py-0.5 rounded border border-outline-variant/20">{v.capacity}</span>
                    </div>

                    <div className="text-xs text-on-surface-variant flex items-center gap-1 pt-1">
                      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                      <span>{v.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-low/50">
                  <button
                    onClick={() => handleOpenEditModal(v)}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Edit Specs
                  </button>

                  <button
                    onClick={() => handleDeleteVehicle(v.id, v.name)}
                    className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
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

      {/* TAB 3: REQUIREMENTS SURVEY MANAGER */}
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          <div className="bg-surface p-4 rounded-2xl border border-outline-variant/40 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
              <input
                type="text"
                placeholder="Search customer name or phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-outline-variant/50 bg-surface text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="text-xs text-on-surface-variant font-medium">
              Showing {filteredRequirementsList.length} requirement submissions
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant/40 p-6 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/40 text-xs uppercase text-on-surface-variant bg-surface-low">
                    <th className="p-3">Customer Info</th>
                    <th className="p-3">Category / Subtype</th>
                    <th className="p-3">Trip Purpose</th>
                    <th className="p-3">Dates & Locality</th>
                    <th className="p-3">Notes</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredRequirementsList.map(req => (
                    <tr key={req.id} className="hover:bg-surface-low/50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-on-surface">{req.fullName}</div>
                        <div className="text-xs text-primary font-mono">{req.whatsapp}</div>
                        {req.email && <div className="text-[11px] text-on-surface-variant">{req.email}</div>}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold uppercase text-xs text-on-surface">{req.vehicleCategory}</span>
                        {req.subType && <div className="text-xs text-on-surface-variant">{req.subType}</div>}
                      </td>
                      <td className="p-3 font-medium text-on-surface">{req.purpose}</td>
                      <td className="p-3 text-xs text-on-surface-variant space-y-0.5">
                        <div>📅 {req.pickupDate || 'Flexible'} → {req.returnDate || 'Flexible'}</div>
                        <div>📍 {req.location || 'Shivpuri'}</div>
                      </td>
                      <td className="p-3 text-xs text-on-surface-variant max-w-xs truncate">
                        {req.notes || 'No extra notes'}
                      </td>
                      <td className="p-3">
                        <select
                          value={req.status}
                          onChange={e => adminStore.updateRequirementStatus(req.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold border focus:outline-none cursor-pointer ${
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
        </div>
      )}

      {/* TAB 4: HOST VEHICLES LIST */}
      {activeTab === 'hosts' && (
        <div className="space-y-6">
          <div className="bg-surface p-4 rounded-2xl border border-outline-variant/40 shadow-xs flex justify-between items-center">
            <h3 className="font-headline font-bold text-lg text-on-surface">Registered Host Vehicles (Owner Listings)</h3>
            <span className="text-xs font-semibold text-primary">{filteredHostVehiclesList.length} Vehicle Submissions</span>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant/40 p-6 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/40 text-xs uppercase text-on-surface-variant bg-surface-low">
                    <th className="p-3">Owner Details</th>
                    <th className="p-3">Vehicle Model & Year</th>
                    <th className="p-3">Category & Locality</th>
                    <th className="p-3">Photos</th>
                    <th className="p-3">Condition / Notes</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredHostVehiclesList.map(h => (
                    <tr key={h.id} className="hover:bg-surface-low/50 transition-colors">
                      <td className="p-3 font-bold text-on-surface">
                        <div>{h.fullName}</div>
                        <div className="text-xs text-primary font-mono">{h.whatsapp}</div>
                        {h.email && <div className="text-[11px] text-on-surface-variant">{h.email}</div>}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-on-surface">{h.modelName}</div>
                        <div className="text-xs text-on-surface-variant">Year: {h.year}</div>
                      </td>
                      <td className="p-3 text-xs">
                        <span className="font-semibold uppercase text-primary">{h.vehicleCategory}</span>
                        <div>📍 {h.location}</div>
                      </td>
                      <td className="p-3">
                        {h.photos && h.photos.length > 0 ? (
                          <div className="flex gap-1">
                            {h.photos.map((pUrl, i) => (
                              <img key={i} src={pUrl} alt="Host photo" className="w-9 h-9 rounded object-cover border border-outline-variant/40" />
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-on-surface-variant/60">No photos</span>
                        )}
                      </td>
                      <td className="p-3 text-xs text-on-surface-variant max-w-xs truncate">
                        {h.notes || 'Clean condition'}
                      </td>
                      <td className="p-3">
                        <select
                          value={h.status}
                          onChange={e => adminStore.updateHostVehicleStatus(h.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold border focus:outline-none cursor-pointer ${
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
        </div>
      )}

      {/* TAB 5: WAITLIST SIGNUPS */}
      {activeTab === 'waitlist' && (
        <div className="space-y-6">
          <div className="bg-surface p-4 rounded-2xl border border-outline-variant/40 shadow-xs flex justify-between items-center">
            <h3 className="font-headline font-bold text-lg text-on-surface">Waitlist Early Access Registrations</h3>
            <span className="text-xs font-semibold text-primary">{filteredWaitlistList.length} Total Signups</span>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant/40 p-6 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/40 text-xs uppercase text-on-surface-variant bg-surface-low">
                    <th className="p-3">Member Name</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Interest</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3">Model Preference</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredWaitlistList.map(w => (
                    <tr key={w.id} className="hover:bg-surface-low/50 transition-colors">
                      <td className="p-3 font-bold text-on-surface">{w.fullName}</td>
                      <td className="p-3 text-xs">
                        <div className="font-mono text-primary">{w.whatsapp}</div>
                        {w.email && <div className="text-on-surface-variant">{w.email}</div>}
                      </td>
                      <td className="p-3 capitalize font-medium">{w.interest}</td>
                      <td className="p-3 text-xs text-on-surface-variant">{w.timing}</td>
                      <td className="p-3 text-xs text-on-surface-variant">{w.preferenceText || 'General'}</td>
                      <td className="p-3 text-right">
                        <a
                          href={getWhatsAppLink(w.whatsapp, `Hi ${w.fullName}! Thank you for joining the ApniRide Shivpuri pre-launch waitlist.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2.5 py-1 rounded text-xs font-semibold hover:bg-[#20ba59]"
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
        </div>
      )}

      {/* ADD / EDIT VEHICLE MODAL */}
      <AnimatePresence>
        {showVehicleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface rounded-2xl border border-outline-variant/40 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <h3 className="font-headline font-bold text-xl text-on-surface">
                  {editingVehicle ? `Edit Vehicle: ${editingVehicle.name}` : 'Add New Vehicle to Catalog'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowVehicleModal(false)}
                  className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-low cursor-pointer"
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField
                    label="Type Tag"
                    id="v-type"
                    value={vType}
                    onChange={e => setVType(e.target.value)}
                    placeholder="e.g. Scooter / SUV"
                  />

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
                    options={['Coming Soon', 'Available']}
                  />

                  <FormField
                    label="Shivpuri Location"
                    id="v-location"
                    value={vLocation}
                    onChange={e => setVLocation(e.target.value)}
                    placeholder="Madhav Chowk, Shivpuri"
                  />
                </div>

                <FormField
                  label="Image URL"
                  id="v-image"
                  value={vImage}
                  onChange={e => setVImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  helperText="Enter high-res image URL or static asset path."
                />

                <FormField
                  label="Tagline / Description"
                  id="v-tagline"
                  type="textarea"
                  value={vTagline}
                  onChange={e => setVTagline(e.target.value)}
                  placeholder="Short summary describing vehicle use in Shivpuri..."
                  rows={2}
                />

                <div className="pt-4 border-t border-outline-variant/30 flex justify-end gap-3">
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
    </div>
  );
}
