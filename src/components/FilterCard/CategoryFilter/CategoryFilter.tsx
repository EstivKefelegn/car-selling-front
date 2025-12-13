import React, { useState } from 'react';
import type { CarFilter } from '../../../services/filters';

interface CategoryFilterProps {
  filters: CarFilter;
  onFilterChange: (key: keyof CarFilter, value: any) => void;
  filterOptions: {
    categories: string[];
  };
  isDarkMode: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filters,
  onFilterChange,
  filterOptions,
  isDarkMode
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter categories based on search
  const filteredCategories = React.useMemo(() => {
    if (!searchTerm.trim()) return filterOptions.categories;
    return filterOptions.categories.filter(category =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filterOptions.categories, searchTerm]);

  // Popular categories (you can customize this list)
  const popularCategories = React.useMemo(() => {
    const popular = ['sedan', 'suv', 'truck', 'hatchback', 'coupe'];
    return filterOptions.categories.filter(cat => 
      popular.includes(cat.toLowerCase())
    );
  }, [filterOptions.categories]);

  // Other categories (not in popular)
  const otherCategories = React.useMemo(() => {
    return filterOptions.categories.filter(cat => 
      !popularCategories.includes(cat)
    );
  }, [filterOptions.categories, popularCategories]);

  // Clear category filter
  const clearCategoryFilter = () => {
    onFilterChange('category', undefined);
    setSearchTerm('');
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('suv')) return '🚙';
    if (lowerCategory.includes('sedan')) return '🚗';
    if (lowerCategory.includes('truck')) return '🚚';
    if (lowerCategory.includes('hatchback')) return '🚙';
    if (lowerCategory.includes('coupe')) return '🏎️';
    if (lowerCategory.includes('convertible')) return '🚗';
    if (lowerCategory.includes('wagon')) return '🚐';
    if (lowerCategory.includes('van')) return '🚐';
    if (lowerCategory.includes('electric')) return '🔌';
    if (lowerCategory.includes('hybrid')) return '⚡';
    return '🚗';
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Category
        </label>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            {filterOptions.categories.length} types
          </span>
          {filters.category && (
            <button
              onClick={clearCategoryFilter}
              className={`text-xs px-2 py-1 rounded ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
              title="Clear category filter"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Search input for categories */}
      {filterOptions.categories.length > 5 && (
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className={`w-full px-4 py-2 rounded-lg border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-gray-800`}
          />
        </div>
      )}

      {/* Category Grid */}
      {!searchTerm ? (
        <>
          {/* Popular Categories */}
          {popularCategories.length > 0 && (
            <div className="mb-4">
              <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Popular
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {popularCategories.map((category) => {
                  const isSelected = filters.category === category;
                  return (
                    <button
                      key={category}
                      onClick={() => onFilterChange('category', isSelected ? undefined : category)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-transparent shadow-lg'
                          : isDarkMode
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700 border-gray-700'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{getCategoryIcon(category)}</span>
                      <span className="text-sm truncate">{formatCategoryName(category)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Categories - Show limited with expand option */}
          {otherCategories.length > 0 && (
            <div>
              {otherCategories.length > 6 && (
                <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Other Categories
                </p>
              )}
              
              <div className={`grid grid-cols-2 gap-2 ${expanded ? '' : 'max-h-40 overflow-hidden'}`}>
                {otherCategories.slice(0, expanded ? otherCategories.length : 6).map((category) => {
                  const isSelected = filters.category === category;
                  return (
                    <button
                      key={category}
                      onClick={() => onFilterChange('category', isSelected ? undefined : category)}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-transparent shadow-lg'
                          : isDarkMode
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700 border-gray-700'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{getCategoryIcon(category)}</span>
                      <span className="text-sm truncate">{formatCategoryName(category)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Show more/less button */}
              {otherCategories.length > 6 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className={`w-full mt-3 text-sm px-4 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'border-gray-700 text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {expanded ? 'Show Less' : `Show ${otherCategories.length - 6} More`}
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        /* Search Results */
        <div className="grid grid-cols-2 gap-2">
          {filteredCategories.map((category) => {
            const isSelected = filters.category === category;
            return (
              <button
                key={category}
                onClick={() => {
                  onFilterChange('category', isSelected ? undefined : category);
                  setSearchTerm('');
                }}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-transparent shadow-lg'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700 border-gray-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
                }`}
              >
                <span className="text-lg">{getCategoryIcon(category)}</span>
                <span className="text-sm truncate">{formatCategoryName(category)}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* No results message */}
      {searchTerm && filteredCategories.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          No categories found matching "{searchTerm}"
        </div>
      )}

      {/* Selected Category Display */}
      {filters.category && (
        <div className="mt-3 bg-gradient-to-r from-gray-800/10 to-gray-900/10 dark:from-gray-700/30 dark:to-gray-800/30 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xl">
                {getCategoryIcon(filters.category)}
              </div>
              <div>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {formatCategoryName(filters.category)}
                </span>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Selected category
                </p>
              </div>
            </div>
            <button
              onClick={clearCategoryFilter}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* All Categories Dropdown (alternative view) */}
      {filterOptions.categories.length > 0 && (
        <div className="mt-4">
          <details className={`group ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-sm font-medium">Browse All Categories</span>
              <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-2 pt-2 border-t border-gray-700 dark:border-gray-600">
              <select
                value={filters.category || ''}
                onChange={(e) => onFilterChange('category', e.target.value || undefined)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-gray-800`}
              >
                <option value="">All Categories</option>
                {filterOptions.categories.map((category) => (
                  <option key={category} value={category}>
                    {formatCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;