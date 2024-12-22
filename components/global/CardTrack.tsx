import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowCircleUp, Play, ShareFat } from "@phosphor-icons/react";

export interface CardTrackProps {
  _id?: string;
  image: string;
  title: string;
  artist: string;
  votes: number;
  onClick?: () => void;
  stylesIsVotedButton?: string;
  stylesIsVotedIcon?: string;
  popularity_track?: string;
  width?: number;
  height?: number;
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
}: CardTrackProps) {
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
          <h3>{title}</h3>
        </CardTitle>
        <div className="flex flex-col gap-2 ">
          <span className="text-blueColorTertiary text-sm">{artist}</span>
          <p className="text-sm text-white text-opacity-80">{votes} votes</p>
          <p className="text-sm text-greenColorSecondary text-opacity-80">
            {popularity_track}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-5 md:gap-4 px-4 mb-4 md:mt-6">
        <Button
          onClick={onClick}
          className={`bg-greenColorSecondary w-12 md:w-10 h-12 md:h-10 rounded-full flex items-center justify-center transition-colors p-0 ${stylesIsVotedButton}`}
        >
          <ArrowCircleUp
            size={16}
            className="min-h-8 min-w-8"
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
        <Button
          className={`bg-blueColorTertiary w-12 md:w-10 h-12 md:h-10 rounded-full hidden sm:flex items-center justify-center transition-colors p-0`}
        >
          <Play size={16} className="min-h-6 min-w-6" weight={"light"} />
        </Button>
        <Button
          className={`bg-white w-12 md:w-10 h-12 md:h-10 rounded-full sm:flex items-center justify-center transition-colors p-0`}
        >
          <ShareFat
            size={16}
            className="min-h-7 min-w-7"
            weight={"light"}
            color="black"
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
