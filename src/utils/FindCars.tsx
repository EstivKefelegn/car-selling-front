interface FindCarsButtonProps {
  isDark: boolean;
  onClick?: () => void;
}

const FindCarsButton: React.FC<FindCarsButtonProps> = ({ isDark, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative px-6 py-3 rounded-xl transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl ${
        isDark
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
      } hover:scale-105`}
      aria-label="Search cars"
    >
      <div className="relative z-10 flex items-center space-x-2">
        {/* <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7..." />
        </svg> */}
        <span className="font-semibold">Find Cars</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    </button>
  );
};

export default FindCarsButton;
