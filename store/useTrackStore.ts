// Import du type Track et de la fonction create de Zustand pour la gestion d'état
import { Track } from '@/types/track';
import { launchConfetti } from '@/lib/confetti';
import { create } from 'zustand';
import { toast } from '@/hooks/use-toast';
import { playSound } from '@/lib/playSound';

// Interface définissant la structure du store
interface TrackStore {
  // Set contenant les IDs des pistes pour lesquelles l'utilisateur a voté
  votedTracks: Set<string>;
  // Tableau contenant toutes les pistes
  tracks: Track[];
  // Tableau contenant les pistes spécifiques au mois en cours
  tracksOfMonth: Track[];
  // Genre actuel
  currentGenre: string;
  
  // Méthodes pour mettre à jour l'état
  setTracks: (tracks: Track[]) => void;
  setTracksOfMonth: (tracks: Track[]) => void;
  addVote: (trackId: string, updateSession?: () => Promise<void>) => Promise<void>;
  removeVote: (trackId: string, updateSession?: () => Promise<void>) => Promise<void>;
  isVoted: (trackId: string) => boolean;
  setCurrentGenre: (genre: string) => void;
}

// Création du store avec Zustand
export const useTrackStore = create<TrackStore>((set, get) => ({
  // État initial
  votedTracks: new Set(),
  tracks: [],
  tracksOfMonth: [],
  currentGenre: '',
  
  // Méthodes simples pour mettre à jour les listes de pistes
  setTracks: (tracks) => set({ tracks }),
  setTracksOfMonth: (tracks) => set({ tracksOfMonth: tracks }),

  // Méthode pour ajouter un vote
  addVote: async (trackId: string, updateSession?: () => Promise<void>) => {
    try {
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors du vote');
      }
      
      const data = await response.json();
      
      // Mettre à jour le Set des votes
      set({ votedTracks: new Set(data.votedTracks) });
      
      // Mettre à jour le nombre de votes dans les deux listes de tracks
      set(state => ({
        tracks: state.tracks.map(track => 
          track._id === trackId 
            ? { ...track, votes: track.votes + 1 }
            : track
        ),
        tracksOfMonth: state.tracksOfMonth.map(track => 
          track._id === trackId 
            ? { ...track, votes: track.votes + 1 }
            : track
        )
      }));

      toast({
        title: "Vote ajouté",
        description: "Votre vote a été ajouté avec succès",
        emojis: "🎵",
      });
      launchConfetti();
      playSound("/Sounds/upvote-sound.mp3");

      // Mettre à jour la session si la fonction est fournie
      if (updateSession) {
        await updateSession();
      }

    } catch (error) {
      throw error;
    }
  },

  // Méthode pour supprimer un vote
  removeVote: async (trackId: string, updateSession?: () => Promise<void>) => {
    try {
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erreur lors de la suppression du vote');
      
      const data = await response.json();
      
      // Mettre à jour le Set des votes
      set({ votedTracks: new Set(data.votedTracks) });
      
      // Mettre à jour le nombre de votes dans les deux listes de tracks
      set(state => ({
        tracks: state.tracks.map(track => 
          track._id === trackId 
            ? { ...track, votes: track.votes - 1 }
            : track
        ),
        tracksOfMonth: state.tracksOfMonth.map(track => 
          track._id === trackId 
            ? { ...track, votes: track.votes - 1 }
            : track
        )
      }));

      toast({
        title: "Vote retiré",
        description: "Votre vote a été retiré avec succès",
        emojis: "✖️",
      });
      playSound("/Sounds/downvote-sound.wav");
      
      // Mettre à jour la session si la fonction est fournie
      if (updateSession) {
        await updateSession();
      }
      
    } catch (error) {
      console.error('Erreur lors de la suppression du vote:', error);
    }
  },

  // Méthode pour vérifier si une piste a été votée
  isVoted: (trackId: string) => {
    return get().votedTracks.has(trackId);
  },

  // Méthode pour mettre à jour le genre actuel
  setCurrentGenre: (genre) => set({ currentGenre: genre }),
})); 