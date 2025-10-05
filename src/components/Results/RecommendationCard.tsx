
import React from 'react';
import { Star, Clock, Target, ChevronDown, ChevronUp, BookOpen, Zap } from 'lucide-react';

const RecommendationCard = ({ recommendation, index, isExpanded, onToggle, darkMode }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 85) return 'from-green-500/10 to-green-600/10 border-green-500/30';
    if (score >= 70) return 'from-blue-500/10 to-blue-600/10 border-blue-500/30';
    if (score >= 60) return 'from-yellow-500/10 to-yellow-600/10 border-yellow-500/30';
    return 'from-orange-500/10 to-orange-600/10 border-orange-500/30';
  };

  const getDifficultyStars = (difficulty) => {
    const stars = difficulty === 'Advanced' ? 3 : difficulty === 'Intermediate' ? 2 : 1;
    return Array.from({ length: 3 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className={`rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
      darkMode 
        ? 'bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-gray-600' 
        : 'bg-white/50 backdrop-blur-lg border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
    }`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                #{index + 1}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                darkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                {recommendation.category}
              </span>
            </div>
            
            <h3 className={`text-xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {recommendation.title}
            </h3>
            
            <p className={`text-sm leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {recommendation.description}
            </p>
          </div>

          {/* Compatibility Score */}
          <div className={`ml-4 p-4 rounded-xl ${getScoreBgColor(recommendation.compatibility_score)} border`}>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(recommendation.compatibility_score)}`}>
                {recommendation.compatibility_score}%
              </div>
              <div className={`text-xs font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Match
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center space-x-1">
            <Target className={`w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {recommendation.difficulty}
            </span>
            <div className="flex space-x-1 ml-1">
              {getDifficultyStars(recommendation.difficulty)}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Clock className={`w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {recommendation.estimated_duration}
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-300 ${
            darkMode
              ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{isExpanded ? 'Sembunyikan Detail' : 'Lihat Detail'}</span>
          {isExpanded ? 
            <ChevronUp className="w-4 h-4" /> : 
            <ChevronDown className="w-4 h-4" />
          }
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className={`border-t px-6 py-6 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Why Suitable */}
            <div>
              <h4 className={`flex items-center space-x-2 font-semibold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Zap className="w-5 h-5 text-green-500" />
                <span>Mengapa Cocok?</span>
              </h4>
              <p className={`text-sm leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {recommendation.why_suitable}
              </p>
            </div>

            {/* Required Skills */}
            <div>
              <h4 className={`flex items-center space-x-2 font-semibold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>Skills yang Dibutuhkan</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.required_skills?.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      darkMode 
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                        : 'bg-blue-50 text-blue-600 border border-blue-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Leverages Strengths */}
            {recommendation.leverages_strengths && (
              <div>
                <h4 className={`flex items-center space-x-2 font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Target className="w-5 h-5 text-purple-500" />
                  <span>Memanfaatkan Kekuatan</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.leverages_strengths?.map((strength, strengthIndex) => (
                    <span
                      key={strengthIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode 
                          ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' 
                          : 'bg-purple-50 text-purple-600 border border-purple-200'
                      }`}
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Projects */}
            <div>
              <h4 className={`flex items-center space-x-2 font-semibold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Contoh Serupa</span>
              </h4>
              <p className={`text-sm leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {recommendation.similar_projects}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}>
              💾 Simpan Topik
            </button>
            <button className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}>
              📤 Bagikan
            </button>
            <button className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}>
              📋 Detail Lengkap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
