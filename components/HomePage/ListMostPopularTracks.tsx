"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useTrackStore } from "@/store/useTrackStore";
import CardTrack from "@/components/global/CardTrack";
import { createHandleVote } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Spiral } from "@phosphor-icons/react";
import { formatVoteCount } from "@/lib/formatVoteCount";

export default function ListMostPopularTracks() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { tracksOfMonth, setTracksOfMonth, addVote, removeVote, isVoted } =
    useTrackStore();
  const [isLoading, setIsLoading] = useState(true);

  // Création du handleVote avec vérification de session
  const handleVote = useMemo(() => {
    if (!session?.user) {
      return () => {
        toast({
          title: "Connexion requise",
          description: "Veuillez vous connecter pour voter",
          emojis: "🔒",
        });
      };
    }
    return createHandleVote(toast, isVoted, addVote, removeVote);
  }, [session, toast, isVoted, addVote, removeVote]);

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
  }, [setTracksOfMonth]);

  if (isLoading) {
    return (
      <section className="mt-32 lg:mt-44">
        <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
          Les musiques les plus streamées du mois
        </h2>

        {/* Squelette mobile et tablette */}
        <div className="block lg:hidden">
          <div className="w-full md:w-[600px] h-[400px] md:mx-auto flex justify-center items-center">
            <Spiral
              className="animate-spin text-greenColorSecondary"
              size={80}
            />
          </div>
        </div>

        {/* Squelette desktop */}
        <div className="hidden lg:flex justify-center items-center flex-wrap gap-4 xl:gap-10 w-[700px] h-[400px] xl:w-[1200px] mx-auto">
        <Spiral
              className="animate-spin text-greenColorSecondary"
              size={80}
            />
        </div>

      </section>
    );
  }

  return (
    <section className="mt-32 lg:mt-44">
      <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
        Les plus streamés du moment, tout genre confondu
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
                  votes={formatVoteCount(track.votes)}
                  onClick={() => handleVote(track._id)}
                  stylesIsVotedButton={`${
                    isVoted(track._id) ? "bg-btnColorIsVoted" : ""
                  }`}
                  stylesIsVotedIcon={
                    isVoted(track._id)
                      ? "min-h-16 min-w-16 md:min-h-14 md:min-w-14"
                      : "min-h-8 min-w-8"
                  }
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
                  preview_url={track.previewUrl}
                  share_link={track.album.share_link}
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
                isVoted(track._id) ? "bg-btnColorIsVoted" : ""
              }`}
              stylesIsVotedIcon={
                isVoted(track._id) ? "min-h-14 min-w-14" : "min-h-8 min-w-8"
              }
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
              share_link={track.album.share_link}
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
