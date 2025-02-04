import React from "react";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "@phosphor-icons/react";

interface FiltersProps {
  sortByPopularityOrVotes: string;
  sortByDate: string;
  sortByIncreasingOrDecreasing: string;
  toggleSortByPopularityOrVotes: () => void;
  toggleSortByDate: () => void;
  toggleSortByIncreasingOrDecreasing: () => void;
}

export default function FiltersTracks({
  toggleSortByPopularityOrVotes,
  toggleSortByDate,
  toggleSortByIncreasingOrDecreasing,
  sortByPopularityOrVotes,
  sortByDate,
  sortByIncreasingOrDecreasing,
}: FiltersProps) {
  return (
    <div className="flex gap-3 xl:gap-4 flex-wrap md:w-[600px] md:mx-auto lg:w-[700px] xl:justify-center relative">
      <div className="absolute right-14 -top-2 xl:right-[90%] hidden lg:flex bg-[#252639] bg-opacity-40 justify-center items-center gap-2 px-5 h-14 rounded-xl filtrage">
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
    </div>
  );
}
