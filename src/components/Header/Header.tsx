import React, { useState, useEffect } from 'react';
import Logo from '../../assets/logo.png';

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

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setDropdownData({
          buy: [],
          newCars: [],
          services: [],
          more: []
        });
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchDropdownData();
  }, []);

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

    if (items.length === 0) {
      return (
        <div className="px-4 py-8 text-center">
          <div className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-[#4a4aff]' : 'border-[#121221]'
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
        className={`block px-4 py-3 text-sm transition-colors duration-150 ${
          isDarkMode 
            ? 'text-gray-300 hover:bg-[#1a1a2e] hover:text-white' 
            : 'text-[#121221] hover:bg-[#121221]/10 hover:text-[#121221]'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.name}
      </a>
    ));
  };

  const renderMobileDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) return null;
    const items = dropdownData[key];

    if (items.length === 0) {
      return (
        <div className="text-center py-4">
          <div className={`animate-spin rounded-full h-5 w-5 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-[#4a4aff]' : 'border-[#121221]'
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
        className={`block py-2.5 px-3 text-sm rounded-lg transition-all duration-200 ${
          isDarkMode 
            ? 'text-gray-300 hover:text-white hover:bg-[#1a1a2e]' 
            : 'text-[#121221] hover:text-[#121221] hover:bg-[#121221]/10'
        }`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          closeAllDropdowns();
        }}
      >
        {item.name}
      </a>
    ));
  };

  return (
    <header className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#121221] border-b border-[#2a2a3e]' 
        : 'bg-white border-b border-[#121221]/20'
    }`} onMouseLeave={closeAllDropdowns}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center rounded-lg">
              <img src={Logo} alt="Etiopikar Logo" className="h-20 w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-[#121221]'
              }`}>
                Etiopikar
              </span>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-[#121221]/70'
              }`}>
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
                    className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? `text-gray-300 hover:bg-[#1a1a2e] hover:text-white ${
                            activeDropdown === item.key ? 'bg-[#1a1a2e] text-white' : ''
                          }` 
                        : `text-[#121221] hover:bg-[#121221]/10 hover:text-[#121221] ${
                            activeDropdown === item.key ? 'bg-[#121221]/10 text-[#121221]' : ''
                          }`
                    }`}
                    onClick={() => toggleDropdown(item.key)}
                  >
                    {item.name}
                    <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.key ? 'rotate-180' : ''
                    } ${
                      isDarkMode ? 'text-gray-400' : 'text-[#121221]/70'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                ) : (
                  <a href={item.link} className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-[#1a1a2e] hover:text-white' 
                      : 'text-[#121221] hover:bg-[#121221]/10 hover:text-[#121221]'
                  }`}>
                    {item.name}
                  </a>
                )}

                {item.hasDropdown && activeDropdown === item.key && (
                  <div className={`absolute top-full left-0 mt-2 w-56 rounded-lg shadow-xl border py-2 z-50 ${
                    isDarkMode 
                      ? 'bg-[#1a1a2e] border-[#2a2a3e]' 
                      : 'bg-white border-[#121221]/20'
                  }`}>
                    {renderDropdownContent(item.key)}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button 
              type="button" 
              onClick={handleToggle} 
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-[#1a1a2e] text-yellow-300 hover:bg-[#2a2a3e]' 
                  : 'bg-[#121221]/10 text-[#121221] hover:bg-[#121221]/20'
              }`} 
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Find a Car Button - Fancy Version */}
            <button 
              type="button" 
              className={`group relative px-6 py-3 rounded-xl transition-all duration-500 ease-in-out overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#121221] via-[#1a1a2e] to-[#2a2a3e] text-white border border-[#4a4aff]/30' 
                  : 'bg-gradient-to-br from-white via-[#121221]/5 to-[#121221]/10 text-[#121221] border border-[#121221]/30'
              } hover:scale-105 hover:shadow-2xl shadow-lg`} 
              aria-label="Search cars" 
              title="Search Cars"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-semibold">Find Cars</span>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                isDarkMode 
                  ? 'via-white/10 to-transparent' 
                  : 'via-[#121221]/10 to-transparent'
              } -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">

            <button 
              type="button" 
              onClick={handleToggle} 
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-[#1a1a2e] text-yellow-300' 
                  : 'bg-[#121221]/10 text-[#121221]'
              }`} 
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              type="button" 
              className={`p-2 rounded-lg ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-[#1a1a2e]' 
                  : 'text-[#121221] hover:bg-[#121221]/10'
              }`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path> : 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu + Backdrop */}
        {isMobileMenuOpen && (
          <>
            {/* Transparent Backdrop with Blur */}
            <div 
              className="fixed inset-0 z-30 lg:hidden backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)} 
              aria-hidden="true"
            ></div>
            
            {/* Stylish Mobile Menu */}
            <div className={`lg:hidden fixed top-20 right-4 left-4 mx-auto rounded-2xl shadow-2xl z-40 overflow-hidden border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-[#121221]/95 backdrop-blur-md border-[#2a2a3e]' 
                : 'bg-white/95 backdrop-blur-md border-[#121221]/20'
            }`}>
              <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {menuItems.map(item => (
                  <div key={`mobile-${item.key}`} className="group">
                    {item.hasDropdown ? (
                      <button 
                        type="button" 
                        className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-200 group-hover:shadow-sm ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-[#1a1a2e] hover:text-white' 
                            : 'text-[#121221] hover:bg-[#121221]/10 hover:text-[#121221]'
                        }`} 
                        onClick={() => handleMobileItemClick(item)}
                      >
                        <span className="font-medium">{item.name}</span>
                        <svg className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        } ${
                          isDarkMode 
                            ? 'text-gray-400 group-hover:text-white' 
                            : 'text-[#121221]/70 group-hover:text-[#121221]'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    ) : (
                      <a 
                        href={item.link} 
                        className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-200 group-hover:shadow-sm ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-[#1a1a2e] hover:text-white' 
                            : 'text-[#121221] hover:bg-[#121221]/10 hover:text-[#121221]'
                        }`} 
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="font-medium">{item.name}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    )}
                    {item.hasDropdown && activeDropdown === item.key && (
                      <div 
                        className="ml-6 mt-1 rounded-xl p-3 space-y-1"
                        style={{
                          animation: 'slideDown 0.2s ease-out forwards',
                          background: isDarkMode 
                            ? 'rgba(26, 26, 46, 0.5)' 
                            : 'rgba(18, 18, 33, 0.05)',
                          backdropFilter: 'blur(8px)'
                        }}
                      >
                        {renderMobileDropdownContent(item.key)}
                      </div>
                    )}
                  </div>
                ))}

                {/* Bottom Buttons with Fancy Find Cars Button */}
                <div className={`border-t mt-3 pt-4 px-4 space-y-3 ${
                  isDarkMode 
                    ? 'border-[#2a2a3e]' 
                    : 'border-[#121221]/20'
                }`}>
                  
                  
                  {/* Fancy Find Cars Button */}
                  <button 
                    type="button" 
                    className={`group relative w-full py-3 font-medium rounded-xl transition-all duration-500 ease-in-out overflow-hidden shadow-lg hover:scale-[1.02] ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#121221] via-[#1a1a2e] to-[#2a2a3e] text-white border border-[#4a4aff]/30' 
                        : 'bg-gradient-to-br from-white via-[#121221]/5 to-[#121221]/10 text-[#121221] border border-[#121221]/30'
                    }`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-semibold">Find Cars</span>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                      isDarkMode 
                        ? 'via-white/10 to-transparent' 
                        : 'via-[#121221]/10 to-transparent'
                    } -translate-x-full group-hover:translate-x-full transition-transform duration-700`}></div>
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