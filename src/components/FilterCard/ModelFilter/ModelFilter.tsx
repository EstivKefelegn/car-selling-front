import React, { useState } from 'react';
import type { CarFilter } from '../../../services/filters';

interface ModelFilterProps {
  filters: CarFilter;
  onFilterChange: (key: keyof CarFilter, value: any) => void;
  filterOptions: {
    models: string[];
  };
  carsLoading: boolean;
  isDarkMode: boolean;
}

const ModelFilter: React.FC<ModelFilterProps> = ({
  filters,
  onFilterChange,
  filterOptions,
  carsLoading,
  isDarkMode
}) => {
  const [modelSearch, setModelSearch] = useState('');

  // Filter models based on search
  const filteredModels = React.useMemo(() => {
    if (!modelSearch.trim()) return filterOptions.models;
    return filterOptions.models.filter(model =>
      model.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [filterOptions.models, modelSearch]);

  // Clear model filter
  const clearModelFilter = () => {
    onFilterChange('model', undefined);
    setModelSearch('');
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Model
        </label>
        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          {filterOptions.models.length} models
        </span>
      </div>

      {/* Search input for models */}
      <div className="mb-3">
        <input
          type="text"
          value={modelSearch}
          onChange={(e) => setModelSearch(e.target.value)}
          placeholder="Search models..."
          className={`w-full px-4 py-2 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-gray-800`}
        />
      </div>

      <div className="relative">
        <select
          value={filters.model || ''}
          onChange={(e) => {
            onFilterChange('model', e.target.value || undefined);
            setModelSearch('');
          }}
          className={`w-full px-4 py-3 rounded-xl border appearance-none ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          disabled={carsLoading}
        >
          <option value="">Select Model</option>
          {carsLoading ? (
            <option value="" disabled>Loading models...</option>
          ) : filteredModels.length > 0 ? (
            filteredModels.map((model, index) => (
              <option key={`${model}-${index}`} value={model}>
                {model}
              </option>
            ))
          ) : (
            <option value="" disabled>
              {modelSearch ? `No models matching "${modelSearch}"` : 'No models available'}
            </option>
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      
      {/* Selected Model Display */}
      {filters.model && (
        <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-800 dark:bg-gray-300"></div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              {filters.model}
            </span>
          </div>
          <button
            onClick={clearModelFilter}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Show search results count */}
      {modelSearch && !filters.model && (
        <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Found {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default ModelFilter;