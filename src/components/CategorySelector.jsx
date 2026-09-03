import React from 'react';
import { motion } from 'framer-motion';

export default function CategorySelector({
  activeCategory = 'all',
  onCategoryChange,
  activeSubcategory = 'all',
  onSubcategoryChange,
  subcategories = []
}) {
  const categories = [
    { id: 'all', label: 'All Vehicles', icon: 'grid_view' },
    { id: 'bikes', label: 'Bikes & Scooters', icon: 'two_wheeler' },
    { id: 'cars', label: 'Cars', icon: 'directions_car' }
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Main Category Tabs with Animated Glide Pill */}
      <div className="relative flex items-center justify-center gap-1.5 p-1.5 bg-surface-low rounded-xl border border-outline-variant/40 max-w-md mx-auto shadow-xs">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onCategoryChange(cat.id);
                if (onSubcategoryChange) onSubcategoryChange('all');
              }}
              className={`relative flex-1 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-headline font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 z-10 cursor-pointer ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-white rounded-lg shadow-xs border border-outline-variant/30 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="material-symbols-outlined text-base sm:text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Subcategory Pills with Framer Motion entrance */}
      {subcategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-1"
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onSubcategoryChange('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeSubcategory === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white hover:bg-surface-low text-on-surface-variant border border-outline-variant/40'
            }`}
          >
            All Types
          </motion.button>
          {subcategories.map((sub) => (
            <motion.button
              key={sub.id}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onSubcategoryChange(sub.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeSubcategory === sub.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white hover:bg-surface-low text-on-surface-variant border border-outline-variant/40'
              }`}
            >
              {sub.name}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
