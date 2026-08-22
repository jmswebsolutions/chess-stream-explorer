import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from './favoritesStore';

describe('favoritesStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset store state
    useFavoritesStore.setState({ favorites: [] });
  });

  describe('addFavorite', () => {
    it('should add a favorite to the list', () => {
      const { addFavorite } = useFavoritesStore.getState();
      
      addFavorite('testuser');
      
      expect(useFavoritesStore.getState().favorites).toContain('testuser');
    });

    it('should not add duplicate favorites', () => {
      const { addFavorite } = useFavoritesStore.getState();
      
      addFavorite('testuser');
      addFavorite('testuser');
      
      expect(useFavoritesStore.getState().favorites.filter((f: string) => f === 'testuser').length).toBe(1);
    });

    it('should persist to localStorage', () => {
      const { addFavorite } = useFavoritesStore.getState();
      
      addFavorite('testuser');
      
      const saved = localStorage.getItem('chess-stream-explorer-favorites');
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved || '[]')).toContain('testuser');
    });
  });

  describe('removeFavorite', () => {
    it('should remove a favorite from the list', () => {
      const { addFavorite, removeFavorite } = useFavoritesStore.getState();
      
      addFavorite('testuser');
      removeFavorite('testuser');
      
      expect(useFavoritesStore.getState().favorites).not.toContain('testuser');
    });

    it('should update localStorage when removing', () => {
      const { addFavorite, removeFavorite } = useFavoritesStore.getState();
      
      addFavorite('testuser');
      removeFavorite('testuser');
      
      const saved = localStorage.getItem('chess-stream-explorer-favorites');
      expect(JSON.parse(saved || '[]')).not.toContain('testuser');
    });
  });

  describe('isFavorite', () => {
    it('should return true for favorite streamers', () => {
      const { addFavorite, isFavorite } = useFavoritesStore.getState();
      
      addFavorite('testuser');
      
      expect(isFavorite('testuser')).toBe(true);
    });

    it('should return false for non-favorite streamers', () => {
      const { isFavorite } = useFavoritesStore.getState();
      
      expect(isFavorite('testuser')).toBe(false);
    });
  });

  describe('loadFavorites', () => {
    it('should load favorites from localStorage', () => {
      localStorage.setItem('chess-stream-explorer-favorites', JSON.stringify(['user1', 'user2']));
      
      const { loadFavorites } = useFavoritesStore.getState();
      loadFavorites();
      
      expect(useFavoritesStore.getState().favorites).toEqual(['user1', 'user2']);
    });

    it('should handle invalid localStorage data', () => {
      localStorage.setItem('chess-stream-explorer-favorites', 'invalid-json');
      
      const { loadFavorites } = useFavoritesStore.getState();
      loadFavorites();
      
      expect(useFavoritesStore.getState().favorites).toEqual([]);
    });
  });
});
