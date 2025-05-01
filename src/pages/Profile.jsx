import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalPlays: 1245000,
    monthlyListeners: 45000,
    followers: 12500,
    tracks: 24,
  });

  const artistData = {
    name: "John Kemeu",
    stageName: "KEMEUS",
    bio: "Dandora based rapper",
    genres: ["Hip-Hop", "Rap", "Afro-Beat"],
    location: "Nairobi, Kenya",
    socialLinks: {
      instagram: "https://instagram.com/nova",
      twitter: "https://twitter.com/nova",
      spotify: "https://spotify.com/artist/nova",
    },
    recentReleases: [
      {
        id: 1,
        title: "Naskia Mnanisaka",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500",
        releaseDate: "2024-02-15",
        plays: 450000,
      },
      {
        id: 2,
        title: "Fugitive",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        releaseDate: "2024-01-20",
        plays: 320000,
      },
    ],
    topTracks: [
      {
        id: 1,
        title: "Naskia Mnanisaka",
        plays: 450000,
        duration: "4:32",
      },
      {
        id: 2,
        title: "Fugitive",
        plays: 320000,
        duration: "5:15",
      },
      {
        id: 3,
        title: "Zooted",
        plays: 280000,
        duration: "3:45",
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="relative bg-purple-900">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-black pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Profile image */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=500"
                  alt={artistData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Profile info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {artistData.name}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6">
                {artistData.stageName} • {artistData.location}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                {Object.entries(artistData.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                      {platform === 'instagram' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          {/* Instagram SVG */}
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )}
                      {platform === 'twitter' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          {/* Twitter SVG */}
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )}
                      {platform === 'spotify' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          {/* Spotify SVG */}
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      )}
                    </span>
                    <span className="capitalize text-sm sm:text-base">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {Object.entries(stats).map(([key, value]) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="text-lg sm:text-2xl font-bold mb-2">
                  {key === 'totalPlays' || key === 'monthlyListeners'
                    ? value.toLocaleString()
                    : value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-white/10 overflow-x-auto">
          {['overview', 'music', 'analytics', 'earnings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-white border-b-2 border-fuchsia-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Bio Section */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {artistData.bio}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {artistData.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {artistData.recentReleases.map((release) => (
                  <div key={release.id} className="flex gap-3 sm:gap-4">
                    <img
                      src={release.cover}
                      alt={release.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm sm:text-base">{release.title}</div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        {new Date(release.releaseDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        {release.plays.toLocaleString()} plays
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'music' && (
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Top Tracks</h2>
            <div className="space-y-3 sm:space-y-4">
              {artistData.topTracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base">{track.title}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{track.plays.toLocaleString()} plays</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">{track.duration}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Analytics Dashboard</h2>
            <div className="text-gray-400 text-center py-8 sm:py-12 text-sm sm:text-base">
              Analytics dashboard coming soon...
            </div>
          </motion.div>
        )}

        {activeTab === 'earnings' && (
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Earnings Overview</h2>
            <div className="text-gray-400 text-center py-8 sm:py-12 text-sm sm:text-base">
              Earnings dashboard coming soon...
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;