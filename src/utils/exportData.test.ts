import { describe, it, expect, vi } from 'vitest';
import { exportToCSV, exportToJSON } from './exportData';

describe('exportData', () => {
  describe('exportToCSV', () => {
    it('should not export empty array', () => {
      const createElementSpy = vi.spyOn(document, 'createElement');
      exportToCSV([]);
      expect(createElementSpy).not.toHaveBeenCalled();
      createElementSpy.mockRestore();
    });

    it('should create CSV content with correct headers', () => {
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

      const mockLink = {
        setAttribute: vi.fn(),
        click: vi.fn(),
        style: { visibility: '' },
      };

      const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockReturnValue(document.body);
      const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockReturnValue(document.body);
      const createObjectURSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('mock-url');
      const revokeObjectURSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

      exportToCSV(streamers);

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'mock-url');
      expect(mockLink.setAttribute).toHaveBeenCalledWith('download', expect.stringContaining('.csv'));
      expect(mockLink.click).toHaveBeenCalled();

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
      createObjectURSpy.mockRestore();
      revokeObjectURSpy.mockRestore();
    });
  });

  describe('exportToJSON', () => {
    it('should not export empty array', () => {
      const createElementSpy = vi.spyOn(document, 'createElement');
      exportToJSON([]);
      expect(createElementSpy).not.toHaveBeenCalled();
      createElementSpy.mockRestore();
    });

    it('should create JSON content', () => {
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

      const mockLink = {
        setAttribute: vi.fn(),
        click: vi.fn(),
        style: { visibility: '' },
      };

      const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockReturnValue(document.body);
      const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockReturnValue(document.body);
      const createObjectURSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('mock-url');
      const revokeObjectURSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

      exportToJSON(streamers);

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'mock-url');
      expect(mockLink.setAttribute).toHaveBeenCalledWith('download', expect.stringContaining('.json'));
      expect(mockLink.click).toHaveBeenCalled();

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
      createObjectURSpy.mockRestore();
      revokeObjectURSpy.mockRestore();
    });
  });
});
