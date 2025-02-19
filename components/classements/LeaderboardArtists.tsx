import { CarouselNext } from "../ui/carousel";
import { CarouselPrevious } from "../ui/carousel";
import { CarouselContent, CarouselItem } from "../ui/carousel";
import { Carousel } from "../ui/carousel";
import React, { useState, useEffect } from "react";
import CardRankingArtist from "./CardRankingArtist";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Pagination } from "../ui/pagination";
import { Spiral } from "@phosphor-icons/react";

interface Artist {
  _id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  votes: number;
  followers: number;
  popularity: number;
  share_link: string;
}

interface LeaderboardArtistsProps {
  sortMethodByPopularityOrVotesOrFollowers: string;
  sortMethodByIncreasingOrDecreasing: string;
  genre: string;
  searchQuery: string;
}

export default function LeaderboardArtists({
  sortMethodByPopularityOrVotesOrFollowers,
  sortMethodByIncreasingOrDecreasing,
  genre,
  searchQuery,
}: LeaderboardArtistsProps) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // État pour gérer la page courante
  const [isLoading, setIsLoading] = useState(true);

  const artistPerPage = 30; // Nombre de pistes par page
  const artistPerCarousel = 5; // Nombre de pistes par carousel

  useEffect(() => {
    async function initialize() {
      setCurrentPage(1); // Réinitialisation de la page courante
      setIsLoading(true);
      const res = await fetch(`/api/artists/get-all-artists/${genre}`);
      const data = await res.json();
      if (sortMethodByIncreasingOrDecreasing === "increasing") {
        if (sortMethodByPopularityOrVotesOrFollowers === "popularity") {
          data.sort((a: Artist, b: Artist) => a.popularity - b.popularity);
        } else if (sortMethodByPopularityOrVotesOrFollowers === "votes") {
          data.sort((a: Artist, b: Artist) => a.votes - b.votes);
        } else {
          data.sort((a: Artist, b: Artist) => a.followers - b.followers);
        }
      } else {
        if (sortMethodByPopularityOrVotesOrFollowers === "popularity") {
          data.sort((a: Artist, b: Artist) => b.popularity - a.popularity);
        } else if (sortMethodByPopularityOrVotesOrFollowers === "votes") {
          data.sort((a: Artist, b: Artist) => b.votes - a.votes);
        } else {
          data.sort((a: Artist, b: Artist) => b.followers - a.followers);
        }
      }
      setArtists(data);
      setIsLoading(false);
    }
    initialize();
  }, [
    sortMethodByPopularityOrVotesOrFollowers,
    sortMethodByIncreasingOrDecreasing,
    genre,
  ]);

  const totalPages = Math.ceil(artists.length / artistPerPage);

  // Fonction pour obtenir les artistes de la page courante
  const getCurrentPageArtists = () => {
    const startIndex = (currentPage - 1) * artistPerPage;
    const filteredArtists = artists
      .map((artist, index) => ({
        ...artist,
        originalIndex: index + 1
      }))
      .filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return filteredArtists.slice(startIndex, startIndex + artistPerPage);
  };

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

  const renderCarousels = () => {
    const currentArtists = getCurrentPageArtists();
    const numberOfCarousels = Math.ceil(
      currentArtists.length / artistPerCarousel
    );
    const carousels = [];

    // On crée un tableau de carousels basé sur le nombre de tracks de la page courante
    for (let i = 0; i < numberOfCarousels; i++) {
      const startIndex = i * artistPerCarousel;
      const carouselArtists = currentArtists.slice(
        startIndex,
        startIndex + artistPerCarousel
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
            {carouselArtists.map((artist) => (
              <CarouselItem
                key={`artist-${artist._id}-${currentPage}`}
                className="basis-auto pl-10"
              >
                <CardRankingArtist
                  _id={artist._id}
                  name={artist.name}
                  image={artist.images[0].url}
                  votes={artist.votes}
                  width={artist.images[0].width}
                  height={artist.images[0].height}
                  ranking={artist.originalIndex <= 5 ? artist.originalIndex : 0}
                  podium={artist.originalIndex <= 5}
                  popularity={artist.popularity}
                  followers={artist.followers}
                  shareLink={artist.share_link}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-blueColorTertiary" />
          <CarouselNext className="bg-blueColorTertiary" />
        </Carousel>
      );
    }
    return carousels;
  };

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
      <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-20 lg:w-[700px] xl:w-[1200px] mx-auto">
        {getCurrentPageArtists().map((artist) => (
          <CardRankingArtist
            key={`track-grid-${artist._id}`}
            _id={artist._id}
            name={artist.name}
            image={artist.images[0].url}
            votes={artist.votes}
            width={artist.images[0].width}
            height={artist.images[0].height}
            ranking={artist.originalIndex <= 5 ? artist.originalIndex : 0}
            podium={artist.originalIndex <= 5}
            popularity={artist.popularity}
            followers={artist.followers}
            shareLink={artist.share_link}
          />
        ))}
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
