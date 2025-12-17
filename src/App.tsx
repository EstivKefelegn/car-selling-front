import Header from "./components/Header/Header"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useDarkModeStore} from "./store/useDarkModeStore"
import DreamCarsLanding from "./components/LandingPage/NewCarsLanding"
import MainLandingPage from "./components/LandingPage/MainLandingPage";
import AboutPage from "./components/about/AboutPage"; 
import Footer from "./components/Footer/Footer";
import NewCarsSection from "./components/new-cars/NewCarsSection";
import AllCarsPage from "./components/allCars/AllCarsPage";
import CarDetailPage from "./components/carDetail/CarDetailPage";
import LatestEventPage from "./components/events/LatestEventPage";
import NewsPage from "./components/news/NewsPage";
import NewsDetailPage from "./components/news/NewsDetailPage";
import FinancePage from "./components/financePage/FinancePage";

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
            <Route path="/all-cars" element={<DreamCarsLanding />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/new-cars" element={<NewCarsSection />} />
            <Route path="/cars" element={<AllCarsPage />} />
            <Route path="/car/:slug" element={<CarDetailPage />} />
            <Route path="/events" element={<LatestEventPage />} />
            <Route path="/finance" element={<FinancePage />} />
            {/* <Route path="/events" element={<LatestEventPage />} /> */}
            {/* <Route path="/news" element={<NewsDetailPage />} /> */}
          </Routes>
          <Footer />
        </Router>

      </div>
    </article>
  )
}

export default App