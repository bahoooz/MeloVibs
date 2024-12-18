import MusicMostPopularByGenre from "@/components/HomePage/MusicMostPopularByGenre";
import React from "react";

export default function Classements() {
  return (
    <div className="min-h-screen px-8 mb-40">
      <div className="mt-48 lg:mt-52 xl:mt-56">
        <MusicMostPopularByGenre />
      </div>
    </div>
  );
}
