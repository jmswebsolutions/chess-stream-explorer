import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Streamer } from '../api/chessApi';

interface AnalyticsProps {
  streamers: Streamer[];
}

const COLORS = {
  twitch: '#9146FF',
  youtube: '#FF0000',
  chess: '#769656',
  live: '#10B981',
  offline: '#6B7280',
  community: '#3B82F6',
};

export const Analytics = ({ streamers }: AnalyticsProps) => {
  const analyticsData = useMemo(() => {
    const platformData = [
      { name: 'Twitch', value: streamers.filter(s => s.twitch).length, color: COLORS.twitch },
      { name: 'YouTube', value: streamers.filter(s => s.youtube).length, color: COLORS.youtube },
      { name: 'Chess.com Only', value: streamers.filter(s => !s.twitch && !s.youtube).length, color: COLORS.chess },
    ];

    const statusData = [
      { name: 'Live', value: streamers.filter(s => s.status === 'live').length, color: COLORS.live },
      { name: 'Offline', value: streamers.filter(s => s.status === 'offline').length, color: COLORS.offline },
    ];

    const communityData = [
      { name: 'Community', value: streamers.filter(s => s.is_community_streamer).length, color: COLORS.community },
      { name: 'Regular', value: streamers.filter(s => !s.is_community_streamer).length, color: COLORS.offline },
    ];

    const platformOverlap = [
      { name: 'Twitch Only', value: streamers.filter(s => s.twitch && !s.youtube).length },
      { name: 'YouTube Only', value: streamers.filter(s => s.youtube && !s.twitch).length },
      { name: 'Both Platforms', value: streamers.filter(s => s.twitch && s.youtube).length },
      { name: 'Chess.com Only', value: streamers.filter(s => !s.twitch && !s.youtube).length },
    ];

    return { platformData, statusData, communityData, platformOverlap };
  }, [streamers]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded border border-gray-700">
          <p className="text-white">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-white font-semibold text-xl">Analytics & Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Platform Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analyticsData.platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Live Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analyticsData.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Community vs Regular */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Streamer Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analyticsData.communityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.communityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Overlap */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Platform Overlap</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.platformOverlap}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-white">{streamers.length}</p>
          <p className="text-gray-400 text-sm">Total Streamers</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{analyticsData.statusData[0].value}</p>
          <p className="text-gray-400 text-sm">Currently Live</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-purple-400">{analyticsData.platformData[0].value}</p>
          <p className="text-gray-400 text-sm">On Twitch</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-red-400">{analyticsData.platformData[1].value}</p>
          <p className="text-gray-400 text-sm">On YouTube</p>
        </div>
      </div>
    </div>
  );
};
