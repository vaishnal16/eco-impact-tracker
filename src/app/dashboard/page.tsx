'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ActivityLogItem from '../../components/ActivityLogItem';
import BadgeCard from '../../components/BadgeCard';

interface ActivityLog {
  habitName: string;
  date: string;
  note: string;
}

interface Badge {
  badgeName: string;
  imageUrl: string;
  earned: boolean;
}

interface DashboardData {
  name: string;
  totalPoints: number;
  activity_logs: ActivityLog[];
  badges: Badge[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get user ID from localStorage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          // Redirect to login if no user ID found
          router.push('/login');
          return;
        }

        const response = await fetch(`http://localhost:3000/api/dashboard?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          if (response.status === 401) {
            // Unauthorized - redirect to login
            localStorage.removeItem('userId');
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
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
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

  const { name, totalPoints, activity_logs, badges } = dashboardData;
  const earnedBadgesCount = badges.filter(badge => badge.earned).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Logout */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {name}!
            </h1>
            <p className="text-gray-600">Track your eco-friendly habits and earn rewards</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
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
            {activity_logs.length > 0 ? (
              <div className="space-y-4">
                {activity_logs.slice(0, 5).map((activity, index) => (
                  <ActivityLogItem
                    key={index}
                    habitName={activity.habitName}
                    date={activity.date}
                    note={activity.note}
                  />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p>No activities logged yet.</p>
                <p className="text-sm mt-2">Start logging your eco-friendly habits!</p>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Badges</h2>
            {badges.length > 0 ? (
              <>
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
                  You've earned {earnedBadgesCount} out of {badges.length} badges
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center py-8">
                <p>No badges available yet.</p>
                <p className="text-sm mt-2">Keep logging activities to earn badges!</p>
              </div>
            )}
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