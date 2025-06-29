
import React from 'react';
import { ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react';

const Hero = ({ onStart, darkMode }) => {
  const features = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "AI-Powered Recommendations",
      description: "Rekomendasi berbasis profil akademik dan minat"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Quick & Easy",
      description: "Hanya butuh 5 menit untuk mendapat rekomendasi"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Personalized Results",
      description: "Hasil yang disesuaikan dengan kemampuan Anda"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      {/* Main Hero Content */}
      <div className="mb-16">
        <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Temukan Judul{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Tugas Akhir
          </span>{' '}
          Terbaik
        </h1>
        
        <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Sistem rekomendasi berbasis AI yang membantu mahasiswa Sistem Informasi 
          menemukan topik TA yang sesuai dengan minat dan kemampuan akademik.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={onStart}
            className="group flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className={`flex items-center space-x-2 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Gratis • Tidak perlu registrasi</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              darkMode 
                ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-lg border border-gray-700' 
                : 'bg-white/50 hover:bg-white/70 backdrop-blur-lg border border-gray-200 shadow-sm'
            }`}
          >
            <div className={`inline-flex p-3 rounded-xl mb-4 ${
              darkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              {feature.icon}
            </div>
            <h3 className={`font-semibold text-lg mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {feature.title}
            </h3>
            <p className={`${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className={`inline-flex items-center space-x-8 p-6 rounded-2xl ${
        darkMode 
          ? 'bg-gray-800/30 backdrop-blur-lg border border-gray-700' 
          : 'bg-white/30 backdrop-blur-lg border border-gray-200'
      }`}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            1000+
          </div>
          <div className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Topik TA
          </div>
        </div>
        <div className={`w-px h-8 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}></div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            95%
          </div>
          <div className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Akurasi
          </div>
        </div>
        <div className={`w-px h-8 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}></div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            5 Min
          </div>
          <div className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Proses
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
