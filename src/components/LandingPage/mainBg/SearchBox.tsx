import React from 'react';
import FindCarsButton from '../../../utils/FindCarsButton';
import { useTranslation } from 'react-i18next';

interface SearchBoxProps {
  searchQuery: string;
  isSearchFocused: boolean;
  isDarkMode: boolean;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onQuickSearch: (term: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  isSearchFocused,
  isDarkMode,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onSearchSubmit,
  onQuickSearch
}) => {
  const { t } = useTranslation();

  const quickSearchTerms = ['Mercedes', 'BMW', 'Tesla', 'Toyota', '2023', 'SUV', 'Electric'];
  const mobileQuickSearchTerms = ['Mercedes', 'BMW', 'Tesla'];

  return (
    <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
      <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <div className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 lg:mb-6 ${
          isDarkMode 
            ? 'bg-gray-800/60 text-white' 
            : 'bg-white/80 text-gray-800'
        }`}>
          {t('startYourJourney')}
        </div>
        <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        } drop-shadow-lg`}>
          <span className="block">{t('experienceTheDifference')}</span>
        </h2>
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        } font-light`}>
          {t('searchPremiumCollection')}
        </p>
      </div>

      <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto px-2 sm:px-0">
        <form onSubmit={onSearchSubmit} className="relative group">
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
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onSearchFocus}
              onBlur={onSearchBlur}
              placeholder={t('searchPlaceholder')}
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
                {t('search')}
              </FindCarsButton>
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className={`hidden sm:flex mt-3 sm:mt-4 flex-wrap gap-1.5 sm:gap-2 justify-center ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <span className="text-xs sm:text-sm">{t('try')}</span>
            {quickSearchTerms.map(term => (
              <button
                key={term}
                type="button"
                onClick={() => onQuickSearch(term)}
                className={`px-2 py-1 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-white/50 hover:bg-white/70'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          <div className={`sm:hidden mt-2 flex flex-wrap gap-1 justify-center ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <span className="text-xs">{t('try')}</span>
            {mobileQuickSearchTerms.map(term => (
              <button
                key={term}
                type="button"
                onClick={() => onQuickSearch(term)}
                className={`px-1.5 py-0.5 text-xs rounded-full transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-white/50 hover:bg-white/70'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
