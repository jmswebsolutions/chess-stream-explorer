import React from 'react';
import { FaBalanceScale, FaTimes, FaTwitch, FaYoutube } from 'react-icons/fa';
import { useComparisonStore } from '../store/comparisonStore';
import { Badge } from './Badge';

export const StreamerComparison: React.FC = () => {
  const { selectedStreamers, removeStreamer, clearComparison } = useComparisonStore();

  if (selectedStreamers.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaBalanceScale className="text-purple-400" />
          <h3 className="text-white font-semibold">Streamer Comparison</h3>
        </div>
        <button
          onClick={clearComparison}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {selectedStreamers.map((streamer) => (
          <div key={streamer.username} className="bg-gray-700 rounded-lg p-4 relative">
            <button
              onClick={() => removeStreamer(streamer.username)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"
              aria-label="Remove from comparison"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={streamer.avatar}
                alt={streamer.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
              />
              <div>
                <h4 className="text-white font-semibold">{streamer.username}</h4>
                <Badge type={streamer.status} />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-white">{streamer.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Twitch</span>
                <span className="text-white">
                  {streamer.twitch ? (
                    <span className="flex items-center gap-1">
                      <FaTwitch className="text-purple-400" />
                      Yes
                    </span>
                  ) : (
                    'No'
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">YouTube</span>
                <span className="text-white">
                  {streamer.youtube ? (
                    <span className="flex items-center gap-1">
                      <FaYoutube className="text-red-400" />
                      Yes
                    </span>
                  ) : (
                    'No'
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Community</span>
                <span className="text-white">
                  {streamer.is_community_streamer ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedStreamers.length === 1 && (
        <p className="text-gray-400 text-sm text-center mt-4">
          Select another streamer to compare
        </p>
      )}
    </div>
  );
};
