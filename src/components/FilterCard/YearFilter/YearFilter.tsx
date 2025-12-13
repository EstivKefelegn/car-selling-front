// components/FilterCard/YearFilter.tsx
import React from 'react';

interface YearFilterProps {
  years: number[];
  minYear?: number;
  maxYear?: number;
  isDarkMode: boolean;
  onMinYearChange: (year: number | undefined) => void;
  onMaxYearChange: (year: number | undefined) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({
  years,
  minYear,
  maxYear,
  isDarkMode,
  onMinYearChange,
  onMaxYearChange
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Year Range
        </label>
        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          {years[0]} - {years[years.length - 1]}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select
          value={minYear || ''}
          onChange={(e) => onMinYearChange(e.target.value ? parseInt(e.target.value) : undefined)}
          className={`px-4 py-3 rounded-xl border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-gray-800`}
        >
          <option value="">Min Year</option>
          {years.map((year) => (
            <option key={`min-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
        
        <select
          value={maxYear || ''}
          onChange={(e) => onMaxYearChange(e.target.value ? parseInt(e.target.value) : undefined)}
          className={`px-4 py-3 rounded-xl border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-gray-800`}
        >
          <option value="">Max Year</option>
          {years.map((year) => (
            <option key={`max-${year}`} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearFilter;