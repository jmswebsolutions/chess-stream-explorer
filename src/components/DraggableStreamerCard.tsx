import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { StreamerCard } from './StreamerCard';
import { Streamer } from '../api/chessApi';

interface DraggableStreamerCardProps {
  streamer: Streamer;
  onToggleFavorite: (username: string) => void;
  isFavorite: boolean;
  onPreview?: (platform: 'twitch' | 'youtube', channel: string) => void;
  onProfile?: (username: string) => void;
  compactMode?: boolean;
  className?: string;
}

export const DraggableStreamerCard: React.FC<DraggableStreamerCardProps> = ({
  streamer,
  onToggleFavorite,
  isFavorite,
  onPreview,
  onProfile,
  compactMode = false,
  className = '',
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: streamer.username });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StreamerCard
        streamer={streamer}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        onPreview={onPreview}
        onProfile={onProfile}
        compactMode={compactMode}
        className={className}
      />
    </div>
  );
};
