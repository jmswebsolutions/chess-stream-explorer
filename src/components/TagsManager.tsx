import React, { useState } from 'react';
import { FaTag, FaPlus, FaTrash } from 'react-icons/fa';
import { useTagsStore } from '../store/tagsStore';

const TAG_COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Gray', value: '#6b7280' },
];

export const TagsManager: React.FC = () => {
  const { tags, addTag, removeTag } = useTagsStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(TAG_COLORS[4].value);

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag(newTagName.trim(), selectedColor);
      setNewTagName('');
      setSelectedColor(TAG_COLORS[4].value);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    if (confirm('Remove this tag? It will be removed from all streamers.')) {
      removeTag(tagId);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
        aria-label="Tags"
      >
        <FaTag />
        <span className="hidden sm:inline">Tags</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl z-50 p-4">
            <h3 className="text-white font-semibold mb-3">Manage Tags</h3>
            
            {/* Add new tag */}
            <div className="mb-4 p-3 bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="w-full bg-gray-600 text-white text-sm rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleAddTag();
                }}
              />
              <div className="flex gap-2 mb-2">
                {TAG_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-white scale-110'
                        : 'border-transparent hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <button
                onClick={handleAddTag}
                disabled={!newTagName.trim()}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm px-3 py-2 rounded transition-colors"
              >
                <FaPlus />
                Add Tag
              </button>
            </div>

            {/* Existing tags */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {tags.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No tags created yet</p>
              ) : (
                tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between p-2 bg-gray-700 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-white text-sm">{tag.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveTag(tag.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-1"
                      aria-label="Remove tag"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
