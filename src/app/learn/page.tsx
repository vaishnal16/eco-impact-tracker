'use client';

import { useState, useEffect } from 'react';
import { FaRecycle, FaLeaf, FaWater, FaSeedling, FaSun, FaTree, FaExternalLinkAlt } from 'react-icons/fa';

// Mock learning data with added article links
const learningCards = [
  {
    id: 1,
    title: "Why Recycling Matters",
    summary: "Recycling is crucial for reducing landfill waste and conserving natural resources. Every ton of paper recycled saves 17 trees and 7,000 gallons of water. Learn how your small actions create a big impact.",
    icon: FaRecycle,
    articleUrl: "https://www.nationalgeographic.com/environment/article/recycling-explained",
    articleSource: "National Geographic"
  },
  {
    id: 2,
    title: "Understanding Carbon Footprint",
    summary: "Your carbon footprint is the total amount of greenhouse gases produced by your actions. From daily commutes to food choices, discover how your lifestyle affects the planet and what you can do about it.",
    icon: FaLeaf,
    articleUrl: "https://www.epa.gov/climate-change/what-you-can-do-about-climate-change",
    articleSource: "EPA"
  },
  {
    id: 3,
    title: "Water Conservation Tips",
    summary: "Water is a precious resource, and conservation is key. Simple changes like fixing leaks and taking shorter showers can save thousands of gallons annually. Learn practical ways to reduce water waste.",
    icon: FaWater,
    articleUrl: "https://www.worldwildlife.org/initiatives/fresh-water",
    articleSource: "World Wildlife Fund"
  },
  {
    id: 4,
    title: "Sustainable Living Basics",
    summary: "Sustainable living means meeting our needs without compromising future generations. Explore practical tips for reducing waste, saving energy, and making eco-friendly choices in your daily life.",
    icon: FaSeedling,
    articleUrl: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
    articleSource: "United Nations"
  },
  {
    id: 5,
    title: "Renewable Energy Explained",
    summary: "Renewable energy sources like solar and wind power are key to fighting climate change. Understand how these technologies work and why they're crucial for a sustainable future.",
    icon: FaSun,
    articleUrl: "https://www.iea.org/reports/renewables-2023",
    articleSource: "International Energy Agency"
  },
  {
    id: 6,
    title: "Forest Conservation",
    summary: "Forests are the Earth's lungs, absorbing CO2 and providing habitat for countless species. Learn about deforestation's impact and how you can help protect our world's forests.",
    icon: FaTree,
    articleUrl: "https://www.conservation.org/priorities/protecting-tropical-forests",
    articleSource: "Conservation International"
  }
];

export default function LearnPage() {
  const [readCards, setReadCards] = useState<number[]>([]);

  useEffect(() => {
    // Load read cards from localStorage
    const savedReadCards = localStorage.getItem('readCards');
    if (savedReadCards) {
      setReadCards(JSON.parse(savedReadCards));
    }
  }, []);

  const toggleReadStatus = (cardId: number) => {
    const updatedReadCards = readCards.includes(cardId)
      ? readCards.filter(id => id !== cardId)
      : [...readCards, cardId];
    
    setReadCards(updatedReadCards);
    localStorage.setItem('readCards', JSON.stringify(updatedReadCards));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
        Eco Learning Hub
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Explore our curated collection of environmental topics to deepen your understanding 
        of sustainability and learn how you can make a positive impact on our planet.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningCards.map((card) => {
          const isRead = readCards.includes(card.id);
          const Icon = card.icon;
          
          return (
            <div
              key={card.id}
              className={`
                relative overflow-hidden rounded-lg shadow-lg 
                transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl
                ${isRead ? 'bg-green-50' : 'bg-white'}
                border border-green-100
              `}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Icon className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {card.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {card.summary}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => toggleReadStatus(card.id)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      transition-colors duration-200
                      ${isRead 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'}
                    `}
                  >
                    {isRead ? 'Marked as Read ✓' : 'Mark as Read'}
                  </button>

                  <a
                    href={card.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    <span className="mr-1">Read on {card.articleSource}</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                </div>
              </div>
              
              <div 
                className={`
                  absolute top-0 right-0 m-4 w-3 h-3 rounded-full
                  transition-colors duration-200
                  ${isRead ? 'bg-green-500' : 'bg-gray-200'}
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
} 