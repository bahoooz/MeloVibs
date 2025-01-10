"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";
import { Link } from "@phosphor-icons/react";
import Image from "next/image";

export interface CardRankingArtistProps {
  _id?: string;
  name: string;
  followers: number;
  popularity: number;
  votes: number;
  image: string;
  width: number;
  height: number;
  ranking: number;
  podium: boolean;
  shareLink: string;
}

export default function CardRankingArtist({
  name,
  followers,
  popularity,
  votes,
  image,
  width,
  height,
  ranking,
  podium,
  shareLink,
}: CardRankingArtistProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleImageClick = async () => {
    await navigator.clipboard.writeText(shareLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  return (
    <Card className="w-[200px] lg:w-full text-center flex flex-col gap-6">
      <div
        className="relative rounded-full group cursor-pointer hover:scale-[1.01] transition-all duration-200"
        onClick={handleImageClick}
      >
        <div
          className={`absolute bg-btnColorSecondary w-20 lg:w-16 h-20 lg:h-16 flex items-center justify-center rounded-full text-5xl lg:text-4xl -translate-x-1/2 -translate-y-1/2 left-1/2 top-0 z-10 font-bold ${
            podium ? "block" : "hidden"
          } ${
            ranking === 1
              ? "text-[#E7D940]"
              : ranking === 2
              ? "text-[#DCDCDC]"
              : ranking === 3
              ? "text-[#bb9977]"
              : ranking === 4
              ? "text-[#976f47]"
              : ranking === 5 && "text-[#614223]"
          }`}
        >
          <span>{ranking}</span>
        </div>
        <Image
          src={image}
          alt={name}
          width={width}
          height={height}
          className="w-[200px] lg:w-full h-[200px] lg:h-full lg:aspect-square rounded-full object-cover"
          style={{ cursor: "pointer" }}
          unoptimized={true}
          onError={(e) => {
            console.error('Erreur de chargement image:', e.currentTarget.src);
          }}
        />
        <div
          className={` ${
            isCopied ? "flex" : "hidden"
          } absolute top-0 right-0 w-full h-full items-center justify-center bg-black/50 rounded-full`}
        >
          {isCopied && <Link size={32} />}
        </div>
      </div>
      <div className="flex flex-col gap-3 font-medium">
        <h3 className="text-2xl">{name}</h3>
        <h4 className="text-xl">
          <span className="text-greenColorSecondary">
            {followers >= 1000000
              ? `${(followers / 1000000).toFixed(1)}M`
              : followers >= 1000
              ? `${(followers / 1000).toFixed(1)}K`
              : followers}
          </span>{" "}
          followers
        </h4>
        <h5 className="text-blueColorTertiary">
          {popularity >= 81
            ? "Superstar"
            : popularity >= 61
            ? "Tête d'affiche"
            : popularity >= 41
            ? "En pleine ascension"
            : popularity >= 21
            ? "Début de carrière"
            : "Outsider"}
        </h5>
        <h6 className="text-sm">{votes} votes</h6>
      </div>
    </Card>
  );
}
