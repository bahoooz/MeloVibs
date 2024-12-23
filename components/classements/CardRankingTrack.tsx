import React from "react";
import { CardTrackProps } from "../global/CardTrack";
import { Card, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowCircleUp, DotsThreeVertical } from "@phosphor-icons/react";

interface CardRankingTrackProps extends CardTrackProps {
  ranking: number;
  podium: boolean;
  popularity: number;
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
  popularity
}: CardRankingTrackProps) {
  return (
    <Card className="h-[350px] lg:h-[290px] w-full max-w-[300px] rounded-3xl bg-[#18181B]/20 flex flex-col justify-between overflow-visible">
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
        <Image
          className="absolute object-cover rounded-3xl min-h-[250px] h-[250px] lg:min-h-[200px] lg:h-[200px] aspect-square"
          src={image}
          alt={title}
          width={width}
          height={height}
        />
        <div className="absolute inset-0 bg-black/20 rounded-3xl" />
        <div className="absolute right-0 lg:-right-1 top-4 lg:top-2">
          <DotsThreeVertical
            weight="bold"
            className="text-greenColorSecondary text-[50px] lg:text-[45px]"
          />
        </div>
        <div className="absolute w-full bottom-0 flex justify-between items-center">
          <Button
            onClick={onClick}
            className={`w-20 lg:w-14 h-20 lg:h-14 rounded-[23px] lg:rounded-[20px] ${stylesIsVotedButton} bg-opacity-70`}
          >
            <ArrowCircleUp
              className="min-w-12 lg:min-w-10 min-h-12 lg:min-h-10"
              weight={
                stylesIsVotedIcon as
                  | "regular"
                  | "bold"
                  | "thin"
                  | "light"
                  | "fill"
                  | "duotone"
              }
            />
          </Button>
          <div className="w-20 lg:w-14 h-20 lg:h-14 bg-btnColorSecondary bg-opacity-70 rounded-[23px] lg:rounded-[20px] flex items-center justify-center">
            <p className="text-3xl font-bold">{votes}</p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between h-3/4 lg:h-full px-8 lg:px-4 items-center">
        <div className={`flex flex-col gap-3 ${
          podium ? 'w-full' : 'w-[90%] lg:w-[80%] max-w-[90%] lg:max-w-[80%]'
        }`}>
          <h4 className="text-xl text-blueColorTertiary font-medium min-w-full truncate">
            {artist} - {popularity}
          </h4>
          <h4 className="font-medium truncate w-[98%] max-w-[99%]">{title}</h4>
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
