
import React from 'react';
import { User, BookOpen } from 'lucide-react';

const StepOne = ({ formData, updateFormData, darkMode }) => {
  const semesters = [
    { value: '6', label: 'Semester 6' },
    { value: '7', label: 'Semester 7' },
    { value: '8', label: 'Semester 8' }
  ];

  const handleGpaChange = (value) => {
    updateFormData({ gpa: parseFloat(value) });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex p-4 rounded-full mb-4 ${
          darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
        }`}>
          <User className={`w-8 h-8 ${
            darkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Informasi Personal
        </h3>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Mulai dengan informasi dasar tentang diri Anda
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Input */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Nama Lengkap *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="Masukkan nama lengkap Anda"
            className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Semester Select */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Semester Saat Ini *
          </label>
          <select
            value={formData.semester}
            onChange={(e) => updateFormData({ semester: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Pilih semester</option>
            {semesters.map(semester => (
              <option key={semester.value} value={semester.value}>
                {semester.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GPA Slider */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          IPK Saat Ini: {formData.gpa.toFixed(2)} *
        </label>
        <div className="relative">
          <input
            type="range"
            min="2.0"
            max="4.0"
            step="0.1"
            value={formData.gpa}
            onChange={(e) => handleGpaChange(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2.0</span>
            <span>3.0</span>
            <span>4.0</span>
          </div>
        </div>
        
        {/* GPA Visual Indicator */}
        <div className={`mt-4 p-4 rounded-xl ${
          formData.gpa >= 3.5 
            ? (darkMode ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200')
            : formData.gpa >= 3.0
            ? (darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200')
            : (darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200')
        }`}>
          <div className="flex items-center space-x-3">
            <BookOpen className={`w-5 h-5 ${
              formData.gpa >= 3.5 
                ? 'text-green-500'
                : formData.gpa >= 3.0
                ? 'text-blue-500'
                : 'text-yellow-500'
            }`} />
            <div>
              <div className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formData.gpa >= 3.5 
                  ? 'Prestasi Sangat Baik' 
                  : formData.gpa >= 3.0
                  ? 'Prestasi Baik'
                  : 'Prestasi Cukup'
                }
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                IPK Anda menunjukkan kemampuan akademik yang {
                  formData.gpa >= 3.5 
                    ? 'luar biasa' 
                    : formData.gpa >= 3.0
                    ? 'solid'
                    : 'memadai'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
