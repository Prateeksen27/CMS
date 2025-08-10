import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-2 rounded-lg shadow-md">
              <span className="text-white font-bold text-xl">VS</span>
            </div>
            <div className="text-gray-800">
              <div className="font-bold text-lg leading-none">VENUS CATERING</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">SERVICE</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium">Services</a>
            <div className="relative group">
              <a href="#" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium flex items-center">
                Menu <span className="ml-1 text-xs">▼</span>
              </a>
            </div>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium">Gallery</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium">Blogs</a>
            <a href="#" className="text-gray-700 hover:text-red-600 transition-all duration-300 font-medium">Contact</a>
          </nav>

          {/* Book Now Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:inline-flex bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl items-center">
              Book Now
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Services</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Menu</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Gallery</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Blogs</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Contact</a>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors w-fit">
                Book Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;