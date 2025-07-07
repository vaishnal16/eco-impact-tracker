'use client';

import { useState } from 'react';
import { FaCar, FaLeaf, FaBolt, FaRecycle, FaShoppingBag } from 'react-icons/fa';
import Header from '@/components/Header';

// Carbon footprint multipliers (kg CO2/year)
const FOOTPRINT_MULTIPLIERS = {
  commute: {
    car: 2400,
    bus: 1200,
    bicycle: 0,
    walk: 0
  },
  meat: {
    high: 1800,
    moderate: 1200,
    low: 600,
    vegetarian: 300
  },
  energy: {
    coal: 3600,
    mixed: 2400,
    solar: 600
  },
  plastic: {
    high: 1000,
    medium: 600,
    low: 200
  },
  recycling: {
    never: 800,
    sometimes: 400,
    always: 100
  }
};

interface FormData {
  commute: string;
  meat: string;
  energy: string;
  plastic: string;
  recycling: string;
}

export default function CarbonFootprintCalculator() {
  const [formData, setFormData] = useState<FormData>({
    commute: '',
    meat: '',
    energy: '',
    plastic: '',
    recycling: ''
  });
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setShowResult(false);
  };

  const calculateFootprint = () => {
    const total = 
      FOOTPRINT_MULTIPLIERS.commute[formData.commute as keyof typeof FOOTPRINT_MULTIPLIERS.commute] +
      FOOTPRINT_MULTIPLIERS.meat[formData.meat as keyof typeof FOOTPRINT_MULTIPLIERS.meat] +
      FOOTPRINT_MULTIPLIERS.energy[formData.energy as keyof typeof FOOTPRINT_MULTIPLIERS.energy] +
      FOOTPRINT_MULTIPLIERS.plastic[formData.plastic as keyof typeof FOOTPRINT_MULTIPLIERS.plastic] +
      FOOTPRINT_MULTIPLIERS.recycling[formData.recycling as keyof typeof FOOTPRINT_MULTIPLIERS.recycling];
    
    setResult(total / 1000); // Convert to tons
    setShowResult(true);
  };

  const getSuggestions = () => {
    const suggestions = [];
    if (formData.commute === 'car') suggestions.push('consider using public transport');
    if (formData.meat === 'high') suggestions.push('reduce meat consumption');
    if (formData.energy === 'coal') suggestions.push('switch to renewable energy');
    if (formData.plastic === 'high') suggestions.push('minimize plastic usage');
    if (formData.recycling !== 'always') suggestions.push('recycle more frequently');
    
    return suggestions.length > 0 
      ? `Try to ${suggestions.join(' and ')}!`
      : 'Great job! Keep maintaining these eco-friendly habits!';
  };

  const isFormComplete = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const getFootprintCategory = (footprint: number) => {
    if (footprint < 4) return { text: 'Excellent', color: 'text-green-500' };
    if (footprint < 6) return { text: 'Good', color: 'text-emerald-500' };
    if (footprint < 8) return { text: 'Fair', color: 'text-yellow-500' };
    return { text: 'Needs Improvement', color: 'text-red-500' };
  };

  const questions = [
    {
      icon: <FaCar className="text-green-600 w-6 h-6" />,
      title: "What's your primary mode of daily commute?",
      field: 'commute',
      options: ['car', 'bus', 'bicycle', 'walk']
    },
    {
      icon: <FaLeaf className="text-green-600 w-6 h-6" />,
      title: "What's your weekly meat consumption?",
      field: 'meat',
      options: ['high', 'moderate', 'low', 'vegetarian']
    },
    {
      icon: <FaBolt className="text-green-600 w-6 h-6" />,
      title: "What type of energy do you primarily use?",
      field: 'energy',
      options: ['coal', 'mixed', 'solar']
    },
    {
      icon: <FaShoppingBag className="text-green-600 w-6 h-6" />,
      title: "How would you rate your monthly plastic usage?",
      field: 'plastic',
      options: ['high', 'medium', 'low']
    },
    {
      icon: <FaRecycle className="text-green-600 w-6 h-6" />,
      title: "How often do you recycle?",
      field: 'recycling',
      options: ['never', 'sometimes', 'always']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your environmental impact and get personalized suggestions to reduce your carbon footprint.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-green-600 text-white scale-110'
                      : index < currentStep
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="space-y-8">
            {!showResult ? (
              <div className="transition-all duration-300 transform">
                <div className="flex items-center space-x-3 mb-6">
                  {questions[currentStep].icon}
                  <h2 className="text-xl font-medium text-gray-800">
                    {questions[currentStep].title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {questions[currentStep].options.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        handleInputChange(questions[currentStep].field as keyof FormData, option);
                        if (currentStep < questions.length - 1) {
                          setCurrentStep(prev => prev + 1);
                        } else {
                          calculateFootprint();
                        }
                      }}
                      className={`
                        px-6 py-3 rounded-xl text-sm font-medium capitalize
                        transition-all duration-300 transform hover:scale-105
                        ${formData[questions[currentStep].field as keyof FormData] === option
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border-2 border-gray-200'}
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="px-6 py-2 text-green-600 font-medium hover:text-green-700 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Previous</span>
                    </button>
                  )}
                  {currentStep < questions.length - 1 && formData[questions[currentStep].field as keyof FormData] && (
                    <button
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="px-6 py-2 text-green-600 font-medium hover:text-green-700 transition-colors flex items-center space-x-2 ml-auto"
                    >
                      <span>Next</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  {currentStep === questions.length - 1 && formData[questions[currentStep].field as keyof FormData] && (
                    <button
                      onClick={calculateFootprint}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ml-auto flex items-center space-x-2"
                    >
                      <span>Calculate Footprint</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 animate-fadeIn">
                <div className="w-32 h-32 mx-auto relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="12"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-green-600 transition-all duration-1000"
                      strokeWidth="12"
                      strokeDasharray={58 * 2 * Math.PI}
                      strokeDashoffset={58 * 2 * Math.PI * (1 - Math.min(result! / 10, 1))}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="text-4xl font-bold text-gray-800">{result?.toFixed(1)}</div>
                      <div className="text-sm text-gray-500">tons/year</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Your Carbon Footprint is{' '}
                    <span className={getFootprintCategory(result!).color}>
                      {getFootprintCategory(result!).text}
                    </span>
                  </h3>
                  <p className="text-gray-600 mb-6">{getSuggestions()}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setShowResult(false);
                      setCurrentStep(0);
                      setFormData({
                        commute: '',
                        meat: '',
                        energy: '',
                        plastic: '',
                        recycling: ''
                      });
                    }}
                    className="px-6 py-3 bg-white text-green-600 font-medium rounded-xl border-2 border-green-200 hover:bg-green-50 transition-all duration-300"
                  >
                    Calculate Again
                  </button>
                  <a
                    href="/log"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center space-x-2"
                  >
                    <span>Log Eco Activities</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 