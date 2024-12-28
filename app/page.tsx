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
        // const data = await response.json();
        // console.log('Données des pistes Spotify Rap-fr:', data);
        // const responsePop = await fetch("/api/spotify/get-list-tracks/pop");
        // const dataPop = await responsePop.json();
        // console.log('Données des pistes Spotify Pop:', dataPop);
        // const responseJazz = await fetch("/api/spotify/get-list-tracks/jazz");
        // const dataJazz = await responseJazz.json();
        // console.log('Données des pistes Spotify Jazz:', dataJazz);
        // const responseRnB = await fetch("/api/spotify/get-list-tracks/r&b");
        // const dataRnB = await responseRnB.json();
        // console.log('Données des pistes Spotify R&B:', dataRnB);
        // const responseAfroBeats = await fetch("/api/spotify/get-list-tracks/afro-beats");
        // const dataAfroBeats = await responseAfroBeats.json();
        // console.log('Données des pistes Spotify Afro Beats:', dataAfroBeats);
        // const responseRapUs = await fetch("/api/spotify/get-list-tracks/rap-us");
        // const dataRapUs = await responseRapUs.json();
        // console.log('Données des pistes Spotify Rap US:', dataRapUs);
        // const responseLatines = await fetch("/api/spotify/get-list-tracks/latines");
        // const dataLatines = await responseLatines.json();
        // console.log('Données des pistes Spotify Latines:', dataLatines);
        // const responseRock = await fetch("/api/spotify/get-list-tracks/rock");
        // const dataRock = await responseRock.json();
        // console.log('Données des pistes Spotify Rock:', dataRock);
        // const responseElectro = await fetch("/api/spotify/get-list-tracks/electro");
        // const dataElectro = await responseElectro.json();
        // console.log('Données des pistes Spotify Electro:', dataElectro);
        // const responseKpop = await fetch("/api/spotify/get-list-tracks/kpop");
        // const dataKpop = await responseKpop.json();
        // console.log('Données des pistes Spotify Kpop:', dataKpop);

        const responseRapFr = await fetch("/api/spotify/get-list-artists/rap-fr");
        const dataRapFr = await responseRapFr.json();
        console.log('Données des artistes Spotify Rap-fr:', dataRapFr);

        const responsePop = await fetch("/api/spotify/get-list-artists/pop");
        const dataPop = await responsePop.json();
        console.log('Données des artistes Spotify Pop:', dataPop);



        // if (!response.ok) {
        //   throw new Error("Échec de la mise à jour des pistes");
        // }
        // if (!responseAfroBeats.ok) {
        //   throw new Error("Échec de la mise à jour des pistes");
        // }
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
