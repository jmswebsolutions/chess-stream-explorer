import React, { useState } from 'react';
import { FaTwitch, FaYoutube, FaStar, FaExternalLinkAlt, FaUser, FaPlay, FaStickyNote, FaShareAlt, FaTwitter, FaFacebook, FaWhatsapp, FaTags, FaBalanceScale, FaEye } from 'react-icons/fa';
import { Streamer } from '../api/chessApi';
import { useViewingStatsStore } from '../store/viewingStatsStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useTagsStore } from '../store/tagsStore';
import { useComparisonStore } from '../store/comparisonStore';

interface StreamerCardProps {
  streamer: Streamer;
  onToggleFavorite: (username: string) => void;
  isFavorite: boolean;
  onPreview?: (platform: 'twitch' | 'youtube', channel: string) => void;
  onProfile?: (username: string) => void;
  compactMode?: boolean;
  className?: string;
}

export const StreamerCard = React.memo<StreamerCardProps>(({
  streamer,
  onToggleFavorite,
  isFavorite,
  onPreview,
  onProfile,
  compactMode = false,
  className = '',
}) => {
  const { recordView, getViewCount, getViewTime, getLastViewed } = useViewingStatsStore();
  const { getNote, setNote, clearNote } = useFavoritesStore();
  const { tags, getStreamerTags, addTagToStreamer, removeTagFromStreamer } = useTagsStore();
  const { selectedStreamers, addStreamer, removeStreamer } = useComparisonStore();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [showStatsTooltip, setShowStatsTooltip] = useState(false);
  
  const { username, avatar, status, is_community_streamer, url, twitch, youtube } =
    streamer;
  const note = getNote(username);
  const streamerTags = getStreamerTags(username);
  const isInComparison = selectedStreamers.some((s) => s.username === username);
  const viewCount = getViewCount(username);
  const viewTime = getViewTime(username);
  const lastViewed = getLastViewed(username);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatLastViewed = (timestamp: number) => {
    if (!timestamp) return 'Never';
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const shareText = `Check out ${username} on Chess.com!`;
  const shareUrl = url;

  const handleShare = (platform: string) => {
    let shareLink = '';
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
    }
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg card-hover animate-fade-in ${
      compactMode ? 'p-2' : 'p-4'
    } ${className}`}>
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
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 relative">
                <h3 
                  className={`text-white font-semibold ${compactMode ? 'text-sm' : 'text-lg'} cursor-help`}
                  onMouseEnter={() => setShowStatsTooltip(true)}
                  onMouseLeave={() => setShowStatsTooltip(false)}
                >{username}</h3>
                {viewCount === 0 && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-medium" title="New streamer - not viewed yet">
                    NEW
                  </span>
                )}
                {viewCount > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-400" title={`Viewed ${viewCount} time${viewCount > 1 ? 's' : ''}`}>
                    <FaEye />
                    <span>{viewCount}</span>
                  </div>
                )}
                {showStatsTooltip && viewCount > 0 && (
                  <div className="absolute left-0 top-full mt-2 z-50 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl min-w-48">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Views:</span>
                        <span className="text-white font-semibold">{viewCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Watch time:</span>
                        <span className="text-white font-semibold">{formatTime(viewTime)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Last viewed:</span>
                        <span className="text-white font-semibold">{formatLastViewed(lastViewed)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
          </div>
          {is_community_streamer && (
            <span className={`inline-block text-blue-400 bg-blue-900/30 rounded ${
              compactMode ? 'mt-0.5 text-[10px] px-1 py-0.5' : 'mt-1 text-xs px-2 py-0.5'
            }`}>
              Community Streamer
            </span>
          )}
          {isFavorite && (
            <button
              onClick={() => setShowNoteInput(!showNoteInput)}
              className={`ml-2 text-yellow-400 hover:text-yellow-300 transition-colors ${
                compactMode ? 'text-xs' : 'text-sm'
              }`}
              aria-label="Add note"
            >
              <FaStickyNote />
            </button>
          )}
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className={`ml-2 text-blue-400 hover:text-blue-300 transition-colors ${
              compactMode ? 'text-xs' : 'text-sm'
            }`}
            aria-label="Share"
          >
            <FaShareAlt />
          </button>
          <button
            onClick={() => setShowTagMenu(!showTagMenu)}
            className={`ml-2 text-purple-400 hover:text-purple-300 transition-colors ${
              compactMode ? 'text-xs' : 'text-sm'
            }`}
            aria-label="Tags"
          >
            <FaTags />
          </button>
          <button
            onClick={() => {
              if (isInComparison) {
                removeStreamer(username);
              } else {
                addStreamer(streamer);
              }
            }}
            className={`ml-2 transition-colors ${
              isInComparison
                ? 'text-green-400 hover:text-green-300'
                : 'text-gray-400 hover:text-green-300'
            } ${compactMode ? 'text-xs' : 'text-sm'}`}
            aria-label={isInComparison ? "Remove from comparison" : "Add to comparison"}
          >
            <FaBalanceScale />
          </button>
        </div>
      </div>
      </div>

      <div className={`${compactMode ? 'mt-2' : 'mt-4'} flex flex-wrap gap-2`}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordView(username)}
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
              onClick={() => recordView(username)}
              className={`flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors ${
                compactMode ? 'text-xs' : 'text-sm'
              }`}
            >
              <FaTwitch className={compactMode ? 'text-[10px]' : ''} />
              Twitch
            </a>
            {status === 'live' && onPreview && (
              <button
                onClick={() => {
                  recordView(username);
                  onPreview('twitch', twitch.login);
                }}
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
              onClick={() => recordView(username)}
              className={`flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors ${
                compactMode ? 'text-xs' : 'text-sm'
              }`}
            >
              <FaYoutube className={compactMode ? 'text-[10px]' : ''} />
              YouTube
            </a>
            {status === 'live' && onPreview && (
              <button
                onClick={() => {
                  recordView(username);
                  onPreview('youtube', youtube.channel);
                }}
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

      {showNoteInput && isFavorite && (
        <div className={`${compactMode ? 'mt-2' : 'mt-4'}`}>
          {note ? (
            <div className="bg-gray-700 rounded p-2 text-gray-300 text-sm">
              <p>{note}</p>
              <button
                onClick={() => clearNote(username)}
                className="text-xs text-red-400 hover:text-red-300 mt-1"
              >
                Clear note
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 bg-gray-700 text-white text-sm rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && noteText.trim()) {
                    setNote(username, noteText.trim());
                    setNoteText('');
                    setShowNoteInput(false);
                  }
                }}
              />
              <button
                onClick={() => {
                  if (noteText.trim()) {
                    setNote(username, noteText.trim());
                    setNoteText('');
                    setShowNoteInput(false);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}

      {showShareMenu && (
        <div className={`${compactMode ? 'mt-2' : 'mt-4'} bg-gray-700 rounded p-2`}>
          <div className="flex gap-2">
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
              aria-label="Share on Twitter"
            >
              <FaTwitter />
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-500 text-sm transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook />
              <span>Facebook</span>
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center gap-1 text-green-500 hover:text-green-400 text-sm transition-colors"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {showTagMenu && (
        <div className={`${compactMode ? 'mt-2' : 'mt-4'} bg-gray-700 rounded p-2`}>
          <div className="space-y-2">
            {tags.length === 0 ? (
              <p className="text-gray-400 text-xs">No tags available. Create tags in the Tags menu.</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => {
                    const isTagged = streamerTags.some((t) => t.id === tag.id);
                    return (
                      <button
                        key={tag.id}
                        onClick={() => {
                          if (isTagged) {
                            removeTagFromStreamer(username, tag.id);
                          } else {
                            addTagToStreamer(username, tag.id);
                          }
                        }}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          isTagged
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                        style={{
                          backgroundColor: isTagged ? tag.color : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
                {streamerTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-600">
                    {streamerTags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 rounded text-xs text-white"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
