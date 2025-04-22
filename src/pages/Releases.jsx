import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  CalendarIcon, 
  MusicalNoteIcon, 
  PhotoIcon, 
  PlusIcon,
  XMarkIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';

const Releases = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [coverArt, setCoverArt] = useState(null);
  const [releaseInfo, setReleaseInfo] = useState({
    title: '',
    artist: '',
    releaseDate: '',
    genre: '',
    type: 'single', // or 'album' or 'ep'
  });

  const handleTrackUpload = (event) => {
    const files = Array.from(event.target.files);
    const newTracks = files.map((file, index) => ({
      id: `track-${Date.now()}-${index}`,
      file,
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      duration: "0:00", // This would be calculated from the actual file
      position: tracks.length + index + 1,
    }));
    setTracks([...tracks, ...newTracks]);
  };

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

    // Update track positions
    const updatedTracks = items.map((track, index) => ({
      ...track,
      position: index + 1
    }));

    setTracks(updatedTracks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative py-4 sm:py-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '30px 30px'
             }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <h1 className="text-2xl font-bold text-white">Releases</h1>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:shadow-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Release
          </button>
        </div>

        {isUploadModalOpen && (
          <div className="mt-6 sm:mt-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 sm:p-6 border border-white/20">
            <div className="space-y-6 sm:space-y-8">
              {/* Cover Art Upload Section */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="w-full sm:w-auto flex justify-center sm:block">
                  <div className="relative">
                    {coverArt ? (
                      <div className="relative w-full h-48 sm:w-40 sm:h-40">
                        <img
                          src={coverArt.preview}
                          alt="Cover art preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setCoverArt(null)}
                          className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-48 sm:w-40 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                        <PhotoIcon className="w-10 h-10 text-gray-400" />
                        <label className="mt-2 block text-sm font-medium text-gray-700 text-center cursor-pointer px-4">
                          Upload Cover Art
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleCoverArtUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Release Info Form */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Release Title
                      </label>
                      <input
                        type="text"
                        value={releaseInfo.title}
                        onChange={(e) => setReleaseInfo({ ...releaseInfo, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter release title"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Artist Name
                      </label>
                      <input
                        type="text"
                        value={releaseInfo.artist}
                        onChange={(e) => setReleaseInfo({ ...releaseInfo, artist: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter artist name"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Release Date
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          value={releaseInfo.releaseDate}
                          onChange={(e) => setReleaseInfo({ ...releaseInfo, releaseDate: e.target.value })}
                          className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Genre
                      </label>
                      <select
                        value={releaseInfo.genre}
                        onChange={(e) => setReleaseInfo({ ...releaseInfo, genre: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Track Upload Section */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Tracks</h3>
                  <label className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                    <MusicalNoteIcon className="h-5 w-5 mr-2" />
                    Add Tracks
                    <input
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={handleTrackUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="tracks">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {tracks.map((track, index) => (
                          <Draggable key={track.id} draggableId={track.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center space-x-2 sm:space-x-4 bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-move text-gray-400 hover:text-gray-600"
                                >
                                  <ArrowsUpDownIcon className="h-5 w-5" />
                                </div>
                                <span className="text-gray-500 w-6 sm:w-8">{track.position}</span>
                                <div className="flex-1 min-w-0">
                                  <input
                                    type="text"
                                    value={track.name}
                                    onChange={(e) => {
                                      const newTracks = [...tracks];
                                      newTracks[index].name = e.target.value;
                                      setTracks(newTracks);
                                    }}
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm truncate"
                                    placeholder="Track name"
                                  />
                                </div>
                                <span className="hidden sm:inline text-gray-500 text-sm">{track.duration}</span>
                                <button
                                  onClick={() => handleRemoveTrack(track.id)}
                                  className="text-gray-400 hover:text-red-500 flex-shrink-0"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {tracks.length === 0 && (
                  <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <MusicalNoteIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 px-4">Drag and drop audio files here or click Add Tracks</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Release
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Releases List */}
        {!isUploadModalOpen && (
          <div className="mt-6">
            <div className="bg-white/95 backdrop-blur-sm shadow-xl overflow-hidden sm:rounded-lg border border-white/20">
              <ul className="divide-y divide-gray-200/50">
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <p className="text-sm font-medium text-gray-600 truncate">
                        No releases yet
                      </p>
                      <div className="flex-shrink-0">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
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
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Releases; 