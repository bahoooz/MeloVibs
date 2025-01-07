"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import React, { useEffect, useCallback } from 'react'

function VotesRefreshHandler() {
  const { data: session, update } = useSession();

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

  useEffect(() => {
    if (session?.user?.lastVoteRefresh) {
      const checkAndRefreshVotes = () => {
        const now = new Date().getTime();
        const lastRefresh = new Date(session.user.lastVoteRefresh).getTime();
        const nextRefresh = lastRefresh + 3 * 60 * 60 * 1000;
        
        if (now >= nextRefresh) {
          refreshVotes();
        }
      };
      
      // Vérification initiale
      checkAndRefreshVotes();
      
      // Vérification toutes les secondes
      const timer = setInterval(checkAndRefreshVotes, 1000);
      
      return () => clearInterval(timer);
    }
  }, [session?.user?.lastVoteRefresh, refreshVotes]);

  return null;
}

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <VotesRefreshHandler />
      {children}
    </NextAuthSessionProvider>
  )
}
