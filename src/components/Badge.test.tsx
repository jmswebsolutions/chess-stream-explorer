import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render live badge with correct text', () => {
    render(<Badge type="live" />);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('should render offline badge with correct text', () => {
    render(<Badge type="offline" />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('should have correct class for live type', () => {
    const { container } = render(<Badge type="live" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-green-500');
  });

  it('should have correct class for offline type', () => {
    const { container } = render(<Badge type="offline" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('bg-red-500');
  });
});
