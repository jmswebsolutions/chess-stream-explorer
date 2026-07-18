import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface StreamPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'twitch' | 'youtube';
  channel: string;
  username: string;
}

export const StreamPreview: React.FC<StreamPreviewProps> = ({
  isOpen,
  onClose,
  platform,
  channel,
  username,
}) => {
  if (!isOpen) return null;

  const getEmbedUrl = () => {
    if (platform === 'twitch') {
      return `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}&muted=true`;
    } else if (platform === 'youtube') {
      return `https://www.youtube.com/embed/${channel}?autoplay=1&mute=1`;
    }
    return '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold text-lg">
            {username}'s Stream
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Close preview"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={getEmbedUrl()}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
            title={`${username}'s stream`}
          />
        </div>
      </div>
    </div>
  );
};
