import React, { useState, useEffect, useRef } from 'react';
import useAvailableCars from '../../hooks/cars/useAvailableCars';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import useCarFilterStore from '../../store/useCarFilterStore';
import LoadingState from './LoadingState/LoadingState';
import ErrorState from './ErrorState/ErrorState';
import EmptyState from './EmptyState/EmptyState';
import CarCard from './CarCard/CarCard';
import HeaderSection from './HeaderSection/HeaderSection';
import { filterCars, formatPrice } from './utils/helpers';
import { useFilterInfo } from './hooks/useFilterInfo';
import apiClient from '../../services/api-client';
import { useTranslation } from 'react-i18next';

// const API_BASE_URL = 'http://localhost:8000';
const API_BASE_URL = apiClient.defaults.baseURL || '';
const CARS_PER_PAGE = 6;

const AllCarsLanding: React.FC = () => {
  const { filters } = useCarFilterStore();
  const { status: featuredCars, loading, error } = useAvailableCars();
  const { isDarkMode } = useDarkModeStore();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  
  const filteredCars = React.useMemo(() => 
    filterCars(featuredCars || [], filters), 
    [featuredCars, filters]
  );
  
  const filterInfo = useFilterInfo(filters);
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculate slides
  const totalSlides = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const startIndex = currentSlide * CARS_PER_PAGE;
  const endIndex = startIndex + CARS_PER_PAGE;
  const currentCars = filteredCars.slice(startIndex, endIndex);
  
  // Reset to first slide when filters change
  useEffect(() => {
    setCurrentSlide(0);
  }, [filters]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };

  // Auto-advance slides (optional)
  useEffect(() => {
    if (totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, totalSlides]);

  if (loading) return <LoadingState isDarkMode={isDarkMode} />;
  if (error) return <ErrorState error={error} isDarkMode={isDarkMode} />;
  if (!filteredCars || filteredCars.length === 0) {
    return <EmptyState 
      activeFilterCount={filterInfo.activeFilterCount}
      filters={filters}
      isDarkMode={isDarkMode}
      priceFilterText={filterInfo.priceFilterText}
      featuredCars={featuredCars}
    />;
  }

  const renderSlideIndicators = () => {
    if (totalSlides <= 1) return null;

    return (
      <div className="flex justify-center items-center space-x-3 mt-8">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-2 rounded-full transition-all duration-200 z-50 ${
            currentSlide === 0
              ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
          aria-label={t('allCars.previousSlide')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center space-x-2 z-50">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                currentSlide === index
                  ? 'w-8 h-2 bg-blue-600 rounded-full'
                  : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
              }`}
              aria-label={t('allCars.goToSlide', { index: index + 1 })}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`p-2 rounded-full transition-all duration-200 z-50 ${
            currentSlide === totalSlides - 1
              ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
          aria-label={t('allCars.nextSlide')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  const renderProgressBar = () => {
    if (totalSlides <= 1) return null;

    return (
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 mt-4 z-30">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    );
  };

  return (
    <div className={`relative py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="relative max-w-7xl mx-auto px-4">
        <HeaderSection 
          isDarkMode={isDarkMode}
          activeFilterCount={filterInfo.activeFilterCount}
          filteredCarsCount={filteredCars.length}
          totalCarsCount={featuredCars?.length || 0}
          filters={filters}
          filterInfo={filterInfo}
        />

        {/* Slide info */}
        <div className="flex justify-between items-center mb-8 z-30 relative">
          <div className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {/* {t('allCars.showing')} {startIndex + 1}-{Math.min(endIndex, filteredCars.length)} {t('allCars.of')} {filteredCars.length} */}
          {t('allCars.showing')} {startIndex + 1}-{Math.min(endIndex, filteredCars.length)} {t('allCars.of')} {filteredCars.length}
          </div>
          {totalSlides > 1 && (
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('allCars.slideOf', { 
                current: currentSlide + 1, 
                total: totalSlides 
              })}
            </div>
          )}
        </div>

        {/* Cars slide container */}
        <div 
          ref={slideContainerRef}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous button with backdrop blur only on the button itself */}
          {totalSlides > 1 && (
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full shadow-2xl transition-all duration-200 ${
                currentSlide === 0
                  ? 'opacity-0 cursor-default'
                  : 'opacity-100 hover:scale-110 active:scale-95'
              } ${
                isMobile 
                  ? 'backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/50' 
                  : isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-label={t('allCars.previousSlide')}
              style={{ 
                left: isMobile ? '0.5rem' : '-1rem',
                zIndex: 100
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next button with backdrop blur only on the button itself */}
          {totalSlides > 1 && (
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full shadow-2xl transition-all duration-200 ${
                currentSlide === totalSlides - 1
                  ? 'opacity-0 cursor-default'
                  : 'opacity-100 hover:scale-110 active:scale-95'
              } ${
                isMobile 
                  ? 'backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/50' 
                  : isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-label={t('allCars.nextSlide')}
              style={{ 
                right: isMobile ? '0.5rem' : '-1rem',
                zIndex: 100
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Cars grid - showing 6 cars per slide */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {currentCars.map((car) => (
              <div 
                key={car.id}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: 1,
                  transform: 'translateX(0)',
                }}
              >
                <CarCard 
                  car={car}
                  isDarkMode={isDarkMode}
                  apiBaseUrl={API_BASE_URL}
                  formatPrice={formatPrice}
                />
              </div>
            ))}
          </div>

          {/* Mobile gradient overlays for better button visibility (without blurring content) */}
          {isMobile && totalSlides > 1 && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-40"
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(to right, rgba(17, 24, 39, 0.7), transparent)' 
                    : 'linear-gradient(to right, rgba(255, 255, 255, 0.7), transparent)'
                }}
              />
              <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-40"
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(to left, rgba(17, 24, 39, 0.7), transparent)' 
                    : 'linear-gradient(to left, rgba(255, 255, 255, 0.7), transparent)'
                }}
              />
            </>
          )}
        </div>

        {/* Slide indicators */}
        {renderSlideIndicators()}

        {/* Progress bar */}
        {renderProgressBar()}

        {/* View all vehicles button */}
        {filteredCars.length > 0 && (
          <div className="text-center mt-12 relative">
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              {t('allCars.vehiclesAvailable', { count: filteredCars.length })}
              {filteredCars.length !== (featuredCars?.length || 0) && 
                ` (${t('allCars.filteredFrom', { total: featuredCars?.length || 0 })})`
              }
            </div>
            {/* <button className={`inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 group overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 relative
              bg-gradient-to-r from-gray-800 to-gray-900 text-white`}>
              <div className="relative z-10 flex items-center space-x-2">
                <span>{t('allCars.viewAllVehicles')}</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCarsLanding;