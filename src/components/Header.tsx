'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useSession from '../hooks/useSession';

const Header = () => {
  const pathname = usePathname();
  const { sessionUser } = useSession();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-green-50 shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-green-800 hover:text-green-700 transition-colors">
              EcoApp
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            {sessionUser ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/log"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/log') 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                >
                  Log Activity
                </Link>
                <Link
                  href="/analytics"
                  className={`px-4 py-2 rounded-lg ${isActive('/analytics') ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:text-green-700'}`}
                >
                  Analytics
                </Link>
                <Link
                  href="/badges"
                  className={`px-4 py-2 rounded-lg ${isActive('/badges') ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:text-green-700'}`}
                >
                  Badges
                </Link>
                <Link
                  href="/leaderboard"
                  className={`px-4 py-2 rounded-lg ${isActive('/leaderboard') ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:text-green-700'}`}
                >
                  Leaderboard
                </Link>
                <div className="h-6 w-px bg-green-200 mx-2"></div>
                <button
                  onClick={() => {
                    // Logout logic would go here
                    console.log('Logout clicked');
                  }}
                  className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/register') 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-md transition-colors"
              onClick={() => {
                // Mobile menu toggle logic would go here
                console.log('Mobile menu toggle');
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden">
        {sessionUser && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/dashboard') 
                  ? 'text-green-800 bg-green-100' 
                  : 'text-green-600 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/log"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/log') 
                  ? 'text-green-800 bg-green-100' 
                  : 'text-green-600 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              Log Activity
            </Link>
            <Link
              href="/analytics"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/analytics') 
                  ? 'text-green-800 bg-green-100' 
                  : 'text-green-600 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              Analytics
            </Link>
            <Link
              href="/badges"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/badges') 
                  ? 'text-green-800 bg-green-100' 
                  : 'text-green-600 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              Badges
            </Link>
            <Link
              href="/leaderboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/leaderboard') 
                  ? 'text-green-800 bg-green-100' 
                  : 'text-green-600 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              Leaderboard
            </Link>
            <button
              onClick={() => {
                // Logout logic would go here
                console.log('Logout clicked');
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;