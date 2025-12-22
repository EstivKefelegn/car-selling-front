import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onClick: () => void;
}

const BackButton: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
    >
      <span>←</span>
      {t('backButton.text')}
    </button>
  );
};

export default BackButton;