"use client";

import GlobalStats from "@/components/HomePage/GlobalStats";
import GreenEffectHeader from "@/components/HomePage/GreenEffectHeader";
import Header from "@/components/HomePage/Header";
import ListMostPopularTracks from "@/components/HomePage/ListMostPopularTracks";
import ModalBeta from "@/components/HomePage/ModalBeta";
import MusicMostPopularByGenre from "@/components/HomePage/MusicMostPopularByGenre";
import StatsAboutYou from "@/components/HomePage/StatsAboutYou";

export default function HomeContent() {
  return (
    <div className="overflow-x-hidden px-8 relative">
      <ModalBeta />
      <Header />
      <ListMostPopularTracks />
      <StatsAboutYou />
      <MusicMostPopularByGenre />
      <GlobalStats />
      <GreenEffectHeader />
    </div>
  );
}
