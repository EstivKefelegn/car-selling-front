// components/popular-brands/LoadingState.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  isDarkMode: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isDarkMode }) => {
  return (
    <div className={`w-full py-6 border-t ${
      isDarkMode 
        ? 'border-gray-800/50 bg-gray-900/30' 
        : 'border-gray-200/50 bg-gray-50/50'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center py-8">
          <Loader2 size={24} className="animate-spin text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default LoadingState;