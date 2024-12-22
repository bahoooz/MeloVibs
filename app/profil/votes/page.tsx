"use client";

import ProfileContainer from "@/components/ProfilePage/ProfileContainer";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VotesTimer from "@/components/HomePage/VotesTimer";
import Image from "next/image";
import { Spiral } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function Votes() {
  const { data: session } = useSession();
  const [votedTracks, setVotedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVotedTracks = async () => {
      if (session?.user?.votedTracks) {
        try {
          setIsLoading(true);
          const response = await fetch("/api/user/history-tracks");
          if (!response.ok)
            throw new Error("Erreur lors de la récupération des tracks");

          const data = await response.json();
          console.log("Réponse API:", data);
          setVotedTracks(data.tracks);
        } catch (error) {
          console.error("Erreur:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchVotedTracks();
  }, [session]);

  return (
    <ProfileContainer>
      <div className="lg:py-12 xl:py-16 lg:px-12 xl:px-24 lg:w-[462.69px] lg:h-[778px] xl:max-h-[778px] xl:w-full">
        <h1 className="font-medium text-2xl text-greenColorSecondary mb-16 xl:mb-0">
          Gérez vos votes
        </h1>
        <div className="xl:flex xl:justify-between xl:gap-12">
          <div className="flex justify-center lg:justify-between xl:justify-start xl:h-fit gap-[10vw] md:gap-24 lg:gap-0 xl:gap-8 lg:w-full xl:w-fit xl:mt-16">
            <div className="flex xl:flex-col items-end xl:items-start gap-4 xl:w-[140px]">
              <h2 className="writing-mode-vertical xl:writing-mode-horizontal uppercase font-semibold text-xl">
                Total votes
              </h2>
              <div className="bg-blueColorTertiary w-[100px] sm:w-[120px] h-[300px] relative rounded-xl shadow-xl">
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-semibold text-3xl">
                  {session?.user?.votedTracks.length}
                </span>
              </div>
            </div>
            <div className="flex xl:flex-col xl:justify-end items-end xl:items-start gap-4 xl:w-[185px]">
              <h2 className="writing-mode-vertical xl:writing-mode-horizontal uppercase font-semibold text-xl">
                Votes restants
              </h2>
              <div className="bg-greenColorSecondary w-[100px] sm:w-[120px] h-[150px] relative rounded-xl shadow-xl">
                <span
                  className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-semibold ${
                    session?.user?.isAdmin ? "text-4xl" : "text-3xl"
                  }`}
                >
                  {session?.user?.isAdmin ? "∞" : session?.user?.remainingVotes}
                </span>
              </div>
            </div>
          </div>
          <div>
            {!session?.user?.isAdmin && (
              <div className="flex justify-center items-end text-blueColorTertiary text-3xl font-semibold gap-2 mt-16 xl:mt-0 xl:w-fit">
                {session?.user?.lastVoteRefresh ? (
                  <VotesTimer lastVoteRefresh={session.user.lastVoteRefresh} />
                ) : (
                  <h2>xx:xx:xx</h2>
                )}
                <span className="lg:text-xl xl:text-2xl">
                  + 2 votes (10 max)
                </span>
              </div>
            )}
            <div className="mt-16">
              <h2 className="mb-6 lg:mb-8 uppercase font-semibold text-xl">
                Historique
              </h2>
              <Button className="hidden lg:block xl:hidden">
                Voir l'historique
              </Button>
              <div className="lg:hidden xl:block">
                {isLoading ? (
                  <div className="flex justify-center items-center h-[500px] xl:h-[250px]">
                    <Spiral
                      className="animate-spin text-greenColorSecondary"
                      size={80}
                    />
                  </div>
                ) : (
                  <div
                    className={`grid grid-cols-3 mx-auto gap-4 sm:gap-6 xl:gap-4 w-full max-h-[500px] ${
                      session?.user?.isAdmin
                        ? "xl:max-h-[285px]"
                        : "xl:max-h-[250px]"
                    } overflow-y-scroll`}
                  >
                    {votedTracks.map((track: any) => (
                      <div
                        key={track._id}
                        className="w-full h-[25vw] sm:h-[184px] xl:h-[121.22px] relative flex flex-col justify-center items-center overflow-hidden rounded-2xl text-center px-2 shadow-xl"
                      >
                        <h3 className="text-greenColorSecondary font-medium mb-2 relative z-10">
                          {track.artists[0].name}
                        </h3>
                        <h3 className="font-medium truncate max-w-full relative z-10">
                          {track.name}
                        </h3>
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1]"></div>
                        <Image
                          src={track.album.images[0].url}
                          alt={track.name}
                          width={track.album.images[0].width}
                          height={track.album.images[0].height}
                          className="w-full h-full object-cover absolute top-0 left-0 z-0"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
}
