import axios from 'axios';
import { Streamer, StreamersResponse } from '../types/streamer';

const API_BASE_URL = 'https://api.chess.com/pub';

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
