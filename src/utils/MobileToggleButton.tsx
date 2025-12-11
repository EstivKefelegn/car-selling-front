import React from "react";

interface ToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode?: boolean;
  ariaLabel?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  onToggle,
  isDarkMode = false,
  ariaLabel = "Toggle",
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
        isDarkMode
          ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
          : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
      }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};

export default ToggleButton;
