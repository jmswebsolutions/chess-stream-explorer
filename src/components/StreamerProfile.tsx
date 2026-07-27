import { useState, useEffect } from 'react';
import { FaUser, FaFlag, FaCalendar, FaUsers, FaTrophy, FaChess, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { chessApi, PlayerProfile, PlayerStats } from '../api/chessApi';

interface StreamerProfileProps {
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export const StreamerProfile = ({ username, isOpen, onClose }: StreamerProfileProps) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !username) return;

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileData, statsData] = await Promise.all([
          chessApi.getPlayerProfile(username),
          chessApi.getPlayerStats(username),
        ]);
        setProfile(profileData);
        setStats(statsData);
      } catch (err) {
        setError(t('profile.error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [isOpen, username]);

  if (!isOpen) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getCountryFlag = (country: string) => {
    const code = country.split('/').pop() || '';
    return code.toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-2xl">{t('profile.title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">{t('profile.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : profile && stats ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="flex items-start space-x-4">
              <img
                src={profile.avatar}
                alt={profile.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-600"
              />
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl">{profile.username}</h3>
                {profile.name && (
                  <p className="text-gray-400">{profile.name}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-gray-300 text-sm">
                  <FaFlag />
                  <span>{getCountryFlag(profile.country)}</span>
                </div>
                {profile.location && (
                  <div className="flex items-center gap-2 mt-1 text-gray-300 text-sm">
                    <FaUser />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <FaUsers className="text-blue-400 text-2xl mx-auto mb-2" />
                <p className="text-white font-bold">{profile.followers.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">{t('profile.followers')}</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <FaUsers className="text-green-400 text-2xl mx-auto mb-2" />
                <p className="text-white font-bold">{profile.following.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">{t('profile.following')}</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <FaCalendar className="text-purple-400 text-2xl mx-auto mb-2" />
                <p className="text-white font-bold">{formatDate(profile.joined)}</p>
                <p className="text-gray-400 text-sm">{t('profile.joined')}</p>
              </div>
              {profile.fide_rating && (
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <FaTrophy className="text-yellow-400 text-2xl mx-auto mb-2" />
                  <p className="text-white font-bold">{profile.fide_rating}</p>
                  <p className="text-gray-400 text-sm">{t('profile.fideRating')}</p>
                </div>
              )}
            </div>

            {/* Game Stats */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg flex items-center gap-2">
                <FaChess />
                {t('profile.gameStatistics')}
              </h4>
              
              {stats.chess_blitz && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">{t('profile.blitz')}</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">{t('profile.currentRating')}</p>
                      <p className="text-white font-bold">{stats.chess_blitz.last.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{t('profile.bestRating')}</p>
                      <p className="text-white font-bold">{stats.chess_blitz.best.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{t('profile.record')}</p>
                      <p className="text-white font-bold">
                        {stats.chess_blitz.record.win}W / {stats.chess_blitz.record.loss}L / {stats.chess_blitz.record.draw}D
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {stats.chess_rapid && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">{t('profile.rapid')}</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">{t('profile.currentRating')}</p>
                      <p className="text-white font-bold">{stats.chess_rapid.last.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{t('profile.bestRating')}</p>
                      <p className="text-white font-bold">{stats.chess_rapid.best.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{t('profile.record')}</p>
                      <p className="text-white font-bold">
                        {stats.chess_rapid.record.win}W / {stats.chess_rapid.record.loss}L / {stats.chess_rapid.record.draw}D
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {stats.chess_daily && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">{t('profile.daily')}</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">{t('profile.currentRating')}</p>
                      <p className="text-white font-bold">{stats.chess_daily.last.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{t('profile.bestRating')}</p>
                      <p className="text-white font-bold">{stats.chess_daily.best.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{t('profile.record')}</p>
                      <p className="text-white font-bold">
                        {stats.chess_daily.record.win}W / {stats.chess_daily.record.loss}L / {stats.chess_daily.record.draw}D
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {stats.tactics && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">{t('profile.tactics')}</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">{t('profile.highestRating')}</p>
                      <p className="text-white font-bold">{stats.tactics.highest.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">{t('profile.achieved')}</p>
                      <p className="text-white font-bold">{formatDate(stats.tactics.highest.date)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* League */}
            {profile.league && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="text-white font-semibold mb-2">{t('profile.league')}</h5>
                <p className="text-gray-300">{profile.league}</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
