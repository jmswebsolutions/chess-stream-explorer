import React from 'react';
import { FaHistory, FaTrash } from 'react-icons/fa';
import { useRecentlyViewedStore } from '../store/recentlyViewedStore';
import { StreamerCard } from './StreamerCard';

interface RecentlyViewedProps {
  onToggleFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ onToggleFavorite, isFavorite }) => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewedStore();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaHistory className="text-yellow-400" />
          <h3 className="text-white font-semibold">Recently Viewed</h3>
        </div>
        <button
          onClick={() => {
            if (confirm('Clear recently viewed history?')) {
              clearRecentlyViewed();
            }
          }}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors"
        >
          <FaTrash />
        </button>
      </div>

      <div className="space-y-2">
        {recentlyViewed.map((streamer) => (
          <StreamerCard
            key={streamer.username}
            streamer={streamer}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(streamer.username)}
            compactMode={true}
            className="animate-fade-in"
          />
        ))}
      </div>
    </div>
  );
};
