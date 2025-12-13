// components/FindCarsButton.tsx
interface FindCarsButtonProps {
  isDark: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const FindCarsButton: React.FC<FindCarsButtonProps> = ({ 
  isDark, 
  onClick, 
  className = '',
  children,
  type = 'button'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden 
      shadow-xl hover:shadow-2xl hover:scale-105 bg-gradient-to-r from-gray-800 to-gray-900 
      text-white ${className}`}
      aria-label="Search cars"
    >
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {children || <span className="font-semibold">Find Cars</span>}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

export default FindCarsButton;