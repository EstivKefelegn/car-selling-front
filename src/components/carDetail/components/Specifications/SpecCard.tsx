// components/SpecCard.tsx
import type { ReactNode } from 'react';

interface SpecCardProps {
  title: string;
  isDarkMode: boolean;
  children: ReactNode;
}

const SpecCard: React.FC<SpecCardProps> = ({
  title,
  isDarkMode,
  children,
}) => {
  return (
    <div
      className={`rounded-xl p-5 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <h4
        className={`text-lg font-semibold mb-3 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h4>

      <div
        className={`space-y-1 text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SpecCard;
