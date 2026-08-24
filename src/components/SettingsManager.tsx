import React, { useRef, useState } from 'react';
import { FaDownload, FaUpload, FaCog } from 'react-icons/fa';
import { exportSettings, importSettings } from '../utils/settingsManager';

export const SettingsManager: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    exportSettings();
    setIsOpen(false);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importSettings(file);
      alert('Settings imported successfully! Please refresh the page to apply all changes.');
      window.location.reload();
    } catch (error) {
      alert('Failed to import settings. Please check the file format.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
        aria-label="Settings"
      >
        <FaCog />
        <span className="hidden sm:inline">Settings</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl z-50">
            <div className="p-2">
              <button
                onClick={handleExport}
                className="w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white rounded"
              >
                <FaDownload className="text-green-400" />
                <span>Export Settings</span>
              </button>
              <button
                onClick={handleImport}
                className="w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white rounded"
              >
                <FaUpload className="text-blue-400" />
                <span>Import Settings</span>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </>
      )}
    </div>
  );
};
