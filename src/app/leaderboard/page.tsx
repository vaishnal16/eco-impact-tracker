'use client';

import LeaderboardCard from '../../components/LeaderBoard';

export default function LeaderboardPage() {
  const currentUser = "Vaishnal";
  
  // Mock leaderboard data - top 10 users
  const leaderboardData = [
    { name: "EcoChampion2024", points: 2850 },
    { name: "GreenWarrior", points: 2640 },
    { name: "NatureLover", points: 2420 },
    { name: "Vaishnal", points: 2180 },
    { name: "EcoFriendly", points: 1950 },
    { name: "TreeHugger", points: 1730 },
    { name: "PlanetSaver", points: 1580 },
    { name: "SustainableLiving", points: 1420 },
    { name: "ClimateAction", points: 1290 },
    { name: "ZeroWaste", points: 1150 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            See how you rank among eco-warriors worldwide
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {leaderboardData.length}
              </div>
              <div className="text-gray-600">Total Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {leaderboardData.find(user => user.name === currentUser)?.points.toLocaleString()}
              </div>
              <div className="text-gray-600">Your Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                #{leaderboardData.findIndex(user => user.name === currentUser) + 1}
              </div>
              <div className="text-gray-600">Your Rank</div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Top 10 Eco-Warriors
          </h2>
          
          <div className="space-y-4">
            {leaderboardData.map((user, index) => (
              <LeaderboardCard
                key={user.name}
                rank={index + 1}
                name={user.name}
                points={user.points}
                isCurrentUser={user.name === currentUser}
              />
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">
              Keep Making a Difference! 🌱
            </h3>
            <p className="text-green-100">
              Every eco-friendly action counts. Log more activities to climb the leaderboard!
            </p>
            <div className="mt-4">
              <a 
                href="/log"
                className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Log New Activity
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}