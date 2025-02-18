"use client";

import FilterArtists from "@/components/classements/FilterArtists";
import LeaderboardArtists from "@/components/classements/LeaderboardArtists";
import StatsAboutYou from "@/components/HomePage/StatsAboutYou";
import { SpeakerHifi } from "@phosphor-icons/react";
import React, { useState } from "react";

export default function KpopContent() {
  const [
    sortMethodByPopularityOrVotesOrFollowers,
    setSortMethodByPopularityOrVotesOrFollowers,
  ] = useState("popularity");
  const [
    sortMethodByIncreasingOrDecreasing,
    setSortMethodByIncreasingOrDecreasing,
  ] = useState("decreasing");
  const [searchQuery, setSearchQuery] = useState("");


  const toggleSortByPopularityOrVotesOrFollowers = () => {
    setSortMethodByPopularityOrVotesOrFollowers((current) => {
      if (current === "popularity") return "votes";
      if (current === "votes") return "followers";
      return "popularity";
    });
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
        Les artistes les{" "}
          {sortMethodByIncreasingOrDecreasing === "increasing"
            ? "moins"
            : "plus"}{" "}
          {sortMethodByPopularityOrVotesOrFollowers === "popularity"
            ? "streamés"
            : sortMethodByPopularityOrVotesOrFollowers === "votes"
            ? "votés"
            : "suivis"}{" "}
        </h1>
        <h2 className="flex items-center gap-3 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-fit xl:text-center">
          <SpeakerHifi
            size={32}
            weight="light"
            className="text-greenColorSecondary"
          />{" "}
          K-pop
        </h2>
      <FilterArtists
        toggleSortByPopularityOrVotesOrFollowers={
          toggleSortByPopularityOrVotesOrFollowers
        }
        toggleSortByIncreasingOrDecreasing={toggleSortByIncreasingOrDecreasing}
        sortByPopularityOrVotesOrFollowers={
          sortMethodByPopularityOrVotesOrFollowers
        }
        sortByIncreasingOrDecreasing={sortMethodByIncreasingOrDecreasing}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      </div>
      <LeaderboardArtists
        sortMethodByPopularityOrVotesOrFollowers={
          sortMethodByPopularityOrVotesOrFollowers
        }
        sortMethodByIncreasingOrDecreasing={sortMethodByIncreasingOrDecreasing}
        genre="kpop"
        searchQuery={searchQuery}
      />
      <StatsAboutYou />
    </div>
  );
}
