'use client';

import { useState, useEffect } from 'react';
import { FaRecycle, FaLeaf, FaWater, FaSeedling, FaSun, FaTree, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import Header from '@/components/Header';

// Mock learning data with added article links
const learningCards = [
  {
    id: 1,
    title: "Why Recycling Matters",
    summary: "Recycling is crucial for reducing landfill waste and conserving natural resources. Every ton of paper recycled saves 17 trees and 7,000 gallons of water. Learn how your small actions create a big impact.",
    icon: FaRecycle,
    articleUrl: "https://www.nationalgeographic.com/environment/article/recycling-explained",
    articleSource: "National Geographic",
    category: "Waste Management"
  },
  {
    id: 2,
    title: "Understanding Carbon Footprint",
    summary: "Your carbon footprint is the total amount of greenhouse gases produced by your actions. From daily commutes to food choices, discover how your lifestyle affects the planet and what you can do about it.",
    icon: FaLeaf,
    articleUrl: "https://www.epa.gov/climate-change/what-you-can-do-about-climate-change",
    articleSource: "EPA",
    category: "Climate Change"
  },
  {
    id: 3,
    title: "Water Conservation Tips",
    summary: "Water is a precious resource, and conservation is key. Simple changes like fixing leaks and taking shorter showers can save thousands of gallons annually. Learn practical ways to reduce water waste.",
    icon: FaWater,
    articleUrl: "https://www.worldwildlife.org/initiatives/fresh-water",
    articleSource: "World Wildlife Fund",
    category: "Conservation"
  },
  {
    id: 4,
    title: "Sustainable Living Basics",
    summary: "Sustainable living means meeting our needs without compromising future generations. Explore practical tips for reducing waste, saving energy, and making eco-friendly choices in your daily life.",
    icon: FaSeedling,
    articleUrl: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
    articleSource: "United Nations",
    category: "Lifestyle"
  },
  {
    id: 5,
    title: "Renewable Energy Explained",
    summary: "Renewable energy sources like solar and wind power are key to fighting climate change. Understand how these technologies work and why they're crucial for a sustainable future.",
    icon: FaSun,
    articleUrl: "https://www.iea.org/reports/renewables-2023",
    articleSource: "International Energy Agency",
    category: "Energy"
  },
  {
    id: 6,
    title: "Forest Conservation",
    summary: "Forests are the Earth's lungs, absorbing CO2 and providing habitat for countless species. Learn about deforestation's impact and how you can help protect our world's forests.",
    icon: FaTree,
    articleUrl: "https://www.conservation.org/priorities/protecting-tropical-forests",
    articleSource: "Conservation International",
    category: "Conservation"
  }
];

const categories = Array.from(new Set(learningCards.map(card => card.category)));

export default function LearnPage() {
  const [readCards, setReadCards] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load read cards from localStorage
    try {
      setIsLoading(true);
      const savedReadCards = localStorage.getItem('readCards');
      if (savedReadCards) {
        setReadCards(JSON.parse(savedReadCards));
      }
    } catch (err) {
      setError('Failed to load your reading progress. Please try again.');
      console.error('Error loading read cards:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleReadStatus = (cardId: number) => {
    try {
      const updatedReadCards = readCards.includes(cardId)
        ? readCards.filter(id => id !== cardId)
        : [...readCards, cardId];
      
      setReadCards(updatedReadCards);
      localStorage.setItem('readCards', JSON.stringify(updatedReadCards));
    } catch (err) {
      console.error('Error updating read status:', err);
      // Show temporary error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg';
      errorDiv.textContent = 'Failed to save your reading progress';
      document.body.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    }
  };

  const filteredCards = learningCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const progressPercentage = (readCards.length / learningCards.length) * 100;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-8 py-6 rounded-2xl shadow-lg">
              <span className="text-4xl mb-4 block">⚠️</span>
              <p className="text-lg font-medium mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Eco Learning Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of environmental topics to deepen your understanding 
            of sustainability and learn how you can make a positive impact on our planet.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Learning Progress</span>
            <span className="text-sm font-medium text-green-600" role="status" aria-label="Reading Progress">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progressPercentage)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className={`
            relative bg-white rounded-2xl shadow-xl transition-all duration-300
            ${isSearchFocused ? 'ring-2 ring-green-500 ring-opacity-50' : ''}
          `}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="block w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border-0 rounded-2xl focus:ring-0 focus:outline-none sm:text-sm"
              aria-label="Search articles"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center" role="tablist">
            <button
              onClick={() => setSelectedCategory('All')}
              role="tab"
              aria-selected={selectedCategory === 'All'}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${selectedCategory === 'All'
                  ? 'bg-green-100 text-green-700 shadow-inner'
                  : 'text-gray-600 hover:bg-green-50'
                }
              `}
            >
              All Topics
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                role="tab"
                aria-selected={selectedCategory === category}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-green-100 text-green-700 shadow-inner'
                    : 'text-gray-600 hover:bg-green-50'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map(card => (
              <div
                key={card.id}
                className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                    <card.icon className="w-8 h-8 text-green-600" aria-hidden="true" />
                  </div>
                  <button
                    onClick={() => toggleReadStatus(card.id)}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                      ${readCards.includes(card.id)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }
                    `}
                    aria-label={`Mark ${card.title} as ${readCards.includes(card.id) ? 'unread' : 'read'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.summary}</p>
                <a
                  href={card.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  aria-label={`Read more about ${card.title} on ${card.articleSource}`}
                >
                  Read on {card.articleSource}
                  <FaExternalLinkAlt className="ml-2 w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && filteredCards.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 inline-block">
              <span className="text-4xl mb-4 block" role="img" aria-label="No results found">🔍</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 