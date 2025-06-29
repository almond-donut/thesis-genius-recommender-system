
import React from 'react';
import { CheckCircle } from 'lucide-react';

const StepTwo = ({ formData, updateFormData, darkMode }) => {
  const interests = [
    { id: 'web-dev', name: 'Web Development', icon: '🌐' },
    { id: 'mobile-dev', name: 'Mobile App Development', icon: '📱' },
    { id: 'data-science', name: 'Data Science & Analytics', icon: '📊' },
    { id: 'ai', name: 'Artificial Intelligence', icon: '🤖' },
    { id: 'database', name: 'Database Systems', icon: '🗄️' },
    { id: 'security', name: 'Network Security', icon: '🔒' },
    { id: 'ecommerce', name: 'E-Commerce Systems', icon: '🛒' },
    { id: 'game-dev', name: 'Game Development', icon: '🎮' },
    { id: 'iot', name: 'IoT Systems', icon: '🌐' },
    { id: 'ui-ux', name: 'UI/UX Design', icon: '🎨' }
  ];

  const toggleInterest = (interestId) => {
    const currentInterests = formData.interests || [];
    const isSelected = currentInterests.includes(interestId);
    
    if (isSelected) {
      updateFormData({
        interests: currentInterests.filter(id => id !== interestId)
      });
    } else {
      updateFormData({
        interests: [...currentInterests, interestId]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex p-4 rounded-full mb-4 ${
          darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
        }`}>
          <span className="text-3xl">💡</span>
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Minat Akademik
        </h3>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Pilih bidang yang menarik minat Anda (minimal 1)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interests.map((interest) => {
          const isSelected = formData.interests?.includes(interest.id) || false;
          
          return (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                isSelected
                  ? 'border-blue-500 bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                  : darkMode
                  ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{interest.icon}</span>
                <div>
                  <div className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {interest.name}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {formData.interests?.length > 0 && (
        <div className={`p-4 rounded-xl ${
          darkMode 
            ? 'bg-blue-900/30 border border-blue-700' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className={`text-sm font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Minat yang dipilih ({formData.interests.length}):
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.interests.map(interestId => {
              const interest = interests.find(i => i.id === interestId);
              return (
                <span
                  key={interestId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white"
                >
                  {interest?.icon} {interest?.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepTwo;
