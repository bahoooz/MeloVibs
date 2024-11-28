import { create } from 'zustand';

interface TrackStore {
  votedTracks: Set<string>;
  addVote: (trackId: string) => Promise<void>;
  removeVote: (trackId: string) => Promise<void>;
  isVoted: (trackId: string) => boolean;
}

export const useTrackStore = create<TrackStore>((set, get) => ({
  votedTracks: new Set(),

  addVote: async (trackId: string) => {
    try {
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Erreur lors du vote');
      
      const data = await response.json();
      set({ votedTracks: new Set(data.votedTracks) });
    } catch (error) {
      console.error('Erreur lors du vote:', error);
    }
  },

  removeVote: async (trackId: string) => {
    try {
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erreur lors de la suppression du vote');
      
      const data = await response.json();
      set({ votedTracks: new Set(data.votedTracks) });
    } catch (error) {
      console.error('Erreur lors de la suppression du vote:', error);
    }
  },

  isVoted: (trackId: string) => {
    return get().votedTracks.has(trackId);
  },
})); 