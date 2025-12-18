
import type { MenuItem } from './types';
export const menuItems: MenuItem[] = [
  // {
  //   name: 'news',
  //   key: 'news',
  //   hasDropdown: false,
  //   link: '/news',
  // },
  {
    name: 'newCars',
    key: 'newCars',
    hasDropdown: false,
    link: '/new-cars',
  },
  {
    name: 'buy',
    key: 'buy',
    hasDropdown: true,
  },
  {
    name: 'finance',
    key: 'finance',
    hasDropdown: false,
    link: '/finance',
  },
  {
    name: 'services',
    key: 'services',
    hasDropdown: false,
    link: '/service',
  },
  {
    name: 'events',
    key: 'events',
    hasDropdown: false,
    link: '/events',
  },
  {
    name: 'more',
    key: 'more',
    hasDropdown: true,
  },
];
