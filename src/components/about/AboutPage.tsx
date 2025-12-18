// pages/AboutPage.tsx
import React, { useState, useEffect } from 'react';
import { useDarkModeStore } from '../../store/useDarkModeStore';
import { useAllAboutData } from '../../hooks/about/useAbout';
import LoadingState from './AboutPageSections/LoadingState';
import ErrorState from './AboutPageSections/ErrorState';
import EmptyState from './AboutPageSections/EmptyState';
import HeroSection from './AboutPageSections/HeroSection';
import NavigationTabs from './AboutPageSections/NavigationTabs';
import ContentSection from './AboutPageSections/ContentSection';
import CallToAction from './AboutPageSections/CallToAction';

const AboutPage: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const { about, team, gallery, loading, error, refetch } = useAllAboutData();
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>('contact');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading state
  if (loading) {
    return <LoadingState isDarkMode={isDarkMode} />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} isDarkMode={isDarkMode} onRetry={refetch} />;
  }

  // No data state
  if (!about) {
    return <EmptyState isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <HeroSection about={about} isDarkMode={isDarkMode} />
      
      <NavigationTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        scrolled={scrolled}
      />
      
      <ContentSection 
        activeTab={activeTab}
        about={about}
        isDarkMode={isDarkMode}
      />
      
      <CallToAction isDarkMode={isDarkMode} />
      
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