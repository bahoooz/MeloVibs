import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowCircleUp, Check, Play, ShareFat } from "@phosphor-icons/react";

export interface CardTrackProps {
  _id?: string;
  image: string;
  title: string;
  artist: string;
  votes: number | string;
  onClick?: () => void;
  stylesIsVotedButton?: string;
  stylesIsVotedIcon?: string;
  popularity_track?: string;
  width?: number;
  height?: number;
  preview_url?: string | null;
  share_link?: string;
}

export default function CardTrack({
  image,
  title,
  artist,
  votes,
  onClick,
  stylesIsVotedButton,
  stylesIsVotedIcon,
  popularity_track,
  width,
  height,
  preview_url,
  share_link,
}: CardTrackProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    if (!share_link) return;

    try {
      // Essayer d'abord avec l'API Clipboard moderne
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(share_link);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 500);
        return;
      }
    } catch (err) {
      console.error("Erreur lors de la copie du lien (fallback):", err);
    }
  };

  return (
    <Card className="rounded-2xl bg-bgColorTransparent overflow-hidden">
      <CardHeader className="rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={width}
          height={height}
          className="w-full"
        />
      </CardHeader>
      <CardContent className="px-4 my-4 font-medium">
        <CardTitle className="text-base mb-4 font-medium">
          <h3 className="truncate">{title}</h3>
        </CardTitle>
        <div className="flex flex-col gap-2 ">
          <span className="text-blueColorTertiary text-sm">{artist}</span>
          <p className="text-sm text-white text-opacity-80">{votes} votes</p>
          <p className="text-sm text-greenColorSecondary text-opacity-80">
            {popularity_track}
          </p>
        </div>
      </CardContent>
      <CardFooter
        className={`flex justify-center md:mt-6 px-4 mb-4 ${
          preview_url ? " gap-5 md:gap-4" : "gap-6"
        }`}
      >
        <Button
          onClick={onClick}
          className={`bg-greenColorSecondary hover:bg-btnColorIsVoted w-12 md:w-10 h-12 md:h-10 rounded-full flex items-center justify-center transition-colors p-0 ${stylesIsVotedButton}`}
        >
          <ArrowCircleUp
            size={16}
            className={`transition-all duration-300 ${stylesIsVotedIcon}`}
            weight={"light"}
          />
        </Button>
        {preview_url && (
          <Button
            className={`bg-blueColorTertiary w-12 md:w-10 h-12 md:h-10 rounded-full hidden sm:flex items-center justify-center transition-colors p-0`}
          >
            <Play size={16} className="min-h-6 min-w-6" weight={"light"} />
          </Button>
        )}
        <Button
          onClick={handleShare}
          className={`bg-blueColorTertiary w-12 md:w-10 h-12 md:h-10 rounded-full sm:flex items-center justify-center transition-colors p-0`}
        >
          {isCopied ? (
            <Check
              size={16}
              className="min-h-6 min-w-6"
              weight={"light"}
              color="white"
            />
          ) : (
            <ShareFat
              size={16}
              className="min-h-6 min-w-6"
              weight={"light"}
              color="white"
            />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
