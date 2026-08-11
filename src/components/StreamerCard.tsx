import React from 'react';
import { FaTwitch, FaYoutube, FaExternalLinkAlt, FaStar, FaPlay, FaUser } from 'react-icons/fa';
import { Badge } from './Badge';
import { Streamer } from '../api/chessApi';

interface StreamerCardProps {
  streamer: Streamer;
  onToggleFavorite: (username: string) => void;
  isFavorite: boolean;
  onPreview?: (platform: 'twitch' | 'youtube', channel: string) => void;
  onProfile?: (username: string) => void;
  compactMode?: boolean;
}

export const StreamerCard = React.memo<StreamerCardProps>(({
  streamer,
  onToggleFavorite,
  isFavorite,
  onPreview,
  onProfile,
  compactMode = false,
}) => {
  const { username, avatar, status, is_community_streamer, url, twitch, youtube } =
    streamer;

  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
      compactMode ? 'p-2' : 'p-4'
    }`}>
      <div className={`flex items-start ${compactMode ? 'space-x-2' : 'space-x-4'}`}>
        <img
          src={avatar}
          alt={username}
          className={`rounded-full object-cover border-2 border-gray-600 ${
            compactMode ? 'w-10 h-10' : 'w-16 h-16'
          }`}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-white font-semibold ${compactMode ? 'text-sm' : 'text-lg'}`}>{username}</h3>
            <div className={`flex items-center ${compactMode ? 'gap-1' : 'gap-2'}`}>
              {onProfile && (
                <button
                  onClick={() => onProfile(username)}
                  className={`rounded-full text-gray-400 hover:text-blue-400 transition-colors ${
                    compactMode ? 'p-1' : 'p-2'
                  }`}
                  aria-label="View profile"
                >
                  <FaUser className={compactMode ? 'text-xs' : ''} />
                </button>
              )}
              <button
                onClick={() => onToggleFavorite(username)}
                className={`rounded-full transition-colors ${
                  isFavorite
                    ? 'text-yellow-400 hover:text-yellow-300'
                    : 'text-gray-400 hover:text-yellow-400'
                } ${compactMode ? 'p-1' : 'p-2'}`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FaStar className={compactMode ? 'text-xs' : ''} />
              </button>
              <Badge type={status} />
            </div>
          </div>
          {is_community_streamer && (
            <span className={`inline-block text-blue-400 bg-blue-900/30 rounded ${
              compactMode ? 'mt-0.5 text-[10px] px-1 py-0.5' : 'mt-1 text-xs px-2 py-0.5'
            }`}>
              Community Streamer
            </span>
          )}
        </div>
      </div>

      <div className={`${compactMode ? 'mt-2' : 'mt-4'} flex flex-wrap gap-2`}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1 text-gray-300 hover:text-white transition-colors ${
            compactMode ? 'text-xs' : 'text-sm'
          }`}
        >
          <FaExternalLinkAlt className={compactMode ? 'text-[10px]' : 'text-xs'} />
          Chess.com
        </a>
        {twitch && (
          <>
            <a
              href={`https://twitch.tv/${twitch.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors ${
                compactMode ? 'text-xs' : 'text-sm'
              }`}
            >
              <FaTwitch className={compactMode ? 'text-[10px]' : ''} />
              Twitch
            </a>
            {status === 'live' && onPreview && (
              <button
                onClick={() => onPreview('twitch', twitch.login)}
                className={`flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors ${
                  compactMode ? 'text-xs' : 'text-sm'
                }`}
                aria-label={`Preview ${username}'s stream`}
              >
                <FaPlay className={compactMode ? 'text-[10px]' : ''} />
                Preview
              </button>
            )}
          </>
        )}
        {youtube && (
          <>
            <a
              href={`https://youtube.com/${youtube.channel}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors ${
                compactMode ? 'text-xs' : 'text-sm'
              }`}
            >
              <FaYoutube className={compactMode ? 'text-[10px]' : ''} />
              YouTube
            </a>
            {status === 'live' && onPreview && (
              <button
                onClick={() => onPreview('youtube', youtube.channel)}
                className={`flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors ${
                  compactMode ? 'text-xs' : 'text-sm'
                }`}
                aria-label={`Preview ${username}'s stream`}
              >
                <FaPlay className={compactMode ? 'text-[10px]' : ''} />
                Preview
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
});
