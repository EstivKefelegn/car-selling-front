// pages/finance/components/FinanceHero.tsx
import React from 'react';

interface FinanceHeroProps {
  title: string;
  description: string;
  image?: string;
  isDarkMode: boolean;
}

const FinanceHero: React.FC<FinanceHeroProps> = ({ 
  title, 
  description, 
  image, 
  isDarkMode 
}) => {
  return (
    <FinanceHero 
      title={title}
      description={description}
      image={image}
      isDarkMode={isDarkMode}
    />
  );
};

export default FinanceHero;