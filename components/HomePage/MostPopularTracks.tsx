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

export default function MostPopularTracks() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/spotify/popular-tracks");
        const data = await res.json();
        const { items } = data.tracks;
        const tracksList = items
          .sort((a: any, b: any) => b.track.popularity - a.track.popularity)
          .slice(0, 5);
        setTracks(tracksList);
        console.log(tracksList);
      } catch (error) {
        console.error("Erreur lors de la récupération des pistes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTracks();
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
    <Carousel className="w-full">
      <CarouselContent>
        {tracks.map((track: any) => (
          <CarouselItem key={track.track.id}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-12">
                <CardHeader>
                  <Image
                    src={track.track.album.images[0].url}
                    alt={`Cover de ${track.track.name}`}
                    width={track.track.album.images[0].width}
                    height={track.track.album.images[0].height}
                    className="rounded-[30px]"
                  />
                </CardHeader>
                <CardFooter className="flex w-full justify-between gap-5 items-start">
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#0F172A] w-10 h-10 rounded-full flex items-center justify-center">
                      <ArrowCircleUp size={32} weight="light" />
                    </div>
                    <span className="text-xs">x votes</span>
                  </div>
                  <CardTitle className="text-center flex flex-col gap-3">
                    <h3 className="font-medium text-2xl">{track.track.name}</h3>
                    <h4 className="font-medium text-xl text-[#28CB62]">{track.track.artists[0].name}</h4>
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
