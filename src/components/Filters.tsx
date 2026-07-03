import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showOnlineOnly: boolean;
  onShowOnlineOnlyChange: (value: boolean) => void;
  showOfflineOnly: boolean;
  onShowOfflineOnlyChange: (value: boolean) => void;
  showCommunityOnly: boolean;
  onShowCommunityOnlyChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  onSearchChange,
  showOnlineOnly,
  onShowOnlineOnlyChange,
  showOfflineOnly,
  onShowOfflineOnlyChange,
  showCommunityOnly,
  onShowCommunityOnlyChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-blue-400" />
        <h2 className="text-white font-semibold text-lg">Filters</h2>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => onShowOnlineOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
            />
            Online Only
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showOfflineOnly}
              onChange={(e) => onShowOfflineOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
            />
            Offline Only
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showCommunityOnly}
              onChange={(e) => onShowCommunityOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
            />
            Community Streamers
          </label>
        </div>

        <button
          onClick={onClearFilters}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
