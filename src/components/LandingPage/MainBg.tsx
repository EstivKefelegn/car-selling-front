import { useState, useEffect, useCallback } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import FindCarsButton from './FindCarsButton';
import BG1 from "../../assets/bg1.avif"
import BG2 from "../../assets/bg2.avif"
import BG3 from "../../assets/bg3.jpg"

const MainBg = () => {
  const { isDarkMode } = useDarkModeStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Updated Carousel images with premium cars
  const carouselImages = [
    BG1,
    BG2,
    BG3
  ];

  // SVG Icons
  const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = carouselImages.length;
    
    carouselImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setBgLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setBgLoaded(true);
        }
      };
    });
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, carouselImages.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Navigate to search results
      window.location.href = `/all-cars?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleBrowseInventory = () => {
    window.location.href = '/all-cars';
  };

  const handleScheduleTestDrive = () => {
    console.log('Schedule Test Drive clicked');
    // Add your navigation logic here
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    // Optionally trigger search immediately
    // window.location.href = `/all-cars?search=${encodeURIComponent(term)}`;
  };

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-800';

  return (
    // Reduced height for mobile - much shorter on mobile
    <section className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[80vh] mx-3 sm:mx-6 md:mx-8 lg:mx-12 my-3 sm:my-4 md:my-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden flex items-center justify-center">
      
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        
        {/* Gradient overlay - Adjusted for better mobile visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-20" />
      </div>

      {/* Carousel Controls - Hidden on mobile, visible on tablet+ */}
      <div className="hidden sm:flex absolute top-1/2 left-2 right-2 sm:left-4 sm:right-4 transform -translate-y-1/2 z-50 justify-between">
        <button
          onClick={prevSlide}
          className="group relative p-2 sm:p-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-white 
          shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden"
          aria-label="Previous slide"
        >
          <div className="relative z-10">
            <ChevronLeftIcon />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
        <button
          onClick={nextSlide}
          className="group relative p-2 sm:p-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-white 
          shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden"
          aria-label="Next slide"
        >
          <div className="relative z-10">
            <ChevronRightIcon />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Carousel Indicators - Smaller on mobile */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        <div className="flex space-x-1 sm:space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-gray-800 w-4 sm:w-5 md:w-6 lg:w-8' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={togglePlayPause}
          className="group relative p-1 sm:p-1.5 md:p-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-white 
          shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          <div className="relative z-10">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Loading state */}
      {!bgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="text-center px-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base md:text-lg text-white">Loading...</p>
          </div>
        </div>
      )}

      {/* Main Content - Adjusted for mobile */}
      <div className="relative z-40 container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Stylish Search Section - More compact on mobile */}
          <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              <div className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 lg:mb-6 ${
                isDarkMode 
                  ? 'bg-gray-800/60 text-white' 
                  : 'bg-white/80 text-gray-800'
              }`}>
                Start Your Journey
              </div>
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight ${textColor} drop-shadow-lg`}>
                <span className="block">Experience the difference</span>
              </h2>
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto ${subTextColor} font-light`}>
                Search through our premium collection
              </p>
            </div>

            {/* Search Box - More compact on mobile */}
            <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto px-2 sm:px-0">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <div className={`absolute -inset-0.5 sm:-inset-1 rounded-lg sm:rounded-xl md:rounded-2xl blur transition-all duration-500 ${
                  isSearchFocused 
                    ? 'opacity-100 bg-gradient-to-r from-gray-800/30 via-gray-600/20 to-gray-800/30' 
                    : 'opacity-50 bg-gradient-to-r from-gray-800/20 via-gray-600/10 to-gray-800/20'
                }`}></div>
                
                <div className={`relative flex flex-col sm:flex-row items-center rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isSearchFocused 
                    ? 'border-gray-400' 
                    : 'border-gray-300/50 hover:border-gray-400'
                } ${isDarkMode ? 'bg-gray-900/70' : 'bg-white/90'}`}>
                  <div className="flex items-center w-full sm:w-auto pl-3 pr-3 pt-2 sm:pt-0 sm:pl-4 sm:pr-3">
                    {/* Search Icon */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search cars..."
                    className={`flex-1 py-2 sm:py-3 md:py-4 px-2 sm:px-2 text-sm sm:text-base md:text-lg bg-transparent outline-none w-full ${
                      isDarkMode 
                        ? 'text-white placeholder-gray-400' 
                        : 'text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  
                  <div className="w-full sm:w-auto px-3 pb-2 sm:pb-0 sm:pr-3 sm:pl-2">
                    <FindCarsButton 
                      isDark={isDarkMode}
                      type="submit"
                      className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-xs sm:text-sm md:text-base"
                    >
                      Search
                    </FindCarsButton>
                  </div>
                </div>

                {/* Quick Search Suggestions - Hidden on mobile, visible on tablet+ */}
                <div className={`hidden sm:flex mt-3 sm:mt-4 flex-wrap gap-1.5 sm:gap-2 justify-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span className="text-xs sm:text-sm">Try:</span>
                  {['Mercedes', 'BMW', 'Tesla', 'Toyota', '2023', 'SUV', 'Electric'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleQuickSearch(term)}
                      className={`px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>

                {/* Quick Search Suggestions - Mobile only (simplified) */}
                <div className={`sm:hidden mt-2 flex flex-wrap gap-1 justify-center ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span className="text-xs">Try:</span>
                  {['Mercedes', 'BMW', 'Tesla'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleQuickSearch(term)}
                      className={`px-1.5 py-0.5 text-xs rounded-full transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </div>

          {/* CTA Buttons - More compact on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2 sm:px-0">
            <FindCarsButton 
              isDark={isDarkMode}
              onClick={handleBrowseInventory}
              className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm sm:text-base md:text-lg"
            >
              Browse Inventory
            </FindCarsButton>
            
            <button 
              onClick={handleScheduleTestDrive}
              className={`group relative w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg sm:rounded-xl font-medium sm:font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 border-2 shadow overflow-hidden ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800/60 hover:text-white backdrop-blur-sm' 
                  : 'border-gray-300 text-gray-800 hover:bg-white/80 hover:text-gray-900 backdrop-blur-sm'
              }`}
            >
              <div className="relative z-10">Our Location</div>
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                isDarkMode ? 'via-white/10' : 'via-gray-900/10'
              } to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Hidden on mobile, visible on tablet+ */}
      <div className="hidden sm:block absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="group relative w-5 h-7 sm:w-6 sm:h-8 md:w-7 md:h-10 lg:w-8 lg:h-12 border-2 rounded-full mx-auto backdrop-blur-sm overflow-hidden
          border-gray-800 hover:scale-110 transition-all duration-300"
          aria-label="Scroll down"
        >
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/20 to-transparent 
          -translate-y-full group-hover:translate-y-full transition-transform duration-700`}></div>
          <div className={`w-1 h-2 sm:w-1 sm:h-2.5 md:w-1.5 md:h-3 lg:w-1.5 lg:h-4 rounded-full mx-auto mt-1.5 sm:mt-2 md:mt-2.5 lg:mt-3 ${
            isDarkMode ? 'bg-white/80' : 'bg-gray-800/80'
          }`} />
        </button>
      </div>
    </section>
  );
}

export default MainBg;