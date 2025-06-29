
import React from 'react';
import { Sun, Moon, BookOpen } from 'lucide-react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${
            darkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`font-bold text-xl ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              TA Recommender
            </h1>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Sistem Rekomendasi Judul TA SI
            </p>
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
