// components/Header.tsx
import React, { useState, useEffect } from 'react';
  import Logo from '../../assets/logo.png';
import useManufacturer, { type ManufacturerQuery } from '../../hooks/useManufacturers'; 
import DarkModeButton from '../../utils/DarkModeButton';
import FindCarsButton from '../../utils/FindCars';
import MobileToggleButton from '../../utils/MobileToggleButton';
import { Link } from 'react-router-dom';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { menuItems } from './navigations/menuItems';
import DesktopNav from './navigations/DesktopNav';
import MobileNav from './navigations/MobileNav';
import type { DropdownData } from './navigations/types';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();
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
    name: '',
    is_ev_only: undefined,
    country: undefined,
    founded_year: undefined
  });

  // Use the manufacturer hook
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
          buy: manufacturerItems,
          newCars: [],
          services: [],
          more: []
        });
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    
    fetchDropdownData();
  }, [manufacturers]);

  const toggleDropdown = (menu: string): void => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeAllDropdowns = (): void => {
    setActiveDropdown(null);
  };

  const handleMobileItemClick = (item: typeof menuItems[0]): void => {
    if (item.hasDropdown) {
      toggleDropdown(item.key);
    } else if (item.link) {
      window.location.href = item.link;
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 shadow-xl backdrop-blur-md transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gray-900/50'
          : 'bg-white/50'
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
                className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto object-contain" 
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Etiopikar
              </span>
              <span className={`text-xs font-medium tracking-wide ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Experience the difference
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav
            menuItems={menuItems}
            manufacturers={manufacturers}
            manufacturersLoading={manufacturersLoading}
            manufacturersError={manufacturersError}
            isDarkMode={isDarkMode}
            activeDropdown={activeDropdown}
            dropdownData={dropdownData}
            onToggleDropdown={toggleDropdown}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <DarkModeButton isDark={isDarkMode} onToggle={toggleDarkMode} />
            <Link to="/all-cars">
              <FindCarsButton isDark={isDarkMode} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <DarkModeButton isDark={isDarkMode} onToggle={toggleDarkMode} />
            <MobileToggleButton
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isDarkMode={isDarkMode}
              ariaLabel="Toggle mobile menu"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          menuItems={menuItems}
          manufacturers={manufacturers}
          manufacturersLoading={manufacturersLoading}
          manufacturersError={manufacturersError}
          isDarkMode={isDarkMode}
          activeDropdown={activeDropdown}
          dropdownData={dropdownData}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleDropdown={toggleDropdown}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
          onCloseAllDropdowns={closeAllDropdowns}
          onMobileItemClick={handleMobileItemClick}
        />
      </div>
    </header>
  );
};

export default Header;