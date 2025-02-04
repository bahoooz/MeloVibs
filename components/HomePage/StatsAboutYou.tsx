import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Image } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useShopStore } from "@/store/useShopStore";
import NextImage from "next/image";

export default function StatsAboutYou({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const { items, fetchItems } = useShopStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      if (items.length === 0) {
        await fetchItems();
      }
      setIsLoading(false);
    };
    initialize();
  }, [items.length, fetchItems]);

  // Filtrer les badges de l'inventaire
  const userBadges = session?.user?.inventory
    ?.map((inventoryItem) => {
      const shopItem = items.find(
        (item) =>
          item._id?.toString() === inventoryItem.itemId.toString() &&
          item.type === "badge"
      );
      return shopItem;
    })
    .filter(Boolean) // Enlève les undefined
    .sort((a, b) => (a?.price || 0) - (b?.price || 0)); // Trie par prix croissant

  if (status === "loading" || isLoading) {
    return (
      <section className="mt-32 lg:mt-44">
        <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
          Quelques statistiques sur vous
        </h2>
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="w-full max-w-md space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`mt-32 lg:mt-44 ${className}`}>
      <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
        Quelques statistiques sur vous
      </h2>
      {session ? (
        <div className="flex flex-col gap-10 sm:gap-16 sm:flex-row sm:items-center sm:justify-center">
          <Avatar className="w-full h-auto aspect-square max-h-[400px] max-w-[400px] mx-auto sm:mx-0 sm:w-[200px] lg:w-[300px] sm:h-[200px] lg:h-[300px] sm:max-w-fit bg-greenColorSecondary border-4 lg:border-8">
            <AvatarFallback className="text-7xl sm:text-6xl lg:text-8xl font-medium">
              {session.user?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-5 text-lg lg:text-xl mx-auto sm:mx-0">
            <p>
              Vous êtes{" "}
              <span className="text-greenColorSecondary">
                {session.user?.name}
              </span>
            </p>
            <p>
              Vous êtes inscrit depuis le{" "}
              <span className="text-greenColorSecondary">
                {new Date(session.user?.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p>
              Vous avez voté{" "}
              <span className="text-greenColorSecondary">
                {session.user?.votedTracks?.length} fois
              </span>
            </p>
            <p>
              Et vous possédez{" "}
              <span className="text-greenColorSecondary">
                {userBadges?.length || 0} badge(s)
              </span>
            </p>
            <div className="flex flex-wrap gap-1">
              {userBadges?.map((item) => (
                <NextImage
                  key={item?._id as string}
                  src={item?.imageUrl as string}
                  alt={item?.name as string}
                  width={64}
                  height={64}
                  className="w-10 h-10 object-cover cursor-pointer hover:scale-110 transition-all duration-300"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 sm:gap-16 sm:flex-row sm:items-center sm:justify-center">
          <div className="flex items-center justify-center rounded-full w-full aspect-square max-h-[400px] max-w-[400px] mx-auto sm:mx-0 sm:w-[200px] lg:w-[300px] sm:h-[200px] lg:h-[300px] sm:max-w-fit bg-greenColorSecondary">
            <Image size={112} />
          </div>
          <div className="flex flex-col gap-5 text-lg lg:text-xl mx-auto sm:mx-0">
            <p>
              Vous êtes <span className="text-greenColorSecondary">...</span>
            </p>
            <p>
              Vous êtes inscrit depuis le{" "}
              <span className="text-greenColorSecondary">...</span>
            </p>
            <p>
              Vous avez voté{" "}
              <span className="text-greenColorSecondary">...</span>
            </p>
            <p>
              Et vous possédez{" "}
              <span className="text-greenColorSecondary">...</span>
            </p>
          </div>
        </div>
      )}
      {session ? null : (
        <div className="mx-auto w-fit mt-10 lg:mt-16 xl:mt-20">
          <Link href="/connexion">
            <Button>Rejoignez nous pour voir vos statistiques</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
