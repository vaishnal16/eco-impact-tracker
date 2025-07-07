'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ActivityLogItem from '../../components/ActivityLogItem';
import BadgeCard from '../../components/BadgeCard';
import useSession from '../../hooks/useSession';
import Link from 'next/link';

interface ActivityLog {
  id: number;
  habit_name: string;
  logged_at: string;
  points: number;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-6"></div>
          <p className="text-lg text-green-800 font-medium">Loading your eco-dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
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
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-6 block">🌱</span>
          <p className="text-xl text-green-800 font-medium">No dashboard data available</p>
        </div>
      </div>
    );
  }

  const { name, totalPoints, currentStreak, activity_logs, badges } = dashboardData;
  const earnedBadgesCount = badges.length;

  /** ------------------  UI  ----------------- */

  const avatarInitial = getInitial(name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-12">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Welcome Message */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {avatarInitial}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, {name}!
                </h1>
                <p className="text-gray-600">
                  Let's make a positive impact today
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <a 
                href="/log"
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Log Activity</span>
              </a>
              <a 
                href="/analytics"
                className="flex items-center space-x-2 px-6 py-3 bg-white text-green-600 font-medium rounded-xl hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-2 border-green-200"
              >
                <span>📊</span>
                <span>Analytics</span>
              </a>
              <a 
                href="/leaderboard"
                className="flex items-center space-x-2 px-6 py-3 bg-white text-green-600 font-medium rounded-xl hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-2 border-green-200"
              >
                <span>🏆</span>
                <span>Leaderboard</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Points Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100 text-lg mb-1">Total Points</p>
                <p className="text-4xl font-bold">{totalPoints}</p>
              </div>
              <div className="text-4xl">🌟</div>
            </div>
          </div>
          
          {/* Streak Card */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-orange-100 text-lg mb-1">Current Streak</p>
                <p className="text-4xl font-bold">{currentStreak} days</p>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </div>
          
          {/* Badges Card */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100 text-lg mb-1">Badges Earned</p>
                <p className="text-4xl font-bold">{earnedBadgesCount}</p>
              </div>
              <div className="text-4xl">🎖️</div>
            </div>
          </div>
        </div>

        {/* Activities and Badges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Recent Activities</span>
            </h2>
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
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <span className="text-6xl mb-4 block">🌱</span>
                <p className="text-xl font-medium text-gray-800 mb-2">No activities yet</p>
                <p className="text-gray-600">Start logging your eco-friendly habits!</p>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Recent Badges</span>
              </h2>
              <Link 
                href="/badges"
                className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 group"
              >
                <span>View All</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.slice(0, 6).map((badge) => (
                  <Link href="/badges" key={badge.id}>
                    <BadgeCard
                      name={badge.name}
                      description={badge.description}
                      imageUrl={badge.imageUrl}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <span className="text-6xl mb-4 block">🎖️</span>
                <p className="text-xl font-medium text-gray-800 mb-2">No badges yet</p>
                <p className="text-gray-600">Complete activities to earn badges!</p>
                <Link 
                  href="/badges"
                  className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  View Available Badges
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}