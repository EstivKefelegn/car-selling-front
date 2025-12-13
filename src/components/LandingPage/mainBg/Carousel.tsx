// components/hero/Carousel.tsx
import React, { useCallback } from 'react';

interface CarouselProps {
  images: string[];
  currentSlide: number;
  isPlaying: boolean;
  bgLoaded: boolean;
  isDarkMode: boolean;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
  onTogglePlayPause: () => void;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  currentSlide,
  isPlaying,
  bgLoaded,
  isDarkMode,
  onPrevSlide,
  onNextSlide,
  onGoToSlide,
  onTogglePlayPause
}) => {
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

  return (
    <>
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
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
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-20" />
      </div>

      {/* Carousel Controls - Hidden on mobile, visible on tablet+ */}
      <div className="hidden sm:flex absolute top-1/2 left-2 right-2 sm:left-4 sm:right-4 transform -translate-y-1/2 z-50 justify-between">
        <button
          onClick={onPrevSlide}
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
          onClick={onNextSlide}
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

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        <div className="flex space-x-1 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
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
          onClick={onTogglePlayPause}
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
    </>
  );
};

export default Carousel;