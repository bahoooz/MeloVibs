"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface VotesTimerProps {
  lastVoteRefresh: Date;
}

export default function VotesTimer({ lastVoteRefresh }: VotesTimerProps) {
  const { update } = useSession();
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  const refreshVotes = async () => {
    try {
      const response = await fetch("/api/user/refresh-votes", {
        method: "POST",
      });

      if (response.ok) {
        // Rafraîchir la session pour mettre à jour l'interface
        await update();
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des votes:", error);
    }
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const lastRefresh = new Date(lastVoteRefresh).getTime();
      const nextRefresh = lastRefresh + 3 * 60 * 60 * 1000;
      const remaining = nextRefresh - now;

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    const timer = setInterval(async () => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (
        remaining.hours <= 0 &&
        remaining.minutes <= 0 &&
        remaining.seconds <= 0
      ) {
        await refreshVotes();
      }
    }, 1000);

    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(timer);
  }, [lastVoteRefresh, update]);

  return (
    <h3 className={`text-blueColorTertiary font-semibold`}>
      {String(timeRemaining.hours).padStart(2, "0")}:
      {String(timeRemaining.minutes).padStart(2, "0")}:
      {String(timeRemaining.seconds).padStart(2, "0")}
    </h3>
  );
}
