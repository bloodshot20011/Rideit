import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import RequestPage from './pages/RequestPage';
import ListVehiclePage from './pages/ListVehiclePage';
import AboutPage from './pages/AboutPage';
import WaitlistPage from './pages/WaitlistPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/list-your-vehicle" element={<ListVehiclePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
