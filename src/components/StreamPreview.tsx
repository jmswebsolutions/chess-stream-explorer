import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaExpand, FaCompress } from 'react-icons/fa';

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!isOpen) return null;

  const getEmbedUrl = () => {
    if (platform === 'twitch') {
      return `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}&muted=true`;
    } else if (platform === 'youtube') {
      return `https://www.youtube.com/embed/${channel}?autoplay=1&mute=1`;
    }
    return '';
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div 
        ref={containerRef}
        className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold text-lg">
            {username}'s Stream
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <FaCompress className="text-xl" /> : <FaExpand className="text-xl" />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close preview"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>
        <div className="aspect-video w-full bg-black flex-1">
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
