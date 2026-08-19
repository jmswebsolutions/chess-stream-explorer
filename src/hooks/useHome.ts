import { useMemo, useEffect } from 'react';
import { useStreamers } from './useStreamers';
import { useStreamersStore } from '../store/streamersStore';
import { useFavoritesStore } from '../store/favoritesStore';

export const useHome = () => {
  const { streamers: allStreamers, loading, error, refresh } = useStreamers();
  
  // Zustand stores
  const {
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
    clearFilters,
  } = useStreamersStore();
  
  const {
    favorites,
    activeGroup,
    addFavorite,
    removeFavorite,
    isFavorite,
    loadFavorites,
  } = useFavoritesStore();

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const filteredAndSortedStreamers = useMemo(() => {
    let filtered = allStreamers;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((streamer) => {
        switch (searchBy) {
          case 'name':
            return streamer.username.toLowerCase().includes(term);
          case 'platform':
            const platforms = [];
            if (streamer.twitch) platforms.push('twitch');
            if (streamer.youtube) platforms.push('youtube');
            return platforms.some(p => p.includes(term));
          case 'status':
            return streamer.status.toLowerCase().includes(term);
          default:
            return streamer.username.toLowerCase().includes(term);
        }
      });
    }

    if (showOnlineOnly && showOfflineOnly) {
    } else if (showOnlineOnly) {
      filtered = filtered.filter((streamer) => streamer.status === 'live');
    } else if (showOfflineOnly) {
      filtered = filtered.filter((streamer) => streamer.status === 'offline');
    }

    if (showCommunityOnly) {
      filtered = filtered.filter((streamer) => streamer.is_community_streamer);
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter((streamer) => favorites.includes(streamer.username));
    }

    if (activeGroup) {
      const groupAssignments = JSON.parse(localStorage.getItem('chess-stream-explorer-group-assignments') || '{}');
      filtered = filtered.filter((streamer) => {
        const groupId = groupAssignments[streamer.username];
        return groupId === activeGroup;
      });
    }

    if (showTwitchOnly && showYouTubeOnly) {
    } else if (showTwitchOnly) {
      filtered = filtered.filter((streamer) => streamer.twitch !== undefined);
    } else if (showYouTubeOnly) {
      filtered = filtered.filter((streamer) => streamer.youtube !== undefined);
    }

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
    allStreamers,
    searchTerm,
    searchBy,
    showOnlineOnly,
    showOfflineOnly,
    showCommunityOnly,
    showFavoritesOnly,
    showTwitchOnly,
    showYouTubeOnly,
    favorites,
    activeGroup,
    sortBy,
  ]);

  const stats = useMemo(() => {
    return {
      total: allStreamers.length,
      online: allStreamers.filter((s) => s.status === 'live').length,
      offline: allStreamers.filter((s) => s.status === 'offline').length,
      community: allStreamers.filter((s) => s.is_community_streamer).length,
      favorites: favorites.length,
    };
  }, [allStreamers, favorites]);

  const toggleFavorite = (username: string) => {
    if (isFavorite(username)) {
      removeFavorite(username);
    } else {
      addFavorite(username);
    }
  };

  return {
    streamers: filteredAndSortedStreamers,
    loading,
    error,
    stats,
    searchTerm,
    searchBy,
    setSearchTerm,
    setSearchBy,
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
    dragDropMode,
    setDragDropMode,
    handleClearFilters: clearFilters,
    refresh,
    toggleFavorite,
    isFavorite,
    favorites,
  };
};
