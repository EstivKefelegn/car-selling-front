export interface MenuItem {
  key: string;
  name: string;
  hasDropdown: boolean;
  link?: string;
}

export interface DropdownItem {
  id: number | string;
  name: string;
  link: string;
  icon?: string;
}

export type DropdownKey = 'buy' | 'newCars' | 'services' | 'more';

export interface DropdownData {
  buy: DropdownItem[];
  newCars: DropdownItem[];
  services: DropdownItem[];
  more: DropdownItem[];
}

export interface DesktopNavProps {
  menuItems: MenuItem[];
  isDarkMode: boolean;
  activeDropdown: string | null;
  manufacturersCount?: number;
  toggleDropdown: (key: string) => void;
  renderDropdownContent: (key: string) => React.ReactNode;
}

export interface MobileMenuProps {
  menuItems: MenuItem[];
  isDarkMode: boolean;
  isOpen: boolean;
  activeDropdown: string | null;
  manufacturersCount?: number;
  onClose: () => void;
  onItemClick: (item: MenuItem) => void;
  renderMobileDropdownContent: (key: string) => React.ReactNode;
}