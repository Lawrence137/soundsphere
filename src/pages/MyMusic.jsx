import React, { useState, useRef } from 'react';
import { VideoCameraIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

// Mock streaming platforms data
const STREAMING_PLATFORMS = [
  { name: 'Spotify', icon: '/icons/spotify.svg', color: 'bg-green-500' },
  { name: 'Apple Music', icon: '/icons/apple-music.svg', color: 'bg-pink-500' },
  { name: 'YouTube Music', icon: '/icons/youtube-music.svg', color: 'bg-red-500' },
  { name: 'Amazon Music', icon: '/icons/amazon-music.svg', color: 'bg-blue-500' },
  { name: 'Deezer', icon: '/icons/deezer.svg', color: 'bg-purple-500' },
  { name: 'TikTok', icon: '/icons/tiktok.svg', color: 'bg-black' },
  { name: 'Instagram', icon: '/icons/instagram.svg', color: 'bg-pink-600' },
  { name: 'SoundCloud', icon: '/icons/soundcloud.svg', color: 'bg-orange-500' }
];

const INITIAL_TRACKS = [
  {
    id: 1,
    title: 'Aesthetic Night',
    type: 'Single',
    artist: 'Your Artist Name',
    coverArt: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&auto=format',
    platforms: ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'TikTok'],
    status: 'active'
  },
  {
    id: 2,
    title: 'Midnight Dreams',
    type: 'Album',
    artist: 'Your Artist Name',
    coverArt: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&auto=format',
    platforms: ['Spotify', 'Apple Music', 'YouTube Music'],
    status: 'active'
  },
  {
    id: 3,
    title: 'Summer Vibes',
    type: 'EP',
    artist: 'Your Artist Name',
    coverArt: 'https://images.unsplash.com/photo-1595623238469-fc58b3839cf6?w=600&auto=format',
    platforms: ['Spotify', 'SoundCloud', 'Instagram'],
    status: 'pending'
  },
  {
    id: 4,
    title: 'Urban Beats',
    type: 'Single',
    artist: 'Your Artist Name',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format',
    platforms: ['YouTube Music', 'TikTok', 'Instagram'],
    status: 'active'
  }
];

const MyMusic = () => {
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const musicInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleFileUpload = (type) => {
    if (type === 'video') {
      videoInputRef.current?.click();
    } else {
      musicInputRef.current?.click();
    }
  };

  const handleFileSelected = (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);

    // Create a new track
    const newTrack = {
      id: tracks.length + 1,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      type: type === 'video' ? 'Video' : 'Single',
      artist: 'Your Artist Name',
      coverArt: type === 'video' ? previewUrl : 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format',
      platforms: [],
      status: 'processing'
    };

    setTracks(prev => [newTrack, ...prev]);

    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Hidden file inputs */}
        <input
          type="file"
          ref={musicInputRef}
          className="hidden"
          accept="audio/*"
          onChange={(e) => handleFileSelected(e, 'music')}
        />
        <input
          type="file"
          ref={videoInputRef}
          className="hidden"
          accept="video/*"
          onChange={(e) => handleFileSelected(e, 'video')}
        />

        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My music</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleFileUpload('video')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
            >
              <VideoCameraIcon className="h-5 w-5 mr-2" />
              Upload video
            </button>
            <button
              onClick={() => handleFileUpload('music')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 hover:scale-105"
            >
              <MusicalNoteIcon className="h-5 w-5 mr-2" />
              Upload music
            </button>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative pt-[100%]">
                <img
                  src={track.coverArt}
                  alt={track.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <MusicalNoteIcon className="h-6 w-6 text-gray-900" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{track.title}</h3>
                    <p className="text-sm font-medium text-gray-500">{track.type}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    track.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : track.status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {track.status === 'processing' ? 'Processing' : 
                     track.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {track.platforms.map((platform) => {
                    const platformData = STREAMING_PLATFORMS.find(p => p.name === platform);
                    return (
                      <div
                        key={platform}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${platformData?.color || 'bg-gray-200'} transform transition-transform duration-200 hover:scale-110`}
                        title={platform}
                      >
                        <img
                          src={platformData?.icon}
                          alt={platform}
                          className="w-5 h-5"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tracks.length === 0 && (
          <div className="text-center py-12 px-4 rounded-2xl bg-white shadow-sm">
            <MusicalNoteIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tracks</h3>
            <p className="mt-1 text-base text-gray-500">Get started by uploading a track or video.</p>
            <div className="mt-6">
              <button
                onClick={() => handleFileUpload('music')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:scale-105"
              >
                <MusicalNoteIcon className="h-5 w-5 mr-2" />
                Upload your first track
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMusic; 