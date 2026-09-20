import React from 'react';

interface SkeletonProps {
  compact?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ compact = false, className = '' }) => {
  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-lg animate-fade-in ${
        compact ? 'p-2' : 'p-4'
      } ${className}`}
      role="status"
      aria-label="Loading content"
      aria-busy="true"
    >
      <div className={`flex items-center ${compact ? 'space-x-2' : 'space-x-4'}`}>
        <div className={`${compact ? 'w-10 h-10' : 'w-16 h-16'} bg-gray-700 rounded-full animate-pulse`}></div>
        <div className="flex-1 space-y-2">
          <div className={`${compact ? 'h-3' : 'h-4'} bg-gray-700 rounded w-3/4 animate-pulse`}></div>
          <div className={`${compact ? 'h-2' : 'h-3'} bg-gray-700 rounded w-1/2 animate-pulse`}></div>
        </div>
      </div>
      <div className={`${compact ? 'mt-2' : 'mt-4'} space-y-2`}>
        <div className={`${compact ? 'h-2' : 'h-3'} bg-gray-700 rounded w-full animate-pulse`}></div>
        <div className={`${compact ? 'h-2' : 'h-3'} bg-gray-700 rounded w-2/3 animate-pulse`}></div>
      </div>
    </div>
  );
};
