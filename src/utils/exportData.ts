import { Streamer } from '../api/chessApi';

export const exportToCSV = (streamers: Streamer[]) => {
  if (streamers.length === 0) return;

  const headers = ['Username', 'Status', 'Twitch', 'YouTube', 'Community', 'Avatar'];
  
  const rows = streamers.map(streamer => [
    streamer.username,
    streamer.status,
    streamer.twitch ? 'Yes' : 'No',
    streamer.youtube ? 'Yes' : 'No',
    streamer.is_community_streamer ? 'Yes' : 'No',
    streamer.avatar || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `streamers-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToJSON = (streamers: Streamer[]) => {
  if (streamers.length === 0) return;

  const data = streamers.map(streamer => ({
    username: streamer.username,
    status: streamer.status,
    twitch: streamer.twitch,
    youtube: streamer.youtube,
    is_community_streamer: streamer.is_community_streamer,
    avatar: streamer.avatar,
  }));

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `streamers-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
