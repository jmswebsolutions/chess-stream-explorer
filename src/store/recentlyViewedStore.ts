import { create } from 'zustand';
import { Streamer } from '../api/chessApi';

const RECENTLY_VIEWED_KEY = 'chess-stream-explorer-recently-viewed';
const MAX_RECENT = 10;

interface RecentlyViewedState {
  recentlyViewed: Streamer[];
  addToRecentlyViewed: (streamer: Streamer) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>((set) => ({
  recentlyViewed: [],
  addToRecentlyViewed: (streamer) => {
    set((state) => {
      const filtered = state.recentlyViewed.filter((s) => s.username !== streamer.username);
      const updated = [streamer, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      return { recentlyViewed: updated };
    });
  },
  clearRecentlyViewed: () => {
    set({ recentlyViewed: [] });
    localStorage.removeItem(RECENTLY_VIEWED_KEY);
  },
}));

// Load recently viewed on initialization
const savedRecentlyViewed = localStorage.getItem(RECENTLY_VIEWED_KEY);
if (savedRecentlyViewed) {
  try {
    useRecentlyViewedStore.setState({ recentlyViewed: JSON.parse(savedRecentlyViewed) });
  } catch (e) {
    console.error('Failed to load recently viewed', e);
  }
}
