
import React from 'react';
import { Users, TrendingUp, Lightbulb, Award } from 'lucide-react';

const ClusterAnalysis = ({ 
  analysis, 
  academicStrengths, 
  skillRecommendations, 
  profileData, 
  darkMode 
}) => {
  return (
    <div className={`mb-8 p-6 rounded-2xl ${
      darkMode 
        ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-lg border border-indigo-700' 
        : 'bg-gradient-to-r from-indigo-50 to-purple-50 backdrop-blur-lg border border-indigo-200 shadow-lg'
    }`}>
      <div className="text-center mb-6">
        <div className={`inline-flex p-4 rounded-full mb-4 ${
          darkMode ? 'bg-indigo-600/20' : 'bg-indigo-100'
        }`}>
          <Users className={`w-8 h-8 ${
            darkMode ? 'text-indigo-400' : 'text-indigo-600'
          }`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          🎯 Analisis Profil Mahasiswa
        </h3>
        <p className={`${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Berdasarkan K-Means clustering dan analisis akademik
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cluster Analysis */}
        <div className={`p-4 rounded-xl ${
          darkMode 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white/70 border border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <Users className={`w-5 h-5 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <h4 className={`font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Kategori Mahasiswa
            </h4>
          </div>
          <p className={`text-sm leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {analysis}
          </p>
        </div>

        {/* Academic Strengths */}
        <div className={`p-4 rounded-xl ${
          darkMode 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white/70 border border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-green-600/20' : 'bg-green-100'
            }`}>
              <Award className={`w-5 h-5 ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`} />
            </div>
            <h4 className={`font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Kekuatan Akademik
            </h4>
          </div>
          <p className={`text-sm leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {academicStrengths}
          </p>
        </div>

        {/* Skill Recommendations */}
        <div className={`p-4 rounded-xl ${
          darkMode 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white/70 border border-gray-200'
        }`}>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <Lightbulb className={`w-5 h-5 ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
            </div>
            <h4 className={`font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Saran Pengembangan
            </h4>
          </div>
          <p className={`text-sm leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {skillRecommendations}
          </p>
        </div>
      </div>

      {/* Profile Summary */}
      <div className={`mt-6 p-4 rounded-xl ${
        darkMode 
          ? 'bg-gray-800/30 border border-gray-700' 
          : 'bg-white/50 border border-gray-200'
      }`}>
        <div className="flex items-center space-x-3 mb-3">
          <TrendingUp className={`w-5 h-5 ${
            darkMode ? 'text-indigo-400' : 'text-indigo-600'
          }`} />
          <h4 className={`font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ringkasan Profil: {profileData.name}
          </h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className={`text-lg font-bold text-blue-500`}>
              {profileData.gpa?.toFixed(2)}
            </div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              IPK
            </div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold text-green-500`}>
              {profileData.interests?.length || 0}
            </div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Minat
            </div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold text-purple-500`}>
              {profileData.skills?.length || 0}
            </div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Skills
            </div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold text-orange-500`}>
              Sem {profileData.semester}
            </div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Semester
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterAnalysis;
