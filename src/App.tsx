import Header from "./components/Header/Header"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useDarkModeStore} from "./store/useDarkModeStore"
import NewCarsLanding from "./components/LandingPage/NewCarsLanding"
import MainLandingPage from "./components/LandingPage/MainLandingPage";
import AboutPage from "./components/about/AboutPage"; 
import Footer from "./components/Footer/Footer";

function App() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  
  return (
    <article className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-10" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900"
    }`}>
      
      <div className="relative z-10">
    

        <Router>
          <Header />     
          <Routes>
            <Route path="/" element={<MainLandingPage />}/>             
            <Route path="/all-cars" element={<NewCarsLanding />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </Router>

      </div>
    </article>
  )
}

export default App