import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/layout/Footer';

const Welcome = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="container mx-auto px-4 py-6 md:py-16">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-8 md:mb-16">
            <div className="text-white text-xl md:text-2xl font-bold">SoundSphere</div>
            <div className="flex items-center space-x-2 md:space-x-4">
              {!currentUser ? (
                <>
                  <Link
                    to="/login"
                    className="text-white text-sm md:text-base hover:text-indigo-200 transition-colors px-3 py-1"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-indigo-600 text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-white text-indigo-600 text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center text-white px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8">
              Your Music,<br className="md:hidden" /> Your Way
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 opacity-90">
              Welcome to SoundSphere - the platform that empowers artists to create,
              share, and monetize their music like never before.
            </p>
            
            {!currentUser && (
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <Link
                  to="/register"
                  className="w-full md:w-auto bg-white text-indigo-600 px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="w-full md:w-auto border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-white px-4 md:px-8">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl">
              <div className="text-3xl md:text-4xl mb-4">🎵</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Create</h3>
              <p className="text-sm md:text-base opacity-90">Upload and manage your music catalog with powerful tools</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl">
              <div className="text-3xl md:text-4xl mb-4">📊</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-sm md:text-base opacity-90">Get detailed analytics and insights about your audience</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl">
              <div className="text-3xl md:text-4xl mb-4">💰</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Earn</h3>
              <p className="text-sm md:text-base opacity-90">Monetize your music through multiple revenue streams</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome; 