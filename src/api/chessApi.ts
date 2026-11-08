import axios from 'axios';

const API_BASE_URL = 'https://api.chess.com/pub';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Response Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request made but no response
      console.error('API No Response:', error.config?.url);
    } else {
      // Error in request setup
      console.error('API Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

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
      const response = await apiClient.get<StreamersResponse>(
        '/streamers'
      );
      return response.data.streamers;
    } catch (error) {
      console.error('Error fetching streamers:', error);
      throw error;
    }
  },

  async getPlayerProfile(username: string): Promise<PlayerProfile> {
    try {
      const response = await apiClient.get<PlayerProfile>(
        `/player/${username}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching player profile:', error);
      throw error;
    }
  },

  async getPlayerStats(username: string): Promise<PlayerStats> {
    try {
      const response = await apiClient.get<PlayerStats>(
        `/player/${username}/stats`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching player stats:', error);
      throw error;
    }
  },
};
