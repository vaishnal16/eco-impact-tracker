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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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
            <span className="font-medium text-green-600">Score: {score}</span>
            <span className="text-gray-400">|</span>
            <span className="font-medium text-green-600">Question: {currentQuestionNumber}</span>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Generating your question...</p>
            </div>
          ) : question ? (
            <div className="space-y-6">
              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-800">
                  {question.question}
                </h3>
                
                {/* Options */}
                <div className="grid gap-4">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`
                        p-4 rounded-lg text-left transition-all duration-200
                        ${selectedAnswer === index
                          ? showResult
                            ? index === question.correctAnswer
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-red-100 border-red-500 text-red-800'
                            : 'bg-green-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                        }
                        ${showResult && index === question.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : ''
                        }
                        border-2
                        ${selectedAnswer === index ? 'border-current' : 'border-transparent'}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0
                          ${selectedAnswer === index ? 'border-current' : 'border-gray-300'}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6">
                {!showResult ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className={`
                      w-full py-3 px-4 rounded-xl text-white font-medium text-lg
                      transition-all duration-200 transform hover:scale-[1.02]
                      ${selectedAnswer !== null
                        ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                        : 'bg-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      selectedAnswer === question.correctAnswer
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}>
                      <p className="font-medium mb-2">
                        {selectedAnswer === question.correctAnswer
                          ? '🎉 Correct!'
                          : '❌ Incorrect'}
                      </p>
                      <p className="text-gray-600">{question.explanation}</p>
                    </div>
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-3 px-4 rounded-xl bg-green-600 text-white font-medium text-lg
                        transition-all duration-200 transform hover:scale-[1.02] hover:bg-green-700 shadow-md hover:shadow-lg"
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
} 