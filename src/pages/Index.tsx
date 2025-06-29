
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProfileForm from '../components/ProfileForm';
import Results from '../components/Results';
import Footer from '../components/Footer';
import LoadingAnimation from '../components/LoadingAnimation';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('hero'); // hero, form, loading, results
  const [profileData, setProfileData] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleStartForm = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = async (data) => {
    setProfileData(data);
    setCurrentStep('loading');
    
    try {
      const result = await submitToGemini(data);
      setRecommendations(result);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('Terjadi kesalahan saat mendapatkan rekomendasi. Silakan coba lagi.');
      setCurrentStep('form');
    }
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const handleStartOver = () => {
    setCurrentStep('hero');
    setProfileData({});
    setRecommendations(null);
  };

  const submitToGemini = async (data) => {
    const API_KEY = 'AIzaSyCZ0LGY-09e_pux5WEshHpioaiUdJ0aX8w';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

    const prompt = `You are an expert academic advisor for Information Systems students. Based on the student profile below, recommend 5 thesis topics using data mining clustering concepts.

Student Profile:
- Name: ${data.name}
- Semester: ${data.semester}
- GPA: ${data.gpa}
- Interests: ${data.interests?.join(', ')}
- Skills: ${data.skills?.join(', ')}
- Projects: ${data.projects}
- Preferred Type: ${data.thesisType}
- Difficulty: ${data.difficulty}

Please provide recommendations in this JSON format:
{
  "cluster_analysis": "Brief explanation of which student cluster this profile belongs to",
  "academic_strengths": "Analysis of student's academic areas",
  "recommendations": [
    {
      "title": "Thesis title",
      "category": "Category",
      "difficulty": "Beginner/Intermediate/Advanced",
      "compatibility_score": 85,
      "description": "Brief description",
      "why_suitable": "Why this fits the student profile",
      "required_skills": ["skill1", "skill2"],
      "estimated_duration": "4-6 months",
      "similar_projects": "Examples of similar applications"
    }
  ],
  "skill_recommendations": "Suggested skills to develop"
}

Focus on practical, implementable thesis topics.`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Invalid response format');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'hero' && (
          <Hero onStart={handleStartForm} darkMode={darkMode} />
        )}
        
        {currentStep === 'form' && (
          <ProfileForm 
            onSubmit={handleFormSubmit} 
            darkMode={darkMode}
            initialData={profileData}
          />
        )}
        
        {currentStep === 'loading' && (
          <LoadingAnimation darkMode={darkMode} />
        )}
        
        {currentStep === 'results' && (
          <Results 
            recommendations={recommendations}
            profileData={profileData}
            darkMode={darkMode}
            onBack={handleBackToForm}
            onStartOver={handleStartOver}
          />
        )}
      </main>
      
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Index;
