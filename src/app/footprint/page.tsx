'use client';

import { useState } from 'react';
import { FaCar, FaLeaf, FaBolt, FaRecycle, FaShoppingBag } from 'react-icons/fa';

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Carbon Footprint Calculator
          </h1>
          <p className="text-gray-600">
            Answer these questions to estimate your annual carbon footprint and get personalized suggestions.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-8">
          {/* Daily Commute */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaCar className="text-green-600 w-6 h-6" />
              <label className="block text-lg font-medium text-gray-700">
                What's your primary mode of daily commute?
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['car', 'bus', 'bicycle', 'walk'].map(option => (
                <button
                  key={option}
                  onClick={() => handleInputChange('commute', option)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize
                    transition-colors duration-200
                    ${formData.commute === option
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Meat Consumption */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaLeaf className="text-green-600 w-6 h-6" />
              <label className="block text-lg font-medium text-gray-700">
                What's your weekly meat consumption?
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['high', 'moderate', 'low', 'vegetarian'].map(option => (
                <button
                  key={option}
                  onClick={() => handleInputChange('meat', option)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize
                    transition-colors duration-200
                    ${formData.meat === option
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Usage */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaBolt className="text-green-600 w-6 h-6" />
              <label className="block text-lg font-medium text-gray-700">
                What type of energy do you primarily use?
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['coal', 'mixed', 'solar'].map(option => (
                <button
                  key={option}
                  onClick={() => handleInputChange('energy', option)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize
                    transition-colors duration-200
                    ${formData.energy === option
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Plastic Usage */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaShoppingBag className="text-green-600 w-6 h-6" />
              <label className="block text-lg font-medium text-gray-700">
                How would you rate your monthly plastic usage?
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['high', 'medium', 'low'].map(option => (
                <button
                  key={option}
                  onClick={() => handleInputChange('plastic', option)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize
                    transition-colors duration-200
                    ${formData.plastic === option
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Recycling Frequency */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaRecycle className="text-green-600 w-6 h-6" />
              <label className="block text-lg font-medium text-gray-700">
                How often do you recycle?
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['never', 'sometimes', 'always'].map(option => (
                <button
                  key={option}
                  onClick={() => handleInputChange('recycling', option)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize
                    transition-colors duration-200
                    ${formData.recycling === option
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="pt-6">
            <button
              onClick={calculateFootprint}
              disabled={!isFormComplete()}
              className={`
                w-full py-3 px-4 rounded-xl text-white font-medium text-lg
                transition-all duration-200 transform hover:scale-[1.02]
                ${isFormComplete()
                  ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'}
              `}
            >
              Calculate My Footprint
            </button>
          </div>

          {/* Results */}
          {showResult && result !== null && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Your Carbon Footprint Results
              </h3>
              <p className="text-3xl font-bold text-green-600 mb-4">
                {result.toFixed(1)} tons CO2/year 🌍
              </p>
              <p className="text-gray-600">
                {getSuggestions()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 