import Link from 'next/link';
import Header from '../components/Header';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
      <Header />
      
      <main className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 transform -skew-y-6 z-0 rounded-3xl opacity-20"></div>
            <div className="relative z-10 py-8">
              <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-gradient">
                  EcoApp
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Your personal companion for sustainable living. Track your environmental impact, learn eco-friendly habits,
                and join a community dedicated to making our planet greener.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  href="/learn"
                  className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 border border-green-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-green-600 mb-2">2M+</div>
              <div className="text-green-800">Carbon Savings</div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-green-800">Active Users</div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-green-800">Eco Challenges</div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-green-800">Eco Badges</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Carbon Footprint Tracker</h3>
              <p className="text-green-600 mb-4">Monitor your daily activities and see their environmental impact in real-time.</p>
              <Link href="/login" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                Track Now →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Eco Achievements</h3>
              <p className="text-green-600 mb-4">Earn badges and rewards for your sustainable lifestyle choices.</p>
              <Link href="/login" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                View Badges →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Eco Learning Hub</h3>
              <p className="text-green-600 mb-4">Access educational resources and tips for sustainable living.</p>
              <Link href="/login" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                Start Learning →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Eco Quiz Challenge</h3>
              <p className="text-green-600 mb-4">Test your environmental knowledge and learn while having fun.</p>
              <Link href="/login" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                Take Quiz →
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Impact Analytics</h3>
              <p className="text-green-600 mb-4">Visualize your environmental impact with detailed analytics and insights.</p>
              <Link href="/login" className="text-green-700 font-medium hover:text-green-800 transition-colors">
                View Analytics →
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-xl p-12 max-w-4xl mx-auto text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10 transform rotate-12 scale-150"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a Positive Impact?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of eco-conscious individuals making a difference every day.
                Start your sustainable journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className="inline-block bg-transparent text-white px-8 py-4 rounded-lg border-2 border-white hover:bg-white hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 transition-all duration-300 font-medium text-lg transform hover:-translate-y-1"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}