import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filters } from './Filters';

const mockProps = {
  searchTerm: '',
  onSearchChange: vi.fn(),
  searchBy: 'name' as const,
  onSearchByChange: vi.fn(),
  showOnlineOnly: false,
  onShowOnlineOnlyChange: vi.fn(),
  showOfflineOnly: false,
  onShowOfflineOnlyChange: vi.fn(),
  showCommunityOnly: false,
  onShowCommunityOnlyChange: vi.fn(),
  showFavoritesOnly: false,
  onShowFavoritesOnlyChange: vi.fn(),
  showTwitchOnly: false,
  onShowTwitchOnlyChange: vi.fn(),
  showYouTubeOnly: false,
  onShowYouTubeOnlyChange: vi.fn(),
  onClearFilters: vi.fn(),
};

describe('Filters', () => {
  it('should render search input', () => {
    render(<Filters {...mockProps} />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should render all filter checkboxes', () => {
    render(<Filters {...mockProps} />);
    
    expect(screen.getByLabelText(/online/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/offline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/community/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/favorites/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/twitch/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/youtube/i)).toBeInTheDocument();
  });

  it('should render clear filters button', () => {
    render(<Filters {...mockProps} />);
    const clearButton = screen.getByText(/clear/i);
    expect(clearButton).toBeInTheDocument();
  });

  it('should call onSearchChange when typing in search input', async () => {
    const user = userEvent.setup();
    render(<Filters {...mockProps} />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    
    await user.type(searchInput, 'test');
    expect(mockProps.onSearchChange).toHaveBeenCalled();
  });

  it('should call onClearFilters when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<Filters {...mockProps} />);
    const clearButton = screen.getByText(/clear/i);
    
    await user.click(clearButton);
    expect(mockProps.onClearFilters).toHaveBeenCalled();
  });
});
