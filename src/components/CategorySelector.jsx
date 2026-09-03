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
    { id: 'all', label: 'All Fleet', icon: 'grid_view' },
    { id: 'bikes', label: 'Bikes & Scooters', icon: 'two_wheeler' },
    { id: 'cars', label: 'Cars & SUVs', icon: 'directions_car' }
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Main Category Tabs with Animated Glide Pill */}
      <div className="relative flex items-center justify-center gap-1.5 p-1.5 bg-[#EFECE4] rounded-xl border border-[#1E1B18]/15 max-w-md mx-auto shadow-xs">
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
              className={`relative flex-1 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-display font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 z-10 cursor-pointer ${
                isActive ? 'text-[#F5F2EB]' : 'text-[#45413B] hover:text-[#1E1B18]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-[#0B132B] rounded-lg shadow-sm border border-[#C89D3C]/40 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className={`material-symbols-outlined text-base sm:text-lg ${isActive ? 'text-[#E64A19]' : 'text-[#45413B]'}`}>
                {cat.icon}
              </span>
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
          className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono text-xs"
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onSubcategoryChange('all')}
            className={`px-3 py-1 rounded-md font-medium transition-all duration-200 cursor-pointer ${
              activeSubcategory === 'all'
                ? 'bg-[#E64A19] text-white shadow-xs'
                : 'bg-white hover:bg-[#EFECE4] text-[#45413B] border border-[#1E1B18]/15'
            }`}
          >
            [All Types]
          </motion.button>
          {subcategories.map((sub) => (
            <motion.button
              key={sub.id}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onSubcategoryChange(sub.id)}
              className={`px-3 py-1 rounded-md font-medium transition-all duration-200 cursor-pointer ${
                activeSubcategory === sub.id
                  ? 'bg-[#E64A19] text-white shadow-xs'
                  : 'bg-white hover:bg-[#EFECE4] text-[#45413B] border border-[#1E1B18]/15'
              }`}
            >
              [{sub.name}]
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
