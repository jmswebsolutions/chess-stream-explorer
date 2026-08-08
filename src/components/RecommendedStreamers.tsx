import { Streamer } from '../api/chessApi';
import { StreamerCard } from './StreamerCard';
import { FaLightbulb } from 'react-icons/fa';
import { useFavoritesStore } from '../store/favoritesStore';

interface RecommendedStreamersProps {
  streamers: Streamer[];
}

export const RecommendedStreamers = ({ streamers }: RecommendedStreamersProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  if (streamers.length === 0) {
    return null;
  }

  const handleToggleFavorite = (username: string) => {
    if (isFavorite(username)) {
      removeFavorite(username);
    } else {
      addFavorite(username);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FaLightbulb className="text-yellow-400" />
        <h2 className="text-xl font-semibold text-white">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {streamers.map((streamer) => (
          <StreamerCard
            key={streamer.username}
            streamer={streamer}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite(streamer.username)}
          />
        ))}
      </div>
    </div>
  );
};
