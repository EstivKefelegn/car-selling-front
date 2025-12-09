import Header from "./components/Header/Header"
import { useState } from "react"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const handleToggle = () => {
    setIsDarkMode(prevValue => !prevValue)
  }

  return (
    <article className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "bg-gray-900 text-white" 
        : "bg-white text-gray-900"
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
            ? "bg-gray-800 border border-gray-700" 
            : "bg-gray-50 border border-gray-200"
        }`}>
          <h2 className="text-xl font-semibold mb-3">Featured Cars</h2>
          <p>Browse our latest collection of premium vehicles.</p>
        </div>
      </main>
      
      {/* Footer example */}
      <footer className={`mt-12 py-6 border-t transition-colors duration-300 ${
        isDarkMode 
          ? "border-gray-700 bg-gray-800" 
          : "border-gray-200 bg-gray-50"
      }`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Etiopikar. All rights reserved.</p>
        </div>
      </footer>
    </article>
  )
}

export default App