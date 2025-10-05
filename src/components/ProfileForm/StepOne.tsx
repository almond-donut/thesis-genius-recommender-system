
import React, { useState } from 'react';
import { User, BookOpen, Upload, FileText, CheckCircle } from 'lucide-react';

interface TranscriptAnalysis {
  gpa: number;
  strongSubjects: Array<{ course: string; grade: string }>;
  decentSubjects: Array<{ course: string; grade: string }>;
  pattern: string;
}

const StepOne = ({ formData, updateFormData, darkMode }: {
  formData: any;
  updateFormData: (data: any) => void;
  darkMode: boolean;
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcriptAnalysis, setTranscriptAnalysis] = useState<TranscriptAnalysis | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const semesters = [
    { value: '6', label: 'Semester 6' },
    { value: '7', label: 'Semester 7' },
    { value: '8', label: 'Semester 8' }
  ];

  const handleGpaChange = (value: string) => {
    updateFormData({ gpa: parseFloat(value) });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File terlalu besar. Maksimal 5MB.');
      return;
    }

    if (!file.type.includes('pdf') && !file.type.includes('image')) {
      alert('Format file harus PDF atau gambar.');
      return;
    }

    setUploadedFile(file);
    setIsAnalyzing(true);

    try {
      await analyzeTranscript(file);
    } catch (error) {
      console.error('Error analyzing transcript:', error);
      alert('Gagal menganalisis transkrip. Silakan input manual.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeTranscript = async (file: File) => {
    const API_KEY = 'AIzaSyDDMOMJcbqlTuEvT4ME8edeq7Q5ErxzlW0';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

    // Convert file to base64
    const base64 = await fileToBase64(file);
    const mimeType = file.type;

    const prompt = `Analisis transkrip nilai mahasiswa ini dan berikan output dalam format JSON berikut:

{
  "gpa": 3.32,
  "strongSubjects": [
    {"course": "Matematika Diskrit", "grade": "A"},
    {"course": "Manajemen Data Center", "grade": "A"}
  ],
  "decentSubjects": [
    {"course": "Sistem Pendukung Keputusan", "grade": "B"}
  ],
  "pattern": "Kuat di programming, database, dan security"
}

Ekstrak IPK dan mata kuliah dengan nilai A dan B. Berikan analisis pola kekuatan akademik.`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64.split(',')[1] // Remove data:image/... prefix
              }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze transcript');
    }

    const result = await response.json();
    const text = result.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0]);
      setTranscriptAnalysis(analysis);
      updateFormData({ 
        gpa: analysis.gpa,
        transcriptAnalysis: analysis 
      });
    } else {
      throw new Error('Invalid response format');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
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

      {/* Transcript Upload Section */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Unggah Transkrip Nilai
        </label>
        
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : transcriptAnalysis
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : darkMode
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {isAnalyzing ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Menganalisis transkrip...
              </p>
            </div>
          ) : transcriptAnalysis ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <p className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Transkrip berhasil dianalisis! ✅
              </p>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p><strong>IPK:</strong> {transcriptAnalysis.gpa} (bagus!)</p>
                <p><strong>Strong in:</strong> {transcriptAnalysis.strongSubjects.map(s => `${s.course} (${s.grade})`).join(', ')}</p>
                <p><strong>Pattern:</strong> {transcriptAnalysis.pattern}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className={`w-8 h-8 mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <p className={`font-medium mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Seret & lepas file PDF di sini, atau klik untuk memilih
              </p>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Maks. 5MB
              </p>
            </div>
          )}

          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isAnalyzing}
          />
        </div>

        {uploadedFile && (
          <div className={`mt-4 p-3 rounded-lg flex items-center space-x-3 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <FileText className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {uploadedFile.name}
            </span>
          </div>
        )}
      </div>

      {/* Manual GPA Input (fallback) */}
      {!transcriptAnalysis && (
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
      )}
    </div>
  );
};

export default StepOne;
