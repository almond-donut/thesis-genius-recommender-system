
import React from 'react';

interface LoadingStepProps {
  step: string;
  title: string;
  completed?: boolean;
  loading?: boolean;
  pending?: boolean;
  darkMode: boolean;
}

const LoadingAnimation = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className={`inline-flex p-6 rounded-full mb-6 ${
          darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
        }`}>
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
        
        <h2 className={`text-3xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          🤖 AI Sedang Bekerja
        </h2>
        
        <p className={`text-lg mb-6 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Menganalisis profil Anda dan mencari rekomendasi terbaik...
        </p>
      </div>

      {/* Loading Steps */}
      <div className={`p-6 rounded-2xl ${
        darkMode 
          ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700' 
          : 'bg-white/50 backdrop-blur-lg border border-gray-200 shadow-lg'
      }`}>
        <div className="space-y-4">
          <LoadingStep 
            step="1" 
            title="Menganalisis profil akademik" 
            completed={true}
            darkMode={darkMode}
          />
          <LoadingStep 
            step="2" 
            title="Mencocokkan minat dan kemampuan" 
            completed={true}
            darkMode={darkMode}
          />
          <LoadingStep 
            step="3" 
            title="Mencari topik TA yang sesuai" 
            loading={true}
            darkMode={darkMode}
          />
          <LoadingStep 
            step="4" 
            title="Menghitung skor kompatibilitas" 
            pending={true}
            darkMode={darkMode}
          />
          <LoadingStep 
            step="5" 
            title="Menyiapkan rekomendasi" 
            pending={true}
            darkMode={darkMode}
          />
        </div>
      </div>

      <div className={`mt-6 text-sm ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Proses ini biasanya memakan waktu 10-30 detik
      </div>
    </div>
  );
};

const LoadingStep = ({ step, title, completed = false, loading = false, pending = false, darkMode }: LoadingStepProps) => {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        completed 
          ? 'bg-green-500 text-white'
          : loading
          ? 'bg-blue-500 text-white'
          : pending
          ? (darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-500')
          : 'bg-gray-300 text-gray-600'
      }`}>
        {completed ? '✓' : loading ? 
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          : step
        }
      </div>
      <div className={`text-left ${
        completed 
          ? (darkMode ? 'text-green-400' : 'text-green-600')
          : loading
          ? (darkMode ? 'text-blue-400' : 'text-blue-600')
          : (darkMode ? 'text-gray-400' : 'text-gray-500')
      }`}>
        {title}
      </div>
    </div>
  );
};

export default LoadingAnimation;
