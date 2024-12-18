"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "../ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { ArrowCircleUp, Play, SpeakerHigh } from "@phosphor-icons/react";
import { Skeleton } from "../ui/skeleton";
import { useTrackStore } from "@/store/useTrackStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { createHandleVote } from "@/lib/utils";

export interface Track {
  _id: string;
  spotifyId: string;
  name: string;
  previewUrl: string | null;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  popularity: number;
  votes: number;
}

export default function MostPopularTracks() {
  const { tracks, setTracks, addVote, removeVote, isVoted } = useTrackStore();
  const [isLoading, setIsLoading] = useState(true);
  const handleVote = createHandleVote(isVoted, addVote, removeVote);
  useEffect(() => {
    async function initialize() {
      try {
        const [tracksRes, votesRes] = await Promise.all([
          fetch("/api/tracks/tracks-header-homepage"),
          fetch("/api/user/votes"),
        ]);

        const tracksData = await tracksRes.json();
        const votesData = await votesRes.json();

        setTracks(tracksData.tracks);
        if (votesData.votedTracks) {
          useTrackStore.setState({
            votedTracks: new Set(votesData.votedTracks),
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center">
          <CardHeader>
            <Skeleton className="h-[300px] w-[300px] rounded-[30px]" />
          </CardHeader>
          <CardFooter className="flex w-full justify-between">
            <div>
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="mt-2 h-4 w-16" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel
      className="w-full xl:w-[500px] relative sm:w-[600px] lg:w-[700px] 2xl:overflow-visible rounded-t-[30px]"
      autoPlay
      autoPlayInterval={3000}
      loop
    >
      <CarouselContent className="rounded-[30px] carousel-header-home">
        {tracks.map((track) => (
          <CarouselItem key={track._id}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-12  sm:mx-auto xl:mx-0">
                <CardHeader className="sm:w-full">
                  <Image
                    src={track.album.images[0].url}
                    alt={`Cover de ${track.name}`}
                    width={track.album.images[0].width}
                    height={track.album.images[0].height}
                    className="rounded-[30px] sm:w-full"
                  />
                </CardHeader>
                <CardFooter className="flex w-full justify-between gap-4 items-start">
                  <div className="flex flex-col gap-2 xl:items-center">
                    <Button
                      onClick={() => handleVote(track._id)}
                      className={`bg-[#0F172A] w-10 xl:w-fit xl:pl-1 xl:pr-3 h-10 rounded-full flex items-center justify-center transition-colors p-0 ${
                        isVoted(track._id) ? "border-[3px] border-white" : ""
                      }`}
                    >
                      <ArrowCircleUp
                        size={32}
                        weight={isVoted(track._id) ? "fill" : "light"}
                        className="min-w-6 xl:min-w-8 min-h-6 xl:min-h-8"
                      />
                      <span className="hidden xl:block">Voter</span>
                    </Button>
                    <span className="text-xs">{track.votes} votes</span>
                  </div>
                  <CardTitle className="text-center flex flex-col gap-3">
                    <h3 className="font-medium text-2xl">{track.name}</h3>
                    <h4 className="font-medium text-xl text-[#28CB62]">
                      {track.artists[0].name}
                    </h4>
                  </CardTitle>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
                    <Play size={32} weight="light" />
                    <SpeakerHigh size={32} weight="light" />
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselDots className="hidden 2xl:flex 2xl:absolute 2xl:flex-col 2xl:top-0 2xl:-right-28 2xl:w-fit 2xl:h-[500px] 2xl:justify-center 2xl:gap-14" />

      <CarouselDots className="2xl:hidden mt-12 sm:w-[600px] lg:w-[700px] xl:w-full sm:mx-auto " />
    </Carousel>
  );
}
