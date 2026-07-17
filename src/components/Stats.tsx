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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <FaUsers className="text-blue-400 text-2xl" />
          <div>
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-white text-2xl font-bold">{total}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <FaSignal className="text-green-400 text-2xl" />
          <div>
            <p className="text-gray-400 text-sm">Online</p>
            <p className="text-white text-2xl font-bold">{online}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <FaUserSlash className="text-red-400 text-2xl" />
          <div>
            <p className="text-gray-400 text-sm">Offline</p>
            <p className="text-white text-2xl font-bold">{offline}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <FaStar className="text-yellow-400 text-2xl" />
          <div>
            <p className="text-gray-400 text-sm">Favorites</p>
            <p className="text-white text-2xl font-bold">{favorites}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
