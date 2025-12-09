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

  // Fetch dropdown data from backend
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // For now, we'll simulate empty data as requested
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

  // Type guard to check if a key is a valid dropdown key
  const isDropdownKey = (key: string): key is DropdownKey => {
    return ['buy', 'newCars', 'services', 'more'].includes(key);
  };

  const menuItems: MenuItem[] = [
    {
      name: 'News',
      hasDropdown: false,
      key: 'news'
    },
    {
      name: 'Buy',
      hasDropdown: true,
      key: 'buy'
    },
    {
      name: 'Discounts',
      hasDropdown: false,
      key: ''
    },
    {
      name: 'Finance',
      hasDropdown: false,
      key: 'finance'
    },
    {
      name: 'New Cars',
      hasDropdown: true,
      key: 'newCars'
    },
    {
      name: 'Services',
      hasDropdown: true,
      key: 'services'
    },
    {
      name: 'Events',
      hasDropdown: false,
      key: 'events'
    },
    {
      name: 'More',
      hasDropdown: true,
      key: 'more'
    }
  ];

  const renderDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) {
      return null;
    }
    
    const items = dropdownData[key];
    
    if (items.length === 0) {
      return (
        <div className="px-4 py-8 text-center">
          <div className={`animate-spin rounded-full h-6 w-6 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-blue-400' : 'border-blue-600'
          }`}></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Loading menu items...
          </p>
        </div>
      );
    }

    return items.map((item) => (
      <a
        key={item.id}
        href={item.link}
        className={`block px-4 py-3 text-sm transition-colors duration-150 ${
          isDarkMode 
            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        }`}
      >
        {item.name}
      </a>
    ));
  };

  const renderMobileDropdownContent = (key: string): React.ReactNode => {
    if (!isDropdownKey(key)) {
      return null;
    }
    
    const items = dropdownData[key];
    
    if (items.length === 0) {
      return (
        <div className="text-center py-4">
          <div className={`animate-spin rounded-full h-5 w-5 border-b-2 mx-auto mb-2 ${
            isDarkMode ? 'border-blue-400' : 'border-blue-600'
          }`}></div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Loading...
          </p>
        </div>
      );
    }

    return items.map((item) => (
      <a
        key={item.id}
        href={item.link}
        className={`block py-2.5 px-3 text-sm rounded ${
          isDarkMode 
            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-white'
        }`}
      >
        {item.name}
      </a>
    ));
  };

  return (
    <header 
      className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 border-b border-gray-800' 
          : 'bg-white border-b border-gray-100'
      }`}
      onMouseLeave={closeAllDropdowns}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center rounded-lg">
              <img 
                src={Logo} 
                alt="Etiopikar Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Etiopikar
              </span>
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Experience the difference
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div 
                key={item.key}
                className="relative"
                onMouseEnter={() => item.hasDropdown && toggleDropdown(item.key)}
              >
                <button
                  type="button"
                  className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    isDarkMode
                      ? `text-gray-300 hover:bg-gray-800 hover:text-white ${
                          activeDropdown === item.key ? 'bg-gray-800 text-white' : ''
                        }`
                      : `text-gray-700 hover:bg-gray-100 hover:text-blue-600 ${
                          activeDropdown === item.key ? 'bg-blue-50 text-blue-600' : ''
                        }`
                  }`}
                  onClick={() => item.hasDropdown && toggleDropdown(item.key)}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <svg 
                      className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.key ? 'rotate-180' : ''
                      } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.key && (
                  <div className={`absolute top-full left-0 mt-2 w-56 rounded-lg shadow-xl border py-2 z-50 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-100'
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
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                // Sun icon for dark mode (click to switch to light)
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Moon icon for light mode (click to switch to dark)
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Sign In Button */}
            <button 
              type="button"
              className={`px-5 py-2.5 font-medium rounded-lg transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Sign In
            </button>
            
            {/* Find a Car Button */}
           <button 
                type="button"
                className={`group p-3 rounded-xl transition-all duration-500 ease-in-out ${
                    isDarkMode
                    ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-blue-400 border border-gray-700'
                    : 'bg-gradient-to-br from-white via-blue-50 to-blue-100 text-blue-600 border border-blue-200'
                } hover:scale-110 hover:rotate-12 hover:shadow-2xl`}
                aria-label="Search cars"
                title="Search Cars"
                >
                <svg 
                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                </button>
          </div>

          {/* Mobile Menu Button with Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Dark Mode Toggle */}
            <button
              type="button"
              onClick={handleToggle}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-800 text-yellow-400'
                  : 'bg-gray-100 text-gray-700'
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
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t py-4 ${
            isDarkMode
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-100'
          }`}>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={`mobile-${item.key}`}>
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-lg ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => item.hasDropdown && toggleDropdown(item.key)}
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && (
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    )}
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === item.key && (
                    <div className={`ml-6 mt-1 rounded-lg p-3 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}>
                      {renderMobileDropdownContent(item.key)}
                    </div>
                  )}
                </div>
              ))}
              
              <div className={`border-t mt-3 pt-4 px-4 space-y-3 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <button 
                  type="button"
                  className={`w-full py-2.5 font-medium rounded-lg border ${
                    isDarkMode
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Sign In
                </button>
                <button 
                  type="button"
                  className={`w-full py-2.5 font-medium rounded-lg ${
                    isDarkMode
                      ? 'bg-blue-700 text-white hover:bg-blue-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Find a Car
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;