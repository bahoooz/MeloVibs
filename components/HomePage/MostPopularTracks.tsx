"use client";

import React, {
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
import {
  ArrowCircleUp,
  Play,
  ShareFat,
} from "@phosphor-icons/react";
import { Skeleton } from "../ui/skeleton";
import { useTrackStore } from "@/store/useTrackStore";
import { Button } from "../ui/button";
import { createHandleVote } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { formatVoteCount } from "@/lib/formatVoteCount";
import Link from "next/link";

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
    release_date: string;
  };
  popularity: number;
  votes: number;
}

export default function MostPopularTracks() {
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const { tracks, setTracks, addVote, removeVote, isVoted, setCurrentGenre } =
    useTrackStore();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTrackId, setLoadingTrackId] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async (share_link: string) => {
    if (!share_link) return;

    try {
      // Essayer d'abord avec l'API Clipboard moderne
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(share_link);
        setIsCopied(true);
        toast({
          title: "Lien copié !",
          description: "Vous pouvez maintenant partager cette musique",
          emojis: "🔗",
        })
        setTimeout(() => {
          setIsCopied(false);
        }, 500);
        console.log("Lien copié !", isCopied);
        
        return;
      }
    } catch (err) {
      console.error("Erreur lors de la copie du lien (fallback):", err);
    }
  };
  
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
    return async (trackId: string) => {
      setLoadingTrackId(trackId);
      try {
        await createHandleVote(
          toast,
          isVoted,
          async (id) => {
            await addVote(id, async () => {
              await update();
              return;
            });
          },
          async (id) => {
            await removeVote(id, async () => {
              await update();
              return;
            });
          }
        )(trackId);
      } finally {
        setLoadingTrackId(null);
      }
    };
  }, [session, toast, isVoted, addVote, removeVote, update]);
  
  useEffect(() => {
    async function initialize() {
      try {
        setCurrentGenre("");
        
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
  }, [setCurrentGenre, setTracks]);


  if (isLoading) {
    return (
      <div className="w-full xl:w-[500px] sm:w-[600px] lg:w-[700px]">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-12">
            <CardHeader className="w-full p-0">
              <Skeleton className="aspect-square w-full rounded-[30px]" />
            </CardHeader>
            <CardFooter className="flex w-full justify-between items-start px-0">
              <div className="flex flex-col gap-2 xl:items-center">
                <Skeleton className="h-12 xl:h-10 w-12 xl:w-[92.3px] rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-8 w-[200px] sm:w-[400px] lg:w-[500px] xl:w-[250px]" />
                <Skeleton className="h-6 w-[150px] sm:w-[300px] lg:w-[400px] xl:w-[200px]" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
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
                      disabled={loadingTrackId === track._id}
                      className={`bg-[#0F172A] h-12 xl:h-10 w-12 rounded-full flex items-center transition-all duration-300 ease-in-out p-0 hover:bg-btnColorIsVoted ${
                        isVoted(track._id)
                          ? "bg-btnColorIsVoted xl:min-w-[92.3px] relative"
                          : "xl:w-fit xl:pl-1 xl:pr-3 xl:min-w-[92.3px] justify-center"
                      }`}
                    >
                      <ArrowCircleUp
                        size={32}
                        weight="light"
                        className={`min-w-8 min-h-8 xl:min-w-8 xl:min-h-8 duration-300 ${
                          isVoted(track._id)
                            ? "min-w-[60px] min-h-[60px] xl:absolute xl:right-1/2 xl:translate-x-1/2"
                            : ""
                        }`}
                      />

                      <span
                        className={`${
                          isVoted(track._id) ? "hidden" : "hidden xl:block"
                        }`}
                      >
                        Voter
                      </span>
                    </Button>
                    <span className="text-xs">
                      {formatVoteCount(track.votes)} votes
                    </span>
                  </div>
                  <CardTitle className="text-center flex flex-col gap-3">
                    <h3 className="font-medium text-2xl truncate max-w-[200px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[250px]">
                      {track.name}
                    </h3>
                    <h4 className="font-medium text-xl text-[#28CB62] truncate max-w-[200px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[250px]">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </h4>
                  </CardTitle>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
                    <Link
                      href={track.album.share_link}
                      target="_blank"
                      className="hover:text-greenColorSecondary transition-colors"
                    >
                      <Play size={32} weight="light" />
                    </Link>
                    <button onClick={() => handleShare(track.album.share_link)}>
                      <ShareFat size={32} weight="light" className="hover:text-greenColorSecondary transition-colors" />
                    </button>
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
