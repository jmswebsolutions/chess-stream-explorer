import { useState, useEffect, useRef } from 'react';
import { FaSync, FaKeyboard, FaBell, FaBellSlash, FaChartBar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useHome } from '../hooks/useHome';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useNotifications } from '../hooks/useNotifications';
import { Stats } from '../components/Stats';
import { Filters } from '../components/Filters';
import { Sort } from '../components/Sort';
import { StreamerCard } from '../components/StreamerCard';
import { Skeleton } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { StreamPreview } from '../components/StreamPreview';
import { StreamerProfile } from '../components/StreamerProfile';
import { Analytics } from '../components/Analytics';
import { LanguageSelector } from '../components/LanguageSelector';
import { Streamer } from '../api/chessApi';

export const Home = () => {
  const { t } = useTranslation();
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
    showFavoritesOnly,
    setShowFavoritesOnly,
    showTwitchOnly,
    setShowTwitchOnly,
    showYouTubeOnly,
    setShowYouTubeOnly,
    sortBy,
    setSortBy,
    handleClearFilters,
    refresh,
    toggleFavorite,
    isFavorite,
  } = useHome();

  const [previewState, setPreviewState] = useState<{
    isOpen: boolean;
    platform: 'twitch' | 'youtube';
    channel: string;
    username: string;
  }>({
    isOpen: false,
    platform: 'twitch',
    channel: '',
    username: '',
  });

  const [profileState, setProfileState] = useState<{
    isOpen: boolean;
    username: string;
  }>({
    isOpen: false,
    username: '',
  });

  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { enabled: notificationsEnabled, showNotification, toggleNotifications } = useNotifications();
  const previousStreamersRef = useRef<Streamer[]>([]);

  useKeyboardShortcuts([
    {
      key: 'r',
      action: refresh,
      description: 'Refresh streamers',
    },
    {
      key: 'escape',
      action: handleClearFilters,
      description: 'Clear filters',
    },
    {
      key: '?',
      action: () => setShowShortcutsHelp(true),
      description: 'Show keyboard shortcuts',
    },
  ]);

  // Check for favorite streamers going live
  useEffect(() => {
    if (!notificationsEnabled || loading) return;

    const previousStreamers = previousStreamersRef.current;
    const currentStreamers = streamers;

    currentStreamers.forEach((currentStreamer) => {
      if (isFavorite(currentStreamer.username) && currentStreamer.status === 'live') {
        const previousStreamer = previousStreamers.find((s) => s.username === currentStreamer.username);
        
        // If streamer was offline before and is now live, show notification
        if (previousStreamer && previousStreamer.status === 'offline') {
          showNotification({
            title: `${currentStreamer.username} is now live!`,
            body: 'Your favorite streamer just started streaming.',
            icon: currentStreamer.avatar,
          });
        }
      }
    });

    previousStreamersRef.current = currentStreamers;
  }, [streamers, notificationsEnabled, loading, isFavorite, showNotification]);

  const handlePreview = (platform: 'twitch' | 'youtube', channel: string, username: string) => {
    setPreviewState({
      isOpen: true,
      platform,
      channel,
      username,
    });
  };

  const handleClosePreview = () => {
    setPreviewState({
      isOpen: false,
      platform: 'twitch',
      channel: '',
      username: '',
    });
  };

  const handleProfile = (username: string) => {
    setProfileState({
      isOpen: true,
      username,
    });
  };

  const handleCloseProfile = () => {
    setProfileState({
      isOpen: false,
      username: '',
    });
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
                {t('app.title')}
              </h1>
              <p className="text-gray-400">
                {t('app.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  showAnalytics
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                aria-label="Toggle analytics"
              >
                <FaChartBar />
                <span className="hidden sm:inline">{t('header.analytics')}</span>
              </button>
              <button
                onClick={toggleNotifications}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  notificationsEnabled
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
              >
                {notificationsEnabled ? <FaBell /> : <FaBellSlash />}
                <span className="hidden sm:inline">
                  {notificationsEnabled ? t('header.notificationsOn') : t('header.notificationsOff')}
                </span>
              </button>
              <button
                onClick={() => setShowShortcutsHelp(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                aria-label="Show keyboard shortcuts"
              >
                <FaKeyboard />
                <span className="hidden sm:inline">{t('header.shortcuts')}</span>
              </button>
              <button
                onClick={refresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
                {t('header.refresh')}
              </button>
            </div>
          </div>
        </header>

        <Stats {...stats} />

        {showAnalytics && (
          <div className="mb-6">
            <Analytics streamers={streamers} />
          </div>
        )}

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
              showFavoritesOnly={showFavoritesOnly}
              onShowFavoritesOnlyChange={setShowFavoritesOnly}
              showTwitchOnly={showTwitchOnly}
              onShowTwitchOnlyChange={setShowTwitchOnly}
              showYouTubeOnly={showYouTubeOnly}
              onShowYouTubeOnlyChange={setShowYouTubeOnly}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="lg:col-span-1">
            <Sort sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <h2 className="text-white font-semibold mb-2">
                {t('results.title')}: {streamers.length}
              </h2>
              <p className="text-gray-400 text-sm">
                {loading
                  ? t('results.loading')
                  : streamers.length === 0
                  ? t('results.noResults')
                  : t('results.showing')}
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
              <StreamerCard
                key={streamer.username}
                streamer={streamer}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite(streamer.username)}
                onPreview={(platform, channel) =>
                  handlePreview(platform, channel, streamer.username)
                }
                onProfile={handleProfile}
              />
            ))}
          </div>
        )}
      </div>

      <StreamPreview
        isOpen={previewState.isOpen}
        onClose={handleClosePreview}
        platform={previewState.platform}
        channel={previewState.channel}
        username={previewState.username}
      />

      <StreamerProfile
        username={profileState.username}
        isOpen={profileState.isOpen}
        onClose={handleCloseProfile}
      />

      {showShortcutsHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-lg">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowShortcutsHelp(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-300">
                <span>Refresh streamers</span>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">R</kbd>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Clear filters</span>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Esc</kbd>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Show shortcuts</span>
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">?</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
