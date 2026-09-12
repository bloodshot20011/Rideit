import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurvey } from '../context/SurveyContext';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openSurvey } = useSurvey();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'VEHICLES', path: '/vehicles' },
    { label: 'HOST VEHICLE', path: '/list-your-vehicle' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#1E1B18]/10 text-[#1E1B18] transition-all">
      <div className="max-w-content mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Lockup: RIDEONN 3D Logo + Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="RIDEONN Home"
        >
          {/* Logo Graphic */}
          <img
            src={logoImg}
            alt="RIDEONN Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain shrink-0 shadow-2xs group-hover:scale-105 transition-transform bg-white/40 p-0.5 border border-[#1E1B18]/10"
          />

          {/* Wordmark */}
          <span className="font-display font-black text-base sm:text-lg tracking-wider text-[#1E1B18] group-hover:text-[#E64A19] transition-colors">
            RIDEONN
          </span>
        </Link>

        {/* Center Navigation Links with Active Black Dot */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center py-2 group"
              >
                <span
                  className={`font-mono text-xs tracking-wider transition-colors ${
                    isActive
                      ? 'text-[#1E1B18] font-bold'
                      : 'text-[#45413B] hover:text-[#1E1B18]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Solid Dot Underneath Link */}
                {isActive ? (
                  <motion.span
                    layoutId="activeDot"
                    className="w-1.5 h-1.5 rounded-full bg-[#1E1B18] mt-1"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent mt-1 group-hover:bg-[#1E1B18]/30 transition-colors" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions: Quick Survey Button + Get Started */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Survey Trigger */}
          <button
            type="button"
            onClick={() => openSurvey()}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FAF8F5] text-[#1E1B18] border border-[#1E1B18]/20 hover:border-[#E64A19] font-mono text-xs font-semibold px-3.5 py-2 rounded-full shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#E64A19]">assignment</span>
            <span>QUICK SURVEY</span>
          </button>

          {/* Get Started Waitlist Link */}
          <Link
            to="/waitlist"
            className="inline-flex items-center gap-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-mono text-xs font-semibold px-4 py-2 rounded-full shadow-xs transition-all hover:shadow-sm"
          >
            <span>GET STARTED</span>
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              →
            </span>
          </Link>
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
                    className={`block px-4 py-3 font-mono text-xs tracking-wider font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'text-[#E64A19] font-bold bg-[#EFECE4]'
                        : 'text-[#45413B] hover:text-[#E64A19] hover:bg-[#EFECE4]'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                );
              })}

              <div className="pt-3 border-t border-[#1E1B18]/15 space-y-2">
                {/* Quick Survey Mobile Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSurvey();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF8F5] text-[#1E1B18] border border-[#1E1B18]/20 font-mono text-xs font-bold px-4 py-3 rounded-full shadow-2xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-[#E64A19]">assignment</span>
                  <span>QUICK VEHICLE SURVEY</span>
                </button>

                {/* Join Waitlist Mobile Button */}
                <Link
                  to="/waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E64A19] text-white font-mono text-xs font-semibold px-4 py-3 rounded-full shadow-xs"
                >
                  <span>JOIN WAITLIST</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
