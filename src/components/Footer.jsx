import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#F5F2EB] border-t border-[#1E1B18]/15 py-12 mt-auto text-[#1E1B18]">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
          {/* Brand Info */}
          <div className="max-w-sm space-y-3">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-[#1E1B18]/30 overflow-hidden relative flex flex-col shrink-0">
                <div className="h-1/2 w-full bg-[#E64A19]" />
                <div className="h-1/2 w-full flex">
                  <div className="w-1/2 bg-[#C89D3C]" />
                  <div className="w-1/2 bg-[#0B132B]" />
                </div>
              </div>
              <div className="flex flex-col leading-none text-left">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#1E1B18]">APNI</span>
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#1E1B18]">RIDE</span>
              </div>
            </Link>
            <p className="font-body text-xs sm:text-sm text-[#45413B] leading-relaxed">
              Modern mobility rental platform starting in Shivpuri, Madhya Pradesh. Rent verified bikes and cars tailored to your travel requirements.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#EFECE4] text-[#E64A19] px-3 py-1 rounded-full text-xs font-mono font-semibold border border-[#1E1B18]/10">
              <span className="w-2 h-2 rounded-full bg-[#E64A19] animate-pulse" />
              Pre-launch Phase • Shivpuri, India
            </div>
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
                  <Link to="/request" className="hover:text-[#E64A19] transition-colors">Check Requirements</Link>
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
                    href="https://wa.me/918370092226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] transition-colors flex items-center gap-1"
                  >
                    <span>WhatsApp: +91 8370092226</span>
                  </a>
                </li>
                <li>
                  <span className="text-[#7C776E]">hello@apniride.in</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Discreet Admin Link */}
        <div className="border-t border-[#1E1B18]/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7C776E]">
          <p>© {new Date().getFullYear()} ApniRide. All rights reserved.</p>
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
