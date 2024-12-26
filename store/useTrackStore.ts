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
  addVote: (trackId: string) => Promise<void>;
  removeVote: (trackId: string) => Promise<void>;
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
  addVote: async (trackId: string) => {
    try {
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors du vote');
      }
      toast({
        title: "Vote ajouté",
        description: "Votre vote a été ajouté avec succès",
        emojis: "🎵",
      });
      launchConfetti();
      playSound("/Sounds/upvote-sound.mp3")

      const data = await response.json();
      set({ votedTracks: new Set(data.votedTracks) });

      // Récupération des tracks en fonction du contexte
      const promises = [
        fetch("/api/tracks/tracks-ranking-homepage"),
        fetch("/api/tracks/tracks-header-homepage")
      ];
      
      // Ajouter la requête pour get-all-tracks seulement si un genre est sélectionné
      if (get().currentGenre) {
        promises.push(fetch(`/api/tracks/get-all-tracks/${get().currentGenre}`));
      }
      
      const responses = await Promise.all(promises);
      const jsonPromises = responses.map(res => res.json());
      const [tracksOfMonthData, tracksHeaderData, tracksData] = await Promise.all(jsonPromises);

      // Mise à jour du state en fonction des données disponibles
      const newState: any = {
        tracksOfMonth: tracksOfMonthData.tracks,
        tracks: tracksHeaderData.tracks
      };
      
      if (tracksData) {
        newState.tracks = tracksData.tracks;
      }
      set(newState);
    } catch (error) {
      throw error;
    }
  },

  // Méthode pour supprimer un vote
  removeVote: async (trackId: string) => {
    try {
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erreur lors de la suppression du vote');
      toast({
          title: "Vote retiré",
          description: "Votre vote a été retiré avec succès",
          emojis: "✖️",
        });
      playSound("/Sounds/downvote-sound.wav")
      const data = await response.json();
      set({ votedTracks: new Set(data.votedTracks) });
      
      // Récupération des tracks en fonction du contexte
      const promises = [
        fetch("/api/tracks/tracks-ranking-homepage"),
        fetch("/api/tracks/tracks-header-homepage")
      ];
      
      // Ajouter la requête pour get-all-tracks seulement si un genre est sélectionné
      if (get().currentGenre) {
        promises.push(fetch(`/api/tracks/get-all-tracks/${get().currentGenre}`));
      }
      
      const responses = await Promise.all(promises);
      const jsonPromises = responses.map(res => res.json());
      const [tracksOfMonthData, tracksHeaderData, tracksData] = await Promise.all(jsonPromises);
      
      // Mise à jour du state en fonction des données disponibles
      const newState: any = {
        tracksOfMonth: tracksOfMonthData.tracks,
        tracks: tracksHeaderData.tracks
      };
      
      if (tracksData) {
        newState.tracks = tracksData.tracks;
      }
      
      set(newState);
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