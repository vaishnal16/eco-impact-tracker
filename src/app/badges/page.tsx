'use client';

import { useState } from 'react';
import BadgeCard from '@/components/BadgeCard';
import Header from '@/components/Header';

export default function BadgesPage() {
  const [filter, setFilter] = useState('all'); // 'all', 'earned', 'locked'

  // Mock badges data
  const allBadges = [
    {
      name: "First Steps",
      description: "Log your first eco-friendly activity",
      imageUrl: "/badges/first-steps.svg",
      pointsRequired: 10,
      earned: true,
      category: "beginner"
    },
    {
      name: "Eco Warrior",
      description: "Complete 10 environmental activities",
      imageUrl: "/badges/eco-warrior.svg",
      pointsRequired: 100,
      earned: true,
      category: "intermediate"
    },
    {
      name: "Green Commuter",
      description: "Use public transport 5 times",
      imageUrl: "/badges/green-commuter.svg",
      pointsRequired: 50,
      earned: true,
      category: "transport"
    },
    {
      name: "Recycling Champion",
      description: "Recycle items 15 times",
      imageUrl: "/badges/recycling-champion.svg",
      pointsRequired: 150,
      earned: true,
      category: "waste"
    },
    {
      name: "Tree Planter",
      description: "Plant 5 trees or more",
      imageUrl: "/badges/tree-planter.svg",
      pointsRequired: 250,
      earned: false,
      category: "nature"
    },
    {
      name: "Energy Saver",
      description: "Complete 20 energy-saving activities",
      imageUrl: "/badges/energy-saver.svg",
      pointsRequired: 200,
      earned: false,
      category: "energy"
    },
    {
      name: "Water Guardian",
      description: "Save water 10 times",
      imageUrl: "/badges/water-guardian.svg",
      pointsRequired: 120,
      earned: false,
      category: "water"
    },
    {
      name: "Waste Reducer",
      description: "Reduce waste 25 times",
      imageUrl: "/badges/waste-reducer.svg",
      pointsRequired: 300,
      earned: false,
      category: "waste"
    },
    {
      name: "Local Hero",
      description: "Buy local produce 15 times",
      imageUrl: "/badges/local-hero.svg",
      pointsRequired: 180,
      earned: false,
      category: "shopping"
    },
    {
      name: "Sustainability Master",
      description: "Reach 1000 total points",
      imageUrl: "/badges/sustainability-master.svg",
      pointsRequired: 1000,
      earned: false,
      category: "advanced"
    },
    {
      name: "Climate Champion",
      description: "Complete 50 climate actions",
      imageUrl: "/badges/climate-champion.svg",
      pointsRequired: 500,
      earned: false,
      category: "advanced"
    },
    {
      name: "Eco Legend",
      description: "The ultimate eco-warrior status",
      imageUrl: "/badges/eco-legend.svg",
      pointsRequired: 2000,
      earned: false,
      category: "advanced"
    }
  ];

  const earnedBadges = allBadges.filter(badge => badge.earned);
  const lockedBadges = allBadges.filter(badge => !badge.earned);
  const displayBadges = filter === 'earned' ? earnedBadges : filter === 'locked' ? lockedBadges : allBadges;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Achievement Badges
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your eco-impact journey through badges. Each badge represents a milestone in your commitment to sustainability.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="text-4xl font-bold text-green-600 mb-2 animate-pulse">
                {earnedBadges.length}
              </div>
              <div className="text-gray-600 font-medium">Badges Earned</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {lockedBadges.length}
              </div>
              <div className="text-gray-600 font-medium">Badges Locked</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="relative h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="28"
                    cx="32"
                    cy="32"
                  />
                  <circle
                    className="text-purple-600 transition-all duration-1000"
                    strokeWidth="8"
                    strokeDasharray={28 * 2 * Math.PI}
                    strokeDashoffset={28 * 2 * Math.PI * (1 - earnedBadges.length / allBadges.length)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="28"
                    cx="32"
                    cy="32"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-purple-600">
                  {Math.round((earnedBadges.length / allBadges.length) * 100)}%
                </span>
              </div>
              <div className="text-gray-600 font-medium">Progress</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === 'all'
                ? 'bg-green-100 text-green-700 shadow-inner'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            All Badges
          </button>
          <button
            onClick={() => setFilter('earned')}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === 'earned'
                ? 'bg-green-100 text-green-700 shadow-inner'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            Earned ({earnedBadges.length})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === 'locked'
                ? 'bg-green-100 text-green-700 shadow-inner'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            Locked ({lockedBadges.length})
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayBadges.map((badge, index) => (
            <div 
              key={index} 
              className={`
                transform hover:scale-105 transition-all duration-300
                ${badge.earned 
                  ? 'bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100' 
                  : 'bg-white/80 rounded-2xl shadow-lg p-6 border-2 border-gray-100 backdrop-blur-sm'}
              `}
            >
              <div className="text-center">
                <div className={`
                  w-20 h-20 mx-auto mb-4 rounded-2xl 
                  ${badge.earned 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                    : 'bg-gradient-to-br from-gray-200 to-gray-300'} 
                  flex items-center justify-center transform hover:rotate-6 transition-transform duration-300
                `}>
                  <img 
                    src={badge.imageUrl} 
                    alt={badge.name}
                    className={`w-14 h-14 object-cover ${!badge.earned && 'grayscale'}`}
                  />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                {badge.earned ? (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Earned</span>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-gray-400 to-gray-500 h-full transition-all duration-1000"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-medium">
                      {badge.pointsRequired} points needed
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white transform hover:scale-[1.02] transition-all duration-300 shadow-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Unlock More Achievements? 🚀
              </h3>
              <p className="text-green-50 mb-6 text-lg">
                Every eco-friendly action brings you closer to new badges. Keep making a difference!
              </p>
              <a 
                href="/log"
                className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg space-x-2"
              >
                <span>Log New Activity</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}