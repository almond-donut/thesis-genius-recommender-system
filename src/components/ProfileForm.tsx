
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StepOne from './ProfileForm/StepOne';
import StepTwo from './ProfileForm/StepTwo';
import StepThree from './ProfileForm/StepThree';
import StepFour from './ProfileForm/StepFour';

const ProfileForm = ({ onSubmit, darkMode, initialData = {} }: {
  onSubmit: (data: any) => void;
  darkMode: boolean;
  initialData?: any;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    gpa: 3.0,
    interests: [],
    skills: [],
    projects: '',
    favoriteSubjects: [],
    thesisType: '',
    difficulty: 'intermediate',
    transcriptAnalysis: null,
    ...initialData
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.semester && formData.gpa;
      case 2:
        return formData.interests.length > 0;
      case 3:
        return formData.skills.length > 0;
      case 4:
        return formData.thesisType;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne formData={formData} updateFormData={updateFormData} darkMode={darkMode} />;
      case 2:
        return <StepTwo formData={formData} updateFormData={updateFormData} darkMode={darkMode} />;
      case 3:
        return <StepThree formData={formData} updateFormData={updateFormData} darkMode={darkMode} />;
      case 4:
        return <StepFour formData={formData} updateFormData={updateFormData} darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Profil Mahasiswa
          </h2>
          <span className={`text-sm font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Langkah {currentStep} dari {totalSteps}
          </span>
        </div>
        
        <div className={`w-full h-2 rounded-full ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className={`p-8 rounded-2xl transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700' 
          : 'bg-white/50 backdrop-blur-lg border border-gray-200 shadow-lg'
      }`}>
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105'
            } ${
              darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                !isStepValid()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 shadow-lg hover:shadow-xl'
              } bg-gradient-to-r from-blue-500 to-purple-600 text-white`}
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                !isStepValid()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 shadow-lg hover:shadow-xl'
              } bg-gradient-to-r from-green-500 to-blue-600 text-white`}
            >
              Dapatkan Rekomendasi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
