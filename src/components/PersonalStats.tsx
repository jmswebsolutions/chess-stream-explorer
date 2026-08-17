import React from 'react';
import { FaClock, FaEye, FaChartBar } from 'react-icons/fa';
import { useViewingStatsStore } from '../store/viewingStatsStore';

export const PersonalStats: React.FC = () => {
  const { viewingStats, clearStats } = useViewingStatsStore();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const sortedStats = Object.entries(viewingStats)
    .map(([username, stats]) => ({ username, ...stats }))
    .sort((a, b) => b.totalSeconds - a.totalSeconds);

  const totalViewTime = Object.values(viewingStats).reduce((sum, stats) => sum + stats.totalSeconds, 0);
  const totalViews = Object.values(viewingStats).reduce((sum, stats) => sum + stats.viewCount, 0);

  if (sortedStats.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-4">
        <div className="flex items-center gap-2 mb-3">
          <FaChartBar className="text-purple-400" />
          <h3 className="text-white font-semibold">Personal Statistics</h3>
        </div>
        <p className="text-gray-400 text-sm">No viewing data yet. Start watching streamers to track your statistics!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaChartBar className="text-purple-400" />
          <h3 className="text-white font-semibold">Personal Statistics</h3>
        </div>
        <button
          onClick={() => {
            if (confirm('Clear all viewing statistics?')) {
              clearStats();
            }
          }}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <FaClock />
            <span>Total Time</span>
          </div>
          <div className="text-white font-bold text-lg">{formatTime(totalViewTime)}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <FaEye />
            <span>Total Views</span>
          </div>
          <div className="text-white font-bold text-lg">{totalViews}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-gray-400 text-sm font-medium">Top Streamers</h4>
        {sortedStats.slice(0, 5).map(({ username, totalSeconds, viewCount, lastViewed }) => {
          const percentage = totalViewTime > 0 ? (totalSeconds / totalViewTime) * 100 : 0;
          return (
            <div key={username} className="bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{username}</span>
                <span className="text-gray-400 text-sm">{formatTime(totalSeconds)}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{viewCount} views</span>
                <span>{new Date(lastViewed).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
