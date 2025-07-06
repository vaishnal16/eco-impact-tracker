'use client';

import ActivityLogItem from '../../components/ActivityLogItem';
import BadgeCard from '../../components/BadgeCard';

export default function DashboardPage() {
  // Mock data
  const userName = "Vaishnal";
  const totalPoints = 120;
  
  const recentActivities = [
    {
      habitName: "Recycled plastic bottles",
      date: "2024-12-15",
      note: "Recycled 5 water bottles and 2 food containers"
    },
    {
      habitName: "Used public transport",
      date: "2024-12-14",
      note: "Took the bus to work instead of driving"
    },
    {
      habitName: "Planted a tree",
      date: "2024-12-13",
      note: "Planted an oak tree in the community garden"
    },
    {
      habitName: "Composted food waste",
      date: "2024-12-12",
      note: "Added vegetable scraps to the compost bin"
    },
    {
      habitName: "Used reusable bags",
      date: "2024-12-11",
      note: "Brought cloth bags for grocery shopping"
    }
  ];

  const badges = [
    {
      badgeName: "Eco Warrior",
      imageUrl: "https://via.placeholder.com/40/22c55e/ffffff?text=🌱",
      earned: true
    },
    {
      badgeName: "Green Transport",
      imageUrl: "https://via.placeholder.com/40/3b82f6/ffffff?text=🚌",
      earned: true
    },
    {
      badgeName: "Recycling Hero",
      imageUrl: "https://via.placeholder.com/40/f59e0b/ffffff?text=♻️",
      earned: true
    },
    {
      badgeName: "Tree Planter",
      imageUrl: "https://via.placeholder.com/40/10b981/ffffff?text=🌳",
      earned: false
    },
    {
      badgeName: "Energy Saver",
      imageUrl: "https://via.placeholder.com/40/f97316/ffffff?text=⚡",
      earned: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-600">Track your eco-friendly habits and earn rewards</p>
        </div>

        {/* Points Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Total Points</h2>
              <p className="text-3xl font-bold text-green-600">{totalPoints}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <ActivityLogItem
                  key={index}
                  habitName={activity.habitName}
                  date={activity.date}
                  note={activity.note}
                />
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Badges</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {badges.map((badge, index) => (
                <BadgeCard
                  key={index}
                  badgeName={badge.badgeName}
                  imageUrl={badge.imageUrl}
                  earned={badge.earned}
                />
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              You've earned {badges.filter(b => b.earned).length} out of {badges.length} badges
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <a 
            href="/log"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Log New Activity
          </a>
        </div>
      </div>
    </div>
  );
}