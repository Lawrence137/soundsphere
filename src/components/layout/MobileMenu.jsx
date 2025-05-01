import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { memo } from 'react';

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
  // { 
  //   name: 'My Music', 
  //   href: '/my-music', 
  //   icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  //   gradient: 'from-orange-500 to-amber-500'
  // },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    gradient: 'from-violet-500 to-purple-500'
  },
];

const MobileMenu = memo(({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const menuRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications] = useState(3);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClickOutside]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle('light-theme', newMode);
      return newMode;
    });
  }, []);

  const backdropVariants = {
    open: { opacity: 1, backdropFilter: 'blur(4px)' },
    closed: { opacity: 0, backdropFilter: 'blur(0px)' },
  };

  const menuVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };

  return (
    <>
      <motion.div
        variants={backdropVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed inset-0 bg-black/50 transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      />

      <motion.div
        ref={menuRef}
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.8 }}
        className="fixed right-0 top-0 z-50 h-full w-[80%] max-w-xs shadow-lg md:hidden rounded-l-2xl bg-gray-900/90 border-l border-white/10 overflow-y-auto"
      >
        <div className="relative px-4 pt-14 pb-3">
          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-60 blur"></div>
                <img
                  className="relative h-12 w-12 rounded-full ring-1 ring-white/20"
                  src={user?.photoURL || 'https://via.placeholder.com/40'}
                  alt="User profile"
                />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-1 border-white/20">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-white truncate">{user?.name || 'Guest'}</p>
                <p className="text-xs text-white/60 truncate">{user?.email || 'No email'}</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="relative px-3 py-3">
          <div className="space-y-1">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`group flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white`
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <svg
                    className={`h-4 w-4 mr-2 ${
                      isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
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
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="px-3 py-3">
          <div className="p-3 rounded-xl bg-white/10 border border-white/10">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-white/80 font-medium text-sm">Theme</span>
              </div>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 bg-gray-800/70 rounded-full p-1 shadow-inner border border-white/10 touch-manipulation"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <motion.div
                  className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-md"
                  animate={{ x: isDarkMode ? 0 : 22 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                >
                  {isDarkMode ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </motion.div>
              </button>
            </div>

            {/* Social Links */}
            {/* <div className="flex justify-center space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 shadow-md touch-manipulation"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 shadow-md touch-manipulation"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227 1.981 1.97 1.826 5.332.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 7.052.155 3.362 1.898 5.049 5.26 5.204C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 7.052-.072 3.362-.155 5.049-1.898 5.204-5.26C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-7.052-.155-3.362-1.898-5.049-5.26-5.204C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 shadow-md touch-manipulation"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-9.019-7.243-11.018-3.869v-2zm-7.982 16h5v-16h-5v16zm7.982 0h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-9.019-7.243-11.018-3.869v-2h-4.968v16z" />
                </svg>
              </a>
            </div> */}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900/90 border-t border-white/10">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-shadow duration-200 touch-manipulation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign out</span>
          </button>
        </div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:shadow-lg transition-shadow duration-200 border border-white/10 touch-manipulation"
          aria-label="Close menu"
        >
          <svg
            className="w-5 h-5 text-white"
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
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }

        /* Improve touch interactions */
        .touch-manipulation {
          touch-action: manipulation;
        }

        /* Ensure buttons have sufficient tap target size */
        button,
        a {
          min-height: 44px;
          min-width: 44px;
        }

        /* Optimize for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-colors,
          .transition-shadow {
            transition: none !important;
          }
          motion.div {
            transition: none !important;
          }
        }

        /* Optimize for mobile performance */
        @media (max-width: 640px) {
          .backdrop-blur-sm {
            backdrop-filter: blur(2px);
          }
        }
      `}</style>
    </>
  );
});

export default MobileMenu;