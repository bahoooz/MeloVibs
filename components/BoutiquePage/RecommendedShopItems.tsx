import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { useShopStore } from "@/store/useShopStore";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Coins, Info, PlusCircle } from "@phosphor-icons/react";
import { Skeleton } from "../ui/skeleton";

export default function RecommendedShopItems() {
  const { items, fetchItems, purchaseItem } = useShopStore();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
    setIsLoading(false);
  }, [fetchItems]);

  const handlePurchase = async (itemId: string) => {
    if (!session) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour effectuer un achat",
      });
      return;
    }

    const success = await purchaseItem(itemId);
    if (success) {
      // Mettre à jour la session pour refléter les nouveaux points
      await update();
    }
  };

  const hasItem = (itemId: string) => {
    return session?.user?.inventory?.some(
      (item) => item.itemId.toString() === itemId
    );
  };

  if (isLoading) {
    return (
      <div className="w-full xl:w-[450px] sm:w-[600px] lg:w-[700px]">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <CardHeader className="w-full p-0">
              <Skeleton className="aspect-square w-full rounded-[30px]" />
            </CardHeader>
            <CardFooter className="flex w-full justify-between items-center px-0">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-[150px] sm:w-[300px] lg:w-[400px] xl:w-[200px]" />
                <Skeleton className="h-8 w-[200px] sm:w-[400px] lg:w-[500px] xl:w-[250px]" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
                <Skeleton className="h-8 w-28" />
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Carousel
      className="w-full sm:w-[600px] lg:w-[700px] xl:w-[450px] relative"
      autoPlay
      autoPlayInterval={3000}
      loop
    >
      {isLoading ? (
        ""
      ) : (
        <div className="absolute -top-2 right-1/2 translate-x-1/2 xl:translate-x-0 bg-btnColorIsVoted xl:-right-1 w-[85%] max-w-[250px] text-center z-50 px-2 py-2 sm:px-4 sm:py-3 rounded-xl border-4 border-greenColorSecondary">
          🔮 récompenses aléatoires
        </div>
      )}
      <CarouselContent>
        {items
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map((item) => (
            <CarouselItem key={item._id as string}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center">
                    <CardHeader className=" w-full h-full flex justify-center items-center bg-[#252639] bg-opacity-40 border-4 border-greenColorSecondary rounded-[10px] relative">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={172}
                          height={172}
                          className="object-cover w-[172px] sm:w-[300px] xl:w-[200px]"
                          unoptimized
                        />
                      )}
                      <div
                        className={`absolute bottom-2 sm:bottom-4 lg:bottom-5 xl:bottom-2 ${
                          !item?.metadata?.condition_text
                            ? "w-fit right-0"
                            : "w-full"
                        } flex justify-between items-center px-3 sm:px-6 lg:px-8 xl:px-3`}
                      >
                        {item?.metadata?.condition_text && (
                          <p className="text-xs sm:text-sm lg:text-base xl:text-sm flex items-center text-yellowColorOthers gap-1 sm:gap-2">
                            <Info
                              size={18}
                              className="sm:min-w-6 sm:min-h-6 lg:min-w-7 lg:min-h-7 xl:min-w-6 xl:min-h-6"
                            />{" "}
                            {item?.metadata?.condition_text}
                          </p>
                        )}
                        <span className="text-xl sm:text-2xl lg:text-3xl xl:text-2xl flex items-center gap-[6px] lg:gap-2 font-medium text-yellowColorOthers">
                          {item.price}{" "}
                          <Coins
                            size={28}
                            className="sm:min-w-8 sm:min-h-8 lg:min-w-10 lg:min-h-10 xl:min-w-7 xl:min-h-7"
                            weight="duotone"
                          />
                        </span>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex flex-col xl:flex-row items-start xl:items-center xl:justify-between">
                      <div className="flex flex-col gap-3 sm:gap-5 xl:gap-3 my-6 sm:my-10 xl:my-6 xl:w-[60%]">
                        <h3 className="text-lg sm:text-xl">{item.name}</h3>
                        <p className="text-xs sm:text-sm">
                          {item?.description}
                        </p>
                      </div>
                      <Button
                        className="w-full flex items-center justify-center gap-2 xl:px-4 xl:w-fit"
                        onClick={() => handlePurchase(item._id as string)}
                        disabled={
                          item.type === "badge" && hasItem(item._id as string)
                        }
                      >
                        {item.type === "badge" &&
                        hasItem(item._id as string) ? (
                          <CheckCircle className="min-w-6 min-h-6" />
                        ) : (
                          <PlusCircle className="min-w-6 min-h-6" />
                        )}
                        {item.type === "badge" && hasItem(item._id as string)
                          ? "Déjà possédé"
                          : "Acheter"}
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-12 mt-8 sm:mt-12">
        <CarouselPrevious className="static xl:absolute translate-y-0 h-10 w-10 sm:h-12 sm:w-12 xl:-left-16 xl:top-[40%] xl:-translate-y-1/2" />
        <CarouselNext className="static xl:absolute translate-y-0 h-10 w-10 sm:h-12 sm:w-12 xl:-right-16 xl:top-[40%] xl:-translate-y-1/2" />
      </div>
    </Carousel>
  );
}
