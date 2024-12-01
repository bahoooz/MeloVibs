"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addVote, removeVote, isVoted } = useTrackStore();
  const { toast } = useToast();

  useEffect(() => {
    async function initialize() {
      try {
        const [tracksRes, votesRes] = await Promise.all([
          fetch("/api/tracks"),
          fetch("/api/user/votes")
        ]);
        
        const tracksData = await tracksRes.json();
        const votesData = await votesRes.json();
        
        setTracks(tracksData.tracks);
        if (votesData.votedTracks) {
          useTrackStore.setState({ votedTracks: new Set(votesData.votedTracks) });
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  const handleVote = async (trackId: string) => {
    try {
      if (isVoted(trackId)) {
        await removeVote(trackId);
        // Rafraîchir les données après le vote
        const res = await fetch("/api/tracks");
        const data = await res.json();
        setTracks(data.tracks);
        
        toast({
          title: "Vote retiré",
          description: "Votre vote a été retiré avec succès",
        });
      } else {
        await addVote(trackId);
        // Rafraîchir les données après le vote
        const res = await fetch("/api/tracks");
        const data = await res.json();
        setTracks(data.tracks);
        
        toast({
          title: "Vote ajouté",
          description: "Votre vote a été ajouté avec succès",
        });
      }
    } catch (error) {
      console.error("Erreur lors du vote:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du vote",
        variant: "destructive",
      });
    }
  };

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
    <Carousel className="w-full">
      <CarouselContent>
        {tracks.map((track) => (
          <CarouselItem key={track._id}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-12">
                <CardHeader>
                  <Image
                    src={track.album.images[0].url}
                    alt={`Cover de ${track.name}`}
                    width={track.album.images[0].width}
                    height={track.album.images[0].height}
                    className="rounded-[30px]"
                  />
                </CardHeader>
                <CardFooter className="flex w-full justify-between gap-5 items-start">
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleVote(track._id)}
                      className={`bg-[#0F172A] w-10 h-10 rounded-full flex items-center justify-center transition-colors p-0 ${
                        isVoted(track._id) ? "border-[3px] border-white" : ""
                      }`}
                    >
                      <ArrowCircleUp
                        size={1}
                        weight={isVoted(track._id) ? "fill" : "light"}
                        className="min-w-6 min-h-6"
                      />
                    </Button>
                    <span className="text-xs">{track.votes} votes</span>
                  </div>
                  <CardTitle className="text-center flex flex-col gap-3">
                    <h3 className="font-medium text-2xl">{track.name}</h3>
                    <h4 className="font-medium text-xl text-[#28CB62]">
                      {track.artists[0].name}
                    </h4>
                  </CardTitle>
                  <div className="flex flex-col gap-3">
                    <Play size={32} weight="light" />
                    <SpeakerHigh size={32} weight="light" />
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
