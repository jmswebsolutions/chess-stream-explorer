import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Streamer } from '../api/chessApi';

interface ComparisonState {
  selectedStreamers: Streamer[];
  addStreamer: (streamer: Streamer) => void;
  removeStreamer: (username: string) => void;
  clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set) => ({
      selectedStreamers: [],
      addStreamer: (streamer) => {
        set((state) => {
          if (state.selectedStreamers.length >= 2) {
            return state;
          }
          if (state.selectedStreamers.some((s) => s.username === streamer.username)) {
            return state;
          }
          return { selectedStreamers: [...state.selectedStreamers, streamer] };
        });
      },
      removeStreamer: (username) => {
        set((state) => ({
          selectedStreamers: state.selectedStreamers.filter((s) => s.username !== username),
        }));
      },
      clearComparison: () => {
        set({ selectedStreamers: [] });
      },
    }),
    {
      name: 'chess-stream-explorer-comparison',
      onRehydrateStorage: () => (state) => {
        try {
          if (state) {
            // Validate that loaded data is valid
            if (!Array.isArray(state.selectedStreamers)) {
              state.selectedStreamers = [];
            }
          }
        } catch (error) {
          console.error('Failed to rehydrate comparison store:', error);
        }
      },
    }
  )
);
