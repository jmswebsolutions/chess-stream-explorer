import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Streamer } from '../api/chessApi';

interface ViewingHistory {
  username: string;
  timestamp: number;
  count: number;
}

interface RecommendationsState {
  viewingHistory: ViewingHistory[];
  addView: (username: string) => void;
  getRecommendations: (streamers: Streamer[], favorites: string[]) => Streamer[];
  clearHistory: () => void;
}

export const useRecommendationsStore = create<RecommendationsState>()(
  persist(
    (set, get) => ({
      viewingHistory: [],
      
      addView: (username: string) => {
        set((state) => {
          const existing = state.viewingHistory.find(h => h.username === username);
          if (existing) {
            return {
              viewingHistory: state.viewingHistory.map(h =>
                h.username === username
                  ? { ...h, count: h.count + 1, timestamp: Date.now() }
                  : h
              ),
            };
          }
          return {
            viewingHistory: [
              ...state.viewingHistory,
              { username, timestamp: Date.now(), count: 1 },
            ],
          };
        });
      },
      
      getRecommendations: (streamers: Streamer[], favorites: string[]) => {
        const { viewingHistory } = get();
        const scores = new Map<string, number>();
        
        // Score based on viewing history
        viewingHistory.forEach(({ username, count }) => {
          const score = count * 2;
          scores.set(username, (scores.get(username) || 0) + score);
        });
        
        // Score based on favorites
        favorites.forEach(username => {
          scores.set(username, (scores.get(username) || 0) + 5);
        });
        
        // Score based on similar streamers (same platform)
        const viewedStreamers = streamers.filter(s =>
          viewingHistory.some(h => h.username === s.username)
        );
        
        viewedStreamers.forEach(viewed => {
          streamers.forEach(streamer => {
            if (streamer.username === viewed.username) return;
            
            // Same platform similarity
            if (viewed.twitch && streamer.twitch) {
              scores.set(streamer.username, (scores.get(streamer.username) || 0) + 1);
            }
            if (viewed.youtube && streamer.youtube) {
              scores.set(streamer.username, (scores.get(streamer.username) || 0) + 1);
            }
            
            // Both community streamers
            if (viewed.is_community_streamer && streamer.is_community_streamer) {
              scores.set(streamer.username, (scores.get(streamer.username) || 0) + 1);
            }
          });
        });
        
        // Sort by score and return top recommendations
        return streamers
          .filter(s => !favorites.includes(s.username)) // Exclude already favorited
          .map(streamer => ({
            ...streamer,
            score: scores.get(streamer.username) || 0,
          }))
          .filter(s => s.score > 0) // Only show with positive score
          .sort((a, b) => (b as any).score - (a as any).score)
          .slice(0, 6) // Top 6 recommendations
          .map(({ score, ...streamer }) => streamer);
      },
      
      clearHistory: () => {
        set({ viewingHistory: [] });
      },
    }),
    {
      name: 'chess-stream-explorer-recommendations',
    }
  )
);
