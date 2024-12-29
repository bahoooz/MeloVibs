import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ToastActionElement } from "@/components/ui/toast"
import { UserTypes } from "@/models/user";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
  emojis?: string;
}

interface VoteError extends Error {
  message: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createHandleVote = (
  toast: (props: ToastProps) => void,
  isVoted: (trackId: string) => boolean,
  addVote: (trackId: string) => Promise<void>,
  removeVote: (trackId: string) => Promise<void>,
) => {
  return async (trackId: string) => {
    try {
      if (isVoted(trackId)) {
        await removeVote(trackId);
      } else {
        try {
          await addVote(trackId);
        } catch (error: unknown) {
          const voteError = error as VoteError;
          toast({
            title: "Plus de votes",
            description: voteError.message || "Une erreur est survenue lors du vote",
            emojis: "⏳",
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors du vote:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du vote",
        emojis: "❌",
      });
    }
  };
};

export async function refreshVotes(user: UserTypes) {
  if (user.isAdmin) {
    return user;
  }

  const REFRESH_INTERVAL = 3 * 60 * 60 * 1000; // 3 heures
  const VOTES_PER_REFRESH = 2;
  const MAX_VOTES = 10;

  const now = new Date();
  const timeSinceLastRefresh = now.getTime() - user.lastVoteRefresh.getTime();
  if (timeSinceLastRefresh >= REFRESH_INTERVAL) {
    // Calculer le nombre de votes à ajouter
    const refreshCount = Math.floor(timeSinceLastRefresh / REFRESH_INTERVAL);
    const votesToAdd = Math.min(
      refreshCount * VOTES_PER_REFRESH,  // Nombre total de votes à ajouter
      MAX_VOTES - user.remainingVotes    // Nombre de votes possibles avant d'atteindre MAX_VOTES
    );
    
    user.remainingVotes = Math.min(user.remainingVotes + votesToAdd, MAX_VOTES);
    user.lastVoteRefresh = now;
    await user.save()
  }
  return user;
}
