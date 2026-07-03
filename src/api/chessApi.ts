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
};
