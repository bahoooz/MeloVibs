import React from "react";
import { Button } from "../ui/button";

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
    <div className="flex gap-3 xl:gap-4 flex-wrap md:w-[600px] md:mx-auto lg:w-[700px] xl:justify-center">
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
