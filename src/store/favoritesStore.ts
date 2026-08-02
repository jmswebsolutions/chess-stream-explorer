import { create } from 'zustand';

const FAVORITES_KEY = 'chess-stream-explorer-favorites';

interface FavoritesState {
  favorites: string[];
  addFavorite: (username: string) => void;
  removeFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
  loadFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (username) => {
    const { favorites } = get();
    if (!favorites.includes(username)) {
      const newFavorites = [...favorites, username];
      set({ favorites: newFavorites });
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    }
  },
  removeFavorite: (username) => {
    const { favorites } = get();
    const newFavorites = favorites.filter((fav) => fav !== username);
    set({ favorites: newFavorites });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  },
  isFavorite: (username) => {
    const { favorites } = get();
    return favorites.includes(username);
  },
  loadFavorites: () => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        set({ favorites: JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to load favorites', e);
      }
    }
  },
}));
