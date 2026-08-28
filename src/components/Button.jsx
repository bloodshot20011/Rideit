import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, text
  size = 'md', // sm, md, lg
  fullWidth = false,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left'
}) {
  const baseStyles = 'inline-flex items-center justify-center font-headline font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md border border-transparent',
    secondary: 'bg-surface-low text-primary hover:bg-surface-high border border-outline-variant/40',
    outline: 'border border-outline-variant/60 text-on-surface hover:border-primary hover:text-primary bg-surface/50 hover:bg-surface-low',
    text: 'text-primary hover:bg-surface-low border border-transparent'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5'
  };

  const combinedClasses = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[1.2em] shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[1.2em] shrink-0">{icon}</span>
      )}
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02, y: -1 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  };

  if (to) {
    return (
      <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
        <Link to={to} className={combinedClasses} onClick={onClick}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} onClick={onClick}>
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}
