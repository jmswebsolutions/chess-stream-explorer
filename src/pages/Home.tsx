import { FaSync } from 'react-icons/fa';
import { useHome } from '../hooks/useHome';
import { Stats } from '../components/Stats';
import { Filters } from '../components/Filters';
import { Sort } from '../components/Sort';
import { StreamerCard } from '../components/StreamerCard';
import { Skeleton } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { Streamer } from '../api/chessApi';

export const Home = () => {
  const {
    streamers,
    loading,
    error,
    stats,
    searchTerm,
    setSearchTerm,
    showOnlineOnly,
    setShowOnlineOnly,
    showOfflineOnly,
    setShowOfflineOnly,
    showCommunityOnly,
    setShowCommunityOnly,
    sortBy,
    setSortBy,
    handleClearFilters,
    refresh,
  } = useHome();

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
                Results: {streamers.length}
              </h2>
              <p className="text-gray-400 text-sm">
                {loading
                  ? 'Loading streamers...'
                  : streamers.length === 0
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
        ) : streamers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No streamers found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {streamers.map((streamer: Streamer) => (
              <StreamerCard key={streamer.username} streamer={streamer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
