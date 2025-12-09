import Header from "./components/Header"
import { useState } from "react"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const handleToggle = () => {
    setIsDarkMode(prevValue => !prevValue)
  }

  return (
    <article className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#121221] text-gray-100" 
        : "bg-gray-50 text-[#121221]"
    }`}>
      <Header isDarkMode={isDarkMode} handleToggle={handleToggle} />
      
      {/* Main content example */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Etiopikar
        </h1>
        <p className="mb-6">
          Experience the difference in car buying and services.
        </p>
        
        {/* Example content that changes with theme */}
        <div className={`p-6 rounded-lg transition-colors duration-300 ${
          isDarkMode 
            ? "bg-[#1a1a2e] border border-[#2a2a3e]" 
            : "bg-white border border-[#121221]/20"
        }`}>
          <h2 className="text-xl font-semibold mb-3">Featured Cars</h2>
          <p>Browse our latest collection of premium vehicles.</p>
        </div>

        {/* Additional content sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className={`p-4 rounded-xl transition-all duration-300 hover:shadow-lg ${
              isDarkMode 
                ? "bg-[#1a1a2e] border border-[#2a2a3e] hover:border-[#121221]/50" 
                : "bg-white border border-[#121221]/10 hover:border-[#121221]/30"
            }`}>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#121221]'}`}>
                Car Service {item}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Professional car service and maintenance.
              </p>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer example */}
      <footer className={`mt-12 py-6 border-t transition-colors duration-300 ${
        isDarkMode 
          ? "border-[#2a2a3e] bg-[#0a0a14]" 
          : "border-[#121221]/20 bg-[#121221]/5"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-[#121221]'}`}>Etiopikar</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#121221]/70'}`}>
                Experience the difference
              </p>
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#121221]/70'}`}>
              <p>© 2024 Etiopikar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  )
}

export default App