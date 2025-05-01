import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  MusicalNoteIcon,
  VideoCameraIcon,
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  HeartIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const QUICK_STATS = [
  { 
    name: 'Total Streams', 
    value: '2.4M', 
    change: '+12.3%',
    isPositive: true,
    icon: ChartBarIcon,
    gradient: 'from-purple-600 to-pink-600',
    tooltip: 'Total streams across all platforms'
  },
  { 
    name: 'Monthly Listeners', 
    value: '847K', 
    change: '+8.7%',
    isPositive: true,
    icon: GlobeAltIcon,
    gradient: 'from-blue-600 to-indigo-600',
    tooltip: 'Unique listeners this month'
  },
  { 
    name: 'Track Likes', 
    value: '123.5K', 
    change: '+15.3%',
    isPositive: true,
    icon: HeartIcon,
    gradient: 'from-pink-600 to-rose-600',
    tooltip: 'Total likes on your tracks'
  },
  { 
    name: 'Avg. Daily Plays', 
    value: '45.2K', 
    change: '+5.2%',
    isPositive: true,
    icon: ArrowTrendingUpIcon,
    gradient: 'from-green-600 to-teal-600',
    tooltip: 'Average plays per day'
  },
];

const RECENT_ACTIVITY = [
  {
    title: "Aesthetic Night",
    type: "Track released",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&auto=format",
    platforms: ["Spotify", "Apple Music"]
  },
  {
    title: "1000 streams milestone",
    type: "Achievement",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format",
    achievement: "🏆 Gold Status"
  },
  {
    title: "Summer Vibes",
    type: "New engagement",
    time: "2 days ago",
    image: "https://images.unsplash.com/photo-1595623238469-fc58b3839cf6?w=600&auto=format",
    engagement: "+250 likes in 24h"
  }
];

const UPCOMING_RELEASES = [
  {
    title: "Midnight Dreams",
    date: "Scheduled for next week",
    type: "Album",
    tracks: 12,
    image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&auto=format",
  },
  {
    title: "Urban Beats",
    date: "Scheduled for next month",
    type: "Single",
    tracks: 1,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format",
  }
];

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle('light-theme', newMode);
      return newMode;
    });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.02, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', transition: { duration: 0.3 } },
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-500`}>
      <div className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Welcome back!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-2 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Here's what's happening with your music
            </motion.p>
          </div>
          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 bg-gray-800/70 rounded-full p-1 shadow-inner border border-white/10 touch-manipulation focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {QUICK_STATS.map((stat, index) => (
            <motion.div
              key={stat.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} border border-white/10 overflow-hidden group`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${stat.gradient}`}></div>
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-400' : 'text-red-400'} bg-opacity-50 px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className={`relative z-10 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{stat.value}</h3>
              <p className={`relative z-10 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.name}</p>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`text-xs ${isDarkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-100'} px-3 py-1 rounded-lg shadow-lg`}>
                  {stat.tooltip}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={`rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} border border-white/10 p-6`}>
              <div className="flex items-center justify-between mb-6 sticky top-0 z-10">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
                <div className="flex items-center space-x-3">
                  <ClockIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <Link to="/activity" className={`text-sm font-medium ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} transition-colors`}>
                    View All
                  </Link>
                </div>
              </div>
              <div className="space-y-6">
                {RECENT_ACTIVITY.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0 relative">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{activity.title}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.type}</p>
                      {activity.platforms && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {activity.platforms.map((platform) => (
                            <motion.span
                              key={platform}
                              whileHover={{ scale: 1.05 }}
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900/50 text-blue-300 border-blue-700/50' : 'bg-blue-50 text-blue-700 border-blue-100'} border`}
                            >
                              {platform}
                            </motion.span>
                          ))}
                        </div>
                      )}
                      {activity.achievement && (
                        <div className="mt-2">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50' : 'bg-yellow-50 text-yellow-700 border-yellow-100'} border`}
                          >
                            {activity.achievement}
                          </motion.span>
                        </div>
                      )}
                      {activity.engagement && (
                        <div className="mt-2">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`inline-block max-w-full px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-pink-900/50 text-pink-300 border-pink-700/50' : 'bg-pink-50 text-pink-700 border-pink-100'} border whitespace-nowrap overflow-hidden text-ellipsis`}
                          >
                            {activity.engagement}
                          </motion.span>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className={`rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} border border-white/10 p-6`}>
              <div className="flex items-center justify-between mb-6 sticky top-0 z-10">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h2>
                <SparklesIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/my-music"
                    className={`flex flex-col items-center p-4 rounded-xl ${isDarkMode ? 'bg-purple-900/50 hover:bg-purple-800/70' : 'bg-purple-50 hover:bg-purple-100'} transition-colors duration-200 border ${isDarkMode ? 'border-purple-700/50' : 'border-purple-100'}`}
                  >
                    <MusicalNoteIcon className={`h-6 w-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mb-2`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-900'}`}>Upload Music</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/my-music"
                    className={`flex flex-col items-center p-4 rounded-xl ${isDarkMode ? 'bg-blue-900/50 hover:bg-blue-800/70' : 'bg-blue-50 hover:bg-blue-100'} transition-colors duration-200 border ${isDarkMode ? 'border-blue-700/50' : 'border-blue-100'}`}
                  >
                    <VideoCameraIcon className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>Upload Video</span>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className={`rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} border border-white/10 p-6`}>
              <div className="flex items-center justify-between mb-6 sticky top-0 z-10">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Releases</h2>
                <Link to="/releases" className={`text-sm font-medium ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} transition-colors`}>
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {UPCOMING_RELEASES.map((release, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={release.image}
                        alt={release.title}
                        className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{release.title}</h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{release.type} • {release.tracks} tracks</p>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{release.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }

        .shadow-lg {
          box-shadow: ${isDarkMode 
            ? '4px 4px 12px rgba(0, 0, 0, 0.3), -4px -4px 12px rgba(75, 85, 99, 0.1)' 
            : '4px 4px 12px rgba(0, 0, 0, 0.05), -4px -4px 12px rgba(255, 255, 255, 0.5)'};
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#a855f7' : '#9333ea'};
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#9333ea' : '#a855f7'};
        }

        .touch-manipulation {
          touch-action: manipulation;
        }

        button,
        a {
          min-height: 44px;
          min-width: 44px;
        }

        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-colors,
          .transition-opacity,
          .transition-transform {
            transition: none !important;
          }
          motion.div {
            transition: none !important;
          }
        }

        @media (max-width: 640px) {
          .backdrop-blur-md {
            backdrop-filter: blur(8px);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;