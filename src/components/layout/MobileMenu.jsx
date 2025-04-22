import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  { 
    name: 'Releases', 
    href: '/releases',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2'
  },
  { 
    name: 'My Music', 
    href: '/my-music',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
  },
  { 
    name: 'Discover', 
    href: '/discover',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
  },
  { 
    name: 'Playlists', 
    href: '/playlists',
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16'
  },
  { 
    name: 'Analytics', 
    href: '/analytics',
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  { 
    name: 'Settings', 
    href: '/settings',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
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
      {/* Backdrop with enhanced blur effect */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-lg transition-all duration-500 ease-in-out md:hidden  ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sliding menu with music-themed background */}
      <div
        ref={menuRef}
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M50 35a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm-25-17a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z' fill='rgba(255,255,255,0.08)'/%3E%3Cpath d='M50 35V20H25v15m25 2V20l-25-5v22' stroke='rgba(255,255,255,0.08)' stroke-width='2'/%3E%3Cpath d='M30 50a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z' fill='rgba(255,255,255,0.08)'/%3E%3Cpath d='M30 50V35m0 17V35l20-5v20' stroke='rgba(255,255,255,0.08)' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='24' stroke='rgba(255,255,255,0.05)' stroke-width='2'/%3E%3Cpath d='M35 20h2v20h-2zm-12 0h2v20h-2z' fill='rgba(255,255,255,0.06)'/%3E%3Ccircle cx='30' cy='30' r='3' fill='rgba(255,255,255,0.07)'/%3E%3C/g%3E%3C/svg%3E"),
            radial-gradient(circle at 100% 0%, rgba(94, 53, 177, 0.8) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(106, 27, 154, 0.8) 0%, transparent 50%),
            linear-gradient(to bottom right, #1e1b4b, #312e81)
          `,
          backgroundSize: '80px 80px, 60px 60px, 100% 100%, 100% 100%, 100% 100%',
          backgroundPosition: '0 0, 30px 30px, 0 0, 0 0, 0 0',
        }}
        className={`fixed right-0 top-0 z-55 h-full w-[80%] max-w-sm shadow-2xl transition-transform duration-300 ease-out transform md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          rounded-l-3xl
          before:absolute before:inset-0 before:bg-[url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='50' cy='50' r='40' stroke='rgba(255,255,255,0.06)' stroke-width='1.5' stroke-dasharray='6,4'/%3E%3Cpath d='M50 30c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm0 8c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7z' fill='rgba(255,255,255,0.04)'/%3E%3C/g%3E%3C/svg%3E")]
          before:opacity-100 before:bg-repeat before:animate-spin-slow before:bg-size-[100px]`}
      >
        {/* Glass effect top section */}
        <div className="absolute inset-x-0 top-0 h-32 bg-white/10 backdrop-blur-sm rounded-l-3xl" />

        {/* Logo section */}
        <div className="relative p-6 pt-8">
          <Link to="/" className="text-2xl font-bold text-white hover:text-white/80 transition-colors duration-300">
            SoundSphere
          </Link>
        </div>

        {/* User profile section with enhanced floating effect */}
        <div className="relative p-6 pt-8">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-white/20 rounded-full blur transition-all duration-300 group-hover:bg-white/30 group-hover:blur-md"></div>
              <img
                className="relative h-16 w-16 rounded-full ring-2 ring-white/50 transition-transform duration-300 group-hover:scale-105"
                src={user?.photoURL || 'https://via.placeholder.com/40'}
                alt=""
              />
            </div>
            <div className="transform transition-all duration-300 ease-out">
              <p className="text-lg font-semibold text-white">{user?.name || 'Guest'}</p>
              <p className="text-sm text-white/70">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation links with enhanced hover effects */}
        <nav className="relative px-4 py-6">
          <div className="space-y-1">
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
                    ${isActive
                      ? 'bg-white/20 backdrop-blur-sm text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1'
                    }`}
                >
                  <svg
                    className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:scale-110"
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
                    <span className="ml-auto transform transition-transform duration-300 group-hover:translate-x-1">
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

        {/* Bottom section with enhanced glassmorphism */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/10 backdrop-blur-sm border-t border-white/10">
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

        {/* Enhanced close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:rotate-90 hover:scale-110"
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
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </>
  );
};

export default MobileMenu; 