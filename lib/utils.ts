import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Track } from "@/components/HomePage/MostPopularTracks";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createHandleVote = (
  isVoted: (trackId: string) => boolean,
  addVote: (trackId: string) => Promise<void>,
  removeVote: (trackId: string) => Promise<void>,
) => {
  const { toast } = useToast();
  const { update } = useSession();

  return async (trackId: string) => {
    try {
      if (isVoted(trackId)) {
        await removeVote(trackId);
        await update();
        toast({
          title: "Vote retiré",
          description: "Votre vote a été retiré avec succès",
        });
      } else {
        try {
          await addVote(trackId);
          await update();
          toast({
            title: "Vote ajouté",
            description: "Votre vote a été ajouté avec succès",
          });
        } catch (error: any) {
          toast({
            title: "Erreur",
            description: error.message || "Une erreur est survenue lors du vote",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors du vote:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du vote",
        variant: "destructive",
      });
    }
  };
};

export async function refreshVotes(user: any) {
  if (user.isAdmin) {
    return user;
  }

  const REFRESH_INTERVAL = 3 * 60 * 60 * 1000;
  const VOTES_PER_REFRESH = 2;
  const MAX_VOTES = 10;

  const now = new Date();
  const timeSinceLastRefresh = now.getTime() - user.lastVoteRefresh.getTime();
  if (timeSinceLastRefresh >= REFRESH_INTERVAL) {
    const refreshCount = Math.floor(timeSinceLastRefresh / REFRESH_INTERVAL);
    const newVotes = Math.min(user.remainingVotes + (refreshCount * VOTES_PER_REFRESH), MAX_VOTES);
    user.remainingVotes = newVotes;
    user.lastVoteRefresh = now;
    await user.save()
  }
  return user;
}
