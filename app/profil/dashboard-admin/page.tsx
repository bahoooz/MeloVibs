"use client";

import ProfileContainer from "@/components/ProfilePage/ProfileContainer";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Spiral, Target } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateAllTracks } from "@/lib/updateAllTracks";
import { updateAllArtists } from "@/lib/updateAllArtists";

export default function DashboardAdmin() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  const [updateTracksSuccess, setUpdateTracksSuccess] = useState(false);
  const [updateArtistsSuccess, setUpdateArtistsSuccess] = useState(false);

  useEffect(() => {
    if (!session?.user?.isAdmin) {
      router.push("/");
    }
  }, [session, router]);

  const handleUpdateTracks = async () => {
    setIsLoadingTracks(true);
    setUpdateTracksSuccess(false);
    try {
      await updateAllTracks();
      setUpdateTracksSuccess(true);
      setTimeout(() => setUpdateTracksSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des morceaux:", error);
    } finally {
      setIsLoadingTracks(false);
    }
  };

  const handleUpdateArtists = async () => {
    setIsLoadingArtists(true);
    setUpdateArtistsSuccess(false);
    try {
      await updateAllArtists();
      setUpdateArtistsSuccess(true);
      setTimeout(() => setUpdateArtistsSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des artistes:", error);
    } finally {
      setIsLoadingArtists(false);
    }
  };

  return (
    <ProfileContainer>
      <div className="lg:py-12 xl:py-16 lg:px-12 xl:px-24 lg:w-[462.69px] lg:h-[778px] xl:max-h-[778px] xl:w-full">
        <h1 className="font-medium text-2xl text-greenColorSecondary mb-16 xl:mb-0">
          Dashboard Admin
        </h1>
        <div className="flex flex-col gap-8 mt-12">
          <div className="flex items-center gap-4">
            <p>
              Récupérer les{" "}
              <span className="underline">derniers morceaux des playlists</span>
            </p>
            <Button
              onClick={handleUpdateTracks}
              disabled={isLoadingTracks}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              {isLoadingTracks ? (
                <Spiral className="animate-spin min-w-7 min-h-7" />
              ) : (
                <Target className="min-w-7 min-h-7" />
              )}
            </Button>
            {updateTracksSuccess && (
              <p className="text-greenColorSecondary">Mise à jour réussie !</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p>
              Récupérer les{" "}
              <span className="underline">dernières données des artistes</span>
            </p>
            <Button
              onClick={handleUpdateArtists}
              disabled={isLoadingArtists}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              {isLoadingArtists ? (
                <Spiral className="animate-spin min-w-7 min-h-7" />
              ) : (
                <Target className="min-w-7 min-h-7" />
              )}
            </Button>
            {updateArtistsSuccess && (
              <p className="text-greenColorSecondary">Mise à jour réussie !</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p>
              Envoyer un <span className="underline">test de newsletter</span>
            </p>
            <Button
              onClick={async () => {
                try {
                  await fetch("/api/newsletter/test", {
                    method: "POST",
                  });
                  alert("Newsletter de test envoyée !");
                } catch (error) {
                  alert("Erreur lors de l'envoi de la newsletter");
                  console.error(error);
                }
              }}
              className="rounded-lg min-w-[48px] min-h-[48px]"
            >
              <Target className="min-w-7 min-h-7" />
            </Button>
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
}
