import { useStreamersStore } from '../store/streamersStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useViewingStatsStore } from '../store/viewingStatsStore';
import { useRecentlyViewedStore } from '../store/recentlyViewedStore';

export interface UserSettings {
  version: string;
  exportDate: string;
  streamersSettings: {
    searchTerm: string;
    searchBy: 'name' | 'platform' | 'status';
    showOnlineOnly: boolean;
    showOfflineOnly: boolean;
    showCommunityOnly: boolean;
    showFavoritesOnly: boolean;
    showTwitchOnly: boolean;
    showYouTubeOnly: boolean;
    sortBy: string;
    compactMode: boolean;
    dragDropMode: boolean;
  };
  favoritesSettings: {
    favorites: string[];
    favoriteGroups: any[];
    activeGroup: string | null;
    favoriteNotes: Record<string, string>;
  };
  viewingStats: Record<string, any>;
  recentlyViewed: any[];
  themeSettings: {
    theme: string;
    colorTheme: string;
  };
}

export const exportSettings = () => {
  const streamersStore = useStreamersStore.getState();
  const favoritesStore = useFavoritesStore.getState();
  const viewingStatsStore = useViewingStatsStore.getState();
  const recentlyViewedStore = useRecentlyViewedStore.getState();

  const settings: UserSettings = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    streamersSettings: {
      searchTerm: streamersStore.searchTerm,
      searchBy: streamersStore.searchBy,
      showOnlineOnly: streamersStore.showOnlineOnly,
      showOfflineOnly: streamersStore.showOfflineOnly,
      showCommunityOnly: streamersStore.showCommunityOnly,
      showFavoritesOnly: streamersStore.showFavoritesOnly,
      showTwitchOnly: streamersStore.showTwitchOnly,
      showYouTubeOnly: streamersStore.showYouTubeOnly,
      sortBy: streamersStore.sortBy,
      compactMode: streamersStore.compactMode,
      dragDropMode: streamersStore.dragDropMode,
    },
    favoritesSettings: {
      favorites: favoritesStore.favorites,
      favoriteGroups: favoritesStore.favoriteGroups,
      activeGroup: favoritesStore.activeGroup,
      favoriteNotes: favoritesStore.favoriteNotes,
    },
    viewingStats: viewingStatsStore.viewingStats,
    recentlyViewed: recentlyViewedStore.recentlyViewed,
    themeSettings: {
      theme: localStorage.getItem('chess-stream-explorer-theme') || 'dark',
      colorTheme: localStorage.getItem('chess-stream-explorer-color-theme') || 'blue',
    },
  };

  const jsonContent = JSON.stringify(settings, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `chess-stream-explorer-settings-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importSettings = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const settings: UserSettings = JSON.parse(content);
        
        // Validate settings structure
        if (!settings.streamersSettings || !settings.favoritesSettings) {
          throw new Error('Invalid settings file');
        }

        // Apply streamers settings
        const streamersStore = useStreamersStore.getState();
        streamersStore.setSearchTerm(settings.streamersSettings.searchTerm);
        streamersStore.setSearchBy(settings.streamersSettings.searchBy);
        streamersStore.setShowOnlineOnly(settings.streamersSettings.showOnlineOnly);
        streamersStore.setShowOfflineOnly(settings.streamersSettings.showOfflineOnly);
        streamersStore.setShowCommunityOnly(settings.streamersSettings.showCommunityOnly);
        streamersStore.setShowFavoritesOnly(settings.streamersSettings.showFavoritesOnly);
        streamersStore.setShowTwitchOnly(settings.streamersSettings.showTwitchOnly);
        streamersStore.setShowYouTubeOnly(settings.streamersSettings.showYouTubeOnly);
        streamersStore.setSortBy(settings.streamersSettings.sortBy as any);
        streamersStore.setCompactMode(settings.streamersSettings.compactMode);
        streamersStore.setDragDropMode(settings.streamersSettings.dragDropMode);

        // Apply favorites settings
        const favoritesStore = useFavoritesStore.getState();
        localStorage.setItem('chess-stream-explorer-favorites', JSON.stringify(settings.favoritesSettings.favorites));
        localStorage.setItem('chess-stream-explorer-favorite-groups', JSON.stringify(settings.favoritesSettings.favoriteGroups));
        localStorage.setItem('chess-stream-explorer-favorite-notes', JSON.stringify(settings.favoritesSettings.favoriteNotes));
        favoritesStore.loadFavorites();

        // Apply viewing stats
        localStorage.setItem('chess-stream-explorer-viewing-stats', JSON.stringify(settings.viewingStats));

        // Apply recently viewed
        localStorage.setItem('chess-stream-explorer-recently-viewed', JSON.stringify(settings.recentlyViewed));

        // Apply theme settings
        if (settings.themeSettings) {
          localStorage.setItem('chess-stream-explorer-theme', settings.themeSettings.theme);
          localStorage.setItem('chess-stream-explorer-color-theme', settings.themeSettings.colorTheme);
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};
