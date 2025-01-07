import { useSession } from "next-auth/react";

import { useCallback } from "react";

// hooks/useVotesRefresh.ts
export function useVotesRefresh() {
    const { update } = useSession();
    
    const refreshVotes = useCallback(async () => {
      try {
        const response = await fetch("/api/user/refresh-votes", {
          method: "POST",
        });
  
        if (response.ok) {
          await update();
        }
      } catch (error) {
        console.error("Erreur lors du rafraîchissement des votes:", error);
      }
    }, [update]);
  
    return { refreshVotes };
  }