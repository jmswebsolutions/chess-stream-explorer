import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = 'border-blue-500' 
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex justify-center items-center" role="status" aria-label="Loading">
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 ${color}`}
        aria-hidden="true"
      ></div>
    </div>
  );
};
