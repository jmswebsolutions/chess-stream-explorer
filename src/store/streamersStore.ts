import { create } from 'zustand';
import { Streamer } from '../api/chessApi';
import { SortOption } from '../components/Sort';

interface StreamersState {
  streamers: Streamer[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  searchBy: 'name' | 'platform' | 'status';
  showOnlineOnly: boolean;
  showOfflineOnly: boolean;
  showCommunityOnly: boolean;
  showFavoritesOnly: boolean;
  showTwitchOnly: boolean;
  showYouTubeOnly: boolean;
  sortBy: SortOption;
  compactMode: boolean;
  dragDropMode: boolean;
  filterByTag: string | null;
  setStreamers: (streamers: Streamer[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setSearchBy: (by: 'name' | 'platform' | 'status') => void;
  setShowOnlineOnly: (show: boolean) => void;
  setShowOfflineOnly: (show: boolean) => void;
  setShowCommunityOnly: (show: boolean) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  setShowTwitchOnly: (show: boolean) => void;
  setShowYouTubeOnly: (show: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  setCompactMode: (compact: boolean) => void;
  setDragDropMode: (enabled: boolean) => void;
  setFilterByTag: (tagId: string | null) => void;
  clearFilters: () => void;
}

export const useStreamersStore = create<StreamersState>((set) => ({
  streamers: [],
  loading: false,
  error: null,
  searchTerm: '',
  searchBy: 'name',
  showOnlineOnly: false,
  showOfflineOnly: false,
  showCommunityOnly: false,
  showFavoritesOnly: false,
  showTwitchOnly: false,
  showYouTubeOnly: false,
  sortBy: 'online-first',
  compactMode: false,
  dragDropMode: false,
  filterByTag: null,
  setStreamers: (streamers) => set({ streamers }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSearchBy: (searchBy) => set({ searchBy }),
  setShowOnlineOnly: (showOnlineOnly) => set({ showOnlineOnly }),
  setShowOfflineOnly: (showOfflineOnly) => set({ showOfflineOnly }),
  setShowCommunityOnly: (showCommunityOnly) => set({ showCommunityOnly }),
  setShowFavoritesOnly: (showFavoritesOnly) => set({ showFavoritesOnly }),
  setShowTwitchOnly: (showTwitchOnly) => set({ showTwitchOnly }),
  setShowYouTubeOnly: (showYouTubeOnly) => set({ showYouTubeOnly }),
  setSortBy: (sortBy) => set({ sortBy }),
  setCompactMode: (compactMode) => set({ compactMode }),
  setDragDropMode: (dragDropMode) => set({ dragDropMode }),
  setFilterByTag: (filterByTag) => set({ filterByTag }),
  clearFilters: () => set({
    searchTerm: '',
    searchBy: 'name',
    showOnlineOnly: false,
    showOfflineOnly: false,
    showCommunityOnly: false,
    showFavoritesOnly: false,
    showTwitchOnly: false,
    showYouTubeOnly: false,
    sortBy: 'online-first',
    filterByTag: null,
  }),
}));
