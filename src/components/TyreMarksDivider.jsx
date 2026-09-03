import React from 'react';

export default function TyreMarksDivider({
  className = '',
  variant = 'dark', // dark, subtle, primary
  height = 'h-10 sm:h-14'
}) {
  const getColorClass = () => {
    switch (variant) {
      case 'dark':
        return 'text-[#1E1B18]/30';
      case 'subtle':
        return 'text-[#C89D3C]/35';
      case 'primary':
        return 'text-[#E64A19]/40';
      default:
        return 'text-[#1E1B18]/30';
    }
  };

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none my-6 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Tyre Tread Marks Graphic */}
        <svg
          className={`w-full ${height} ${getColorClass()}`}
          viewBox="0 0 1200 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main Dual Parallel Tyre Tracks */}
          <path
            d="M 20,20 Q 200,8 400,20 T 800,20 T 1180,20"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray="14 10 6 10"
            strokeLinecap="round"
          />
          <path
            d="M 20,30 Q 200,18 400,30 T 800,30 T 1180,30"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray="14 10 6 10"
            strokeLinecap="round"
          />

          {/* Diagonal Tyre Tread Grooves */}
          {[60, 140, 220, 300, 380, 460, 540, 620, 700, 780, 860, 940, 1020, 1100].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="14" x2={x + 12} y2="36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <line x1={x + 20} y1="36" x2={x + 32} y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
        </svg>

        {/* Speed accent line */}
        <div className="w-full max-w-md h-[2px] bg-gradient-to-r from-transparent via-[#C89D3C]/40 to-transparent -mt-1" />
      </div>
    </div>
  );
}
