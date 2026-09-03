import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/', code: '01' },
    { label: 'Vehicles', path: '/vehicles', code: '02' },
    { label: 'Check Requirements', path: '/request', code: '03' },
    { label: 'List Your Vehicle', path: '/list-your-vehicle', code: '04' },
    { label: 'About', path: '/about', code: '05' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || !isHomePage
            ? 'bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#1E1B18]/15 shadow-sm text-[#1E1B18]'
            : 'bg-[#F5F2EB]/80 backdrop-blur-sm border-b border-[#1E1B18]/10 text-[#1E1B18]'
        }`}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo - Neo-Mirai Style */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-[#0B132B] text-[#E64A19] border border-[#C89D3C]/40 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl" data-weight="fill">
                electric_car
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl tracking-tight text-[#1E1B18]">
                  APNIRIDE
                </span>
                <span className="font-mono text-[9px] font-bold bg-[#E64A19] text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                  SHIVPURI
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-1.5 text-xs sm:text-sm font-headline font-semibold tracking-tight rounded-md transition-colors ${
                    isActive ? 'text-[#E64A19] font-bold' : 'text-[#45413B] hover:text-[#E64A19]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlight"
                      className="absolute inset-0 bg-[#EFECE4] rounded-md border border-[#C89D3C]/30 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin"
              className="font-mono text-xs font-semibold text-[#45413B] hover:text-[#E64A19] px-2.5 py-1 rounded border border-[#1E1B18]/20 hover:bg-[#EFECE4] transition-colors"
              title="ApniRide Admin Studio"
            >
              [Admin Studio]
            </Link>
            <Button to="/waitlist" variant="primary" size="sm">
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1E1B18] hover:bg-[#EFECE4] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#F5F2EB] border-b border-[#1E1B18]/20 shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 text-base font-headline font-semibold rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#E64A19] font-bold bg-[#EFECE4]'
                          : 'text-[#45413B] hover:text-[#E64A19] hover:bg-[#EFECE4]'
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 font-mono text-xs font-semibold text-[#E64A19] rounded-lg bg-[#E64A19]/10"
                >
                  ⚙️ Admin Control Panel
                </NavLink>
                <div className="pt-3 border-t border-[#1E1B18]/15 space-y-2">
                  <Button to="/waitlist" variant="primary" fullWidth onClick={() => setMobileMenuOpen(false)}>
                    Join the Waitlist
                  </Button>
                  <Button to="/request" variant="outline" fullWidth onClick={() => setMobileMenuOpen(false)}>
                    Check Requirements
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Bottom Quick Action Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F5F2EB]/95 backdrop-blur-md border-t border-[#1E1B18]/15 px-3 py-2 flex items-center justify-around shadow-lg">
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/' ? 'text-[#E64A19] font-bold' : 'text-[#45413B]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          Home
        </Link>
        <Link
          to="/vehicles"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/vehicles' ? 'text-[#E64A19] font-bold' : 'text-[#45413B]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">two_wheeler</span>
          Vehicles
        </Link>
        <Link
          to="/request"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/request' ? 'text-[#E64A19] font-bold' : 'text-[#45413B]'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[#E64A19] text-white flex items-center justify-center -mt-4 shadow-md">
            <span className="material-symbols-outlined text-lg">checklist</span>
          </div>
          Requirements
        </Link>

        <Link
          to="/list-your-vehicle"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/list-your-vehicle' ? 'text-[#E64A19] font-bold' : 'text-[#45413B]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">key</span>
          Host
        </Link>

        <Link
          to="/waitlist"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/waitlist' ? 'text-[#E64A19] font-bold' : 'text-[#45413B]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">star</span>
          Waitlist
        </Link>
      </div>
    </>
  );
}
