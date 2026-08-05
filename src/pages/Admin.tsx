import { useHome } from '../hooks/useHome';
import { Analytics } from '../components/Analytics';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export const Admin = () => {
  const { stats, streamers } = useHome();

  const platformStats = {
    twitch: streamers.filter(s => s.twitch).length,
    youtube: streamers.filter(s => s.youtube).length,
    both: streamers.filter(s => s.twitch && s.youtube).length,
  };

  const communityStats = {
    total: streamers.filter(s => s.is_community_streamer).length,
    percentage: streamers.length > 0 
      ? Math.round((streamers.filter(s => s.is_community_streamer).length / streamers.length) * 100)
      : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Overview of streamers and platform statistics</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
            aria-label="Back to Home"
          >
            <FaHome />
            <span className="hidden md:inline">Back to Home</span>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Streamers</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Online Now</div>
            <div className="text-3xl font-bold text-green-400">{stats.online}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Community</div>
            <div className="text-3xl font-bold text-purple-400">{communityStats.total}</div>
            <div className="text-gray-500 text-xs mt-1">{communityStats.percentage}% of total</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Favorites</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.favorites}</div>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Platform Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Twitch</span>
                  <span className="text-purple-400">{platformStats.twitch}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${(platformStats.twitch / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">YouTube</span>
                  <span className="text-red-400">{platformStats.youtube}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${(platformStats.youtube / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Both Platforms</span>
                  <span className="text-blue-400">{platformStats.both}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(platformStats.both / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Status Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Live</span>
                  <span className="text-green-400">{stats.online}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${(stats.online / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Offline</span>
                  <span className="text-gray-400">{stats.offline}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gray-500 h-2 rounded-full transition-all"
                    style={{ width: `${(stats.offline / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Analytics Component */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Detailed Analytics</h2>
          <Analytics streamers={streamers} />
        </div>
      </div>
    </div>
  );
};
