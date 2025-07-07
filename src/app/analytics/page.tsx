'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import Header from '../../components/Header';
import useSession from '../../hooks/useSession';

interface DailyPoints {
  date: string;
  points: number;
}

interface HabitBreakdown {
  name: string;
  count: number;
  points: number;
}

interface AnalyticsData {
  dailyPoints: DailyPoints[];
  habitBreakdown: HabitBreakdown[];
}

// Colors for pie chart
const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];

export default function AnalyticsPage() {
  const router = useRouter();
  const { user: sessionUser } = useSession();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionUser) return;

    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/analytics?userId=${sessionUser.id}`);
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        } else {
          setError('Failed to load analytics data');
        }
      } catch (err) {
        setError('An error occurred while loading analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [sessionUser]);

  if (loading || !sessionUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
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

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No analytics data available</p>
        </div>
      </div>
    );
  }

  // Calculate total activities for percentage
  const totalActivities = analyticsData.habitBreakdown.reduce((sum, habit) => sum + habit.count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Eco Impact Analytics 📊</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Points Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Points Earned (Last 7 Days)</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.dailyPoints}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} points`, 'Points']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long' })}
                  />
                  <Bar dataKey="points" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Habit Distribution Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity Distribution</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.habitBreakdown}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, count }) => `${name} (${Math.round((count / totalActivities) * 100)}%)`}
                  >
                    {analyticsData.habitBreakdown.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} activities (${Math.round((Number(value) / totalActivities) * 100)}%)`,
                      name
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Activities</h3>
            <p className="text-3xl font-bold text-green-600">{totalActivities}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Most Common Activity</h3>
            <p className="text-3xl font-bold text-green-600">
              {analyticsData.habitBreakdown.sort((a, b) => b.count - a.count)[0]?.name || 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Points (7 Days)</h3>
            <p className="text-3xl font-bold text-green-600">
              {analyticsData.dailyPoints.reduce((sum, day) => sum + day.points, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 