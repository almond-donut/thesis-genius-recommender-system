
import React from 'react';
import { CheckCircle } from 'lucide-react';

const StepThree = ({ formData, updateFormData, darkMode }) => {
  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'PHP', 'C++', 'C#', 
    'Kotlin', 'Swift', 'Go', 'TypeScript', 'Dart', 'Ruby'
  ];

  const favoriteSubjects = [
    'Pemrograman Berbasis Objek', 'Manajemen Basis Data', 'Sistem Pendukung Keputusan',
    'Keamanan Sistem Informasi', 'Analisis dan Perancangan SI', 'Data Mining',
    'Rekayasa Perangkat Lunak', 'Manajemen Proyek SI', 'E-Business',
    'Sistem Operasi', 'Jaringan Komputer', 'Matematika Diskrit'
  ];

  const toggleSkill = (skill) => {
    const currentSkills = formData.skills || [];
    const isSelected = currentSkills.includes(skill);
    
    if (isSelected) {
      updateFormData({
        skills: currentSkills.filter(s => s !== skill)
      });
    } else {
      updateFormData({
        skills: [...currentSkills, skill]
      });
    }
  };

  const toggleSubject = (subject) => {
    const currentSubjects = formData.favoriteSubjects || [];
    const isSelected = currentSubjects.includes(subject);
    
    if (isSelected) {
      updateFormData({
        favoriteSubjects: currentSubjects.filter(s => s !== subject)
      });
    } else {
      updateFormData({
        favoriteSubjects: [...currentSubjects, subject]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex p-4 rounded-full mb-4 ${
          darkMode ? 'bg-green-600/20' : 'bg-green-100'
        }`}>
          <span className="text-3xl">⚡</span>
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Kemampuan & Pengalaman
        </h3>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Ceritakan tentang skills dan pengalaman Anda
        </p>
      </div>

      {/* Programming Languages */}
      <div>
        <label className={`block text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Bahasa Pemrograman (minimal 1) *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {programmingLanguages.map((language) => {
            const isSelected = formData.skills?.includes(language) || false;
            
            return (
              <button
                key={language}
                onClick={() => toggleSkill(language)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 ${
                  isSelected
                    ? 'border-green-500 bg-gradient-to-r from-green-500/10 to-blue-500/10'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-1 right-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
                
                <div className={`font-medium text-sm ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {language}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Experience */}
      <div>
        <label className={`block text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Pengalaman Proyek
        </label>
        <textarea
          value={formData.projects}
          onChange={(e) => updateFormData({ projects: e.target.value })}
          placeholder="Ceritakan tentang proyek yang pernah Anda kerjakan, baik di perkuliahan maupun pribadi. Contoh: Membuat website e-commerce menggunakan Laravel, Aplikasi mobile untuk manajemen keuangan dengan React Native, dll."
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Favorite Subjects */}
      <div>
        <label className={`block text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Mata Kuliah Favorit
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {favoriteSubjects.map((subject) => {
            const isSelected = formData.favoriteSubjects?.includes(subject) || false;
            
            return (
              <button
                key={subject}
                onClick={() => toggleSubject(subject)}
                className={`relative p-3 rounded-lg border-2 transition-all duration-300 text-left hover:scale-105 ${
                  isSelected
                    ? 'border-purple-500 bg-gradient-to-r from-purple-500/10 to-blue-500/10'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                  </div>
                )}
                
                <div className={`font-medium text-sm ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {subject}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Summary */}
      {(formData.skills?.length > 0 || formData.favoriteSubjects?.length > 0) && (
        <div className={`p-4 rounded-xl ${
          darkMode 
            ? 'bg-green-900/30 border border-green-700' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <div className={`text-sm font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ringkasan Kemampuan:
          </div>
          <div className="space-y-2">
            {formData.skills?.length > 0 && (
              <div>
                <span className={`text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Bahasa Pemrograman ({formData.skills.length}):
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {formData.favoriteSubjects?.length > 0 && (
              <div>
                <span className={`text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Mata Kuliah Favorit ({formData.favoriteSubjects.length}):
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.favoriteSubjects.map(subject => (
                    <span
                      key={subject}
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-purple-500 text-white"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepThree;
