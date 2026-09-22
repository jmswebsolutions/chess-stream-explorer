import React from 'react';
import { FaUsers, FaSignal, FaUserSlash, FaStar } from 'react-icons/fa';

interface StatsProps {
  total: number;
  online: number;
  offline: number;
  favorites: number;
}

export const Stats: React.FC<StatsProps> = ({
  total,
  online,
  offline,
  favorites,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" role="region" aria-label="Streamer statistics">
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg" role="group" aria-label={`Total streamers: ${total}`}>
        <div className="flex items-center gap-3">
          <FaUsers className="text-blue-400 text-2xl" aria-hidden="true" />
          <div>
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-white text-2xl font-bold" aria-label={`Total streamers: ${total}`}>{total}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg" role="group" aria-label={`Online streamers: ${online}`}>
        <div className="flex items-center gap-3">
          <FaSignal className="text-green-400 text-2xl" aria-hidden="true" />
          <div>
            <p className="text-gray-400 text-sm">Online</p>
            <p className="text-white text-2xl font-bold" aria-label={`Online streamers: ${online}`}>{online}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg" role="group" aria-label={`Offline streamers: ${offline}`}>
        <div className="flex items-center gap-3">
          <FaUserSlash className="text-red-400 text-2xl" aria-hidden="true" />
          <div>
            <p className="text-gray-400 text-sm">Offline</p>
            <p className="text-white text-2xl font-bold" aria-label={`Offline streamers: ${offline}`}>{offline}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg" role="group" aria-label={`Favorite streamers: ${favorites}`}>
        <div className="flex items-center gap-3">
          <FaStar className="text-yellow-400 text-2xl" aria-hidden="true" />
          <div>
            <p className="text-gray-400 text-sm">Favorites</p>
            <p className="text-white text-2xl font-bold" aria-label={`Favorite streamers: ${favorites}`}>{favorites}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
