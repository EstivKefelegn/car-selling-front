import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo.png';
import useManufacturer, { type ManufacturerQuery } from '../../hooks/useManufacturers'; 
import DarkModeButton from '../../utils/DarkModeButton';
import FindCarsButton from '../../utils/FindCars';
import MobileToggleButton from '../../utils/MobileToggleButton';

interface HeaderProps {
    isDarkMode: boolean;
    handleToggle: () => void;
}

interface DropdownItem {
  id: number | string;
  name: string;
  link: string;
  icon?: string;
}

type DropdownKey = 'buy' | 'newCars' | 'services' | 'more';

interface MenuItem {
  name: string;
  hasDropdown: boolean;
  key: string;
  link?: string; 
}

interface DropdownData {
  buy: DropdownItem[];
  newCars: DropdownItem[];
  services: DropdownItem[];
  more: DropdownItem[];
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, handleToggle }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [dropdownData, setDropdownData] = useState<DropdownData>({
    buy: [],
    newCars: [],
    services: [],
    more: []
  });

  // Initialize manufacturer query
  const [manufacturerQuery] = useState<ManufacturerQuery>({
    name: '', // Empty string to get all manufacturers
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  });

  // Use the manufacturer hook - CORRECTED: using 'loading' instead of 'isLoading'
  const { data: manufacturers, loading: manufacturersLoading, error: manufacturersError } = 
    useManufacturer(manufacturerQuery);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Transform manufacturers data for dropdown
        const manufacturerItems = manufacturers?.map(manufacturer => ({
          id: manufacturer.id,
          name: manufacturer.name,
          link: `/manufacturers/${manufacturer.id}`,
          icon: '🚗'
        })) || [];

        setDropdownData({
          buy: manufacturerItems, // Populate buy dropdown with manufacturers
          newCars: [],
          services: [],
          more: []
        });
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    
    fetchDropdownData();
  }, [manufacturers]); // Re-run when manufacturers data changes

  const toggleDropdown = (menu: string): void => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeAllDropdowns = (): void => {
    setActiveDropdown(null);
  };

  const isDropdownKey = (key: string): key is DropdownKey => {
    return ['buy', 'newCars', 'services', 'more'].includes(key);
  };

  const menuItems: MenuItem[] = [
    { name: 'News', hasDropdown: false, key: 'news', link: '/news' },
    { name: 'Buy', hasDropdown: true, key: 'buy' },
    { name: 'Discounts', hasDropdown: false, key: 'discounts', link: '/discounts' },
    { name: 'Finance', hasDropdown: false, key: 'finance', link: '/finance' },
    { name: 'New Cars', hasDropdown: true, key: 'newCars' },
    { name: 'Services', hasDropdown: true, key: 'services' },
    { name: 'Events', hasDropdown: false, key: 'events', link: '/events' },
    { name: 'More', hasDropdown: true, key: 'more' }
  ];

  const handleMobileItemClick = (item: MenuItem): void => {
    if (item.hasDropdown) {
      toggleDropdown(item.key);
    } else if (item.link) {
      window.location.href = item.link;
      setIsMobileMenuOpen(false);
    }
  };

  const renderDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) return null;
    const items = dropdownData[key];

    // Special rendering for Buy dropdown with manufacturers
    if (key === 'buy') {
      if (manufacturersLoading) {
        return (
          <div className="px-4 py-8 text-center">
            <div className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2 ${
              isDarkMode ? 'border-gray-400' : 'border-gray-600'
            }`}></div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading manufacturers...
            </p>
          </div>
        );
      }

      if (manufacturersError) {
        return (
          <div className="px-4 py-8 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
              Failed to load manufacturers
            </p>
          </div>
        );
      }

      if (!manufacturers || manufacturers.length === 0) {
        return (
          <div className="px-4 py-8 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No manufacturers found
            </p>
          </div>
        );
      }

      return (
        <div className="max-h-96 overflow-y-auto
        [&::-webkit-scrollbar]:hidden 
        [-ms-overflow-style:'none'] 
        [scrollbar-width:'none']">
          {/* Manufacturer count */}
          <div className={`px-4 py-2 text-xs border-b ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
            {manufacturers.length} manufacturers
          </div>
          
          {/* Manufacturers list */}
          {manufacturers.map(manufacturer => (
            <a
              key={manufacturer.id}
              href={`/manufacturers/${manufacturer.id}`}
              className={`group flex items-center px-4 py-3 text-sm transition-all duration-300 hover:pl-6 rounded-lg ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mr-3 text-lg">🚗</span>
              <div className="flex-1">
                <div className="font-medium">{manufacturer.name}</div>
                <div className={`text-xs mt-1 flex items-center space-x-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>{manufacturer.country}</span>
                  <span>•</span>
                  <span>{manufacturer.founded_year}</span>
                  {manufacturer.is_ev_only && (
                    <>
                      <span>•</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                      }`}>
                        EV Only
                      </span>
                    </>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      );
    }

    // For other dropdowns (newCars, services, more)
    if (items.length === 0) {
      return (
        <div className="px-4 py-8 text-center">
          <div className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-gray-400' : 'border-gray-600'
          }`}></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading menu items...
          </p>
        </div>
      );
    }

    return items.map(item => (
      <a
        key={item.id}
        href={item.link}
        className={`block px-4 py-3 text-sm transition-all duration-300 hover:pl-6 rounded-lg ${
          isDarkMode 
            ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.name}
      </a>
    ));
  };

  const renderMobileDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) return null;
    const items = dropdownData[key];

    // Special rendering for Buy dropdown in mobile
    if (key === 'buy') {
      if (manufacturersLoading) {
        return (
          <div className="text-center py-4">
            <div className={`animate-spin rounded-full h-5 w-5 border-b-2 mx-auto mb-2 ${
              isDarkMode ? 'border-gray-400' : 'border-gray-600'
            }`}></div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Loading manufacturers...
            </p>
          </div>
        );
      }

      if (manufacturersError) {
        return (
          <div className="text-center py-4">
            <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
              Failed to load
            </p>
          </div>
        );
      }

      if (!manufacturers || manufacturers.length === 0) {
        return (
          <div className="text-center py-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              No manufacturers
            </p>
          </div>
        );
      }

      return (
        <div className="space-y-1">
          {manufacturers.map(manufacturer => (
            <a
              key={manufacturer.id}
              href={`/manufacturers/${manufacturer.id}`}
              className={`block py-2.5 px-3 text-sm rounded-lg transition-all duration-200 hover:pl-6 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => {
                setIsMobileMenuOpen(false);
                closeAllDropdowns();
              }}
            >
              <div className="font-medium">{manufacturer.name}</div>
              <div className={`text-xs mt-1 flex items-center space-x-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span>{manufacturer.country}</span>
                {manufacturer.is_ev_only && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                    isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                  }`}>
                    EV
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      );
    }

    // For other dropdowns
    if (items.length === 0) {
      return (
        <div className="text-center py-4">
          <div className={`animate-spin rounded-full h-5 w-5 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-gray-400' : 'border-gray-600'
          }`}></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Loading...
          </p>
        </div>
      );
    }

    return items.map(item => (
      <a
        key={item.id}
        href={item.link}
        className={`block py-2.5 px-3 text-sm rounded-lg transition-all duration-200 hover:pl-6 ${
          isDarkMode 
            ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          closeAllDropdowns();
        }}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.name}
      </a>
    ));
  };

  return (
    <header className={`sticky top-0 z-50 shadow-lg backdrop-blur-sm transition-all duration-500 ${
        isDarkMode 
            ? 'bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-b border-gray-700' 
            : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 border-b border-gray-300'
        }`} onMouseLeave={closeAllDropdowns}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center rounded-lg">
              <img src={Logo} alt="Etiopikar Logo" className="h-20 w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Etiopikar
              </span>
              <span className={`text-xs font-medium tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Experience the difference
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map(item => (
              <div key={item.key} className="relative" onMouseEnter={() => item.hasDropdown && toggleDropdown(item.key)}>
                {item.hasDropdown ? (
                  <button
                    type="button"
                    className={`group flex items-center px-4 py-3 font-medium rounded-xl transition-all duration-300 ${
                      isDarkMode 
                        ? `text-gray-300 hover:text-white ${
                            activeDropdown === item.key 
                              ? 'bg-gray-800 text-white shadow-lg' 
                              : 'hover:bg-gray-800'
                          }` 
                        : `text-gray-700 hover:text-gray-900 ${
                            activeDropdown === item.key 
                              ? 'bg-gray-100 text-gray-900 shadow-lg' 
                              : 'hover:bg-gray-100'
                          }`
                    }`}
                    onClick={() => toggleDropdown(item.key)}
                  >
                    {item.name}
                    {item.key === 'buy' && manufacturers && (
                      <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {manufacturers.length}
                      </span>
                    )}
                    <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === item.key ? 'rotate-180' : ''
                    } ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                ) : (
                  <a href={item.link} className={`group flex items-center px-4 py-3 font-medium rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    {item.name}
                  </a>
                )}

                {item.hasDropdown && activeDropdown === item.key && (
                  <div className={`absolute top-full left-0 mt-2 rounded-2xl shadow-2xl border py-3 z-50 backdrop-blur-xl animate-fadeIn ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700' 
                      : 'bg-gradient-to-br from-white/95 to-gray-50/95 border-gray-300'
                  } ${item.key === 'buy' ? 'w-80' : 'w-64'}`}>
                    {renderDropdownContent(item.key)}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Dark/Light Mode Toggle */}
            <DarkModeButton isDark={isDarkMode} onToggle={handleToggle} />
          
            {/* Find Cars Button */}  
            <FindCarsButton isDark={isDarkMode}/>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            
            {/* Dark Mode Toggle Mobile */}
            <DarkModeButton isDark={isDarkMode} onToggle={handleToggle} />
            
            {/* Mobile Menu Toggle */}
             <MobileToggleButton
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isDarkMode={isDarkMode}
              ariaLabel="Toggle mobile menu"
            />
          </div>
        </div>

        {/* Mobile Menu + Backdrop */}
        {isMobileMenuOpen && (
          <>
            {/* Glass Backdrop */}
            <div 
              className={`fixed inset-0 z-30 lg:hidden backdrop-blur-md transition-all duration-500 ${
                isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'
              }`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              aria-hidden="true"
            ></div>
            
            {/* Glass Mobile Menu */}
            <div className={`lg:hidden fixed top-20 right-4 left-4 mx-auto rounded-2xl shadow-2xl z-40 overflow-hidden border transition-all duration-500 animate-fadeIn ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-gray-700' 
                : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 backdrop-blur-xl border-gray-300'
            }`}>
              <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {menuItems.map(item => (
                  <div key={`mobile-${item.key}`} className="group">
                    {item.hasDropdown ? (
                      <button 
                        type="button" 
                        className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`} 
                        onClick={() => handleMobileItemClick(item)}
                      >
                        <div className="flex items-center">
                          <span className="font-medium">{item.name}</span>
                          {item.key === 'buy' && manufacturers && (
                            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}>
                              {manufacturers.length}
                            </span>
                          )}
                        </div>
                        <svg className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        } ${
                          isDarkMode 
                            ? 'text-gray-400 group-hover:text-white' 
                            : 'text-gray-600 group-hover:text-gray-900'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    ) : (
                      <a 
                        href={item.link} 
                        className={`group flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`} 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="font-medium">{item.name}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    )}
                    {item.hasDropdown && activeDropdown === item.key && (
                      <div className={`ml-6 mt-2 rounded-xl p-3 space-y-2 ${
                        isDarkMode 
                          ? 'bg-gray-800' 
                          : 'bg-gray-100'
                      }`}>
                        {renderMobileDropdownContent(item.key)}
                      </div>
                    )}
                  </div>
                ))}

                {/* Bottom Buttons */}
                <div className={`border-t mt-4 pt-4 px-4 space-y-3 ${
                  isDarkMode 
                    ? 'border-gray-700' 
                    : 'border-gray-300'
                }`}>
                  
                  {/* Find Cars Button Mobile */}
                  <button 
                    type="button" 
                    className={`group relative w-full py-3 font-medium rounded-xl transition-all duration-300 ease-in-out overflow-hidden shadow-xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' 
                        : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                    } hover:scale-[1.02]`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-semibold">Find Cars</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
     
    </header>
  );
};

export default Header;