import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'chess-stream-explorer-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFavorites(new Set(parsed));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const toggleFavorite = (username: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(username)) {
        newFavorites.delete(username);
      } else {
        newFavorites.add(username);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  const isFavorite = (username: string) => {
    return favorites.has(username);
  };

  return { favorites, toggleFavorite, isFavorite };
};
