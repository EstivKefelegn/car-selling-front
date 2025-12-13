// components/Footer/constants.ts
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export const SOCIAL_LINKS = [
  { icon: <Facebook size={18} />, url: 'https://facebook.com/etiopikar', name: 'Facebook' },
  { icon: <Twitter size={18} />, url: 'https://twitter.com/etiopikar', name: 'Twitter' },
  { icon: <Instagram size={18} />, url: 'https://instagram.com/etiopikar', name: 'Instagram' },
  { icon: <Youtube size={18} />, url: 'https://youtube.com/etiopikar', name: 'YouTube' },
  { icon: <Linkedin size={18} />, url: 'https://linkedin.com/company/etiopikar', name: 'LinkedIn' },
];

export const LINK_SECTIONS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ]
  }
];

export const CONTACT_INFO = [
  { icon: <Phone size={16} />, text: '+251 911 234 567' },
  { icon: <Mail size={16} />, text: 'info@etiopikar.com' },
  { icon: <MapPin size={16} />, text: 'Addis Ababa, Ethiopia' },
];