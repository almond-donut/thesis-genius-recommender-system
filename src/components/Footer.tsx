
import React from 'react';
import { Heart, BookOpen, Github, Mail } from 'lucide-react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`mt-16 border-t ${
      darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50/50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-xl ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className={`font-bold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                TA Recommender
              </h3>
            </div>
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Sistem rekomendasi berbasis AI yang membantu mahasiswa Sistem Informasi 
              menemukan topik Tugas Akhir yang sesuai dengan profil akademik mereka.
            </p>
          </div>

          {/* Methodology */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Metodologi
            </h4>
            <ul className={`space-y-2 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li>• K-Means Clustering untuk profiling mahasiswa</li>
              <li>• Analisis kompatibilitas berdasarkan IPK & minat</li>
              <li>• AI-powered recommendations dengan Gemini 2.0</li>
              <li>• Scoring system untuk ranking topik</li>
            </ul>
          </div>

          {/* Contact & Credits */}
          <div>
            <h4 className={`font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Pengembang
            </h4>
            <div className={`space-y-3 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>pradadeveloper@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>github.com/pradaabdulmufid</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Made for SI Students</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-6 border-t text-center ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2024 TA Recommender • Dikembangkan dengan ❤️ untuk mahasiswa Sistem Informasi
          </p>
          <p className={`text-xs mt-2 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Powered by Gemini 2.0 Flash AI • Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
