import { create } from 'zustand';

const TAGS_KEY = 'chess-stream-explorer-tags';
const STREAMER_TAGS_KEY = 'chess-stream-explorer-streamer-tags';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagsState {
  tags: Tag[];
  streamerTags: Record<string, string[]>; // username -> tag IDs
  addTag: (name: string, color: string) => void;
  removeTag: (tagId: string) => void;
  addTagToStreamer: (username: string, tagId: string) => void;
  removeTagFromStreamer: (username: string, tagId: string) => void;
  getStreamerTags: (username: string) => Tag[];
  getTagById: (tagId: string) => Tag | undefined;
  importTags: (importedTags: Tag[]) => void;
  clearTags: () => void;
}

export const useTagsStore = create<TagsState>((set, get) => ({
  tags: [],
  streamerTags: {},
  
  addTag: (name, color) => {
    set((state) => {
      const newTag: Tag = {
        id: Date.now().toString(),
        name,
        color,
      };
      const newTags = [...state.tags, newTag];
      localStorage.setItem(TAGS_KEY, JSON.stringify(newTags));
      return { tags: newTags };
    });
  },
  
  removeTag: (tagId) => {
    set((state) => {
      const newTags = state.tags.filter((t) => t.id !== tagId);
      localStorage.setItem(TAGS_KEY, JSON.stringify(newTags));
      
      // Remove tag from all streamers
      const newStreamerTags = { ...state.streamerTags };
      Object.keys(newStreamerTags).forEach((username) => {
        newStreamerTags[username] = newStreamerTags[username].filter((id) => id !== tagId);
      });
      localStorage.setItem(STREAMER_TAGS_KEY, JSON.stringify(newStreamerTags));
      
      return { tags: newTags, streamerTags: newStreamerTags };
    });
  },
  
  addTagToStreamer: (username, tagId) => {
    set((state) => {
      const currentTags = state.streamerTags[username] || [];
      if (currentTags.includes(tagId)) {
        return state;
      }
      const newStreamerTags = {
        ...state.streamerTags,
        [username]: [...currentTags, tagId],
      };
      localStorage.setItem(STREAMER_TAGS_KEY, JSON.stringify(newStreamerTags));
      return { streamerTags: newStreamerTags };
    });
  },
  
  removeTagFromStreamer: (username, tagId) => {
    set((state) => {
      const currentTags = state.streamerTags[username] || [];
      const newStreamerTags = {
        ...state.streamerTags,
        [username]: currentTags.filter((id) => id !== tagId),
      };
      localStorage.setItem(STREAMER_TAGS_KEY, JSON.stringify(newStreamerTags));
      return { streamerTags: newStreamerTags };
    });
  },
  
  getStreamerTags: (username) => {
    const state = get();
    const tagIds = state.streamerTags[username] || [];
    return tagIds.map((id) => state.tags.find((t) => t.id === id)).filter(Boolean) as Tag[];
  },
  
  getTagById: (tagId) => {
    return get().tags.find((t) => t.id === tagId);
  },

  importTags: (importedTags) => {
    set((state) => {
      // Merge imported tags with existing tags (avoid duplicates by name)
      const existingNames = new Set(state.tags.map((t) => t.name));
      const newTags = importedTags.filter((t) => !existingNames.has(t.name));
      const mergedTags = [...state.tags, ...newTags];
      localStorage.setItem(TAGS_KEY, JSON.stringify(mergedTags));
      return { tags: mergedTags };
    });
  },

  clearTags: () => {
    set(() => {
      localStorage.setItem(TAGS_KEY, JSON.stringify([]));
      localStorage.setItem(STREAMER_TAGS_KEY, JSON.stringify({}));
      return { tags: [], streamerTags: {} };
    });
  },
}));

// Load tags on initialization
const savedTags = localStorage.getItem(TAGS_KEY);
if (savedTags) {
  try {
    useTagsStore.setState({ tags: JSON.parse(savedTags) });
  } catch (e) {
    console.error('Failed to load tags', e);
  }
}

// Load streamer tags on initialization
const savedStreamerTags = localStorage.getItem(STREAMER_TAGS_KEY);
if (savedStreamerTags) {
  try {
    useTagsStore.setState({ streamerTags: JSON.parse(savedStreamerTags) });
  } catch (e) {
    console.error('Failed to load streamer tags', e);
  }
}
