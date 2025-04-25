import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
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

  return (
    <>
      {/* Enhanced backdrop with blur effect */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-lg transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sliding menu with enhanced gradient background */}
      <div
        ref={menuRef}
        className={`fixed right-0 top-0 z-55 h-full w-[85%] max-w-sm shadow-2xl transition-transform duration-300 ease-out transform md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          rounded-l-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
          border-l border-white/10`}
      >

        {/* User profile section with glass effect */}
        <div className="relative px-6 pt-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 blur transition-all duration-300"></div>
                <img
                  className="relative h-14 w-14 rounded-full ring-2 ring-white/20 transition-transform duration-300 group-hover:scale-105"
                  src={user?.photoURL || 'https://via.placeholder.com/40'}
                  alt=""
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{user?.name || 'Guest'}</p>
                <p className="text-sm text-white/70">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation links with enhanced hover effects */}
        <nav className="relative px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                  className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300
                    ${isOpen ? 'animate-slideInRight' : ''}
                    ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
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

        {/* Enhanced bottom section with glass effect */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-sm border-t border-white/10">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full px-4 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-[0.98]"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign out</span>
          </button>
        </div>

        {/* Enhanced close button with gradient hover effect */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:rotate-90 hover:scale-110"
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
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(1rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default MobileMenu; 