import { useDarkModeStore } from '../../../store/useDarkModeStore';
import BG1 from "../../../assets/bg1.avif"
import BG2 from "../../../assets/bg2.avif"
import BG3 from "../../../assets/bg3.jpg"
import Carousel from './Carousel'
import SearchBox from './SearchBox';
import CTAButtons from './CTAButtons';
import ScrollIndicator from './ScrollIndicator';
import { useCarousel } from '../../../hooks/useCarousale';
import { useSearch } from '../../../hooks/useSearch';

const MainBg = () => {
  const { isDarkMode } = useDarkModeStore();
  
  // Carousel images
  const carouselImages = [BG1, BG2, BG3];
  
  // Custom hooks
  const carousel = useCarousel(carouselImages);
  const search = useSearch();

  // Event handlers
  const handleBrowseInventory = () => {
    window.location.href = '/all-cars';
  };

  const handleScheduleTestDrive = () => {
    console.log('Schedule Test Drive clicked');
    // Add your navigation logic here
  };

  return (
    <section className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] xl:min-h-[80vh] mx-3 sm:mx-6 md:mx-8 lg:mx-12 my-3 sm:my-4 md:my-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden flex items-center justify-center">
      
      {/* Carousel Component */}
      <Carousel
        images={carouselImages}
        currentSlide={carousel.currentSlide}
        isPlaying={carousel.isPlaying}
        bgLoaded={carousel.bgLoaded}
        isDarkMode={isDarkMode}
        onPrevSlide={carousel.prevSlide}
        onNextSlide={carousel.nextSlide}
        onGoToSlide={carousel.goToSlide}
        onTogglePlayPause={carousel.togglePlayPause}
      />

      {/* Main Content */}
      <div className="relative z-40 container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Search Box Component */}
          <SearchBox
            searchQuery={search.searchQuery}
            isSearchFocused={search.isSearchFocused}
            isDarkMode={isDarkMode}
            onSearchChange={search.handleSearchChange}
            onSearchFocus={search.handleSearchFocus}
            onSearchBlur={search.handleSearchBlur}
            onSearchSubmit={search.handleSearchSubmit}
            onQuickSearch={search.handleQuickSearch}
          />

          {/* CTA Buttons Component */}
          <CTAButtons
            isDarkMode={isDarkMode}
            onBrowseInventory={handleBrowseInventory}
            onScheduleTestDrive={handleScheduleTestDrive}
          />
        </div>
      </div>
      
      {/* Scroll Indicator Component */}
      <ScrollIndicator isDarkMode={isDarkMode} />
    </section>
  );
};

export default MainBg;