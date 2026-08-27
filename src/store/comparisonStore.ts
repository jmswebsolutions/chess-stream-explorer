import { create } from 'zustand';
import { Streamer } from '../api/chessApi';

interface ComparisonState {
  selectedStreamers: Streamer[];
  addStreamer: (streamer: Streamer) => void;
  removeStreamer: (username: string) => void;
  clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
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
}));
