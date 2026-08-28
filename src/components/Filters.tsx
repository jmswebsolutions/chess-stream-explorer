import React from 'react';
import { FaSearch, FaFilter, FaStar, FaTwitch, FaYoutube, FaTags } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useTagsStore } from '../store/tagsStore';

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchBy: 'name' | 'platform' | 'status';
  onSearchByChange: (value: 'name' | 'platform' | 'status') => void;
  showOnlineOnly: boolean;
  onShowOnlineOnlyChange: (value: boolean) => void;
  showOfflineOnly: boolean;
  onShowOfflineOnlyChange: (value: boolean) => void;
  showCommunityOnly: boolean;
  onShowCommunityOnlyChange: (value: boolean) => void;
  showFavoritesOnly: boolean;
  onShowFavoritesOnlyChange: (value: boolean) => void;
  showTwitchOnly: boolean;
  onShowTwitchOnlyChange: (value: boolean) => void;
  showYouTubeOnly: boolean;
  onShowYouTubeOnlyChange: (value: boolean) => void;
  filterByTag: string | null;
  onFilterByTagChange: (value: string | null) => void;
  onClearFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  onSearchChange,
  searchBy,
  onSearchByChange,
  showOnlineOnly,
  onShowOnlineOnlyChange,
  showOfflineOnly,
  onShowOfflineOnlyChange,
  showCommunityOnly,
  onShowCommunityOnlyChange,
  showFavoritesOnly,
  onShowFavoritesOnlyChange,
  showTwitchOnly,
  onShowTwitchOnlyChange,
  showYouTubeOnly,
  onShowYouTubeOnlyChange,
  filterByTag,
  onFilterByTagChange,
  onClearFilters,
}) => {
  const { t } = useTranslation();
  const { tags } = useTagsStore();
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-blue-400" />
        <h2 className="text-white font-semibold text-lg">{t('filters.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search-input"
              type="text"
              placeholder={t('filters.search')}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <select
            value={searchBy}
            onChange={(e) => onSearchByChange(e.target.value as 'name' | 'platform' | 'status')}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="name">Name</option>
            <option value="platform">Platform</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => onShowOnlineOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
            />
            {t('filters.onlineOnly')}
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showOfflineOnly}
              onChange={(e) => onShowOfflineOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
            />
            {t('filters.offlineOnly')}
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showCommunityOnly}
              onChange={(e) => onShowCommunityOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
            />
            {t('filters.communityOnly')}
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={(e) => onShowFavoritesOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-yellow-500 focus:ring-yellow-500"
            />
            <FaStar className="text-yellow-400 text-xs" />
            {t('filters.favoritesOnly')}
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showTwitchOnly}
              onChange={(e) => onShowTwitchOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
            />
            <FaTwitch className="text-purple-400 text-xs" />
            {t('filters.twitchOnly')}
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showYouTubeOnly}
              onChange={(e) => onShowYouTubeOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
            />
            <FaYoutube className="text-red-400 text-xs" />
            {t('filters.youtubeOnly')}
          </label>
        </div>

        {tags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-gray-300">
              <FaTags className="text-purple-400 text-xs" />
              <span className="text-sm">Filter by Tag:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onFilterByTagChange(null)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  filterByTag === null
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => onFilterByTagChange(filterByTag === tag.id ? null : tag.id)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    filterByTag === tag.id
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: filterByTag === tag.id ? tag.color : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClearFilters}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
        >
          {t('filters.clearFilters')}
        </button>
      </div>
    </div>
  );
};
