import React, { useState } from 'react';
import { FaSearch, FaFilter, FaStar, FaTwitch, FaYoutube, FaTags } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useTagsStore } from '../store/tagsStore';
import { Streamer } from '../api/chessApi';

interface FiltersProps {
  streamers: Streamer[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchBy: 'name' | 'platform' | 'status' | 'tags';
  onSearchByChange: (value: 'name' | 'platform' | 'status' | 'tags') => void;
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
  streamers,
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
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  // Calculate counts for each filter
  const twitchCount = streamers.filter(s => s.twitch).length;
  const youtubeCount = streamers.filter(s => s.youtube).length;
  const onlineCount = streamers.filter(s => s.status === 'live').length;
  const offlineCount = streamers.filter(s => s.status === 'offline').length;
  const communityCount = streamers.filter(s => s.is_community_streamer).length;

  // Get unique tag names
  const tagNames = tags.map(t => t.name);

  // Filter tag suggestions based on search term
  const tagSuggestions = searchBy === 'tags' && searchTerm
    ? tagNames.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
    : [];

  const handleTagSuggestionClick = (tag: string) => {
    onSearchChange(tag);
    setShowTagSuggestions(false);
  };
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-6" role="region" aria-label="Filter options">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-blue-400" aria-hidden="true" />
        <h2 className="text-white font-semibold text-lg">{t('filters.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              id="search-input"
              type="text"
              placeholder={t('filters.search')}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => searchBy === 'tags' && setShowTagSuggestions(true)}
              onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              aria-label="Search streamers"
            />
            {searchBy === 'tags' && showTagSuggestions && tagSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {tagSuggestions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagSuggestionClick(tag)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-600 text-white text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          <select
            value={searchBy}
            onChange={(e) => onSearchByChange(e.target.value as 'name' | 'platform' | 'status' | 'tags')}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-label="Search by"
          >
            <option value="name">Name</option>
            <option value="platform">Platform</option>
            <option value="status">Status</option>
            <option value="tags">Tags</option>
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 text-gray-300">
            <span className="text-sm font-medium">Quick Platform Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Platform filters">
            <button
              onClick={() => {
                onShowTwitchOnlyChange(!showTwitchOnly);
                onShowYouTubeOnlyChange(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                showTwitchOnly
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={showTwitchOnly}
              aria-label={`Filter by Twitch streamers (${twitchCount})`}
            >
              <FaTwitch className={showTwitchOnly ? 'text-white' : 'text-purple-400'} aria-hidden="true" />
              <span className="text-sm font-medium">Twitch</span>
              <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-full">{twitchCount}</span>
            </button>

            <button
              onClick={() => {
                onShowYouTubeOnlyChange(!showYouTubeOnly);
                onShowTwitchOnlyChange(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                showYouTubeOnly
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={showYouTubeOnly}
              aria-label={`Filter by YouTube streamers (${youtubeCount})`}
            >
              <FaYoutube className={showYouTubeOnly ? 'text-white' : 'text-red-400'} aria-hidden="true" />
              <span className="text-sm font-medium">YouTube</span>
              <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-full">{youtubeCount}</span>
            </button>

            <button
              onClick={() => {
                onShowTwitchOnlyChange(false);
                onShowYouTubeOnlyChange(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                !showTwitchOnly && !showYouTubeOnly
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={!showTwitchOnly && !showYouTubeOnly}
              aria-label={`Show all platforms (${streamers.length})`}
            >
              <span className="text-sm font-medium">All Platforms</span>
              <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-full">{streamers.length}</span>
            </button>
          </div>
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
            <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-full">{onlineCount}</span>
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showOfflineOnly}
              onChange={(e) => onShowOfflineOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
            />
            {t('filters.offlineOnly')}
            <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-full">{offlineCount}</span>
          </label>

          <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showCommunityOnly}
              onChange={(e) => onShowCommunityOnlyChange(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
            />
            {t('filters.communityOnly')}
            <span className="text-xs bg-gray-600 px-2 py-0.5 rounded-full">{communityCount}</span>
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
