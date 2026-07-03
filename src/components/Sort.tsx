import React from 'react';
import { FaSort } from 'react-icons/fa';

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'online-first'
  | 'offline-first';

interface SortProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export const Sort: React.FC<SortProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaSort className="text-blue-400" />
        <h2 className="text-white font-semibold text-lg">Sort By</h2>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
          <input
            type="radio"
            name="sort"
            value="name-asc"
            checked={sortBy === 'name-asc'}
            onChange={() => onSortChange('name-asc')}
            className="w-4 h-4 bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          Name (A-Z)
        </label>

        <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
          <input
            type="radio"
            name="sort"
            value="name-desc"
            checked={sortBy === 'name-desc'}
            onChange={() => onSortChange('name-desc')}
            className="w-4 h-4 bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          Name (Z-A)
        </label>

        <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
          <input
            type="radio"
            name="sort"
            value="online-first"
            checked={sortBy === 'online-first'}
            onChange={() => onSortChange('online-first')}
            className="w-4 h-4 bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
          />
          Online First
        </label>

        <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
          <input
            type="radio"
            name="sort"
            value="offline-first"
            checked={sortBy === 'offline-first'}
            onChange={() => onSortChange('offline-first')}
            className="w-4 h-4 bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
          />
          Offline First
        </label>
      </div>
    </div>
  );
};
