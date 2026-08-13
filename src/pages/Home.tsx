import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { FaSync, FaKeyboard, FaBell, FaBellSlash, FaChartBar, FaShieldAlt, FaTh, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHome } from '../hooks/useHome';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useNotifications } from '../hooks/useNotifications';
import { useRecommendationsStore } from '../store/recommendationsStore';
import { Stats } from '../components/Stats';
import { Filters } from '../components/Filters';
import { Sort } from '../components/Sort';
import { StreamerCard } from '../components/StreamerCard';
import { RecommendedStreamers } from '../components/RecommendedStreamers';
import { Skeleton } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';
import { ExportButton } from '../components/ExportButton';
import { exportToCSV, exportToJSON } from '../utils/exportData';
import { Streamer } from '../api/chessApi';

const StreamPreview = lazy(() => import('../components/StreamPreview').then(m => ({ default: m.StreamPreview })));
const StreamerProfile = lazy(() => import('../components/StreamerProfile').then(m => ({ default: m.StreamerProfile })));
const Analytics = lazy(() => import('../components/Analytics').then(m => ({ default: m.Analytics })));

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
    compactMode,
    setCompactMode,
    handleClearFilters,
    refresh,
    toggleFavorite,
    isFavorite,
    favorites,
  } = useHome();
  const { addView, getRecommendations } = useRecommendationsStore();

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

  const handleExportCSV = () => {
    exportToCSV(streamers);
  };

  const handleExportJSON = () => {
    exportToJSON(streamers);
  };

  const shortcuts = [
    {
      key: 'r',
      action: refresh,
      description: 'Refresh streamers',
    },
    {
      key: 'f',
      action: () => document.getElementById('search-input')?.focus(),
      description: 'Focus search',
    },
    {
      key: 'c',
      action: handleClearFilters,
      description: 'Clear filters',
    },
    {
      key: 'o',
      action: () => setShowOnlineOnly(!showOnlineOnly),
      description: 'Toggle online filter',
    },
    {
      key: 'v',
      action: () => setShowFavoritesOnly(!showFavoritesOnly),
      description: 'Toggle favorites filter',
    },
    {
      key: 't',
      action: () => setShowTwitchOnly(!showTwitchOnly),
      description: 'Toggle Twitch filter',
    },
    {
      key: 'y',
      action: () => setShowYouTubeOnly(!showYouTubeOnly),
      description: 'Toggle YouTube filter',
    },
    {
      key: 'm',
      action: () => setCompactMode(!compactMode),
      description: 'Toggle compact mode',
    },
    {
      key: 'a',
      action: () => setShowAnalytics(!showAnalytics),
      description: 'Toggle analytics',
    },
    {
      key: '?',
      action: () => setShowShortcutsHelp(true),
      description: 'Show keyboard shortcuts',
    },
  ];

  useKeyboardShortcuts(shortcuts);

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
    addView(username);
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
    addView(username);
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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg" role="banner">
        <div className="max-w-7xl mx-auto">
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
              <ThemeToggle />
              <button
                onClick={() => setCompactMode(!compactMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  compactMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                aria-label="Toggle compact mode"
              >
                {compactMode ? <FaList /> : <FaTh />}
                <span className="hidden md:inline">{compactMode ? 'Normal' : 'Compact'}</span>
              </button>
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
                aria-label="Admin Dashboard"
              >
                <FaShieldAlt />
                <span className="hidden md:inline">Admin</span>
              </Link>
              <ExportButton
                onExportCSV={handleExportCSV}
                onExportJSON={handleExportJSON}
                disabled={loading || streamers.length === 0}
              />
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
        </div>
      </header>

      <main id="main-content" role="main" tabIndex={-1}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Stats {...stats} />

          <RecommendedStreamers streamers={getRecommendations(streamers, favorites)} />

          {showAnalytics && (
            <div className="mb-6">
              <Suspense fallback={<div className="text-gray-400 text-center py-8">Loading analytics...</div>}>
                <Analytics streamers={streamers} />
              </Suspense>
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
            <div className={`grid gap-4 ${
              compactMode
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {streamers.map((streamer: Streamer, index: number) => (
                <StreamerCard
                  key={streamer.username}
                  streamer={streamer}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(streamer.username)}
                  onPreview={(platform, channel) =>
                    handlePreview(platform, channel, streamer.username)
                  }
                  onProfile={handleProfile}
                  compactMode={compactMode}
                  className={`animate-fade-in animate-stagger-${(index % 5) + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Suspense fallback={null}>
        <StreamPreview
          isOpen={previewState.isOpen}
          onClose={handleClosePreview}
          platform={previewState.platform}
          channel={previewState.channel}
          username={previewState.username}
        />
      </Suspense>

      <Suspense fallback={null}>
        <StreamerProfile
          username={profileState.username}
          isOpen={profileState.isOpen}
          onClose={handleCloseProfile}
        />
      </Suspense>

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
