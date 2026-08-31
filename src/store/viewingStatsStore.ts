import { create } from 'zustand';

const VIEWING_STATS_KEY = 'chess-stream-explorer-viewing-stats';

interface ViewingStats {
  [username: string]: {
    totalSeconds: number;
    lastViewed: number;
    viewCount: number;
  };
}

interface ViewingStatsState {
  viewingStats: ViewingStats;
  addViewTime: (username: string, seconds: number) => void;
  recordView: (username: string) => void;
  getStats: () => ViewingStats;
  getViewCount: (username: string) => number;
  clearStats: () => void;
}

export const useViewingStatsStore = create<ViewingStatsState>((set, get) => ({
  viewingStats: {},
  addViewTime: (username, seconds) => {
    const { viewingStats } = get();
    const currentStats = viewingStats[username] || { totalSeconds: 0, lastViewed: Date.now(), viewCount: 0 };
    const newStats = {
      ...currentStats,
      totalSeconds: currentStats.totalSeconds + seconds,
      lastViewed: Date.now(),
    };
    set({
      viewingStats: {
        ...viewingStats,
        [username]: newStats,
      },
    });
    localStorage.setItem(VIEWING_STATS_KEY, JSON.stringify(get().viewingStats));
  },
  recordView: (username) => {
    const { viewingStats } = get();
    const currentStats = viewingStats[username] || { totalSeconds: 0, lastViewed: Date.now(), viewCount: 0 };
    const newStats = {
      ...currentStats,
      lastViewed: Date.now(),
      viewCount: currentStats.viewCount + 1,
    };
    set({
      viewingStats: {
        ...viewingStats,
        [username]: newStats,
      },
    });
    localStorage.setItem(VIEWING_STATS_KEY, JSON.stringify(get().viewingStats));
  },
  getStats: () => {
    const { viewingStats } = get();
    return viewingStats;
  },
  getViewCount: (username) => {
    const { viewingStats } = get();
    return viewingStats[username]?.viewCount || 0;
  },
  clearStats: () => {
    set({ viewingStats: {} });
    localStorage.removeItem(VIEWING_STATS_KEY);
  },
}));

// Load stats on initialization
const savedStats = localStorage.getItem(VIEWING_STATS_KEY);
if (savedStats) {
  try {
    useViewingStatsStore.setState({ viewingStats: JSON.parse(savedStats) });
  } catch (e) {
    console.error('Failed to load viewing stats', e);
  }
}
