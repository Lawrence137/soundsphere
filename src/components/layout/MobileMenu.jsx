import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const navigation = [
  { 
    name: 'Profile', 
    href: '/profile', 
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    gradient: 'from-fuchsia-500 to-pink-500'
  },
  { 
    name: 'New Release', 
    href: '/releases', 
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    gradient: 'from-purple-500 to-indigo-500'
  },
  { 
    name: 'Finance', 
    href: '/finance', 
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'My Music', 
    href: '/my-music', 
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    gradient: 'from-orange-500 to-amber-500'
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    gradient: 'from-violet-500 to-purple-500'
  },
];

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const menuRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode toggle state
  const [notifications, setNotifications] = useState(3); // Example notification count

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Toggle dark/light mode (example implementation)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you might update a global theme context or CSS variables
    document.documentElement.classList.toggle('light-theme', !isDarkMode);
  };

  return (
    <>
      {/* Enhanced backdrop with gradient blur effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`fixed inset-0 bg-gradient-to-br from-black/70 via-purple-950/70 to-pink-950/70 backdrop-blur-md transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      />

      {/* Sliding menu with glassmorphic design */}
      <motion.div
        ref={menuRef}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm shadow-2xl md:hidden
          rounded-l-3xl bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-lg
          border-l border-white/20 overflow-y-auto`} // Added overflow-y-auto for scroll if needed
      >
        {/* User profile section with glass effect and gradient border */}
        <div className="relative px-6 pt-6 pb-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-70 group-hover:opacity-100 blur transition-all duration-300"></div>
                <img
                  className="relative h-14 w-14 rounded-full ring-2 ring-white/30 transition-transform duration-300 group-hover:scale-105"
                  src={user?.photoURL || 'https://via.placeholder.com/40'}
                  alt=""
                />
                {/* Notification badge on profile */}
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white/30 animate-pulse">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-white truncate">{user?.name || 'Guest'}</p>
                <p className="text-sm text-white/70 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation links with modern hover effects */}
        <nav className="relative px-4 py-4">
          <div className="space-y-2">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300
                    ${isOpen ? 'animate-slideInRight' : ''}
                    ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <svg
                    className={`h-5 w-5 mr-3 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Additional Features Section */}
        <div className="px-4 py-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-white/90 font-medium">Theme</span>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 bg-white/20 rounded-full p-1 transition-all duration-300"
              >
                <motion.div
                  className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                  animate={{ x: isDarkMode ? 0 : 24 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              {['twitter', 'instagram', 'linkedin'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white/70 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    {/* Simplified icon path for demo; replace with actual SVG paths for each platform */}
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm0-14a1 1 0 00-1 1v4a1 1 0 002 0V7a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced bottom section with glass effect */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 to-gray-800/90 backdrop-blur-md border-t border-white/20">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign out</span>
          </button>
        </div>

        {/* Enhanced close button with gradient hover effect */}
        <motion.button
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </motion.div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(2rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        /* Glassmorphic effects */
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Custom scrollbar for the menu */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7, #ec4899);
          border-radius: 12px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9333ea, #db2777);
        }
      `}</style>
    </>
  );
};

export default MobileMenu;