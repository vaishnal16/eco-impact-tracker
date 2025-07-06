import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
      <Header />
      
      <main className="flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoApp
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our sustainable community and make a positive impact on the environment. 
              Track your eco-friendly habits and connect with like-minded individuals.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Track Impact</h3>
              <p className="text-green-600">Monitor your environmental footprint and see your positive changes.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Connect</h3>
              <p className="text-green-600">Join a community of eco-conscious individuals sharing the same values.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Achieve Goals</h3>
              <p className="text-green-600">Set and reach sustainability goals with our guided challenges.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-green-200 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-green-600 mb-6 text-lg">
              Start your sustainable journey today and be part of the change our planet needs.
            </p>
            <Link
              href="/register"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}