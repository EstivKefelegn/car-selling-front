// components/FilterCard/SelectFilter.tsx
import React from 'react';

interface SelectFilterProps {
  label: string;
  value: string;
  onChange: (value: string | undefined) => void;
  options: Array<{ value: string; label: string; }>;
  placeholder?: string;
  secondaryLabel?: string;
  loading?: boolean;
  isDarkMode: boolean;
  showClear?: boolean;
  onClear?: () => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select',
  secondaryLabel,
  loading = false,
  isDarkMode,
  showClear = false,
  onClear
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </label>
        {secondaryLabel && (
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {secondaryLabel}
          </span>
        )}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value || undefined)}
          className={`w-full px-4 py-3 rounded-xl border appearance-none ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-gray-800`}
        >
          <option value="">{placeholder}</option>
          {loading ? (
            <option value="" disabled>Loading...</option>
          ) : options.length > 0 ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="" disabled>No options available</option>
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      
      {value && showClear && (
        <SelectedItemDisplay
          value={value}
          onClear={onClear}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

interface SelectedItemDisplayProps {
  value: string;
  onClear?: () => void;
  isDarkMode: boolean;
}

const SelectedItemDisplay: React.FC<SelectedItemDisplayProps> = ({ value, onClear, isDarkMode }) => (
  <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-300"></div>
      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
    {onClear && (
      <button
        onClick={onClear}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

export default SelectFilter;