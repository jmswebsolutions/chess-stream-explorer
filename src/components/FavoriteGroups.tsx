import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaPlus, FaTimes } from 'react-icons/fa';
import { useFavoritesStore } from '../store/favoritesStore';

export const FavoriteGroups: React.FC = () => {
  const { favoriteGroups, activeGroup, setActiveGroup, addGroup, removeGroup } = useFavoritesStore();
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#3b82f6');

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      addGroup(newGroupName.trim(), newGroupColor);
      setNewGroupName('');
      setNewGroupColor('#3b82f6');
      setShowAddGroup(false);
    }
  };

  const handleRemoveGroup = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (groupId !== 'default' && confirm('Remove this group?')) {
      removeGroup(groupId);
      if (activeGroup === groupId) {
        setActiveGroup(null);
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mb-4" role="region" aria-label="Favorite groups">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaFolder className="text-blue-400" aria-hidden="true" />
          <h3 className="text-white font-semibold">Favorite Groups</h3>
        </div>
        <button
          onClick={() => setShowAddGroup(!showAddGroup)}
          className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          aria-label="Add new group"
          aria-expanded={showAddGroup}
        >
          <FaPlus aria-hidden="true" />
        </button>
      </div>

      {showAddGroup && (
        <div className="mb-3 p-3 bg-gray-700 rounded-lg" role="form" aria-label="Create new group">
          <input
            type="text"
            placeholder="Group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full px-3 py-2 mb-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Group name"
          />
          <div className="flex gap-2">
            <input
              type="color"
              value={newGroupColor}
              onChange={(e) => setNewGroupColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
              aria-label="Group color"
            />
            <button
              onClick={handleAddGroup}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              aria-label="Create group"
            >
              Add Group
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2" role="group" aria-label="Group selection">
        <button
          onClick={() => setActiveGroup(null)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            activeGroup === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          aria-pressed={activeGroup === null}
          aria-label="Show all favorites"
        >
          <FaFolderOpen aria-hidden="true" />
          <span>All</span>
        </button>
        {favoriteGroups.map((group: any) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              activeGroup === group.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            style={
              activeGroup !== group.id
                ? { borderLeft: `3px solid ${group.color}` }
                : {}
            }
            aria-pressed={activeGroup === group.id}
            aria-label={`Show ${group.name} group`}
          >
            <FaFolder style={{ color: group.color }} aria-hidden="true" />
            <span>{group.name}</span>
            {group.id !== 'default' && (
              <button
                onClick={(e) => handleRemoveGroup(group.id, e)}
                className="ml-1 p-1 hover:bg-gray-600 rounded transition-colors"
                aria-label={`Remove ${group.name} group`}
              >
                <FaTimes size={12} aria-hidden="true" />
              </button>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
