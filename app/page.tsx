"use client";

import GlobalStats from "@/components/HomePage/GlobalStats";
import GreenEffectGlobalStats from "@/components/HomePage/GreenEffectGlobalStats";
import GreenEffectHeader from "@/components/HomePage/GreenEffectHeader";
import Header from "@/components/HomePage/Header";
import ListMostPopularTracksOfMonth from "@/components/HomePage/ListMostPopularTracksOfMonth";
import MusicMostPopularByGenre from "@/components/HomePage/MusicMostPopularByGenre";
import StatsAboutYou from "@/components/HomePage/StatsAboutYou";
import { useEffect } from "react";

export default function Home() {

  // useEffect(() => {
  //   const updateTracks = async () => {
  //     try {
  //       const response = await fetch("/api/spotify/popular-tracks");
  //       const data = await response.json();
  //       console.log('Données des pistes Spotify:', data);

  //       if (!response.ok) {
  //         throw new Error("Échec de la mise à jour des pistes");
  //       }
  //       console.log("Pistes mises à jour avec succès");
  //     } catch (error) {
  //       console.error("Erreur lors de la mise à jour des pistes:", error);
  //     }
  //   };

  //   updateTracks();
  // }, []);


  return (
    <div className="overflow-x-hidden px-8 relative">
      <Header />
      <ListMostPopularTracksOfMonth />
      <StatsAboutYou />
      <MusicMostPopularByGenre />
      <GlobalStats />
      <GreenEffectHeader />
      <GreenEffectGlobalStats />
    </div>
  );
}
