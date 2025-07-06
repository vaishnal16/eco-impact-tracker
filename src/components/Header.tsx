'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

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
          <nav className="hidden md:flex space-x-8">
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
    </header>
  );
};

export default Header;