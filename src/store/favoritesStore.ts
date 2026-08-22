import { create } from 'zustand';

const FAVORITES_KEY = 'chess-stream-explorer-favorites';
const FAVORITE_GROUPS_KEY = 'chess-stream-explorer-favorite-groups';
const GROUP_ASSIGNMENTS_KEY = 'chess-stream-explorer-group-assignments';
const FAVORITE_NOTES_KEY = 'chess-stream-explorer-favorite-notes';

export interface FavoriteGroup {
  id: string;
  name: string;
  color: string;
}

interface FavoritesState {
  favorites: string[];
  favoriteGroups: FavoriteGroup[];
  activeGroup: string | null;
  favoriteNotes: Record<string, string>;
  addFavorite: (username: string) => void;
  removeFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
  loadFavorites: () => void;
  setActiveGroup: (groupId: string | null) => void;
  addGroup: (name: string, color: string) => void;
  removeGroup: (groupId: string) => void;
  setNote: (username: string, note: string) => void;
  getNote: (username: string) => string;
  clearNote: (username: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  favoriteGroups: [
    { id: 'all', name: 'All Favorites', color: 'blue' },
    { id: 'grandmasters', name: 'Grandmasters', color: 'purple' },
    { id: 'content-creators', name: 'Content Creators', color: 'green' },
    { id: 'tournament-players', name: 'Tournament Players', color: 'orange' },
  ],
  activeGroup: null,
  favoriteNotes: {},
  addFavorite: (username) => {
    set((state) => {
      if (state.favorites.includes(username)) {
        return state;
      }
      const newFavorites = [...state.favorites, username];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    });
  },
  removeFavorite: (username) => {
    set((state) => {
      const newFavorites = state.favorites.filter((f) => f !== username);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      
      // Also remove from group assignments
      const groupAssignments = JSON.parse(localStorage.getItem(GROUP_ASSIGNMENTS_KEY) || '{}');
      delete groupAssignments[username];
      localStorage.setItem(GROUP_ASSIGNMENTS_KEY, JSON.stringify(groupAssignments));
      
      // Also remove note
      const newNotes = { ...state.favoriteNotes };
      delete newNotes[username];
      localStorage.setItem(FAVORITE_NOTES_KEY, JSON.stringify(newNotes));
      
      return { favorites: newFavorites, favoriteNotes: newNotes };
    });
  },
  isFavorite: (username): boolean => {
    return useFavoritesStore.getState().favorites.includes(username);
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
  setActiveGroup: (groupId) => {
    set({ activeGroup: groupId });
  },
  addGroup: (name, color) => {
    set((state) => {
      const newGroup: FavoriteGroup = {
        id: Date.now().toString(),
        name,
        color,
      };
      const newGroups = [...state.favoriteGroups, newGroup];
      localStorage.setItem(FAVORITE_GROUPS_KEY, JSON.stringify(newGroups));
      return { favoriteGroups: newGroups };
    });
  },
  removeGroup: (groupId) => {
    set((state) => {
      const newGroups = state.favoriteGroups.filter((g) => g.id !== groupId);
      localStorage.setItem(FAVORITE_GROUPS_KEY, JSON.stringify(newGroups));
      
      // Clear group assignments for removed group
      const groupAssignments = JSON.parse(localStorage.getItem(GROUP_ASSIGNMENTS_KEY) || '{}');
      Object.keys(groupAssignments).forEach((username) => {
        if (groupAssignments[username] === groupId) {
          delete groupAssignments[username];
        }
      });
      localStorage.setItem(GROUP_ASSIGNMENTS_KEY, JSON.stringify(groupAssignments));
      
      if (state.activeGroup === groupId) {
        return { favoriteGroups: newGroups, activeGroup: null };
      }
      return { favoriteGroups: newGroups };
    });
  },
  setNote: (username, note) => {
    set((state) => {
      const newNotes = { ...state.favoriteNotes, [username]: note };
      localStorage.setItem(FAVORITE_NOTES_KEY, JSON.stringify(newNotes));
      return { favoriteNotes: newNotes };
    });
  },
  getNote: (username): string => {
    return useFavoritesStore.getState().favoriteNotes[username] || '';
  },
  clearNote: (username) => {
    set((state) => {
      const newNotes = { ...state.favoriteNotes };
      delete newNotes[username];
      localStorage.setItem(FAVORITE_NOTES_KEY, JSON.stringify(newNotes));
      return { favoriteNotes: newNotes };
    });
  },
}));

// Load favorites on initialization
const savedFavorites = localStorage.getItem(FAVORITES_KEY);
if (savedFavorites) {
  try {
    useFavoritesStore.setState({ favorites: JSON.parse(savedFavorites) });
  } catch (e) {
    console.error('Failed to load favorites', e);
  }
}

// Load favorite groups on initialization
const savedGroups = localStorage.getItem(FAVORITE_GROUPS_KEY);
if (savedGroups) {
  try {
    useFavoritesStore.setState({ favoriteGroups: JSON.parse(savedGroups) });
  } catch (e) {
    console.error('Failed to load favorite groups', e);
  }
}

// Load favorite notes on initialization
const savedNotes = localStorage.getItem(FAVORITE_NOTES_KEY);
if (savedNotes) {
  try {
    useFavoritesStore.setState({ favoriteNotes: JSON.parse(savedNotes) });
  } catch (e) {
    console.error('Failed to load favorite notes', e);
  }
}
