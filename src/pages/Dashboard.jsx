import React from 'react';
import { Link } from 'react-router-dom';
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
    color: 'bg-purple-500'
  },
  { 
    name: 'Monthly Listeners', 
    value: '847K', 
    change: '+8.7%',
    isPositive: true,
    icon: GlobeAltIcon,
    color: 'bg-blue-500'
  },
  { 
    name: 'Track Likes', 
    value: '123.5K', 
    change: '+15.3%',
    isPositive: true,
    icon: HeartIcon,
    color: 'bg-pink-500'
  },
  { 
    name: 'Avg. Daily Plays', 
    value: '45.2K', 
    change: '+5.2%',
    isPositive: true,
    icon: ArrowTrendingUpIcon,
    color: 'bg-green-500'
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
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Welcome back!</h1>
          <p className="text-lg text-gray-600">Here's what's happening with your music</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {QUICK_STATS.map((stat) => (
            <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-6">
                {RECENT_ACTIVITY.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img src={activity.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.type}</p>
                      {activity.platforms && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {activity.platforms.map(platform => (
                            <span 
                              key={platform} 
                              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      )}
                      {activity.achievement && (
                        <div className="mt-2">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                            {activity.achievement}
                          </span>
                        </div>
                      )}
                      {activity.engagement && (
                        <div className="mt-2">
                          <span className="inline-block max-w-full px-3 py-1 rounded-full text-xs font-medium bg-pink-50 text-pink-700 border border-pink-100 whitespace-nowrap overflow-hidden text-ellipsis">
                            {activity.engagement}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Upcoming Releases */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <SparklesIcon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/my-music"
                  className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
                >
                  <MusicalNoteIcon className="h-6 w-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-900">Upload Music</span>
                </Link>
                <Link
                  to="/my-music"
                  className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                >
                  <VideoCameraIcon className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-900">Upload Video</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Releases */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Releases</h2>
              <div className="space-y-4">
                {UPCOMING_RELEASES.map((release, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img src={release.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{release.title}</h3>
                      <p className="text-xs text-gray-500 mb-1">{release.type} • {release.tracks} tracks</p>
                      <p className="text-xs font-medium text-purple-600">{release.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 