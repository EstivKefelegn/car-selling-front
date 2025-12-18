// components/about/sections/SocialMedia.tsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { type AboutUsData } from '../types/about';

interface SocialMediaProps {
  data: AboutUsData;
  isDarkMode: boolean;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ data, isDarkMode }) => {
  const socialMediaIcons = [
    {
      platform: 'facebook',
      icon: <Facebook size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />,
      url: data.social_media_links?.facebook
    },
    {
      platform: 'twitter',
      icon: <Twitter size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />,
      url: data.social_media_links?.twitter
    },
    {
      platform: 'instagram',
      icon: <Instagram size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />,
      url: data.social_media_links?.instagram
    },
    {
      platform: 'linkedin',
      icon: <Linkedin size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />,
      url: data.social_media_links?.linkedin
    },
    {
      platform: 'youtube',
      icon: <Youtube size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />,
      url: data.social_media_links?.youtube
    }
  ];

  // Check if any social media links exist
  const hasSocialMedia = socialMediaIcons.some(social => social.url);

  if (!hasSocialMedia) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
      <div className="flex space-x-4">
        {socialMediaIcons.map((social) => 
          social.url ? (
            <SocialIcon
              key={social.platform}
              href={social.url}
              icon={social.icon}
              isDarkMode={isDarkMode}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

const SocialIcon: React.FC<{
  href: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
}> = ({ href, icon, isDarkMode }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 rounded-full hover:scale-110 transition-transform ${
        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
      }`}
    >
      {icon}
    </a>
  );
};

export default SocialMedia;