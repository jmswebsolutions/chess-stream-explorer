import React from 'react';
import { FaPalette } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

type ColorTheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

const colorOptions: { value: ColorTheme; label: string; color: string }[] = [
  { value: 'blue', label: 'Blue', color: '#3b82f6' },
  { value: 'purple', label: 'Purple', color: '#8b5cf6' },
  { value: 'green', label: 'Green', color: '#10b981' },
  { value: 'orange', label: 'Orange', color: '#f59e0b' },
  { value: 'pink', label: 'Pink', color: '#ec4899' },
];

export const ColorThemePicker: React.FC = () => {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
        aria-label="Change color theme"
      >
        <FaPalette />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3">
          <p className="text-gray-400 text-xs mb-2">Color Theme</p>
          <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setColorTheme(option.value)}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                  colorTheme === option.value ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''
                }`}
                style={{ backgroundColor: option.color }}
                aria-label={`Select ${option.label} theme`}
                title={option.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
