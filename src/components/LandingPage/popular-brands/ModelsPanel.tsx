// components/popular-brands/ModelsPanel.tsx
import React from 'react';
import { type ModelsPanelProps } from './types';

const ModelsPanel: React.FC<ModelsPanelProps> = ({
  brandName,
  models,
  isDarkMode,
  onClose,
  onModelClick
}) => {
  return (
    <div className={`mb-6 p-4 rounded-lg border ${
      isDarkMode 
        ? 'border-gray-700 bg-gray-800/50' 
        : 'border-gray-200 bg-white/80'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className={`font-semibold ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {brandName} Models
        </h4>
        <button
          onClick={onClose}
          className={`text-sm font-medium ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-300' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Close
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {models.map((model, index) => (
          <button
            key={index}
            onClick={() => onModelClick(model, brandName)}
            disabled={model === 'No models found'}
            className={`text-sm px-3 py-2 rounded-md text-left transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode 
                ? 'bg-gray-700/30 text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <div className="font-medium truncate">{model}</div>
            {model !== 'No models found' && (
              <div className={`text-xs mt-1 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                View cars →
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelsPanel;