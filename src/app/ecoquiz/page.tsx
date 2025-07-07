'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function EcoQuizPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  const fetchNewQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      setSelectedAnswer(null);
      setShowResult(false);

      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate question' }));
        throw new Error(errorData.error || 'Failed to generate question');
      }

      const quizData = await response.json();
      
      // Validate the quiz data structure
      if (!quizData.question || !Array.isArray(quizData.options) || 
          quizData.options.length !== 4 || typeof quizData.correctAnswer !== 'number' ||
          !quizData.explanation) {
        throw new Error('Invalid quiz data received');
      }

      setQuestion(quizData);
      setRetryCount(0); // Reset retry count on successful fetch
    } catch (err) {
      console.error('Error fetching question:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate question. Please try again.');
      
      // Implement retry logic
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          fetchNewQuestion();
        }, 1000 * (retryCount + 1)); // Exponential backoff
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && question) {
      if (selectedAnswer === question.correctAnswer) {
        setScore(prev => prev + 1);
      }
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionNumber(prev => prev + 1);
    fetchNewQuestion();
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchNewQuestion();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 ml-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🤖 AI-Powered Eco Quiz
          </h1>
          <p className="text-gray-600">
            Test your environmental knowledge with our AI-generated questions!
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-lg">
            <span className="font-medium text-green-600" role="status" aria-label="Current Score">Score: {score}</span>
            <span className="text-gray-400" aria-hidden="true">|</span>
            <span className="font-medium text-green-600" role="status" aria-label="Current Question Number">Question: {currentQuestionNumber}</span>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 transform hover:scale-[1.02] transition-all duration-300">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-xl"></div>
                ))}
              </div>
            </div>
          ) : (
            question && (
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-6" role="heading" aria-level={2}>
                  {question.question}
                </h2>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      aria-pressed={selectedAnswer === index}
                      className={`
                        w-full px-6 py-4 rounded-xl text-left transition-all duration-300
                        ${showResult
                          ? index === question.correctAnswer
                            ? 'bg-green-100 text-green-800 border-2 border-green-500'
                            : index === selectedAnswer
                            ? 'bg-red-100 text-red-800 border-2 border-red-500'
                            : 'bg-gray-50 text-gray-800'
                          : selectedAnswer === index
                          ? 'bg-green-600 text-white shadow-xl'
                          : 'bg-gray-50 text-gray-800 hover:bg-gray-100 hover:shadow-lg'
                        }
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showResult && (
                  <div className="mt-6 p-4 rounded-xl bg-gray-50">
                    <p className="text-gray-800 font-medium mb-2" role="alert">
                      {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                    </p>
                    <p className="text-gray-600">{question.explanation}</p>
                  </div>
                )}

                <div className="mt-8 flex justify-center">
                  {!showResult ? (
                    <button
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                      aria-label="Submit answer"
                      className={`
                        px-8 py-3 rounded-xl font-medium transition-all duration-300
                        ${selectedAnswer !== null
                          ? 'bg-green-600 text-white hover:bg-green-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      aria-label="Next question"
                      className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
} 