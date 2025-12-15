// components/navigation/menuItems.ts
// components/navigation/menuItems.ts
import type { MenuItem } from './types';

export const menuItems: MenuItem[] = [
  { name: 'News', hasDropdown: false, key: 'news', link: '/news' },
  { name: 'Buy', hasDropdown: true, key: 'buy' },
  // { name: 'Discounts', hasDropdown: false, key: 'discounts', link: '/discounts' },
  { name: 'Finance', hasDropdown: false, key: 'finance', link: '/finance' },
  { name: 'New Cars', hasDropdown: false, key: 'newCars' },
  { name: 'Services', hasDropdown: true, key: 'services' },
  { name: 'Events', hasDropdown: false, key: 'events', link: '/events' },
  { name: 'More', hasDropdown: true, key: 'more' }
];