import Header from "./components/Header/Header"
import {useDarkModeStore} from "./store/useDarkModeStore"

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
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className={`text-sm tracking-widest uppercase font-semibold px-4 py-2 rounded-full border ${
                isDarkMode 
                  ? "border-gray-500 text-gray-300 bg-gray-900/30" 
                  : "border-gray-400 text-gray-700 bg-gray-100"
              }`}>
                Premium Automotive Experience
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Welcome to <span className={`bg-clip-text text-transparent ${
                isDarkMode 
                  ? "bg-gradient-to-r from-gray-300 via-white to-gray-300" 
                  : "bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800"
              }`}>Etiopikar</span>
            </h1>
            
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Where <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>excellence meets elegance</span>. Discover a world of premium vehicles and unparalleled service.
            </p>
          </div>

          {/* Featured Section */}
          <div className={`p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
            isDarkMode 
              ? "bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700" 
              : "bg-gradient-to-r from-white/95 to-gray-50/95 border border-gray-300"
          } shadow-xl hover:shadow-2xl`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <span className="font-light">Featured</span> <span className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>Cars</span>
                </h2>
                <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
                  Browse our latest collection of premium vehicles
                </p>
              </div>
              
              <button className={`mt-4 md:mt-0 px-6 py-3 rounded-full text-sm tracking-wider uppercase font-semibold transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 hover:shadow-lg hover:shadow-gray-500/25"
                  : "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 hover:shadow-lg hover:shadow-gray-400/30"
              }`}>
                View All Collection
              </button>
            </div>

            {/* Car Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Mercedes-Benz S-Class", type: "Luxury Sedan", price: "$110,000+" },
                { name: "BMW 7 Series", type: "Executive Sedan", price: "$95,000+" },
                { name: "Audi A8", type: "Premium Sedan", price: "$88,000+" }
              ].map((car, index) => (
                <div key={index} className={`group p-6 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${
                  isDarkMode
                    ? "bg-gray-900/70 border-gray-700 hover:border-gray-600 hover:bg-gray-900"
                    : "bg-white border-gray-300 hover:border-gray-400 hover:shadow-xl"
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {car.name}
                      </h3>
                      <p className={`text-sm uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
                        {car.type}
                      </p>
                    </div>
                    <span className={`text-2xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
                      {car.price}
                    </span>
                  </div>
                  <div className={`h-48 rounded-lg mb-4 flex items-center justify-center ${
                    isDarkMode 
                      ? "bg-gradient-to-r from-gray-800 to-gray-900" 
                      : "bg-gradient-to-r from-gray-200 to-gray-300"
                  }`}>
                    <span className={`text-4xl ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>🚗</span>
                  </div>
                  <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white"
                  }`}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { 
                title: "Performance", 
                desc: "High-performance vehicles with cutting-edge technology",
                icon: "⚡"
              },
              { 
                title: "Luxury", 
                desc: "Premium comfort and sophisticated features",
                icon: "💎"
              },
              { 
                title: "Exclusive", 
                desc: "Limited edition and bespoke models",
                icon: "👑"
              }
            ].map((feature, index) => (
              <div key={index} className={`p-8 rounded-2xl transition-all duration-500 hover:scale-105 group ${
                isDarkMode 
                  ? "bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800" 
                  : "bg-gradient-to-b from-white to-gray-50 border border-gray-300"
              }`}>
                <div className={`inline-flex p-4 rounded-xl mb-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} group-hover:bg-opacity-80 transition-all duration-500`}>
                  <span className={`text-3xl ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{feature.icon}</span>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials Section */}
          <div className={`mt-16 p-8 rounded-2xl ${isDarkMode ? "bg-gray-900/70" : "bg-gray-100/70"}`}>
            <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white"}`}>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} flex items-center justify-center mr-4`}>
                    <span className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>⭐</span>
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Alex Johnson</h4>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Business Executive</p>
                  </div>
                </div>
                <p className={`italic ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  "Etiopikar provided exceptional service from start to finish. The luxury car buying experience was seamless."
                </p>
              </div>
              <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white"}`}>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} flex items-center justify-center mr-4`}>
                    <span className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>⭐</span>
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Sarah Williams</h4>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Entrepreneur</p>
                  </div>
                </div>
                <p className={`italic ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  "The attention to detail and customer service at Etiopikar is unmatched. Highly recommended for luxury car enthusiasts."
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className={`mt-16 p-8 rounded-2xl text-center ${
            isDarkMode 
              ? "bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700" 
              : "bg-gradient-to-r from-white to-gray-50 border border-gray-300"
          }`}>
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Ready to Experience Excellence?
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Contact us today to schedule a private viewing or test drive.
            </p>
            <button className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
            }`}>
              Contact Us
            </button>
          </div>
        </main>
        
        {/* Luxury Footer */}
        <footer className={`py-12 border-t transition-all duration-500 ${
          isDarkMode 
            ? "border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900" 
            : "border-gray-300 bg-gradient-to-b from-white to-gray-100"
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode 
                      ? "bg-gray-800" 
                      : "bg-gray-200"
                  }`}>
                    <span className={`text-2xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>E</span>
                  </div>
                  <span className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Etiopikar
                  </span>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Redefining automotive excellence since 2024
                </p>
              </div>

              <div className="text-center md:text-right">
                <p className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  © 2024 Etiopikar Luxury Automotive
                </p>
                <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                  All rights reserved. Experience the difference.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center mt-8 space-x-4">
              {['📱', '💬', '📸', '🔗'].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                      : "bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}

export default App