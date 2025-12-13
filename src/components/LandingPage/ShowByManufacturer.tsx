// components/ShopByManufacturer.tsx
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useManufacturer, { type Manufacturer, type ManufacturerQuery } from '../../hooks/useManufacturers';
import useEVCars from '../../hooks/useEVCars';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import apiClient from '../../services/api-client';

interface ShopByManufacturerProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

const ShopByManufacturer: React.FC<ShopByManufacturerProps> = ({
  title = "Shop by Make",
  subtitle = "Browse cars by manufacturer",
  maxItems = 12
}) => {
  const { isDarkMode } = useDarkModeStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [manufacturerCarImages, setManufacturerCarImages] = useState<Record<string, string>>({});

  // Set up manufacturer query to fetch all manufacturers
  const manufacturerQuery: ManufacturerQuery = {
    name: '',
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  };

  const { data: manufacturers, loading: manufacturersLoading, error: manufacturersError } = useManufacturer(manufacturerQuery);

  // Get unique manufacturer names
  const manufacturerNames = useMemo(() => {
    return (manufacturers || []).slice(0, maxItems).map(m => m.name);
  }, [manufacturers, maxItems]);

  // Fetch latest car for each manufacturer
  const { data: allCars, loading: carsLoading } = useEVCars({
    featured: undefined // Get all cars
  });

  // Process car images when manufacturers and cars are loaded
  useEffect(() => {
    if (!manufacturersLoading && !carsLoading && allCars && manufacturerNames.length > 0) {
      console.log('Processing car images for manufacturers:', manufacturerNames);
      console.log('Available cars:', allCars.length);
      
      const images: Record<string, string> = {};
      
      manufacturerNames.forEach(manufacturerName => {
        // Find cars for this manufacturer
        const manufacturerCars = allCars.filter(car => 
          car.manufacturer_name === manufacturerName && car.main_image_url
        );
        
        console.log(`${manufacturerName}: Found ${manufacturerCars.length} cars with images`);
        
        if (manufacturerCars.length > 0) {
          // Sort by created_at to get the latest
          const latestCar = manufacturerCars.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )[0];
          
          console.log(`${manufacturerName}: Latest car image URL:`, latestCar.main_image_url);
          images[manufacturerName] = latestCar.main_image_url;
        } else {
          console.log(`${manufacturerName}: No cars with images found`);
        }
      });
      
      console.log('Manufacturer car images:', images);
      setManufacturerCarImages(images);
    }
  }, [manufacturersLoading, carsLoading, allCars, manufacturerNames]);

  // Filter manufacturers and limit to maxItems
  const filteredManufacturers = (manufacturers || []).slice(0, maxItems);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Helper to build image URL
  const buildImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it starts with /, it's probably a relative path from backend
    if (imagePath.startsWith('/')) {
      const backendUrl = 'http://localhost:8000';
      return `${backendUrl}${imagePath}`;
    }
    
    // Otherwise, assume it's a relative path
    return imagePath;
  };

  // Get car image for manufacturer
  const getManufacturerCarImage = (manufacturerName: string) => {
    const imageUrl = manufacturerCarImages[manufacturerName];
    return imageUrl ? buildImageUrl(imageUrl) : null;
  };

  if (manufacturersError) {
    return (
      <div className="py-8">
        <div className={`rounded-xl p-6 text-center ${
          isDarkMode ? 'bg-gray-800/40' : 'bg-white/60'
        } backdrop-blur-sm`}>
          <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
            Failed to load manufacturers
          </p>
        </div>
      </div>
    );
  }

  const isLoading = manufacturersLoading || carsLoading;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {subtitle}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="relative">
            <div className="flex space-x-6 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-48 h-56 rounded-xl animate-pulse ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                  }`}
                >
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manufacturer Grid with Horizontal Scroll */}
        {!isLoading && filteredManufacturers.length > 0 && (
          <div className="relative group">
            {/* Scroll Buttons */}
            <button
              onClick={scrollLeft}
              className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isDarkMode 
                  ? 'bg-gray-800/80 text-white hover:bg-gray-700 backdrop-blur-sm' 
                  : 'bg-white/90 text-gray-800 hover:bg-white border border-gray-300 backdrop-blur-sm'
              } shadow-xl hover:scale-110`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={scrollRight}
              className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isDarkMode 
                  ? 'bg-gray-800/80 text-white hover:bg-gray-700 backdrop-blur-sm' 
                  : 'bg-white/90 text-gray-800 hover:bg-white border border-gray-300 backdrop-blur-sm'
              } shadow-xl hover:scale-110`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>

            {/* Scroll Container - No padding to avoid extra spacing */}
            <div 
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide px-4"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
             
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {filteredManufacturers.map((manufacturer) => {
                const carImage = getManufacturerCarImage(manufacturer.name);
                console.log(`Rendering ${manufacturer.name}:`, carImage);
                
                return (
                  <div
                    key={manufacturer.id}
                    className="flex-shrink-0 w-48"
                  >
                    <Link
                      to={`/all-cars?manufacturer=${encodeURIComponent(manufacturer.name)}`}
                      className={`group block rounded-xl overflow-hidden transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gradient-to-b from-gray-800/40 to-gray-900/40' 
                          : 'bg-gradient-to-b from-white to-gray-50'
                      } hover:scale-105 hover:shadow-xl border ${
                        isDarkMode ? 'border-gray-700/50' : 'border-gray-200'
                      }`}
                    >
                      {/* Car Image Container */}
                      <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {carImage ? (
                          <>
                            <img
                              src={carImage}
                              alt={`Latest ${manufacturer.name} car`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                console.error(`Failed to load image for ${manufacturer.name}:`, carImage);
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                // Show fallback
                                const parent = target.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = `w-full h-full flex items-center justify-center ${
                                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                                  }`;
                                  fallback.innerHTML = `<span class="text-lg font-medium ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                  }">${manufacturer.name}</span>`;
                                  parent.appendChild(fallback);
                                }
                              }}
                              onLoad={() => {
                                console.log(`Successfully loaded image for ${manufacturer.name}:`, carImage);
                              }}
                            />
                            {/* Image loading overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </>
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <span className={`text-lg font-medium ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {manufacturer.name}
                            </span>
                          </div>
                        )}
                        
                        {/* EV Badge */}
                        {manufacturer.is_ev_only && (
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                              isDarkMode 
                                ? 'bg-green-900/80 text-green-200' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              <span>⚡</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Link>

                    {/* Manufacturer Name - Centered below card */}
                    <div className="mt-3 text-center">
                      <h3 className={`text-lg font-semibold truncate ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {manufacturer.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll gradient overlays */}
            <div className={`absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r ${
              isDarkMode 
                ? 'from-gray-900 to-transparent' 
                : 'from-white to-transparent'
            } pointer-events-none`} />
            <div className={`absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l ${
              isDarkMode 
                ? 'from-gray-900 to-transparent' 
                : 'from-white to-transparent'
            } pointer-events-none`} />
          </div>
        )}

        {/* Manufacturer Count */}
        {!isLoading && filteredManufacturers.length > 0 && (
          <div className={`text-center mt-6 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {filteredManufacturers.length} manufacturers available
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredManufacturers.length === 0 && (
          <div className="text-center py-12">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              No manufacturers found
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByManufacturer;