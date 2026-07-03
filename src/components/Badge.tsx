import React from 'react';

interface BadgeProps {
  type: 'live' | 'offline';
}

export const Badge: React.FC<BadgeProps> = ({ type }) => {
  const bgColor = type === 'live' ? 'bg-green-500' : 'bg-red-500';
  const text = type === 'live' ? 'Live' : 'Offline';

  return (
    <span
      className={`${bgColor} text-white text-xs font-semibold px-2 py-1 rounded-full`}
    >
      {text}
    </span>
  );
};
