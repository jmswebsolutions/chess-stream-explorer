import React, { useState, useMemo } from 'react';
import { FaSync } from 'react-icons/fa';
import { useStreamers } from '../hooks/useStreamers';
import { Stats } from '../components/Stats';
import { Filters } from '../components/Filters';
import { Sort, SortOption } from '../components/Sort';
import { StreamerCard } from '../components/StreamerCard';
import { Skeleton } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { Streamer } from '../types/streamer';

export const Home: React.FC = () => {
  const { streamers, loading, error, refresh } = useStreamers();

  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showOfflineOnly, setShowOfflineOnly] = useState(false);
  const [showCommunityOnly, setShowCommunityOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('online-first');

  const filteredAndSortedStreamers = useMemo(() => {
    let filtered = streamers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((streamer) =>
        streamer.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filters
    if (showOnlineOnly && showOfflineOnly) {
      // Both selected - show all
    } else if (showOnlineOnly) {
      filtered = filtered.filter((streamer) => streamer.status === 'live');
    } else if (showOfflineOnly) {
      filtered = filtered.filter((streamer) => streamer.status === 'offline');
    }

    // Apply community filter
    if (showCommunityOnly) {
      filtered = filtered.filter((streamer) => streamer.is_community_streamer);
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.username.localeCompare(a.username));
        break;
      case 'online-first':
        sorted.sort((a, b) => {
          if (a.status === 'live' && b.status !== 'live') return -1;
          if (a.status !== 'live' && b.status === 'live') return 1;
          return 0;
        });
        break;
      case 'offline-first':
        sorted.sort((a, b) => {
          if (a.status === 'offline' && b.status !== 'offline') return -1;
          if (a.status !== 'offline' && b.status === 'offline') return 1;
          return 0;
        });
        break;
    }

    return sorted;
  }, [
    streamers,
    searchTerm,
    showOnlineOnly,
    showOfflineOnly,
    showCommunityOnly,
    sortBy,
  ]);

  const stats = useMemo(() => {
    return {
      total: streamers.length,
      online: streamers.filter((s) => s.status === 'live').length,
      offline: streamers.filter((s) => s.status === 'offline').length,
      community: streamers.filter((s) => s.is_community_streamer).length,
    };
  }, [streamers]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setShowOnlineOnly(false);
    setShowOfflineOnly(false);
    setShowCommunityOnly(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-8">
        <ErrorState message={error} onRetry={refresh} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Chess Stream Explorer
              </h1>
              <p className="text-gray-400">
                Discover and follow chess streamers from around the world
              </p>
            </div>
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </header>

        <Stats {...stats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <Filters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              showOnlineOnly={showOnlineOnly}
              onShowOnlineOnlyChange={setShowOnlineOnly}
              showOfflineOnly={showOfflineOnly}
              onShowOfflineOnlyChange={setShowOfflineOnly}
              showCommunityOnly={showCommunityOnly}
              onShowCommunityOnlyChange={setShowCommunityOnly}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="lg:col-span-1">
            <Sort sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <h2 className="text-white font-semibold mb-2">
                Results: {filteredAndSortedStreamers.length}
              </h2>
              <p className="text-gray-400 text-sm">
                {loading
                  ? 'Loading streamers...'
                  : filteredAndSortedStreamers.length === 0
                  ? 'No streamers match your filters'
                  : 'Showing streamers based on your filters'}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : filteredAndSortedStreamers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No streamers found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedStreamers.map((streamer: Streamer) => (
              <StreamerCard key={streamer.username} streamer={streamer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
