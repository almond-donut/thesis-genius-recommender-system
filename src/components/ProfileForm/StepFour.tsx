
import React from 'react';
import { Target, BarChart, Users, Zap } from 'lucide-react';

const StepFour = ({ formData, updateFormData, darkMode }) => {
  const thesisTypes = [
    {
      id: 'application',
      name: 'Application Development',
      description: 'Fokus pada pengembangan aplikasi atau sistem',
      icon: <Target className="w-6 h-6" />,
      examples: 'Website, Mobile App, Desktop App'
    },
    {
      id: 'research',
      name: 'Research & Analysis',
      description: 'Fokus pada penelitian dan analisis data',
      icon: <BarChart className="w-6 h-6" />,
      examples: 'Data Mining, Machine Learning, Statistical Analysis'
    },
    {
      id: 'system',
      name: 'System Design',
      description: 'Fokus pada perancangan sistem informasi',
      icon: <Users className="w-6 h-6" />,
      examples: 'ERP, CRM, Decision Support System'
    },
    {
      id: 'hybrid',
      name: 'Hybrid (App + Research)',
      description: 'Kombinasi pengembangan dan penelitian',
      icon: <Zap className="w-6 h-6" />,
      examples: 'Intelligent System, Recommendation System'
    }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Pemula', description: 'Implementasi konsep dasar' },
    { value: 'intermediate', label: 'Menengah', description: 'Penerapan teknologi modern' },
    { value: 'advanced', label: 'Lanjutan', description: 'Inovasi dan penelitian mendalam' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex p-4 rounded-full mb-4 ${
          darkMode ? 'bg-orange-600/20' : 'bg-orange-100'
        }`}>
          <span className="text-3xl">🎯</span>
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Preferensi Tugas Akhir
        </h3>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Tentukan jenis dan tingkat kesulitan TA yang Anda inginkan
        </p>
      </div>

      {/* Thesis Type Selection */}
      <div>
        <label className={`block text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Jenis Tugas Akhir *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {thesisTypes.map((type) => {
            const isSelected = formData.thesisType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => updateFormData({ thesisType: type.id })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                  isSelected
                    ? 'border-blue-500 bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {type.name}
                    </div>
                    <div className={`text-sm mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {type.description}
                    </div>
                    <div className={`text-xs ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Contoh: {type.examples}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Level */}
      <div>
        <label className={`block text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Tingkat Kesulitan: {difficultyLevels.find(d => d.value === formData.difficulty)?.label}
        </label>
        
        <div className="space-y-3">
          {difficultyLevels.map((level) => {
            const isSelected = formData.difficulty === level.value;
            
            return (
              <button
                key={level.value}
                onClick={() => updateFormData({ difficulty: level.value })}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                  isSelected
                    ? 'border-green-500 bg-gradient-to-r from-green-500/10 to-blue-500/10'
                    : darkMode
                    ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {level.label}
                    </div>
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {level.description}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {formData.thesisType && (
        <div className={`p-6 rounded-xl ${
          darkMode 
            ? 'bg-blue-900/30 border border-blue-700' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className={`text-lg font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            🎯 Ringkasan Profil Anda
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nama:
              </span>
              <span className={`ml-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formData.name}
              </span>
            </div>
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Semester:
              </span>
              <span className={`ml-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formData.semester}
              </span>
            </div>
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                IPK:
              </span>
              <span className={`ml-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formData.gpa?.toFixed(2)}
              </span>
            </div>
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Jenis TA:
              </span>
              <span className={`ml-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {thesisTypes.find(t => t.id === formData.thesisType)?.name}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Minat:
              </span>
              <span className={`ml-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formData.interests?.length} bidang terpilih
              </span>
            </div>
            <div className="md:col-span-2">
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Skills:
              </span>
              <span className={`ml-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formData.skills?.length} bahasa pemrograman
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepFour;
