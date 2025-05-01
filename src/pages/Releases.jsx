import React, { useState, useCallback, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  CalendarIcon, 
  MusicalNoteIcon, 
  PhotoIcon, 
  XMarkIcon,
  ArrowsUpDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const svgPattern = `data:image/svg+xml,${encodeURIComponent(`
  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <g fill="#fff" fill-opacity="0.4">
        <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
      </g>
    </g>
  </svg>
`)}`;

const Releases = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [coverArt, setCoverArt] = useState(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false); // Added loading state
  const [releaseInfo, setReleaseInfo] = useState({
    title: '',
    artist: '',
    releaseDate: '',
    genre: '',
    type: 'single',
  });
  const fileInputRef = useRef(null); // Added ref to trigger file input programmatically

  const handleTrackUpload = useCallback(async (event) => {
    setIsLoadingFiles(true); // Show loading state
    const files = Array.from(event.target.files).filter(file => 
      file.type === 'audio/wav' || file.name.toLowerCase().endsWith('.wav')
    );

    if (files.length === 0) {
      alert('Please select WAV audio files only.');
      setIsLoadingFiles(false);
      return;
    }

    // Simulate processing delay (e.g., to calculate duration in a real app)
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTracks = files.map((file, index) => ({
      id: `track-${Date.now()}-${index}`,
      file,
      name: file.name.replace(/\.[^/.]+$/, ""),
      duration: "0:00", // In a real app, you’d calculate this using the Web Audio API
      position: tracks.length + index + 1,
    }));
    setTracks([...tracks, ...newTracks]);
    setIsLoadingFiles(false);
    // Reset the file input to allow re-selecting the same files
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [tracks]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDraggingFile(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    setIsLoadingFiles(true);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'audio/wav' || file.name.toLowerCase().endsWith('.wav')
    );

    if (files.length === 0) {
      alert('Please drag and drop WAV audio files only.');
      setIsLoadingFiles(false);
      return;
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTracks = files.map((file, index) => ({
      id: `track-${Date.now()}-${index}`,
      file,
      name: file.name.replace(/\.[^/.]+$/, ""),
      duration: "0:00",
      position: tracks.length + index + 1,
    }));
    setTracks([...tracks, ...newTracks]);
    setIsLoadingFiles(false);
  }, [tracks]);

  const handleCoverArtUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverArt({
          preview: e.target.result,
          file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveTrack = (trackId) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tracks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedTracks = items.map((track, index) => ({
      ...track,
      position: index + 1
    }));

    setTracks(updatedTracks);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative py-4 sm:py-8"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-pink-500/10 to-purple-600/10 animate-gradient-xy" />
          <div 
            className="absolute inset-0 bg-repeat opacity-20 animate-pulse" 
            style={{ 
              backgroundImage: `url("${svgPattern}")`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <SparklesIcon className="h-8 w-8 text-pink-400" />
            Your Releases
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsUploadModalOpen(true)}
            className="group w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out touch-manipulation"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"></span>
            <span className="relative flex items-center">
              <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Release
            </span>
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {isUploadModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20"
            >
              <div className="space-y-8">
                {/* Cover Art Upload Section */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="w-full sm:w-auto flex justify-center sm:block">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative"
                    >
                      {coverArt ? (
                        <div className="relative w-full h-48 sm:w-48 sm:h-48 group">
                          <img
                            src={coverArt.preview}
                            alt="Cover art preview"
                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCoverArt(null)}
                            className="absolute -top-2 -right-2 p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </motion.button>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                            <p className="text-white text-sm">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                          className="w-full h-48 sm:w-48 sm:h-48 border-2 border-dashed border-purple-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors bg-gradient-to-br from-purple-50 to-pink-50"
                        >
                          <PhotoIcon className="w-12 h-12 text-purple-400" />
                          <label className="mt-2 block text-sm font-medium text-purple-600 text-center cursor-pointer">
                            Upload Cover Art
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleCoverArtUpload}
                            />
                          </label>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Release Info Form */}
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-1"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Release Title
                        </label>
                        <input
                          type="text"
                          value={releaseInfo.title}
                          onChange={(e) => setReleaseInfo({ ...releaseInfo, title: e.target.value })}
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                          placeholder="Enter release title"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-1"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Artist Name
                        </label>
                        <input
                          type="text"
                          value={releaseInfo.artist}
                          onChange={(e) => setReleaseInfo({ ...releaseInfo, artist: e.target.value })}
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                          placeholder="Enter artist name"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="col-span-1"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Release Date
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="date"
                            value={releaseInfo.releaseDate}
                            onChange={(e) => setReleaseInfo({ ...releaseInfo, releaseDate: e.target.value })}
                            className="block w-full pl-10 rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="col-span-1"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Genre
                        </label>
                        <select
                          value={releaseInfo.genre}
                          onChange={(e) => setReleaseInfo({ ...releaseInfo, genre: e.target.value })}
                          className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors"
                        >
                          <option value="">Select a genre</option>
                          <option value="pop">Pop</option>
                          <option value="rock">Rock</option>
                          <option value="hiphop">Hip Hop</option>
                          <option value="electronic">Electronic</option>
                          <option value="jazz">Jazz</option>
                          <option value="classical">Classical</option>
                          <option value="other">Other</option>
                        </select>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Track Upload Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <MusicalNoteIcon className="h-5 w-5 text-purple-500" />
                      Tracks
                    </h3>
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 touch-manipulation"
                    >
                      {isLoadingFiles ? (
                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <MusicalNoteIcon className="h-5 w-5 mr-2" />
                      )}
                      <span>{isLoadingFiles ? 'Processing...' : 'Add Tracks'}</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="audio/wav,.wav"
                        onChange={handleTrackUpload}
                        className="hidden"
                        disabled={isLoadingFiles}
                      />
                    </motion.label>
                  </div>

                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tracks">
                      {(provided, snapshot) => (
                        <motion.div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`space-y-2 rounded-2xl transition-colors duration-200 ${
                            isDraggingFile ? 'bg-purple-50 border-2 border-dashed border-purple-300' : ''
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <AnimatePresence>
                            {tracks.map((track, index) => (
                              <Draggable key={track.id} draggableId={track.id} index={index}>
                                {(provided, snapshot) => (
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      transform: snapshot.isDragging
                                        ? provided.draggableProps.style.transform
                                        : "none",
                                    }}
                                    className={`flex items-center space-x-4 p-4 rounded-xl border shadow-sm transition-all duration-200 touch-manipulation ${
                                      snapshot.isDragging
                                        ? 'bg-purple-50 border-purple-200 shadow-lg'
                                        : 'bg-white border-gray-200 hover:border-purple-200 hover:shadow-md'
                                    }`}
                                  >
                                    <div
                                      {...provided.dragHandleProps}
                                      className="cursor-move text-gray-400 hover:text-purple-600 transition-colors touch-manipulation"
                                    >
                                      <ArrowsUpDownIcon className="h-5 w-5" />
                                    </div>
                                    <span className="text-gray-500 w-8 text-center font-medium">
                                      {track.position}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <input
                                        type="text"
                                        value={track.name}
                                        onChange={(e) => {
                                          const newTracks = [...tracks];
                                          newTracks[index].name = e.target.value;
                                          setTracks(newTracks);
                                        }}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm bg-transparent"
                                        placeholder="Track name"
                                      />
                                    </div>
                                    <span className="hidden sm:inline text-gray-500 text-sm">
                                      {track.duration}
                                    </span>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleRemoveTrack(track.id)}
                                      className="text-gray-400 hover:text-red-500 transition-colors touch-manipulation"
                                    >
                                      <XMarkIcon className="h-5 w-5" />
                                    </motion.button>
                                  </motion.div>
                                )}
                              </Draggable>
                            ))}
                          </AnimatePresence>
                          {provided.placeholder}
                          
                          {tracks.length === 0 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className={`text-center py-12 rounded-2xl border-2 border-dashed transition-all duration-200 ${
                                isDraggingFile
                                  ? 'border-purple-400 bg-purple-50'
                                  : 'border-gray-300 bg-gray-50'
                              }`}
                            >
                              <MusicalNoteIcon className={`mx-auto h-12 w-12 transition-colors duration-200 ${
                                isDraggingFile ? 'text-purple-400' : 'text-gray-400'
                              }`} />
                              <p className="mt-2 text-sm text-gray-500">
                                Drag and drop WAV files here or click Add Tracks
                              </p>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </motion.div>

                {/* Submit Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsUploadModalOpen(false)}
                    className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors touch-manipulation"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 touch-manipulation"
                    disabled={isLoadingFiles || tracks.length === 0}
                  >
                    Create Release
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Releases List */}
        {!isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden rounded-2xl border border-white/20">
              <ul className="divide-y divide-gray-200/50">
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="px-6 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <p className="text-sm font-medium text-gray-600">
                        No releases yet
                      </p>
                      <div className="flex-shrink-0">
                        <p className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                          Get Started
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Click "New Release" to upload your first track
                      </p>
                    </div>
                  </div>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 400% 400%;
        }

        /* Improve touch interactions on mobile */
        .touch-manipulation {
          touch-action: manipulation;
        }

        /* Ensure buttons have sufficient tap target size */
        button, label {
          min-height: 44px;
          min-width: 44px;
        }

        /* Disable hover effects on mobile */
        @media (hover: none) {
          .group:hover .opacity-0 {
            opacity: 0 !important;
          }
          .hover\\:shadow-lg:hover,
          .hover\\:shadow-xl:hover {
            box-shadow: none !important;
          }
          .hover\\:border-purple-500:hover {
            border-color: #d8b4fe !important;
          }
          .hover\\:bg-gray-50:hover {
            background-color: #fff !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Releases;