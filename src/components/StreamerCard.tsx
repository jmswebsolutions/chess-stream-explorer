import React from 'react';
import { FaTwitch, FaYoutube, FaExternalLinkAlt, FaStar, FaPlay } from 'react-icons/fa';
import { Badge } from './Badge';
import { Streamer } from '../api/chessApi';

interface StreamerCardProps {
  streamer: Streamer;
  onToggleFavorite: (username: string) => void;
  isFavorite: boolean;
  onPreview?: (platform: 'twitch' | 'youtube', channel: string) => void;
}

export const StreamerCard: React.FC<StreamerCardProps> = ({
  streamer,
  onToggleFavorite,
  isFavorite,
  onPreview,
}) => {
  const { username, avatar, status, is_community_streamer, url, twitch, youtube } =
    streamer;

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <img
          src={avatar}
          alt={username}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">{username}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(username)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite
                    ? 'text-yellow-400 hover:text-yellow-300'
                    : 'text-gray-400 hover:text-yellow-400'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FaStar />
              </button>
              <Badge type={status} />
            </div>
          </div>
          {is_community_streamer && (
            <span className="inline-block mt-1 text-xs text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded">
              Community Streamer
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <FaExternalLinkAlt className="text-xs" />
          Chess.com
        </a>
        {twitch && (
          <>
            <a
              href={`https://twitch.tv/${twitch.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <FaTwitch />
              Twitch
            </a>
            {status === 'live' && onPreview && (
              <button
                onClick={() => onPreview('twitch', twitch.login)}
                className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                aria-label={`Preview ${username}'s stream`}
              >
                <FaPlay />
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
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition-colors"
            >
              <FaYoutube />
              YouTube
            </a>
            {status === 'live' && onPreview && (
              <button
                onClick={() => onPreview('youtube', youtube.channel)}
                className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                aria-label={`Preview ${username}'s stream`}
              >
                <FaPlay />
                Preview
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
