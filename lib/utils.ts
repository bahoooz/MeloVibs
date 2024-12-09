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
        await addVote(trackId);
        await update();
        toast({
          title: "Vote ajouté",
          description: "Votre vote a été ajouté avec succès",
        });
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
