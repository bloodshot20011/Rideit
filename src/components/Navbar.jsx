import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'VEHICLES', path: '/vehicles' },
    { label: 'REQUIREMENTS', path: '/request' },
    { label: 'HOST VEHICLE', path: '/list-your-vehicle' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#1E1B18]/10 text-[#1E1B18] transition-all">
      <div className="max-w-content mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Lockup: Circular Seal + APNI / RIDE */}
        <Link
          to="/"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="ApniRide Home"
        >
          {/* Circular Tri-Segment Seal Icon */}
          <div className="w-8 h-8 rounded-full border border-[#1E1B18]/30 overflow-hidden relative flex flex-col shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <div className="h-1/2 w-full bg-[#E64A19]" />
            <div className="h-1/2 w-full flex">
              <div className="w-1/2 bg-[#C89D3C]" />
              <div className="w-1/2 bg-[#0B132B]" />
            </div>
            <div className="absolute inset-0 rounded-full border border-black/10" />
          </div>

          {/* Stacked Wordmark */}
          <div className="flex flex-col leading-none">
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#1E1B18]">
              APNI
            </span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#1E1B18]">
              RIDE
            </span>
          </div>
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

                {/* Active Solid Dot ● Underneath Link */}
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

        {/* Right Action: Amber Pill Button with Arrow Icon */}
        <div className="hidden md:flex items-center gap-3">
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
