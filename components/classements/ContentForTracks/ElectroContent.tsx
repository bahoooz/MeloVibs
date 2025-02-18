"use client";

import React, { useEffect, useState } from "react";
import { SpeakerHifi } from "@phosphor-icons/react";
import StatsAboutYou from "@/components/HomePage/StatsAboutYou";
import { useTrackStore } from "@/store/useTrackStore";
import LeaderboardTracks from "@/components/classements/LeaderboardTracks";
import FiltersTracks from "@/components/classements/FiltersTracks";

export default function ElectroContent() {
  const { setCurrentGenre } = useTrackStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethodByPopularityOrVotes, setSortMethodByPopularityOrVotes] =
    useState("popularity");
  const [sortMethodByDate, setSortMethodByDate] = useState("30-last-days");
  const [
    sortMethodByIncreasingOrDecreasing,
    setSortMethodByIncreasingOrDecreasing,
  ] = useState("decreasing");

  useEffect(() => {
    setCurrentGenre("electro");
  }, [setCurrentGenre]);

  const toggleSortByPopularityOrVotes = () => {
    setSortMethodByPopularityOrVotes(
      sortMethodByPopularityOrVotes === "popularity" ? "votes" : "popularity"
    );
  };

  const toggleSortByDate = () => {
    setSortMethodByDate(
      sortMethodByDate === "30-last-days"
        ? "3-last-months"
        : sortMethodByDate === "3-last-months"
        ? "6-last-months"
        : sortMethodByDate === "6-last-months"
        ? "12-last-months"
        : "30-last-days"
    );
  };

  const toggleSortByIncreasingOrDecreasing = () => {
    setSortMethodByIncreasingOrDecreasing(
      sortMethodByIncreasingOrDecreasing === "increasing"
        ? "decreasing"
        : "increasing"
    );
  };

  return (
    <div className="mt-48 lg:mt-52 xl:mt-56 px-8 overflow-x-hidden w-screen">
      <div className="mb-28 lg:mb-32 flex flex-col gap-6">
        <h1 className="text-5xl md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
          Les morceaux les{" "}
          {sortMethodByIncreasingOrDecreasing === "increasing"
            ? "moins"
            : "plus"}{" "}
          {sortMethodByPopularityOrVotes === "popularity"
            ? "streamés"
            : "votés"}{" "}
          {sortMethodByDate === "30-last-days"
            ? "du mois"
            : sortMethodByDate === "3-last-months"
            ? "des 3 derniers mois"
            : sortMethodByDate === "6-last-months"
            ? "des 6 derniers mois"
            : "de l'année"}
        </h1>
        <h2 className="flex items-center gap-3 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-fit xl:text-center">
          <SpeakerHifi
            size={32}
            weight="light"
            className="text-greenColorSecondary"
          />{" "}
          Electro
        </h2>
        <FiltersTracks
          toggleSortByPopularityOrVotes={toggleSortByPopularityOrVotes}
          toggleSortByDate={toggleSortByDate}
          toggleSortByIncreasingOrDecreasing={
            toggleSortByIncreasingOrDecreasing
          }
          sortByPopularityOrVotes={sortMethodByPopularityOrVotes}
          sortByDate={sortMethodByDate}
          sortByIncreasingOrDecreasing={sortMethodByIncreasingOrDecreasing}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <LeaderboardTracks
        genre="electro"
        sortMethodByPopularityOrVotes={sortMethodByPopularityOrVotes}
        sortMethodByDate={sortMethodByDate}
        sortMethodByIncreasingOrDecreasing={sortMethodByIncreasingOrDecreasing}
        searchQuery={searchQuery}
      />
      <StatsAboutYou />
    </div>
  );
}
