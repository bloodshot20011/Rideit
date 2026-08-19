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
        <div className="inline-flex items-center gap-1.5 bg-surface-low text-primary px-3 py-1 rounded-full mb-4 border border-outline-variant/40 shadow-xs">
          <span className="material-symbols-outlined text-sm leading-none text-primary" data-weight="fill">
            {pillIcon}
          </span>
          <span className="font-body text-xs font-semibold tracking-wide uppercase">
            {pillTag}
          </span>
        </div>
      )}
      
      {title && (
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight mb-3">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
