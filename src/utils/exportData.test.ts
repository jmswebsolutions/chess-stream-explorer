import { describe, it, expect, vi } from 'vitest';
import { exportToCSV, exportToJSON, exportToExcel, exportToPDF } from './exportData';

describe('exportData', () => {
  describe('exportToCSV', () => {
    it('should not export empty array', () => {
      const createElementSpy = vi.spyOn(document, 'createElement');
      exportToCSV([]);
      expect(createElementSpy).not.toHaveBeenCalled();
      createElementSpy.mockRestore();
    });

    it('should handle errors gracefully', () => {
      const streamers = [
        {
          username: 'testuser',
          status: 'live' as const,
          twitch: { login: 'testchannel' },
          youtube: undefined,
          is_community_streamer: false,
          avatar: 'avatar.png',
          url: 'https://example.com',
        },
      ];

      const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation(() => {
        throw new Error('DOM error');
      });

      expect(() => exportToCSV(streamers)).not.toThrow();

      createElementSpy.mockRestore();
    });
  });

  describe('exportToJSON', () => {
    it('should not export empty array', () => {
      const createElementSpy = vi.spyOn(document, 'createElement');
      exportToJSON([]);
      expect(createElementSpy).not.toHaveBeenCalled();
      createElementSpy.mockRestore();
    });

    it('should handle errors gracefully', () => {
      const streamers = [
        {
          username: 'testuser',
          status: 'live' as const,
          twitch: { login: 'testchannel' },
          youtube: undefined,
          is_community_streamer: false,
          avatar: 'avatar.png',
          url: 'https://example.com',
        },
      ];

      const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation(() => {
        throw new Error('DOM error');
      });

      expect(() => exportToJSON(streamers)).not.toThrow();

      createElementSpy.mockRestore();
    });
  });

  describe('exportToExcel', () => {
    it('should not export empty array', () => {
      expect(() => exportToExcel([])).not.toThrow();
    });

    it('should handle errors gracefully', () => {
      const streamers = [
        {
          username: 'testuser',
          status: 'live' as const,
          twitch: { login: 'testchannel' },
          youtube: undefined,
          is_community_streamer: false,
          avatar: 'avatar.png',
          url: 'https://example.com',
        },
      ];

      expect(() => exportToExcel(streamers)).not.toThrow();
    });
  });

  describe('exportToPDF', () => {
    it('should not export empty array', () => {
      expect(() => exportToPDF([])).not.toThrow();
    });

    it('should handle errors gracefully', () => {
      const streamers = [
        {
          username: 'testuser',
          status: 'live' as const,
          twitch: { login: 'testchannel' },
          youtube: undefined,
          is_community_streamer: false,
          avatar: 'avatar.png',
          url: 'https://example.com',
        },
      ];

      expect(() => exportToPDF(streamers)).not.toThrow();
    });
  });
});
