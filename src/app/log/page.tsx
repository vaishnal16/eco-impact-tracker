'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Habit {
  id: string;
  name: string;
  points_value?: number;
  description?: string;
}

export default function LogPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabitId, setSelectedHabitId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingHabits, setIsLoadingHabits] = useState(true);
  const [error, setError] = useState('');

  // Fetch habits on component mount
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoadingHabits(true);
        const response = await fetch('http://localhost:3000/api/habits');
        
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        
        const data = await response.json();
        setHabits(data);
      } catch (error) {
        console.error('Error fetching habits:', error);
        setError('Failed to load habits. Please refresh the page.');
      } finally {
        setIsLoadingHabits(false);
      }
    };

    fetchHabits();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedHabitId) {
      alert('Please select a habit');
      return;
    }

    // Get user ID from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to continue');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/activity/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          habit_id: selectedHabitId,
          notes: notes.trim(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Show success message with points earned
        if (result.pointsEarned > 0) {
          alert(`Activity logged! You earned ${result.pointsEarned} points.`);
        }
        
        // Show new badges if any
        if (result.newBadges && result.newBadges.length > 0) {
          const badgeNames = result.newBadges.map((badge: { name: any; }) => badge.name).join(', ');
          alert(`🎉 Congratulations! You earned new badge(s): ${badgeNames}`);
        }
        
        // Redirect to dashboard on successful submission
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log activity');
      }
    } catch (error) {
      console.error('Error logging activity:', error);
      setError(error instanceof Error ? error.message : 'Failed to log activity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Log Your Activity
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Track your eco-friendly habits and earn points
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            {/* Habit Selection */}
            <div>
              <label htmlFor="habit" className="block text-sm font-medium text-gray-700 mb-2">
                Select Habit *
              </label>
              <select
                id="habit"
                value={selectedHabitId}
                onChange={(e) => setSelectedHabitId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
                disabled={isLoadingHabits}
              >
                <option value="">
                  {isLoadingHabits ? 'Loading habits...' : 'Choose a habit...'}
                </option>
                {habits.map((habit) => (
                  <option key={habit.id} value={habit.id}>
                    {habit.name}
                    {habit.points_value && ` (+${habit.points_value} points)`}
                  </option>
                ))}
              </select>
              {isLoadingHabits && (
                <div className="flex items-center mt-2">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-500 text-sm">Loading habits...</span>
                </div>
              )}
              {!isLoadingHabits && habits.length === 0 && (
                <p className="text-red-500 text-sm mt-2">No habits available. Please contact support.</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                placeholder="Add any additional details about your activity..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {notes.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || isLoadingHabits || habits.length === 0}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging...
                  </div>
                ) : (
                  'Log Activity'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Back to Dashboard */}
        <div className="text-center">
          <a 
            href="/dashboard"
            className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}