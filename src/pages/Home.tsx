import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { FaSync, FaBell, FaBellSlash, FaChartBar, FaShieldAlt, FaTh, FaList, FaBars, FaGripVertical } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { useHome } from '../hooks/useHome';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useNotifications } from '../hooks/useNotifications';
import { useRecommendationsStore } from '../store/recommendationsStore';
import { useRecentlyViewedStore } from '../store/recentlyViewedStore';
import { Stats } from '../components/Stats';
import { Filters } from '../components/Filters';
import { Sort } from '../components/Sort';
import { StreamerCard } from '../components/StreamerCard';
import { DraggableStreamerCard } from '../components/DraggableStreamerCard';
import { RecommendedStreamers } from '../components/RecommendedStreamers';
import { Skeleton } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';
import { ColorThemePicker } from '../components/ColorThemePicker';
import { FavoriteGroups } from '../components/FavoriteGroups';
import { PersonalStats } from '../components/PersonalStats';
import { RecentlyViewed } from '../components/RecentlyViewed';
import { ExportButton } from '../components/ExportButton';
import { SettingsManager } from '../components/SettingsManager';
import { TagsManager } from '../components/TagsManager';
import { StreamerComparison } from '../components/StreamerComparison';
import { exportToCSV, exportToJSON, exportToExcel, exportToPDF } from '../utils/exportData';
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
    favorites,
    searchTerm,
    searchBy,
    showOnlineOnly,
    showOfflineOnly,
    showCommunityOnly,
    showFavoritesOnly,
    showTwitchOnly,
    showYouTubeOnly,
    sortBy,
    compactMode,
    dragDropMode,
    filterByTag,
    setSearchTerm,
    setSearchBy,
    setShowOnlineOnly,
    setShowOfflineOnly,
    setShowCommunityOnly,
    setShowFavoritesOnly,
    setShowTwitchOnly,
    setShowYouTubeOnly,
    setSortBy,
    setCompactMode,
    setDragDropMode,
    setFilterByTag,
    handleClearFilters,
    refresh,
    toggleFavorite,
    isFavorite,
  } = useHome();
  const { getRecommendations } = useRecommendationsStore();
  const { addToRecentlyViewed } = useRecentlyViewedStore();

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { enabled: notificationsEnabled, showNotification, toggleNotifications } = useNotifications();
  const previousStreamersRef = useRef<Streamer[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = streamers.findIndex((s) => s.username === active.id);
      const newIndex = streamers.findIndex((s) => s.username === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newStreamers = [...streamers];
        const [movedItem] = newStreamers.splice(oldIndex, 1);
        newStreamers.splice(newIndex, 0, movedItem);
        // Update the streamers array in the store
        // Note: This is a visual reordering only, the original data order remains
      }
    }
  };

  const handleExportCSV = () => {
    exportToCSV(streamers);
  };

  const handleExportJSON = () => {
    exportToJSON(streamers);
  };

  const handleExportExcel = () => {
    exportToExcel(streamers);
  };

  const handleExportPDF = () => {
    exportToPDF(streamers);
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
      key: 'd',
      action: () => setDragDropMode(!dragDropMode),
      description: 'Toggle drag-drop mode',
    },
    {
      key: 'g',
      action: () => {
        const groupsButton = document.querySelector('[aria-label="Favorite Groups"]');
        groupsButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      },
      description: 'Open favorite groups',
    },
    {
      key: 's',
      action: () => {
        const settingsButton = document.querySelector('[aria-label="Settings"]');
        settingsButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      },
      description: 'Open settings',
    },
    {
      key: 'e',
      action: () => {
        const exportButton = document.querySelector('[aria-label="Export"]');
        exportButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      },
      description: 'Open export menu',
    },
    {
      key: 'k',
      action: () => {
        const tagsButton = document.querySelector('[aria-label="Tags"]');
        tagsButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      },
      description: 'Open tags manager',
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
    const streamer = streamers.find((s) => s.username === username);
    if (streamer) {
      addToRecentlyViewed(streamer);
    }
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
    const streamer = streamers.find((s) => s.username === username);
    if (streamer) {
      addToRecentlyViewed(streamer);
      setProfileState({
        isOpen: true,
        username: streamer.username,
      });
    }
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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                  {t('app.title')}
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                  {t('app.subtitle')}
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
            </div>
            <div className={`flex flex-wrap items-center gap-2 ${mobileMenuOpen ? 'block' : 'hidden'} md:flex`}>
              <LanguageSelector />
              <ThemeToggle />
              <ColorThemePicker />
              <button
                onClick={() => setCompactMode(!compactMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  compactMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                aria-label="Toggle compact mode"
              >
                {compactMode ? <FaList /> : <FaTh />}
                <span className="hidden lg:inline">{compactMode ? 'Normal' : 'Compact'}</span>
              </button>
              <button
                onClick={() => setDragDropMode(!dragDropMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  dragDropMode
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                aria-label="Toggle drag and drop mode"
              >
                <FaGripVertical />
                <span className="hidden lg:inline">Drag</span>
              </button>
              <Link
                to="/admin"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
                aria-label="Admin Dashboard"
              >
                <FaShieldAlt />
                <span className="hidden lg:inline">Admin</span>
              </Link>
              <ExportButton
                onExportCSV={handleExportCSV}
                onExportJSON={handleExportJSON}
                onExportExcel={handleExportExcel}
                onExportPDF={handleExportPDF}
                disabled={loading || streamers.length === 0}
              />
              <SettingsManager />
              <TagsManager />
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  showAnalytics
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                aria-label="Toggle analytics"
              >
                <FaChartBar />
                <span className="hidden lg:inline">Analytics</span>
              </button>
              <button
                onClick={toggleNotifications}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  notificationsEnabled
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
                aria-label="Toggle notifications"
              >
                {notificationsEnabled ? <FaBell /> : <FaBellSlash />}
                <span className="hidden lg:inline">{notificationsEnabled ? 'On' : 'Off'}</span>
              </button>
              <button
                onClick={refresh}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
                aria-label="Refresh"
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
                <span className="hidden lg:inline">Refresh</span>
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
            <div className="lg:col-span-1 space-y-4">
              <StreamerComparison />
              <RecentlyViewed onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />
              <PersonalStats />
              <FavoriteGroups />
              <Filters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchBy={searchBy}
                onSearchByChange={setSearchBy}
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
                filterByTag={filterByTag}
                onFilterByTagChange={setFilterByTag}
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className={`grid gap-4 ${
                compactMode
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {streamers.map((streamer: Streamer, index: number) => (
                  dragDropMode ? (
                    <DraggableStreamerCard
                      key={streamer.username}
                      streamer={streamer}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isFavorite(streamer.username)}
                      onPreview={(platform, channel) =>
                        handlePreview(platform, channel, streamer.username)
                      }
                      onProfile={() => handleProfile(streamer.username)}
                      compactMode={compactMode}
                      className={`animate-fade-in ${index === 0 ? '' : ''}`}
                    />
                  ) : (
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
                  )
                ))}
              </div>
            </DndContext>
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
