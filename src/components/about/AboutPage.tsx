// pages/AboutPage.tsx
import React, { useState, useEffect } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { useAllAboutData } from '../../hooks/useAbout';
import { 
  History, Users, Image, MapPin, RefreshCw, 
  ChevronRight, Sparkles, Car, Battery, Zap, Globe,
  Award, Shield, TrendingUp, Heart, Clock, Home,
  Phone, Mail, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../utils/LoadingSpinner';
import AboutSection from './AboutSection';
import TeamSection from './TeamSection';
import GallerySection from './GallerySection';
import ContactSection from './ContactSection';

const AboutPage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const { about, team, gallery, loading, error, refetch } = useAllAboutData();
  const [activeTab, setActiveTab] = useState<'about' | 'team' | 'gallery' | 'contact'>('about');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <LoadingSpinner size="lg" />
        <p className={`mt-6 text-lg font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        } animate-pulse`}>
          Loading our story...
        </p>
      </div>
    );
  }

  if (error) {
    const isNotFound = error.includes('404') || error.includes('not found');
    
    if (isNotFound) {
      return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="text-center max-w-md mx-4">
            <div className={`relative p-4 rounded-2xl mb-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <Home size={48} className={`mx-auto ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
            </div>
            <h2 className={`text-2xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              About Us Page Not Found
            </h2>
            <p className={`mb-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              The About Us page hasn't been set up yet or the data is not available.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => refetch()}
                className={`w-full px-4 py-3 rounded-lg flex items-center justify-center font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } shadow-md hover:shadow-lg`}
              >
                <RefreshCw size={20} className="mr-2" />
                Try Again
              </button>
              <Link
                to="/"
                className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } shadow-sm hover:shadow`}
              >
                <Home size={20} className="mr-2" />
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md mx-4">
          <div className={`relative p-4 rounded-2xl mb-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <RefreshCw size={48} className={`mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Oops! Something went wrong
          </h2>
          <p className={`mb-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {error}
          </p>
          <button
            onClick={() => refetch()}
            className={`group relative overflow-hidden px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            } shadow-lg hover:shadow-xl`}
          >
            <span className="relative z-10 flex items-center justify-center">
              <RefreshCw size={20} className="mr-3 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md mx-4">
          <div className={`relative p-4 rounded-2xl mb-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <Car size={48} className={`mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Story is Coming Soon
          </h2>
          <p className={`mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We're currently crafting our story. Check back soon to learn more about our journey!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-white to-gray-100'
      }`}>
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto">
            {/* Logo */}
            {about.logo_url && (
              <div className="mb-10">
                <img 
                  src={about.logo_url} 
                  alt={about.dealership_name}
                  className="h-28 md:h-32 mx-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            
            {/* Main title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center">
              {about.dealership_name}
            </h1>
            
            {/* Tagline */}
            {about.tagline && (
              <div className="flex items-center justify-center mb-10">
                <Sparkles className={`mr-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} size={24} />
                <p className={`text-xl md:text-2xl font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {about.tagline}
                </p>
                <Sparkles className={`ml-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} size={24} />
              </div>
            )}
            
            {/* Description */}
            <div className={`relative p-8 md:p-10 rounded-2xl ${
              isDarkMode 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-white border border-gray-200'
            } shadow-xl`}>
              <p className={`text-lg md:text-xl leading-relaxed text-center ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {about.description}
              </p>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { icon: Award, value: "5+", label: "Years Excellence" },
                { icon: Car, value: "1000+", label: "EVs Delivered" },
                { icon: Shield, value: "98%", label: "Satisfaction Rate" },
                { icon: TrendingUp, value: "50+", label: "Brand Partners" },
              ].map((stat, index) => (
                <div key={index} className={`p-4 rounded-xl text-center ${
                  isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
                } shadow-lg`}>
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`mr-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} size={20} />
                    <span className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? `shadow-lg ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }` 
          : `${
              isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
            }`
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'about', icon: History, label: 'Our Story' },
              { id: 'team', icon: Users, label: 'Dream Team' },
              { id: 'gallery', icon: Image, label: 'Gallery' },
              { id: 'contact', icon: MapPin, label: 'Find Us' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group flex-1 py-5 px-2 text-center font-semibold whitespace-nowrap transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? isDarkMode ? 'text-white border-b-2 border-white' : 'text-gray-900 border-b-2 border-gray-900'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="relative">
                  <tab.icon size={22} className="inline-block mr-3 mb-1" />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        {/* Active tab content */}
        <div className={`rounded-xl p-6 md:p-8 ${
          isDarkMode 
            ? 'bg-gray-800/30 border border-gray-700' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}>
          {activeTab === 'about' && <AboutSection data={about} isDarkMode={isDarkMode} />}
          {activeTab === 'team' && <TeamSection team={team} isDarkMode={isDarkMode} />}
          {activeTab === 'gallery' && <GallerySection gallery={gallery} isDarkMode={isDarkMode} />}
          {activeTab === 'contact' && <ContactSection data={about} isDarkMode={isDarkMode} />}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className={`relative p-8 md:p-10 rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-xl`}>
            <Heart className={`w-16 h-16 mx-auto mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Join the Electric Revolution?
            </h2>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the future of driving with Ethiopia's premier electric vehicle destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-6 md:px-8 py-3 md:py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              } shadow-lg hover:shadow-xl`}>
                <span className="flex items-center justify-center">
                  Book a Test Drive
                  <ChevronRight className="ml-3" size={20} />
                </span>
              </button>
              <button className={`px-6 md:px-8 py-3 md:py-4 font-semibold rounded-xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
              }`}>
                <span className="flex items-center justify-center">
                  <Clock className="mr-3" size={20} />
                  View Inventory
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Bar */}
      <div className={`sticky bottom-0 z-40 ${
        isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'
      } shadow-lg`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <a href={`tel:${about.phone_number}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Phone size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {about.phone_number}
                </span>
              </a>
              <a href={`mailto:${about.email}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Mail size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={`font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {about.email}
                </span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              {about.social_media_links?.facebook && (
                <a href={about.social_media_links.facebook} target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-full hover:scale-110 transition-transform ${
                     isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                   }`}>
                  <Facebook size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </a>
              )}
              {about.social_media_links?.twitter && (
                <a href={about.social_media_links.twitter} target="_blank" rel="noopener noreferrer"
                   className={`p-2 rounded-full hover:scale-110 transition-transform ${
                     isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                   }`}>
                  <Twitter size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </a>
              )}
              {about.social_media_links?.instagram && (
                <a href={about.social_media_links.instagram} target="_blank" rel="noopener noreferrer"
                   className={`p-2 rounded-full hover:scale-110 transition-transform ${
                     isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                   }`}>
                  <Instagram size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </a>
              )}
              {about.social_media_links?.linkedin && (
                <a href={about.social_media_links.linkedin} target="_blank" rel="noopener noreferrer"
                   className={`p-2 rounded-full hover:scale-110 transition-transform ${
                     isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                   }`}>
                  <Linkedin size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className={`mb-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} {about.dealership_name}. Driving Ethiopia's Sustainable Future.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Globe className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`} />
            <Zap className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`} />
            <Car className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`} />
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;