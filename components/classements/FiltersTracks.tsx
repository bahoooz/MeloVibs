import React from "react";
import { Button } from "../ui/button";
import { SlidersHorizontal, MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "../ui/input";

interface FiltersProps {
  sortByPopularityOrVotes: string;
  sortByDate: string;
  sortByIncreasingOrDecreasing: string;
  toggleSortByPopularityOrVotes: () => void;
  toggleSortByDate: () => void;
  toggleSortByIncreasingOrDecreasing: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function FiltersTracks({
  toggleSortByPopularityOrVotes,
  toggleSortByDate,
  toggleSortByIncreasingOrDecreasing,
  sortByPopularityOrVotes,
  sortByDate,
  sortByIncreasingOrDecreasing,
  searchQuery,
  setSearchQuery,
}: FiltersProps) {
  return (
    <div className="md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] lg:mt-4">
      <div className="flex gap-3 xl:gap-4 flex-wrap xl:justify-start xl:items-center relative">
        <div className="absolute xl:relative right-14 xl:right-0 -top-2 xl:top-0 xl:mr-6 hidden lg:flex bg-[#252639] bg-opacity-40 justify-center items-center gap-2 px-5 h-14 rounded-xl filtrage">
          <SlidersHorizontal size={28} className="text-yellowColorOthers" />{" "}
          Filtrage
        </div>
        <Button
          className="rounded-md w-[150px]"
          onClick={toggleSortByPopularityOrVotes}
        >
          {sortByPopularityOrVotes === "popularity"
            ? "Par popularité"
            : "Par votes"}
        </Button>
        <Button className="rounded-md w-[150px]" onClick={toggleSortByDate}>
          {sortByDate === "30-last-days"
            ? "30 derniers jours"
            : sortByDate === "3-last-months"
            ? "3 derniers mois"
            : sortByDate === "6-last-months"
            ? "6 derniers mois"
            : sortByDate === "12-last-months"
            ? "12 derniers mois"
            : "30 derniers jours"}
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
            placeholder="Rechercher un morceau..."
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
            placeholder="Rechercher un morceau..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
    </div>
  );
}
