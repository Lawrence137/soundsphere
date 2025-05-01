import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-900 bg-opacity-95 backdrop-blur-lg">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            
            
            <nav className="mt-5 flex-1 px-2 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white`
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    } group flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02]`}
                  >
                    <svg
                      className={`${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                      } mr-3 flex-shrink-0 h-6 w-6 transition-all duration-200`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.icon}
                      />
                    </svg>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 