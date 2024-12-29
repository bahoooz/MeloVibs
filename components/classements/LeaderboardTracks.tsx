"use client";

import { createHandleVote } from "@/lib/utils";
import { useTrackStore } from "@/store/useTrackStore";
import React, { useEffect, useMemo, useState } from "react";
import CardRankingTrack from "./CardRankingTrack";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { Track } from "../HomePage/MostPopularTracks";
import { Spiral } from "@phosphor-icons/react";

interface ListTracksRankingProps {
  genre: string;
  sortMethodByPopularityOrVotes: string;
  sortMethodByDate: string;
  sortMethodByIncreasingOrDecreasing: string;
}

export default function ListTracksRanking({
  genre,
  sortMethodByPopularityOrVotes,
  sortMethodByDate,
  sortMethodByIncreasingOrDecreasing,
}: ListTracksRankingProps) {
  const { toast } = useToast();
  const { data: session } = useSession();
  // Initialisation des états et des fonctions du store
  const { tracks, setTracks, addVote, removeVote, isVoted } = useTrackStore();
  const [currentPage, setCurrentPage] = useState(1); // État pour gérer la page courante
  const tracksPerPage = 30; // Nombre de pistes par page
  const tracksPerCarousel = 5; // Nombre de pistes par carousel
  const [isLoading, setIsLoading] = useState(true);

  // Calcul du nombre total de pages nécessaires
  const totalPages = Math.ceil(tracks.length / tracksPerPage);

  // Fonction pour obtenir les pistes de la page courante
  const getCurrentPageTracks = () => {
    const startIndex = (currentPage - 1) * tracksPerPage;
    return tracks.slice(startIndex, startIndex + tracksPerPage);
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
    return createHandleVote(toast, isVoted, addVote, removeVote);
  }, [session, toast, isVoted, addVote, removeVote]);

  // Effect pour initialiser les données au chargement du composant
  useEffect(() => {
    async function initialize() {
      setIsLoading(true);
      setCurrentPage(1); // Réinitialisation de la page courante
      try {
        // Récupération parallèle des pistes et des votes
        const [tracksRes, votesRes] = await Promise.all([
          fetch(`/api/tracks/get-all-tracks/${genre}`),
          fetch("/api/user/votes"),
        ]);

        const tracksData = await tracksRes.json();
        const votesData = await votesRes.json();

        let filteredTracks = [...tracksData.tracks];

        // Simplifions la logique de tri
        if (sortMethodByIncreasingOrDecreasing === "increasing") {
          if (sortMethodByPopularityOrVotes === "popularity") {
            filteredTracks.sort(
              (a: Track, b: Track) => a.popularity - b.popularity
            );
          } else {
            filteredTracks.sort((a: Track, b: Track) => a.votes - b.votes);
          }
        } else {
          if (sortMethodByPopularityOrVotes === "popularity") {
            filteredTracks.sort(
              (a: Track, b: Track) => b.popularity - a.popularity
            );
          } else {
            filteredTracks.sort((a: Track, b: Track) => b.votes - a.votes);
          }
        }

        // Appliquons le filtre par date
        const today = new Date();
        filteredTracks = filteredTracks.filter((track: Track) => {
          const dateTrack = new Date(track.album.release_date);
          const diffTime = Math.abs(today.getTime() - dateTrack.getTime());
          const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

          switch (sortMethodByDate) {
            case "30-last-days":
              return diffMonths <= 1;
            case "3-last-months":
              return diffMonths <= 3;
            case "6-last-months":
              return diffMonths <= 6;
            case "12-last-months":
              return diffMonths <= 12;
            default:
              return true;
          }
        });

        if (votesData.votedTracks) {
          useTrackStore.setState({
            votedTracks: new Set(votesData.votedTracks),
          });
        }

        setTracks(filteredTracks);
      } catch (error) {
        console.error("Erreur lors de l'initialisation:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, [
    genre,
    setTracks,
    sortMethodByPopularityOrVotes,
    sortMethodByDate,
    sortMethodByIncreasingOrDecreasing,
  ]);

  // Fonction pour générer les numéros de page à afficher dans la pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      // Affiche toujours la première et dernière page, ainsi que les pages autour de la page courante
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      }
    }
    return pages;
  };

  // Fonction pour rendre les carousels de la page courante
  const renderCarousels = () => {
    const currentTracks = getCurrentPageTracks();
    const numberOfCarousels = Math.ceil(
      currentTracks.length / tracksPerCarousel
    );
    const carousels = [];

    // On crée un tableau de carousels basé sur le nombre de tracks de la page courante
    for (let i = 0; i < numberOfCarousels; i++) {
      const startIndex = i * tracksPerCarousel;
      const carouselTracks = currentTracks.slice(
        startIndex,
        startIndex + tracksPerCarousel
      );

      carousels.push(
        <Carousel
          key={`carousel-${i}-${currentPage}`}
          opts={{
            slidesToScroll: 1,
            align: "center",
          }}
          className="w-full mx-auto md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px]"
        >
          <CarouselContent hideOverflow={false} className="-ml-8 sm:-ml-10">
            {carouselTracks.map((track, trackIndex) => {
              // Calcul du vrai index de la track
              const globalIndex =
                (currentPage - 1) * tracksPerPage + // Index de base pour la page
                i * tracksPerCarousel + // Index de base pour le carousel
                trackIndex +
                1; // Index dans le carousel actuel (+1 pour commencer à 1)

              return (
                <CarouselItem
                  key={`track-${track._id}-${currentPage}`}
                  className="basis-[300px] pl-8 sm:pl-10"
                >
                  <CardRankingTrack
                    _id={track._id}
                    title={track.name}
                    artist={track.artists[0].name}
                    image={track.album.images[0].url}
                    votes={track.votes}
                    width={track.album.images[0].width}
                    height={track.album.images[0].height}
                    onClick={() => handleVote(track._id)}
                    stylesIsVotedButton={`${
                      isVoted(track._id) ? "bg-btnColorIsVoted border-4 border-white overflow-hidden" : ""
                    }`}
                    stylesIsVotedIcon={
                      isVoted(track._id)
                        ? "min-h-32 min-w-32"
                        : "min-h-12 min-w-12"
                    }
                    ranking={globalIndex}
                    podium={currentPage === 1 && i === 0 ? true : false}
                    popularity={
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
                    shareLink={track.album.share_link}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="bg-blueColorTertiary" />
          <CarouselNext className="bg-blueColorTertiary" />
        </Carousel>
      );
    }
    return carousels;
  };

  // Au début du composant, ajoutez ce hook personnalisé
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rendu du composant
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[30vh] sm:min-h-[50vh] xl:min-h-[60vh]">
          <Spiral size={80} className="animate-spin text-greenColorSecondary" />
        </div>
      ) : (
        <>
          {/* Carousels visibles uniquement sur mobile et tablette */}
          <div className="flex flex-col gap-20 lg:hidden">{renderCarousels()}</div>

          {/* Grille visible uniquement sur desktop */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-8 lg:w-[700px] xl:w-[1200px] mx-auto">
            {getCurrentPageTracks().map((track, index) => {
              const globalIndex = (currentPage - 1) * tracksPerPage + index + 1;

              return (
                <CardRankingTrack
                  key={`track-grid-${track._id}`}
                  _id={track._id}
                  title={track.name}
                  artist={track.artists[0].name}
                  image={track.album.images[0].url}
                  votes={track.votes}
                  width={track.album.images[0].width}
                  height={track.album.images[0].height}
                  onClick={() => handleVote(track._id)}
                  stylesIsVotedButton={`${
                    isVoted(track._id) ? "bg-btnColorIsVoted border-[3px] border-white overflow-hidden" : ""
                  }`}
                  stylesIsVotedIcon={
                    isVoted(track._id)
                      ? "min-h-20 min-w-20"
                      : "min-h-12 min-w-12"
                  }
                  ranking={globalIndex}
                  podium={
                    currentPage === 1 &&
                    (windowWidth >= 1280 // 2xl breakpoint
                      ? globalIndex <= 5
                      : globalIndex <= 3)
                  }
                  popularity={
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
                  shareLink={track.album.share_link}
                />
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-20">
              <PaginationContent>
                {/* Affichage des numéros de page */}
                {getPageNumbers().map((pageNum, index, array) => (
                  <React.Fragment key={pageNum}>
                    {/* Affichage des points de suspension si nécessaire */}
                    {index > 0 && array[index - 1] !== pageNum - 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                ))}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
