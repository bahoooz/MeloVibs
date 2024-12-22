"use client";

import React, { useEffect } from "react";
import { SpeakerHifi } from "@phosphor-icons/react";
import ListTracksRanking from "@/components/classements/ListTracksRanking";
import StatsAboutYou from "@/components/HomePage/StatsAboutYou";
import { useTrackStore } from "@/store/useTrackStore";

export default function Pop() {
  const { setCurrentGenre } = useTrackStore();

  useEffect(() => {
    setCurrentGenre("pop");
  }, [setCurrentGenre]);

  return (
    <div className="mt-48 lg:mt-52 xl:mt-56 px-8 overflow-x-hidden w-screen">
      <div className="mb-28 lg:mb-32 flex flex-col gap-6">
        <h1 className="text-5xl md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
          Les morceaux les plus streamés du mois
        </h1>
        <h3 className="flex items-center gap-3 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-fit xl:text-center">
          <SpeakerHifi
            size={32}
            weight="light"
            className="text-greenColorSecondary"
          />{" "}
          Pop
        </h3>
      </div>
      <ListTracksRanking genre="pop" />
      <StatsAboutYou />
    </div>
  );
}
