import { create } from 'zustand';

const FAVORITES_KEY = 'chess-stream-explorer-favorites';
const FAVORITE_GROUPS_KEY = 'chess-stream-explorer-favorite-groups';

export interface FavoriteGroup {
  id: string;
  name: string;
  color: string;
}

const DEFAULT_GROUPS: FavoriteGroup[] = [
  { id: 'default', name: 'All Favorites', color: '#3b82f6' },
  { id: 'gms', name: 'Grandmasters', color: '#8b5cf6' },
  { id: 'content', name: 'Content Creators', color: '#10b981' },
  { id: 'tournament', name: 'Tournament Players', color: '#f59e0b' },
];

interface FavoritesState {
  favorites: string[];
  favoriteGroups: FavoriteGroup[];
  activeGroup: string | null;
  addFavorite: (username: string, groupId?: string) => void;
  removeFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
  loadFavorites: () => void;
  setActiveGroup: (groupId: string | null) => void;
  addGroup: (name: string, color: string) => void;
  removeGroup: (groupId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  favoriteGroups: DEFAULT_GROUPS,
  activeGroup: null,
  addFavorite: (username, groupId = 'default') => {
    const { favorites } = get();
    if (!favorites.includes(username)) {
      const newFavorites = [...favorites, username];
      set({ favorites: newFavorites });
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      
      // Store group assignment
      const groupAssignments = JSON.parse(localStorage.getItem('chess-stream-explorer-group-assignments') || '{}');
      groupAssignments[username] = groupId;
      localStorage.setItem('chess-stream-explorer-group-assignments', JSON.stringify(groupAssignments));
    }
  },
  removeFavorite: (username) => {
    const { favorites } = get();
    const newFavorites = favorites.filter((fav) => fav !== username);
    set({ favorites: newFavorites });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    
    // Remove group assignment
    const groupAssignments = JSON.parse(localStorage.getItem('chess-stream-explorer-group-assignments') || '{}');
    delete groupAssignments[username];
    localStorage.setItem('chess-stream-explorer-group-assignments', JSON.stringify(groupAssignments));
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
    
    const savedGroups = localStorage.getItem(FAVORITE_GROUPS_KEY);
    if (savedGroups) {
      try {
        set({ favoriteGroups: JSON.parse(savedGroups) });
      } catch (e) {
        console.error('Failed to load groups', e);
      }
    }
  },
  setActiveGroup: (groupId) => {
    set({ activeGroup: groupId });
  },
  addGroup: (name, color) => {
    const { favoriteGroups } = get();
    const newGroup: FavoriteGroup = {
      id: `custom-${Date.now()}`,
      name,
      color,
    };
    const newGroups = [...favoriteGroups, newGroup];
    set({ favoriteGroups: newGroups });
    localStorage.setItem(FAVORITE_GROUPS_KEY, JSON.stringify(newGroups));
  },
  removeGroup: (groupId) => {
    const { favoriteGroups } = get();
    const newGroups = favoriteGroups.filter((g) => g.id !== groupId);
    set({ favoriteGroups: newGroups });
    localStorage.setItem(FAVORITE_GROUPS_KEY, JSON.stringify(newGroups));
  },
}));
