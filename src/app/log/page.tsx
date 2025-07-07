'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../../components/Alert';
import useSession from '../../hooks/useSession';
import Header from '@/components/Header';
import { FaLeaf, FaRegStickyNote, FaCheck, FaArrowLeft } from 'react-icons/fa';

interface Habit {
  id: string;
  name: string;
  points_value?: number;
  description?: string;
}

export default function LogPage() {
  const router = useRouter();
  const { user: sessionUser } = useSession();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabitId, setSelectedHabitId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingHabits, setIsLoadingHabits] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

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
      setError('Please select a habit');
      return;
    }

    if (!sessionUser) {
      setError('You are not logged in');
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
          user_id: sessionUser.id,
          habit_id: Number(selectedHabitId),
          notes: notes.trim(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Build success message
        let message = `Activity logged! You earned ${result.pointsEarned} points.`;
        if (result.newBadges && result.newBadges.length > 0) {
          const badgeNames = result.newBadges.map((badge: { name: any; }) => badge.name).join(', ');
          message += ` 🎉 New badge(s): ${badgeNames}`;
        }
        setSuccess(message);

        // Redirect after brief delay to show success message
        setTimeout(() => router.push('/dashboard'), 1500);
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

  const selectedHabit = habits.find(h => h.id === selectedHabitId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Log Your Activity
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your eco-friendly habits, earn points, and make a positive impact on our planet.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-8">
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </div>
        )}
        {success && (
          <div className="mb-8">
            <Alert type="success" message={success} onClose={() => setSuccess(null)} />
          </div>
        )}

        {/* Activity Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Habit Selection */}
            <div>
              <label htmlFor="habit" className="block text-lg font-medium text-gray-800 mb-4">
                Select an Eco-Friendly Habit
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.map((habit) => (
                  <button
                    key={habit.id}
                    type="button"
                    onClick={() => setSelectedHabitId(habit.id)}
                    className={`
                      p-4 rounded-xl text-left transition-all duration-300
                      ${selectedHabitId === habit.id
                        ? 'bg-green-600 text-white shadow-xl'
                        : 'bg-gray-50 text-gray-800 hover:bg-gray-100 hover:shadow-lg'
                      }
                    `}
                    aria-pressed={selectedHabitId === habit.id}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        ${selectedHabitId === habit.id ? 'bg-green-500' : 'bg-green-100'}
                      `}>
                        <FaLeaf className={`w-5 h-5 ${selectedHabitId === habit.id ? 'text-white' : 'text-green-600'}`} aria-hidden="true" />
                      </div>
                      <span className="font-medium">{habit.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-lg font-medium text-gray-800 mb-4">
                Additional Notes (Optional)
              </label>
              <div className="relative">
                <FaRegStickyNote className="absolute top-3 left-3 w-5 h-5 text-gray-400" aria-hidden="true" />
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any details about your eco-friendly activity..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-shadow duration-300"
                  rows={4}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-white text-green-600 font-medium rounded-xl hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-2 border-green-200 flex items-center space-x-2"
                aria-label="Go back to previous page"
              >
                <FaArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={!selectedHabitId || isSubmitting}
                className={`
                  px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1
                  flex items-center space-x-2
                  ${!selectedHabitId || isSubmitting
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-xl hover:shadow-2xl'
                  }
                `}
                aria-label={isSubmitting ? 'Logging activity...' : 'Log activity'}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="w-4 h-4" aria-hidden="true" />
                    <span>Log Activity</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}