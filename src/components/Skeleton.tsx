import React from 'react';

export const Skeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg animate-fade-in">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-gray-700 rounded w-full animate-pulse"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
};
