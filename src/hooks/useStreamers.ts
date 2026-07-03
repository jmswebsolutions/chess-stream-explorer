import { useState, useEffect, useCallback } from 'react';
import { chessApi } from '../services/chessApi';
import { Streamer } from '../types/streamer';

export const useStreamers = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStreamers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await chessApi.getStreamers();
      setStreamers(data);
    } catch (err) {
      setError('Failed to fetch streamers. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchStreamers();
  }, [fetchStreamers]);

  useEffect(() => {
    fetchStreamers();
  }, [fetchStreamers]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStreamers();
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, [fetchStreamers]);

  return { streamers, loading, error, refresh };
};
