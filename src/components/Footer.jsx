import React from 'react';
import { Link } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';

import logoImg from '../assets/logo.png';

export default function Footer() {
  const { openSurvey } = useSurvey();

  return (
    <footer className="bg-[#F5F2EB] border-t border-[#1E1B18]/15 py-12 mt-auto text-[#1E1B18]">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
          {/* Brand Info */}
          <div className="max-w-sm space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src={logoImg}
                alt="RIDEONN Logo"
                className="w-8 h-8 rounded-lg object-contain shrink-0 bg-white/40 p-0.5 border border-[#1E1B18]/10 shadow-2xs"
              />
              <span className="font-display font-black text-lg tracking-wider text-[#1E1B18]">
                RIDEONN
              </span>
            </Link>
            <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed">
              Modern mobility rental platform starting in Shivpuri, Madhya Pradesh. Rent verified bikes and cars tailored to your travel requirements.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs sm:text-sm font-mono">
            <div>
              <h4 className="font-display font-bold text-[#1E1B18] uppercase tracking-wider mb-3">Explore</h4>
              <ul className="space-y-2 text-[#45413B]">
                <li>
                  <Link to="/" className="hover:text-[#E64A19] transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/vehicles" className="hover:text-[#E64A19] transition-colors">Vehicles</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#E64A19] transition-colors">About Us</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-[#1E1B18] uppercase tracking-wider mb-3">Get Involved</h4>
              <ul className="space-y-2 text-[#45413B]">
                <li>
                  <button
                    type="button"
                    onClick={() => openSurvey()}
                    className="hover:text-[#E64A19] transition-colors cursor-pointer text-left"
                  >
                    Quick Survey
                  </button>
                </li>
                <li>
                  <Link to="/list-your-vehicle" className="hover:text-[#E64A19] transition-colors">List Your Vehicle</Link>
                </li>
                <li>
                  <Link to="/waitlist" className="hover:text-[#E64A19] transition-colors">Join Waitlist</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-[#1E1B18] uppercase tracking-wider mb-3">Contact</h4>
              <ul className="space-y-2 text-[#45413B]">
                <li>
                  <a
                    href="https://wa.me/9183892226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] transition-colors flex items-center gap-1"
                  >
                    <span>WhatsApp: +91 9183892226</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:rideonnshivpuri@gmail.com" className="text-[#7C776E] hover:text-[#E64A19] transition-colors">
                    rideonnshivpuri@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Discreet Admin Link */}
        <div className="border-t border-[#1E1B18]/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7C776E]">
          <p>© {new Date().getFullYear()} RIDEONN. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Shivpuri, MP</span>
            <span>•</span>
            <Link
              to="/admin"
              className="text-[#7C776E] hover:text-[#E64A19] transition-colors"
              title="Admin Control Studio"
            >
              [Admin Studio]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
