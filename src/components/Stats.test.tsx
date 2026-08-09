import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stats } from './Stats';

describe('Stats', () => {
  it('should render all stats cards', () => {
    render(<Stats total={100} online={50} offline={50} favorites={10} />);
    
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  it('should display correct values', () => {
    render(<Stats total={100} online={50} offline={50} favorites={10} />);
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getAllByText('50')).toHaveLength(2);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should handle zero values', () => {
    render(<Stats total={0} online={0} offline={0} favorites={0} />);
    
    expect(screen.getAllByText('0')).toHaveLength(4);
  });
});
