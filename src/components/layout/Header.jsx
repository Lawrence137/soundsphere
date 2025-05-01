import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MobileMenu from './MobileMenu';
import useClickOutside from '../../hooks/useClickOutside';

const Header = () => {
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Click outside hook for profile menu
  const profileMenuRef = useClickOutside(() => {
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Releases', href: '/releases' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Profile', href: '/profile' },
  ];

  const menuItems = [
    {
      name: 'Your Profile',
      href: '/profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
            : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link 
                to="/" 
                className="group relative flex items-center space-x-2"
              >
                {/* Logo background blur effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
                
                {/* Logo icon */}
                <div className="relative h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                
                {/* Logo text */}
                <span className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  SoundSphere
                </span>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {navigationLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300
                        ${isActive
                          ? 'text-purple-600'
                          : 'text-gray-600 hover:text-purple-600'
                        }
                        hover:bg-purple-50/50`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search button with ripple effect */}
              <button 
                className="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50/50 transition-all duration-300 relative overflow-hidden group"
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const ripple = document.createElement('div');
                  const diameter = Math.max(rect.width, rect.height);
                  ripple.style.width = ripple.style.height = `${diameter}px`;
                  ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
                  ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
                  ripple.className = 'absolute bg-purple-200 rounded-full animate-ripple';
                  e.target.appendChild(ripple);
                  setTimeout(() => ripple.remove(), 600);
                }}
              >
                <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Notifications button with bounce effect */}
              <button 
                className="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50/50 transition-all duration-300 group"
                onClick={(e) => {
                  e.currentTarget.querySelector('svg').classList.add('animate-notification-bounce');
                  setTimeout(() => {
                    e.currentTarget.querySelector('svg').classList.remove('animate-notification-bounce');
                  }, 1000);
                }}
              >
                <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50/50 transition-all duration-300"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Profile dropdown with click outside */}
              <div className="hidden md:relative md:flex" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="group relative flex items-center space-x-3 p-1.5 rounded-xl hover:bg-purple-50/50 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-70 group-hover:opacity-100 blur transition-all duration-300"></div>
                    <img
                      className="relative h-8 w-8 rounded-full ring-2 ring-white object-cover transform group-hover:scale-110 transition-transform duration-300"
                      src={user?.photoURL || 'https://via.placeholder.com/40'}
                      alt=""
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                    {user?.name || 'Guest'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      isProfileMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Enhanced dropdown menu with stagger animation */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-12 w-64 rounded-2xl shadow-lg py-2 bg-white/80 backdrop-blur-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 animate-fade-in">{user?.name || 'Guest'}</p>
                      <p className="text-xs text-gray-500 animate-fade-in animation-delay-100">{user?.email}</p>
                    </div>
                    
                    {menuItems.map((item, index) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50/50 hover:text-purple-600 transition-all duration-300 animate-slide-in`}
                        style={{ animationDelay: `${(index + 1) * 100}ms` }}
                      >
                        <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        {item.name}
                      </Link>
                    ))}
                    
                    <button
                      onClick={logout}
                      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50/50 hover:text-purple-600 transition-all duration-300 animate-slide-in"
                      style={{ animationDelay: '300ms' }}
                    >
                      <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Add new animations to style tag */}
      <style jsx>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes notification-bounce {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-5px) rotate(-3deg); }
          75% { transform: translateY(-2px) rotate(3deg); }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(1rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-ripple {
          animation: ripple 0.6s linear;
        }

        .animate-notification-bounce {
          animation: notification-bounce 1s cubic-bezier(0.36, 0, 0.66, -0.56);
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }
      `}</style>
    </>
  );
};

export default Header; 