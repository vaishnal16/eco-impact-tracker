'use client';

import { useState, useEffect } from 'react';
import useSession from '../../hooks/useSession';
import Header from '../../components/Header';

interface LeaderboardEntry {
  id: number;
  name: string;
  rank: number;
  total_points: number;
  current_streak: number;
  badge_count: number;
  medal: string | null;
}

export default function LeaderboardPage() {
  const { user: sessionUser } = useSession();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeframe, setTimeframe] = useState('all'); // 'all', 'month', 'week'

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`/api/leaderboard?timeframe=${timeframe}`);
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data);
        } else {
          setError('Failed to load leaderboard data');
        }
      } catch (err) {
        setError('An error occurred while loading the leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-500 border-t-transparent" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-lg text-gray-600 animate-pulse">Loading eco warriors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-100 transform hover:scale-[1.02] transition-all duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                Eco Warriors Leaderboard
              </h1>
              <p className="text-gray-600">Compete with fellow eco-warriors and make a difference! 🌍</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={() => setTimeframe('all')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  timeframe === 'all'
                    ? 'bg-green-100 text-green-700 shadow-inner'
                    : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  timeframe === 'month'
                    ? 'bg-green-100 text-green-700 shadow-inner'
                    : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setTimeframe('week')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  timeframe === 'week'
                    ? 'bg-green-100 text-green-700 shadow-inner'
                    : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                This Week
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Warrior</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Points</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Streak</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Achievements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaderboard.map((entry, index) => (
                  <tr 
                    key={entry.id}
                    className={`
                      group hover:bg-green-50 transition-all duration-300
                      ${sessionUser?.id === entry.id ? 'bg-green-50 hover:bg-green-100' : ''}
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`
                          text-2xl font-bold
                          ${index < 3 ? 'transform group-hover:scale-125 transition-transform duration-300' : ''}
                        `}>
                          {getMedalEmoji(entry.rank)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {entry.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                          {sessionUser?.id === entry.id && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900">{entry.total_points.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">pts</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a.75.75 0 01.75.75v.25h1.5a.75.75 0 010 1.5h-1.5v1.25c0 .69-.56 1.25-1.25 1.25h-2.5a1.25 1.25 0 01-1.25-1.25v-1.25h-1.5a.75.75 0 010-1.5h1.5v-.25a.75.75 0 011.5 0v.25h2v-.25a.75.75 0 01.75-.75zM6 6.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zm0 2.5a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zm0 2.5a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75z" />
                        </svg>
                        <span className="text-gray-900">{entry.current_streak}</span>
                        <span className="text-sm text-gray-500">days</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          {entry.badge_count}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}