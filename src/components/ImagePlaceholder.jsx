import React, { useState } from 'react';

export default function ImagePlaceholder({
  src,
  alt = 'Vehicle',
  type = 'vehicle',
  title = 'Vehicle',
  className = '',
  aspectRatio = 'aspect-[16/10]'
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'scooter':
      case 'bike':
      case 'commuter':
      case 'street':
      case 'premium':
        return 'two_wheeler';
      case 'car':
      case 'hatchback':
      case 'sedan':
      case 'suv':
        return 'directions_car';
      case 'owner':
        return 'key';
      case 'map':
        return 'distance';
      default:
        return 'electric_car';
    }
  };

  if (src && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-surface-low rounded-t-xl ${aspectRatio} ${className}`}>
        {/* Shimmer loading indicator */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-surface-low via-surface-container to-surface-low animate-pulse" />
        )}
        <img
          src={src}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-surface-low via-surface-container to-surface-high rounded-t-xl flex flex-col items-center justify-center p-6 border-b border-outline-variant/30 text-on-surface-variant group ${aspectRatio} ${className}`}>
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="w-16 h-16 rounded-2xl bg-surface/90 shadow-sm border border-outline-variant/40 flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
        <span className="material-symbols-outlined text-3xl" data-weight="fill">{getIcon()}</span>
      </div>
      
      <span className="font-headline font-semibold text-sm text-on-surface text-center tracking-tight">
        {title}
      </span>
      <span className="font-body text-xs text-on-surface-variant/70 mt-1 uppercase tracking-wider font-medium">
        ApniRide Fleet
      </span>
    </div>
  );
}
