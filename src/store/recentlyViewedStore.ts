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
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save recently viewed:', error);
      }
      return { recentlyViewed: updated };
    });
  },
  clearRecentlyViewed: () => {
    set({ recentlyViewed: [] });
    try {
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    } catch (error) {
      console.error('Failed to clear recently viewed:', error);
    }
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
