// components/PopularBrandsWithModels.tsx
import React, { useState, useMemo } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useManufacturer, { type ManufacturerQuery } from '../../hooks/useManufacturers';
import useEVCars from '../../hooks/useEVCars';
import { Car, ChevronDown, Loader2 } from 'lucide-react';

interface PopularBrandsWithModelsProps {
  maxBrands?: number;
}

const PopularSearches: React.FC<PopularBrandsWithModelsProps> = ({
  maxBrands = 7
}) => {
  const { isDarkMode } = useDarkModeStore();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Set up manufacturer query to fetch all manufacturers
  const manufacturerQuery: ManufacturerQuery = {
    name: '',
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  };

  const { data: manufacturers, loading: manufacturersLoading } = useManufacturer(manufacturerQuery);
  const { data: allCars, loading: carsLoading } = useEVCars({});

  // Get first N manufacturers
  const manufacturersList = manufacturers ? manufacturers.slice(0, maxBrands) : [];

  // Extract unique models for each brand from the cars data
  const brandModels = useMemo(() => {
    if (!allCars || !manufacturersList) return {};

    const models: Record<string, string[]> = {};
    
    manufacturersList.forEach(brand => {
      // Filter cars for this brand
      const brandCars = allCars.filter(car => 
        car.manufacturer_name === brand.name && car.model_name
      );
      
      // Get unique model names for this brand
      const uniqueModels = Array.from(
        new Set(brandCars.map(car => car.model_name).filter(Boolean))
      ) as string[];
      
      models[brand.name] = uniqueModels.length > 0 ? uniqueModels : ['No models found'];
    });
    
    return models;
  }, [allCars, manufacturersList]);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(selectedBrand === brandName ? null : brandName);
  };

  const handleModelClick = (modelName: string, brandName: string) => {
    if (modelName === 'No models found') return;
    window.location.href = `/all-cars?manufacturer=${encodeURIComponent(brandName)}&model=${encodeURIComponent(modelName)}`;
  };

  const isLoading = manufacturersLoading || carsLoading;

  if (isLoading) {
    return (
      <div className={`w-full py-6 border-t ${
        isDarkMode 
          ? 'border-gray-800/50 bg-gray-900/30' 
          : 'border-gray-200/50 bg-gray-50/50'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-8">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  if (!manufacturersList || manufacturersList.length === 0) {
    return null;
  }

  return (
    <div className={`w-full py-6 border-t ${
      isDarkMode 
        ? 'border-gray-800/50 bg-gray-900/30' 
        : 'border-gray-200/50 bg-gray-50/50'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Car size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Popular Brands
              </h3>
            </div>
          </div>

          {/* Brands Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {manufacturersList.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandClick(brand.name)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 ${
                  selectedBrand === brand.name
                    ? isDarkMode
                      ? 'bg-gray-800 text-white shadow-lg'
                      : 'bg-white text-gray-900 shadow-lg border border-gray-200'
                    : isDarkMode
                      ? 'bg-gray-800/40 text-gray-400 hover:text-gray-300 hover:bg-gray-700/60 border border-gray-700/50'
                      : 'bg-white/80 text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200'
                }`}
              >
                <span className="font-medium">{brand.name}</span>
                {brand.is_ev_only && (
                  <span className="text-xs">⚡</span>
                )}
                <ChevronDown size={14} className={`transition-transform ${
                  selectedBrand === brand.name ? 'rotate-180' : ''
                }`} />
              </button>
            ))}
          </div>

          {/* Brands List (always shown below buttons) */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-4">
              {manufacturersList.map((brand, index) => (
                <React.Fragment key={brand.id}>
                  <a
                    href={`/all-cars?manufacturer=${encodeURIComponent(brand.name)}`}
                    className={`text-sm font-medium transition-colors hover:underline ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-gray-300' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {brand.name}
                    {brand.is_ev_only && (
                      <span className="ml-1 text-xs">⚡</span>
                    )}
                  </a>
                  {index < manufacturersList.length - 1 && (
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-700' : 'text-gray-300'
                    }`}>
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Models Display for Selected Brand */}
          {selectedBrand && brandModels[selectedBrand] && (
            <div className={`mb-6 p-4 rounded-lg border ${
              isDarkMode 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-gray-200 bg-white/80'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {selectedBrand} Models
                </h4>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`text-sm font-medium ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {brandModels[selectedBrand].map((model, index) => (
                  <button
                    key={index}
                    onClick={() => handleModelClick(model, selectedBrand)}
                    disabled={model === 'No models found'}
                    className={`text-sm px-3 py-2 rounded-md text-left transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDarkMode 
                        ? 'bg-gray-700/30 text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <div className="font-medium truncate">{model}</div>
                    {model !== 'No models found' && (
                      <div className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        View cars →
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-700/30">
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              {manufacturersList.length} popular brands
            </div>
            
            <a
              href="/manufacturers"
              className={`text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              View all manufacturers →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSearches;