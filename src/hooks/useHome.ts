import { useState, useMemo } from 'react';
import { useStreamers } from './useStreamers';
import { SortOption } from '../components/Sort';

export const useHome = () => {
  const { streamers, loading, error, refresh } = useStreamers();

  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showOfflineOnly, setShowOfflineOnly] = useState(false);
  const [showCommunityOnly, setShowCommunityOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('online-first');

  const filteredAndSortedStreamers = useMemo(() => {
    let filtered = streamers;

    if (searchTerm) {
      filtered = filtered.filter((streamer) =>
        streamer.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
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

  return {
    streamers: filteredAndSortedStreamers,
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
  };
};
