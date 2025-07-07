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
  Legend,
  Area,
  AreaChart
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

// Colors for charts
const COLORS = {
  primary: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
  gradient: {
    from: '#059669',
    to: '#10B981'
  }
};

export default function AnalyticsPage() {
  const router = useRouter();
  const { user: sessionUser } = useSession();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeChart, setActiveChart] = useState<'bar' | 'area'>('bar');

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-500 border-t-transparent" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-lg text-gray-600 animate-pulse">Loading your eco impact data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-100 transform hover:scale-[1.02] transition-all duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium text-lg flex items-center justify-center mx-auto space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16m8-8l-4 4m0-8l4 4M8 8l-4 4m0-8l4 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Data Available</h3>
            <p className="text-gray-600 mb-6">Start logging your eco-friendly activities to see your impact analytics!</p>
            <a 
              href="/log"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium text-lg inline-flex items-center justify-center space-x-2"
            >
              <span>Log Activity</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total activities for percentage
  const totalActivities = analyticsData.habitBreakdown.reduce((sum, habit) => sum + habit.count, 0);
  const totalPoints = analyticsData.dailyPoints.reduce((sum, day) => sum + day.points, 0);
  const averagePointsPerDay = totalPoints / analyticsData.dailyPoints.length;
  const mostCommonActivity = analyticsData.habitBreakdown.sort((a, b) => b.count - a.count)[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Your Eco Impact Analytics
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your environmental contributions and see the positive impact you're making on our planet.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">Last 7 Days</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Total Activities</h3>
            <div className="text-3xl font-bold text-green-600">{totalActivities}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">Most Popular</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Top Activity</h3>
            <div className="text-xl font-bold text-emerald-600 truncate">
              {mostCommonActivity?.name || 'N/A'}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">Total Earned</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Points (7 Days)</h3>
            <div className="text-3xl font-bold text-teal-600">{totalPoints}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">Daily Average</span>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Points per Day</h3>
            <div className="text-3xl font-bold text-cyan-600">{Math.round(averagePointsPerDay)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Points Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Points History</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveChart('bar')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeChart === 'bar'
                      ? 'bg-green-100 text-green-700 shadow-inner'
                      : 'text-gray-600 hover:bg-green-50'
                  }`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setActiveChart('area')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeChart === 'area'
                      ? 'bg-green-100 text-green-700 shadow-inner'
                      : 'text-gray-600 hover:bg-green-50'
                  }`}
                >
                  Area
                </button>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === 'bar' ? (
                  <BarChart data={analyticsData.dailyPoints}>
                    <defs>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.gradient.from} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.gradient.to} stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                      stroke="#6B7280"
                    />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      formatter={(value) => [`${value} points`, 'Points']}
                      labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Bar 
                      dataKey="points" 
                      fill="url(#colorPoints)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <AreaChart data={analyticsData.dailyPoints}>
                    <defs>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.gradient.from} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS.gradient.to} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                      stroke="#6B7280"
                    />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      formatter={(value) => [`${value} points`, 'Points']}
                      labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                    <Area 
                      type="monotone"
                      dataKey="points"
                      stroke={COLORS.gradient.from}
                      fill="url(#colorPoints)"
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Habit Distribution Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Activity Distribution</h2>
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
                    labelLine={false}
                  >
                    {analyticsData.habitBreakdown.map((entry, index) => (
                      <Cell 
                        key={entry.name} 
                        fill={COLORS.primary[index % COLORS.primary.length]}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} activities (${Math.round((Number(value) / totalActivities) * 100)}%)`,
                      name
                    ]}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Legend 
                    formatter={(value, entry) => (
                      <span className="text-gray-700 font-medium">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 