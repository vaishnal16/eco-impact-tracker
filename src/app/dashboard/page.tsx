'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ActivityLogItem from '../../components/ActivityLogItem';
import BadgeCard from '../../components/BadgeCard';
import useSession from '../../hooks/useSession';

interface ActivityLog {
  id: number;
  habit_name: string;
  logged_at: string;
  points: number;
}

interface Badge {
  id: number;
  name: string;
  icon: string;
  earned_at: string;
}

interface DashboardData {
  name: string;
  totalPoints: number;
  currentStreak: number;
  activity_logs: ActivityLog[];
  badges: Badge[];
}

// Helpful util to extract first initial
const getInitial = (name: string | undefined) => (name ? name.charAt(0).toUpperCase() : 'U');

export default function DashboardPage() {
  const router = useRouter();
  const { user: sessionUser } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionUser) return; // wait for session

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`/api/dashboard?userId=${sessionUser.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          if (response.status === 401) {
            // Unauthorized - redirect to login
            localStorage.removeItem('user');
            router.push('/login');
          } else {
            setError('Failed to load dashboard data');
          }
        }
      } catch (err) {
        setError('An error occurred while loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [sessionUser, router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading || !sessionUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No dashboard data available</p>
        </div>
      </div>
    );
  }

  const { name, totalPoints, currentStreak, activity_logs, badges } = dashboardData;
  const earnedBadgesCount = badges.length;

  /** ------------------  UI  ----------------- */

  const avatarInitial = getInitial(name);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {avatarInitial}
            </div>
            <div>
              <p className="text-sm text-gray-500 leading-none">Welcome back</p>
              <h1 className="text-lg font-semibold text-gray-800 leading-none">{name}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Points and streak moved above */}
            <div className="flex items-center space-x-4">
              {/* Total points */}
              <div className="flex items-center space-x-1">
                <span className="text-green-700 font-bold">{totalPoints}</span>
                <span className="text-sm text-gray-600">pts</span>
              </div>
              {/* Daily Streak */}
              <div
                className="flex items-center space-x-1 cursor-help"
                title="Keep logging daily to maintain your streak"
              >
                <span className="text-green-700 font-bold">{currentStreak}</span>
                <span className="text-sm text-gray-600">day streak!</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {/* Points Card */}
        <div className="bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-xl shadow-md p-6 mb-8 flex items-center justify-between hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Total Points</h2>
              <p className="text-3xl font-bold text-green-600 animate-pulse">{totalPoints}</p>
            </div>
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-3xl">
              🏆
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">Recent Activities</h2>
            {activity_logs.length > 0 ? (
              <div className="space-y-4">
                {activity_logs.slice(0, 5).map((activity) => (
                  <ActivityLogItem
                    key={activity.id}
                    habitName={activity.habit_name}
                    date={activity.logged_at}
                    points={activity.points}
                  />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8 flex flex-col items-center space-y-2">
                <span className="text-4xl">🌱</span>
                <p>No activities logged yet.</p>
                <p className="text-sm mt-2">Start logging your eco-friendly habits!</p>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Badges</h2>
            {badges.length > 0 ? (
              <>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {badges.map((badge) => (
                    <BadgeCard
                      key={badge.id}
                      badgeName={badge.name}
                      imageUrl={badge.icon || '/vercel.svg'}
                      earned={true}
                    />
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  You've earned {earnedBadgesCount} out of {badges.length} badges
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center py-8 flex flex-col items-center space-y-2">
                <span className="text-4xl">🎖️</span>
                <p>No badges available yet.</p>
                <p className="text-sm mt-2">Keep logging activities to earn badges!</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center space-x-4">
          <a 
            href="/log"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Log New Activity
          </a>
          <a 
            href="/analytics"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg border border-green-200"
          >
            View Analytics 📊
          </a>
          <a 
            href="/leaderboard"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg border border-green-200"
          >
            View Leaderboard 🏆
          </a>
          <a 
            href="/learn"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg border border-green-200"
          >
            Eco Learning Hub 📚
          </a>
          <a 
            href="/footprint"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg border border-green-200"
          >
            Calculate Footprint 🌍
          </a>
          <a 
            href="/ecoquiz"
            className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg border border-green-200"
          >
            Take Eco Quiz 🤖
          </a>
        </div>

      </div>
    </div>
  );
}