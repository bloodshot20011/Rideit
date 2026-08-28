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
      if (window.scrollY > 40) {
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
    { label: 'Home', path: '/' },
    { label: 'Vehicles', path: '/vehicles' },
    { label: 'Check Requirements', path: '/request' },
    { label: 'List Your Vehicle', path: '/list-your-vehicle' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || !isHomePage
            ? 'bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-xs text-on-surface'
            : 'bg-surface/75 backdrop-blur-sm border-b border-outline-variant/20 text-on-surface'
        }`}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
            <motion.span
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="material-symbols-outlined text-primary text-2xl"
              data-weight="fill"
            >
              electric_car
            </motion.span>
            <span className="font-headline font-bold text-xl text-primary tracking-tight">
              ApniRide
            </span>
            <span className="bg-surface-low text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full border border-outline-variant/40 hidden sm:inline-block">
              Shivpuri Pre-launch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlight"
                      className="absolute inset-0 bg-surface-low rounded-md -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
              className="text-xs font-medium text-on-surface-variant hover:text-primary px-2 py-1 rounded border border-outline-variant/40 hover:bg-surface-low transition-colors"
              title="ApniRide Admin Studio"
            >
              ⚙️ Admin
            </Link>
            <Button to="/waitlist" variant="primary" size="sm">
              Join the Waitlist
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-low transition-colors cursor-pointer"
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
              className="md:hidden overflow-hidden bg-surface border-b border-outline-variant/30 shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-primary font-semibold bg-surface-low border-l-4 border-primary'
                          : 'text-on-surface-variant hover:text-primary hover:bg-surface-low'
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold text-primary rounded-lg bg-primary/10"
                >
                  ⚙️ Admin Studio
                </NavLink>
                <div className="pt-3 border-t border-outline-variant/30 space-y-2">
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 px-3 py-2 flex items-center justify-around shadow-lg">
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          Home
        </Link>
        <Link
          to="/vehicles"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/vehicles' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-xl">two_wheeler</span>
          Vehicles
        </Link>
        <Link
          to="/request"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/request' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center -mt-4 shadow-md">
            <span className="material-symbols-outlined text-lg">checklist</span>
          </div>
          Requirements
        </Link>

        <Link
          to="/list-your-vehicle"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/list-your-vehicle' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-xl">key</span>
          Host Vehicle
        </Link>

        <Link
          to="/waitlist"
          className={`flex flex-col items-center gap-0.5 text-[11px] font-medium ${
            location.pathname === '/waitlist' ? 'text-primary' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-xl">star</span>
          Waitlist
        </Link>
      </div>
    </>
  );
}
