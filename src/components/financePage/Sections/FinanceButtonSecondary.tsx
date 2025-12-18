// pages/finance/components/buttons/FinanceButton.tsx
import React from 'react';

interface FinanceButtonProps {
  isDark: boolean;
  onClick?: () => void;
  text: string;
  style?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const FinanceButton: React.FC<FinanceButtonProps> = ({ 
  isDark, 
  onClick, 
  text, 
  style = '', 
  fullWidth = false,
  type = 'button',
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl ${style} ${
        fullWidth ? 'w-full' : ''
      } ${
        isDark
          ? 'text-white border border-gray-500 text-white'
          : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
      } hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
      aria-label={text}
    >
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <span className="font-semibold">{text}</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

export default FinanceButton;