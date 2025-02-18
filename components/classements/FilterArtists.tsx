import React from "react";
import { Button } from "../ui/button";
import { SlidersHorizontal, MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "../ui/input";

interface FiltersProps {
  toggleSortByPopularityOrVotesOrFollowers: () => void;
  toggleSortByIncreasingOrDecreasing: () => void;
  sortByPopularityOrVotesOrFollowers: string;
  sortByIncreasingOrDecreasing: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function FilterArtists({
  toggleSortByPopularityOrVotesOrFollowers,
  toggleSortByIncreasingOrDecreasing,
  sortByPopularityOrVotesOrFollowers,
  sortByIncreasingOrDecreasing,
  searchQuery,
  setSearchQuery,
}: FiltersProps) {
  return (
    <div className="md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] lg:mt-4">
      <div className="flex gap-3 xl:gap-4 flex-wrap xl:justify-start xl:items-center relative">
        <div className="absolute xl:relative right-[31%] xl:right-0 -top-2 xl:top-0 xl:mr-6 hidden lg:flex bg-[#252639] bg-opacity-40 justify-center items-center gap-2 px-5 h-14 rounded-xl filtrage">
          <SlidersHorizontal size={28} className="text-yellowColorOthers" />{" "}
          Filtrage
        </div>
        <Button
          className="rounded-md w-[150px]"
          onClick={toggleSortByPopularityOrVotesOrFollowers}
        >
          {sortByPopularityOrVotesOrFollowers === "popularity"
            ? "Par popularité"
            : sortByPopularityOrVotesOrFollowers === "votes"
            ? "Par votes"
            : "Par followers"}
        </Button>
        <Button
          className="rounded-md w-[150px]"
          onClick={toggleSortByIncreasingOrDecreasing}
        >
          {sortByIncreasingOrDecreasing === "increasing"
            ? "Ordre croissant"
            : "Ordre décroissant"}
        </Button>
        <div className="gap-3 items-center w-fit bg-btnColorIsVoted bg-opacity-50 px-4 py-2 rounded-md hidden xl:flex absolute right-0">
          <MagnifyingGlass size={24} className="text-white" />
          <Input
            className="bg-transparent px-0 py-0 rounded w-full border-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white text-sm h-6"
            type="text"
            placeholder="Rechercher un artiste..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 xl:gap-2 items-center w-fit bg-btnColorIsVoted bg-opacity-50 px-4 py-2 rounded-md mt-6 xl:hidden">
          <MagnifyingGlass size={24} className="text-white" />
          <Input
            className="bg-transparent px-0 py-0 rounded w-full border-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white text-sm h-6"
            type="text"
            placeholder="Rechercher un artiste..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
    </div>
  );
}
