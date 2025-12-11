import Header from "./components/Header/Header"
import FeaturedCarsLanding from "./components/FeaturedCarsLanding"
import {useDarkModeStore} from "./store/useDarkModeStore"
import NewCarsLanding from "./components/LandingPage/NewCarsLanding"

function App() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const handleToggle = useDarkModeStore((state) => state.toggleDarkMode)

  return (
    <article className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900"
    }`}>
      
      <div className="relative z-10">
        <Header isDarkMode={isDarkMode} handleToggle={handleToggle} />
        
        {/* Main content */}
        <NewCarsLanding />
        

      </div>
    </article>
  )
}

export default App