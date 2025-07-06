'use client';

import BadgeCard from '@/components/BadgeCard';

export default function BadgesPage() {
  // Mock badges data
  const allBadges = [
    {
      name: "First Steps",
      description: "Log your first eco-friendly activity",
      imageUrl: "https://via.placeholder.com/64/22c55e/ffffff?text=🌱",
      pointsRequired: 10,
      earned: true
    },
    {
      name: "Eco Warrior",
      description: "Complete 10 environmental activities",
      imageUrl: "https://via.placeholder.com/64/16a34a/ffffff?text=🛡️",
      pointsRequired: 100,
      earned: true
    },
    {
      name: "Green Commuter",
      description: "Use public transport 5 times",
      imageUrl: "https://via.placeholder.com/64/3b82f6/ffffff?text=🚌",
      pointsRequired: 50,
      earned: true
    },
    {
      name: "Recycling Champion",
      description: "Recycle items 15 times",
      imageUrl: "https://via.placeholder.com/64/f59e0b/ffffff?text=♻️",
      pointsRequired: 150,
      earned: true
    },
    {
      name: "Tree Planter",
      description: "Plant 5 trees or more",
      imageUrl: "https://via.placeholder.com/64/10b981/ffffff?text=🌳",
      pointsRequired: 250,
      earned: false
    },
    {
      name: "Energy Saver",
      description: "Complete 20 energy-saving activities",
      imageUrl: "https://via.placeholder.com/64/f97316/ffffff?text=⚡",
      pointsRequired: 200,
      earned: false
    },
    {
      name: "Water Guardian",
      description: "Save water 10 times",
      imageUrl: "https://via.placeholder.com/64/06b6d4/ffffff?text=💧",
      pointsRequired: 120,
      earned: false
    },
    {
      name: "Waste Reducer",
      description: "Reduce waste 25 times",
      imageUrl: "https://via.placeholder.com/64/8b5cf6/ffffff?text=🗑️",
      pointsRequired: 300,
      earned: false
    },
    {
      name: "Local Hero",
      description: "Buy local produce 15 times",
      imageUrl: "https://via.placeholder.com/64/ec4899/ffffff?text=🛒",
      pointsRequired: 180,
      earned: false
    },
    {
      name: "Sustainability Master",
      description: "Reach 1000 total points",
      imageUrl: "https://via.placeholder.com/64/7c3aed/ffffff?text=👑",
      pointsRequired: 1000,
      earned: false
    },
    {
      name: "Climate Champion",
      description: "Complete 50 climate actions",
      imageUrl: "https://via.placeholder.com/64/dc2626/ffffff?text=🌍",
      pointsRequired: 500,
      earned: false
    },
    {
      name: "Eco Legend",
      description: "The ultimate eco-warrior status",
      imageUrl: "https://via.placeholder.com/64/facc15/ffffff?text=🏆",
      pointsRequired: 2000,
      earned: false
    }
  ];

  const earnedBadges = allBadges.filter(badge => badge.earned);
  const lockedBadges = allBadges.filter(badge => !badge.earned);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏅 Badge Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Earn badges by completing eco-friendly activities
          </p>
        </div>

        {/* Progress Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {earnedBadges.length}
              </div>
              <div className="text-gray-600">Badges Earned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">
                {lockedBadges.length}
              </div>
              <div className="text-gray-600">Badges Locked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((earnedBadges.length / allBadges.length) * 100)}%
              </div>
              <div className="text-gray-600">Complete</div>
            </div>
          </div>
        </div>

        {/* Earned Badges Section */}
        {earnedBadges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🌟</span>
              Earned Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {earnedBadges.map((badge, index) => (
                <div key={index} className="rounded-xl shadow-md p-6 border-2 border-green-200 bg-green-50">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <img 
                        src={badge.imageUrl} 
                        alt={badge.name}
                        className="w-12 h-12 object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{badge.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Earned
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges Section */}
        {lockedBadges.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🔒</span>
              Locked Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lockedBadges.map((badge, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 opacity-60 hover:opacity-80 transition-opacity">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center grayscale">
                      <img 
                        src={badge.imageUrl} 
                        alt={badge.name}
                        className="w-12 h-12 object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{badge.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                    <div className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {badge.pointsRequired} pts needed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">
              Ready to Earn More Badges? 🚀
            </h3>
            <p className="text-green-100 mb-4">
              Complete eco-friendly activities to unlock new achievements
            </p>
            <a 
              href="/log"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Log Activity
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}