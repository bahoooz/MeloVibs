import React from "react";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "@phosphor-icons/react";

interface FiltersProps {
  toggleSortByPopularityOrVotesOrFollowers: () => void;
  toggleSortByIncreasingOrDecreasing: () => void;
  sortByPopularityOrVotesOrFollowers: string;
  sortByIncreasingOrDecreasing: string;
}

export default function FilterArtists({
  toggleSortByPopularityOrVotesOrFollowers,
  toggleSortByIncreasingOrDecreasing,
  sortByPopularityOrVotesOrFollowers,
  sortByIncreasingOrDecreasing,
}: FiltersProps) {
  return (
    <div className="flex relative gap-3 xl:gap-4 flex-wrap md:w-[600px] md:mx-auto lg:w-[700px] xl:justify-center">
      <div className="absolute right-[31%] -top-2 xl:right-[78%] hidden lg:flex bg-[#252639] bg-opacity-40 justify-center items-center gap-2 px-5 h-14 rounded-xl filtrage">
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
    </div>
  );
}
