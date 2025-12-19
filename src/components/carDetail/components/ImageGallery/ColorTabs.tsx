// components/ImageGallery/ColorTabs.tsx
interface Props {
  isDarkMode: boolean;
  hasExterior: boolean;
  hasInterior: boolean;
  activeTab: 'exterior' | 'interior';
  onTabChange: (tab: 'exterior' | 'interior') => void;
}

const ColorTabs: React.FC<Props> = ({
  isDarkMode,
  hasExterior,
  hasInterior,
  activeTab,
  onTabChange,
}) => (
  <div className={`flex mb-6 border-b ${
    isDarkMode ? 'border-gray-700' : 'border-gray-200'
  }`}>
    {hasExterior && (
      <button
        onClick={() => onTabChange('exterior')}
        className={`pb-3 px-4 font-medium text-lg relative ${
          activeTab === 'exterior'
            ? isDarkMode
              ? 'text-purple-300'
              : 'text-purple-600'
            : isDarkMode
            ? 'text-gray-400 hover:text-gray-300'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Exterior Colors
        {activeTab === 'exterior' && (
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isDarkMode ? 'bg-purple-500' : 'bg-purple-500'
          }`} />
        )}
      </button>
    )}
    
    {hasInterior && (
      <button
        onClick={() => onTabChange('interior')}
        className={`pb-3 px-4 font-medium text-lg relative ${
          activeTab === 'interior'
            ? isDarkMode
              ? 'text-green-300'
              : 'text-green-600'
            : isDarkMode
            ? 'text-gray-400 hover:text-gray-300'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Interior Colors
        {activeTab === 'interior' && (
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isDarkMode ? 'bg-green-500' : 'bg-green-500'
          }`} />
        )}
      </button>
    )}
  </div>
);

export default ColorTabs;