// components/about/sections/HistorySection.tsx
import React from 'react';
import { History } from 'lucide-react';
import InfoCard from '../InfoCard';

interface HistorySectionProps {
  history?: string;
  isDarkMode: boolean;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  isDarkMode
}) => {
  if (!history) {
    return null;
  }

  return (
    <InfoCard
      title="Our History"
      content={history}
      icon={<History className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />}
      isDarkMode={isDarkMode}
      className="p-8"
    />
  );
};

export default HistorySection;