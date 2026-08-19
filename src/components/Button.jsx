import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  fullWidth = false,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left'
}) {
  const baseStyles = 'inline-flex items-center justify-center font-headline font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/20',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-sm shadow-secondary/20',
    outline: 'border border-outline-variant text-on-surface bg-surface hover:bg-surface-low hover:border-primary/50',
    ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-low'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`;

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-lg leading-none">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-lg leading-none">{icon}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses}>
      {renderContent()}
    </button>
  );
}
