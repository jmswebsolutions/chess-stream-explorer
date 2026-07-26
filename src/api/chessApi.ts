import axios from 'axios';

const API_BASE_URL = 'https://api.chess.com/pub';

export interface Streamer {
  username: string;
  avatar: string;
  status: 'live' | 'offline';
  is_community_streamer: boolean;
  url: string;
  twitch?: {
    login: string;
  };
  youtube?: {
    channel: string;
  };
}

export interface PlayerProfile {
  username: string;
  player_id: number;
  status: string;
  name: string;
  avatar: string;
  country: string;
  location?: string;
  joined: number;
  last_online: number;
  followers: number;
  following: number;
  league?: string;
  fide_rating?: number;
}

export interface PlayerStats {
  chess_daily?: {
    last: {
      rating: number;
      date: number;
      rd: number;
    };
    best: {
      rating: number;
      date: number;
      game: string;
    };
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };
  chess_rapid?: {
    last: {
      rating: number;
      date: number;
      rd: number;
    };
    best: {
      rating: number;
      date: number;
      game: string;
    };
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };
  chess_blitz?: {
    last: {
      rating: number;
      date: number;
      rd: number;
    };
    best: {
      rating: number;
      date: number;
      game: string;
    };
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };
  tactics?: {
    highest: {
      rating: number;
      date: number;
    };
  };
}

interface StreamersResponse {
  streamers: Streamer[];
}

export const chessApi = {
  async getStreamers(): Promise<Streamer[]> {
    try {
      const response = await axios.get<StreamersResponse>(
        `${API_BASE_URL}/streamers`
      );
      return response.data.streamers;
    } catch (error) {
      console.error('Error fetching streamers:', error);
      throw error;
    }
  },

  async getPlayerProfile(username: string): Promise<PlayerProfile> {
    try {
      const response = await axios.get<PlayerProfile>(
        `${API_BASE_URL}/player/${username}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching player profile:', error);
      throw error;
    }
  },

  async getPlayerStats(username: string): Promise<PlayerStats> {
    try {
      const response = await axios.get<PlayerStats>(
        `${API_BASE_URL}/player/${username}/stats`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching player stats:', error);
      throw error;
    }
  },
};
