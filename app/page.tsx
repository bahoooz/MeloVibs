"use client"

import Header from "@/components/HomePage/Header";
import ListMostPopularTracksOfMonth from "@/components/HomePage/ListMostPopularTracksOfMonth";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const updateTracks = async () => {
      try {
        const response = await fetch("/api/spotify/popular-tracks");
        if (!response.ok) {
          throw new Error("Échec de la mise à jour des pistes");
        }
        console.log("Pistes mises à jour avec succès");
      } catch (error) {
        console.error("Erreur lors de la mise à jour des pistes:", error);
      }
    };
    
    updateTracks();
  }, []);

  return (
    <div className="h-[200vh]">
      <Header />
      <ListMostPopularTracksOfMonth />
    </div>
  );
}
