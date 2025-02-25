import React, { useState } from "react";
import { CardTrackProps } from "../global/CardTrack";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowCircleUp, Link as LinkIcon, Play } from "@phosphor-icons/react";
import { formatVoteCount } from "@/lib/formatVoteCount";
import Image from "next/image";
import Link from "next/link";
import { toast } from '@/hooks/use-toast'

interface CardRankingTrackProps extends CardTrackProps {
  ranking: number;
  podium: boolean;
  popularity?: string;
  shareLink: string;
  isLoading?: boolean;
}

export default function CardRankingTrack({
  image,
  title,
  artist,
  votes,
  onClick,
  stylesIsVotedButton,
  stylesIsVotedIcon,
  width,
  height,
  ranking,
  podium = false,
  popularity,
  shareLink,
  isLoading,
}: CardRankingTrackProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleImageClick = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setIsCopied(true);
      toast({
        title: "Lien copié !",
        description: "Vous pouvez maintenant partager cette musique",
        emojis: "🔗",
      })
      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card className="h-[390px] lg:h-[335px] w-full max-w-[300px] rounded-3xl bg-[#18181B]/20 flex flex-col justify-between overflow-visible">
      <CardHeader className="relative w-full min-h-[250px] lg:min-h-[200px]">
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
        {isCopied && (
          <LinkIcon
            size={32}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-50"
          />
        )}
        <Image
          className="absolute object-cover rounded-3xl min-h-[250px] h-[250px] lg:min-h-[200px] lg:h-[200px] aspect-square cursor-pointer hover:scale-[102%] transition-all duration-300"
          src={image}
          alt={title}
          width={width}
          height={height}
          style={{ color: "transparent" }}
          onClick={handleImageClick}
          unoptimized={true}
          onError={(e) => {
            console.error("Erreur de chargement image:", e.currentTarget.src);
          }}
        />
        <div className="absolute inset-0 bg-black/20 rounded-3xl pointer-events-none" />
        <Link
          href={shareLink}
          target="_blank"
          className="absolute w-20 lg:w-14 h-20 lg:h-14 rounded-[23px] lg:rounded-[20px] bg-blueColorTertiary flex justify-center items-center right-0 bg-opacity-70 hover:opacity-90 hover:scale-[102%]"
        >
          <Play className="text-3xl" />
        </Link>
        <div className="absolute w-full bottom-0 flex justify-between items-center">
          <Button
            onClick={onClick}
            disabled={isLoading}
            className={`w-20 lg:w-14 h-20 lg:h-14 rounded-[23px] lg:rounded-[20px] ${stylesIsVotedButton} bg-opacity-70 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowCircleUp
              className={`transition-all duration-300 ${stylesIsVotedIcon}`}
              weight="light"
            />
          </Button>
          <div className="w-20 lg:w-14 h-20 lg:h-14 bg-btnColorSecondary bg-opacity-70 rounded-[23px] lg:rounded-[20px] flex items-center justify-center">
            <p className="text-3xl font-bold">
              {formatVoteCount(votes as number)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between h-3/4 lg:h-full px-8 lg:px-4 items-center">
        <div
          className={`flex flex-col gap-3 ${
            podium ? "w-full" : "w-[90%] lg:w-[80%] max-w-[80%] lg:max-w-[70%]"
          }`}
        >
          <h4 className="text-xl text-blueColorTertiary font-medium min-w-full truncate">
            {artist}
          </h4>
          <h4 className="font-medium truncate max-w-[90%]">{title}</h4>
          <p className="text-sm text-blueColorTertiary font-medium truncate w-[98%] max-w-[99%]">
            {popularity}
          </p>
        </div>
        <div className={podium ? "hidden" : "block"}>
          <p className="text-2xl text-greenColorSecondary font-medium uppercase">
            #{ranking}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
