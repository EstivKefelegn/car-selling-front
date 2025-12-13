// components/CompactFooter.tsx
import React, { useState } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { 
  Mail, 
  Send, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  MessageSquare
} from 'lucide-react';

const Footer: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Subscribed email:', email);
    setEmail('');
    setIsSubmitting(false);
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={18} />, url: 'https://facebook.com/etiopikar' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/etiopikar' },
    { icon: <Instagram size={18} />, url: 'https://instagram.com/etiopikar' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/etiopikar' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/company/etiopikar' },
  ];

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
      {/* Newsletter */}
      <div className={`py-8 ${isDarkMode ? 'bg-gray-800/30' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h3 className={`text-xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Be the first to know about new listings
            </h3>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Send size={18} />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} size={24} />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Etiopikar
                </h2>
              </div>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ethiopia's premier electric vehicle marketplace
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-md transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                        : 'bg-white hover:bg-gray-100 text-gray-600 shadow-sm'
                    }`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Company
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>About Us</a></li>
                  <li><a href="/contact" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contact Us</a></li>
                  <li><a href="/careers" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Careers</a></li>
                  <li><a href="/blog" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Support
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/help" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Help Center</a></li>
                  <li><a href="/faq" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>FAQ</a></li>
                  <li><a href="/privacy" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Privacy</a></li>
                  <li><a href="/terms" className={`hover:underline ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Terms</a></li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <span>+251 911 234 567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <span>info@etiopikar.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <span>Addis Ababa, Ethiopia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`py-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center text-sm">
          © {currentYear} Etiopikar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;