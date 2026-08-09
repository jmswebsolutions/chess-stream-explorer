import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StreamerCard } from './StreamerCard';
import { Streamer } from '../api/chessApi';

const mockStreamer: Streamer = {
  username: 'testuser',
  status: 'live',
  twitch: { login: 'testchannel' },
  youtube: undefined,
  is_community_streamer: false,
  avatar: 'avatar.png',
  url: 'https://example.com',
};

const mockProps = {
  streamer: mockStreamer,
  onToggleFavorite: vi.fn(),
  isFavorite: false,
};

describe('StreamerCard', () => {
  it('should render streamer username', () => {
    render(<StreamerCard {...mockProps} />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('should render streamer avatar', () => {
    render(<StreamerCard {...mockProps} />);
    const avatar = screen.getByAltText('testuser');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'avatar.png');
  });

  it('should render live badge when status is live', () => {
    render(<StreamerCard {...mockProps} />);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('should render offline badge when status is offline', () => {
    const offlineStreamer = { ...mockStreamer, status: 'offline' as const };
    render(<StreamerCard {...mockProps} streamer={offlineStreamer} />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('should call onToggleFavorite when favorite button is clicked', async () => {
    const user = userEvent.setup();
    render(<StreamerCard {...mockProps} />);
    const favoriteButton = screen.getAllByRole('button')[0];
    
    await user.click(favoriteButton);
    expect(mockProps.onToggleFavorite).toHaveBeenCalledWith('testuser');
  });

  it('should show star icon when isFavorite is true', () => {
    render(<StreamerCard {...mockProps} isFavorite={true} />);
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  });
});
