import { TrackWithId } from "@/app/profil/votes/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spiral } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";


export function ModalHistory({ className, votedTracks }: { className: string, votedTracks: TrackWithId[] }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setIsLoading(false);
    }
  }, [session]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={`${className} bg-greenColorSecondary border-none`}
        >
          Voir l&apos;historique
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none bg-[#252639] hidden lg:block xl:hidden">
        <AlertDialogHeader className="mb-8">
          <AlertDialogTitle>Historique des votes</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center min-w-full h-[500px] xl:h-[250px]">
              <Spiral
                className="animate-spin text-greenColorSecondary"
                size={80}
              />
            </div>
          ) : (
            <div
              className={`grid grid-cols-3 mx-auto gap-4 sm:gap-6 xl:gap-4 min-w-[365.69] max-h-[500px] overflow-y-scroll history-container ${
                session?.user?.isAdmin ? "xl:max-h-[285px]" : "xl:max-h-[250px]"
              } `}
            >
              {votedTracks.map((track: TrackWithId) => (
                <div
                  key={track._id.toString()}
                  className="w-full aspect-square relative flex flex-col justify-center items-center overflow-hidden rounded-2xl text-center px-2 shadow-xl"
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
        <AlertDialogFooter>
          <AlertDialogAction>Fermer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
