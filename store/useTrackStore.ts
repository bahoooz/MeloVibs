// Import du type Track et de la fonction create de Zustand pour la gestion d'état
import { Track } from '@/components/HomePage/MostPopularTracks';
import { create } from 'zustand';

// Interface définissant la structure du store
interface TrackStore {
  // Set contenant les IDs des pistes pour lesquelles l'utilisateur a voté
  votedTracks: Set<string>;
  // Tableau contenant toutes les pistes
  tracks: Track[];
  // Tableau contenant les pistes spécifiques au mois en cours
  tracksOfMonth: Track[];
  
  // Méthodes pour mettre à jour l'état
  setTracks: (tracks: Track[]) => void;
  setTracksOfMonth: (tracks: Track[]) => void;
  addVote: (trackId: string) => Promise<void>;
  removeVote: (trackId: string) => Promise<void>;
  isVoted: (trackId: string) => boolean;
}

// Création du store avec Zustand
export const useTrackStore = create<TrackStore>((set, get) => ({
  // État initial
  votedTracks: new Set(),
  tracks: [],
  tracksOfMonth: [],
  
  // Méthodes simples pour mettre à jour les listes de pistes
  setTracks: (tracks) => set({ tracks }),
  setTracksOfMonth: (tracks) => set({ tracksOfMonth: tracks }),

  // Méthode pour ajouter un vote
  addVote: async (trackId: string) => {
    try {
      // Envoi de la requête POST pour voter
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'POST',
      });
      
      // Vérification de la réponse
      if (!response.ok) throw new Error('Erreur lors du vote');
      
      // Mise à jour du Set des votes
      const data = await response.json();
      set({ votedTracks: new Set(data.votedTracks) });
      
      // Récupération des données mises à jour
      const tracksRes = await fetch("/api/tracks");
      const tracksOfMonthRes = await fetch("/api/tracks/tracks-of-month");
      
      // Attente parallèle des deux réponses
      const [tracksData, tracksOfMonthData] = await Promise.all([
        tracksRes.json(),
        tracksOfMonthRes.json()
      ]);
      
      // Mise à jour des deux listes de pistes
      set({ 
        tracks: tracksData.tracks,
        tracksOfMonth: tracksOfMonthData.tracks
      });
    } catch (error) {
      console.error('Erreur lors du vote:', error);
    }
  },

  // Méthode pour supprimer un vote (similaire à addVote)
  removeVote: async (trackId: string) => {
    try {
      // Envoi de la requête DELETE pour retirer le vote
      const response = await fetch(`/api/tracks/vote/${trackId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erreur lors de la suppression du vote');
      
      // Mise à jour du Set des votes
      const data = await response.json();
      set({ votedTracks: new Set(data.votedTracks) });
      
      // Récupération des données mises à jour
      const tracksRes = await fetch("/api/tracks");
      const tracksOfMonthRes = await fetch("/api/tracks/tracks-of-month");
      
      // Attente parallèle des deux réponses
      const [tracksData, tracksOfMonthData] = await Promise.all([
        tracksRes.json(),
        tracksOfMonthRes.json()
      ]);
      
      // Mise à jour des deux listes de pistes
      set({ 
        tracks: tracksData.tracks,
        tracksOfMonth: tracksOfMonthData.tracks
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du vote:', error);
    }
  },

  // Méthode pour vérifier si une piste a été votée
  isVoted: (trackId: string) => {
    return get().votedTracks.has(trackId);
  },
})); 