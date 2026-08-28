import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant/30 py-12 mt-auto">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
          {/* Brand Info */}
          <div className="max-w-sm space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl" data-weight="fill">
                electric_car
              </span>
              <span className="font-headline font-bold text-xl text-primary tracking-tight">
                ApniRide
              </span>
            </Link>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Modern mobility rental platform starting in Shivpuri, Madhya Pradesh. Rent verified bikes & cars tailored to your travel requirements.
            </p>
            <div className="inline-flex items-center gap-2 bg-surface-low text-primary px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/40">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Pre-launch Phase — Shivpuri, India
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-headline font-semibold text-on-surface mb-3">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/vehicles" className="text-on-surface-variant hover:text-primary transition-colors">Vehicles</Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-on-surface-variant hover:text-primary transition-colors">How It Works</Link>
                </li>
                <li>
                  <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">About Us</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-semibold text-on-surface mb-3">Get Involved</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/waitlist" className="text-on-surface-variant hover:text-primary transition-colors">Join Waitlist</Link>
                </li>
                <li>
                  <Link to="/request" className="text-on-surface-variant hover:text-primary transition-colors">Check Requirements</Link>
                </li>
                <li>
                  <Link to="/admin" className="text-primary font-medium hover:underline">⚙️ Admin Studio</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline font-semibold text-on-surface mb-3">Information</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-on-surface-variant/70 cursor-not-allowed">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-on-surface-variant/70 cursor-not-allowed">Terms of Service</span>
                </li>
                <li>
                  <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/30 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© {new Date().getFullYear()} ApniRide. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Pre-launch Prototype • Designed for Shivpuri, MP • <Link to="/admin" className="hover:underline text-primary">Admin Studio</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
