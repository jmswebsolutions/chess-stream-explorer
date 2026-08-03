import { useQuery, useQueryClient } from '@tanstack/react-query';
import { chessApi } from '../api/chessApi';

export const useStreamers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['streamers'],
    queryFn: chessApi.getStreamers,
    refetchInterval: 60000, // Refresh every 60 seconds
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['streamers'] });
  };

  return {
    streamers: query.data || [],
    loading: query.isLoading,
    error: query.error ? 'Failed to fetch streamers. Please try again later.' : null,
    refresh,
  };
};
