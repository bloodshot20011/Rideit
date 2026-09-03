import React from 'react';

export default function SectionHeading({
  pillTag,
  pillIcon = 'bolt',
  title,
  subtitle,
  align = 'center',
  className = ''
}) {
  const alignClasses = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <div className={`flex flex-col max-w-2xl mx-auto mb-10 ${alignClasses} ${className}`}>
      {pillTag && (
        <div className="inline-flex items-center gap-1.5 bg-[#0B132B] text-[#C89D3C] px-3 py-1 rounded-md mb-4 border border-[#C89D3C]/40 shadow-xs">
          <span className="material-symbols-outlined text-xs leading-none text-[#E64A19]" data-weight="fill">
            {pillIcon}
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase">
            {pillTag}
          </span>
        </div>
      )}
      
      {title && (
        <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1B18] tracking-tight mb-3 uppercase">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="font-body text-base sm:text-lg text-[#45413B] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
