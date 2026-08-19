import React from 'react';

export default function FormField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  options = [],
  children,
  rows = 3
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const baseInputClasses = `w-full px-4 py-2.5 rounded-xl border bg-surface text-on-surface font-body text-sm transition-all focus:outline-none focus:ring-2 ${
    error
      ? 'border-red-500 focus:ring-red-200'
      : 'border-outline-variant/50 focus:border-primary focus:ring-primary/20 hover:border-outline'
  }`;

  return (
    <div className="space-y-1.5 text-left w-full">
      {label && (
        <label htmlFor={inputId} className="block font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={inputId}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseInputClasses} appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%20727785'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: '1.2em 1.2em'
          }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={baseInputClasses}
        />
      ) : children ? (
        children
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseInputClasses}
        />
      )}

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-on-surface-variant/75">{helperText}</p>}
    </div>
  );
}
