
import React, { useState } from 'react';
import { Star, Clock, Target, ChevronDown, ChevronUp, ArrowLeft, RotateCcw } from 'lucide-react';
import RecommendationCard from './Results/RecommendationCard';
import ClusterAnalysis from './Results/ClusterAnalysis';

const Results = ({ recommendations, profileData, darkMode, onBack, onStartOver }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  if (!recommendations) {
    return (
      <div className="text-center py-16">
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Tidak ada rekomendasi yang ditemukan. Silakan coba lagi.
        </p>
      </div>
    );
  }

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className={`p-4 rounded-full ${
            darkMode ? 'bg-green-600/20' : 'bg-green-100'
          }`}>
            <span className="text-3xl">🎉</span>
          </div>
        </div>
        
        <h2 className={`text-4xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Rekomendasi Tugas Akhir
        </h2>
        
        <p className={`text-lg mb-6 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Berdasarkan analisis profil Anda, berikut adalah {recommendations.recommendations?.length || 0} topik TA terbaik
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={onBack}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Profil</span>
          </button>
          
          <button
            onClick={onStartOver}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Ulang</span>
          </button>
        </div>
      </div>

      {/* Cluster Analysis */}
      {recommendations.cluster_analysis && (
        <ClusterAnalysis 
          analysis={recommendations.cluster_analysis}
          academicStrengths={recommendations.academic_strengths}
          skillRecommendations={recommendations.skill_recommendations}
          profileData={profileData}
          darkMode={darkMode}
        />
      )}

      {/* Recommendations Grid */}
      <div className="space-y-6">
        <h3 className={`text-2xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          🎯 Rekomendasi Topik TA
        </h3>
        
        <div className="grid gap-6">
          {recommendations.recommendations?.map((rec, index) => (
            <RecommendationCard
              key={index}
              recommendation={rec}
              index={index}
              isExpanded={expandedCard === index}
              onToggle={() => toggleCard(index)}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className={`mt-12 p-6 rounded-2xl text-center ${
        darkMode 
          ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700' 
          : 'bg-white/50 backdrop-blur-lg border border-gray-200 shadow-lg'
      }`}>
        <h4 className={`text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          💾 Simpan Rekomendasi
        </h4>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            darkMode
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}>
            📄 Export ke PDF
          </button>
          <button className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            darkMode
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}>
            📤 Bagikan via Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
