"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useTrackStore } from "@/store/useTrackStore";
import { Skeleton } from "../ui/skeleton";
import CardTrack from "@/components/global/CardTrack";
import { createHandleVote } from "@/lib/utils";
import Link from "next/link";

export default function ListMostPopularTracksOfMonth() {
  const { tracksOfMonth, setTracksOfMonth, addVote, removeVote, isVoted } =
    useTrackStore();
  const [isLoading, setIsLoading] = useState(true);
  const handleVote = createHandleVote(isVoted, addVote, removeVote);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const [tracksRes, votesRes] = await Promise.all([
          fetch("/api/tracks/tracks-ranking-homepage"),
          fetch("/api/user/votes"),
        ]);

        const tracksData = await tracksRes.json();
        const votesData = await votesRes.json();

        setTracksOfMonth(tracksData.tracks);
        if (votesData.votedTracks) {
          useTrackStore.setState({
            votedTracks: new Set(votesData.votedTracks),
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des pistes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTracks();
  }, []);

  if (isLoading) {
    return (
      <section className="mt-32">
        <h2 className="text-5xl font-normal mb-12">
          Les musiques les plus populaires du mois
        </h2>
        <Card>
          <CardContent className="flex flex-col items-center justify-center">
            <CardHeader>
              <Skeleton className="h-[300px] w-[300px] rounded-[30px]" />
            </CardHeader>
            <div className="flex w-full justify-between mt-12">
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
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mt-32 lg:mt-44">
      <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
        Les musiques les plus streamées du mois
      </h2>

      {/* Carousel pour mobile et tablette */}
      <div className="block lg:hidden">
        <Carousel className="w-full md:w-[600px] md:mx-auto">
          <CarouselContent>
            {tracksOfMonth.map((track) => (
              <CarouselItem key={track._id} className="basis-1/2 md:basis-1/3">
                <CardTrack
                  image={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  votes={track.votes}
                  onClick={() => handleVote(track._id)}
                  stylesIsVotedButton={`${
                    isVoted(track._id) ? "border-[3px] border-white" : ""
                  }`}
                  stylesIsVotedIcon={isVoted(track._id) ? "fill" : "light"}
                  popularity_track={
                    track.popularity >= 80
                      ? "Hit incontournable"
                      : track.popularity >= 70
                      ? "Hit du moment"
                      : track.popularity >= 60
                      ? "Favori du public"
                      : track.popularity >= 50
                      ? "Tendance montante"
                      : track.popularity >= 30
                      ? "À découvrir"
                      : track.popularity >= 10
                      ? "Note discrète"
                      : "Inconnu au bataillon"
                  }
                  width={track.album.images[0].width}
                  height={track.album.images[0].height}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Grille flex pour desktop */}
      <div className="hidden lg:flex justify-center flex-wrap gap-4 xl:gap-10 w-[700px] xl:w-[1200px] mx-auto">
        {tracksOfMonth.map((track) => (
          <div key={track._id} className="w-[calc(33.33%-16px)] xl:w-[208px]">
            <CardTrack
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              votes={track.votes}
              onClick={() => handleVote(track._id)}
              stylesIsVotedButton={`${
                isVoted(track._id) ? "border-[3px] border-white" : ""
              }`}
              stylesIsVotedIcon={isVoted(track._id) ? "fill" : "light"}
              popularity_track={
                track.popularity >= 80
                  ? "Hit incontournable"
                  : track.popularity >= 70
                  ? "Hit du moment"
                  : track.popularity >= 60
                  ? "Favori du public"
                  : track.popularity >= 50
                  ? "Tendance montante"
                  : track.popularity >= 30
                  ? "À découvrir"
                  : track.popularity >= 10
                  ? "Note discrète"
                  : "Inconnu au bataillon"
              }
              width={track.album.images[0].width}
              height={track.album.images[0].height}
            />
          </div>
        ))}
      </div>
      <div className="w-fit mx-auto mt-10 lg:mt-16 xl:mt-20">
        <Link href={"/"}>
          <Button className="mx-auto">Découvrir le classement</Button>
        </Link>
      </div>
    </section>
  );
}
