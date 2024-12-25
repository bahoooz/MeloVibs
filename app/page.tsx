"use client";

import GlobalStats from "@/components/HomePage/GlobalStats";
import GreenEffectHeader from "@/components/HomePage/GreenEffectHeader";
import Header from "@/components/HomePage/Header";
import ListMostPopularTracksOfMonth from "@/components/HomePage/ListMostPopularTracksOfMonth";
import MusicMostPopularByGenre from "@/components/HomePage/MusicMostPopularByGenre";
import StatsAboutYou from "@/components/HomePage/StatsAboutYou";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const initialize = async () => {
      try {
        // Mise à jour existante des pistes
        // const response = await fetch("/api/spotify/get-list-tracks/rap-fr");
        // const responsePop = await fetch("/api/spotify/get-list-tracks/pop");
        // const responseJazz = await fetch("/api/spotify/get-list-tracks/jazz");
        // const responseRnB = await fetch("/api/spotify/get-list-tracks/r&b");
        // const responseAfroBeats = await fetch("/api/spotify/get-list-tracks/afro-beats");
        // const data = await response.json();
        // const dataPop = await responsePop.json();
        // const dataJazz = await responseJazz.json();
        // const dataRnB = await responseRnB.json();
        // const dataAfroBeats = await responseAfroBeats.json();
        // console.log('Données des pistes Spotify Rap-fr:', data);
        // console.log('Données des pistes Spotify Pop:', dataPop);
        // console.log('Données des pistes Spotify Jazz:', dataJazz);
        // console.log('Données des pistes Spotify R&B:', dataRnB);
        // console.log('Données des pistes Spotify Afro Beats:', dataAfroBeats);

        // if (!response.ok) {
        //   throw new Error("Échec de la mise à jour des pistes");
        // }
        // if (!responseAfroBeats.ok) {
        //   throw new Error("Échec de la mise à jour des pistes");
        // }
        console.log("Pistes mises à jour avec succès");
      } catch (error) {
        console.error("Erreur lors de l'initialisation:", error);
      }
    };

    initialize();
  }, []);

  return (
    <div className="overflow-x-hidden px-8 relative">
      <Header />
      <ListMostPopularTracksOfMonth />
      <StatsAboutYou />
      <MusicMostPopularByGenre />
      <GlobalStats />
      <GreenEffectHeader />
    </div>
  );
}
