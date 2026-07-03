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

export interface StreamersResponse {
  streamers: Streamer[];
}
