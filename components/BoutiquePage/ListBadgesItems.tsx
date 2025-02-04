"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useShopStore } from "@/store/useShopStore";
import CardShopItem from "./CardShopItem";
import { toast } from "@/hooks/use-toast";
import { Spiral } from "@phosphor-icons/react";

export default function ListBadgesItems() {
  const { items, purchaseItem } = useShopStore();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items.length > 0) {
      setIsLoading(false);
    }
  }, [items]);

  const handlePurchase = async (itemId: string) => {
    if (!session) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour effectuer un achat",
      });
      return;
    }

    await purchaseItem(itemId, async () => {
      await update();
    });
  };

  const hasItem = (itemId: string) => {
    return session?.user?.inventory?.some(
      (item) => item.itemId.toString() === itemId
    );
  };

  return (
    <div id="badges" className="mt-40 sm:max-w-[600px] lg:max-w-fit lg:w-[700px] xl:w-[1200px] sm:mx-auto">
      <div className="flex items-center gap-8 mb-20 xl:mb-32">
        <h2 className="text-xl text-greenColorSecondary shrink-0">badges</h2>
        <div className="bg-greenColorSecondary flex-1 lg:min-w-[608.45px] xl:min-w-[1026.09px] h-[3px] rounded-full"></div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center min-w-full h-[500px] xl:h-[250px]">
          <Spiral className="animate-spin text-greenColorSecondary" size={80} />
        </div>
      ) : (
        <>
          <div className="hidden xl:grid w-[1200px] grid-cols-4 grid-rows-2 gap-7">
            {items
              .filter((item) => item.type === "badge")
              .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
              .map((item) => (
                <div key={item._id as string} className="p-1">
                  <CardShopItem
                    image={item.imageUrl as string}
                    name={item.name}
                    width={172}
                    height={172}
                    price={item.price}
                    description={item.description}
                    condition={item.metadata?.condition_text as string}
                    onClick={() => handlePurchase(item._id as string)}
                    type={item.type}
                    userHasItem={
                      item.type === "badge" && hasItem(item._id as string)
                    }
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-20 xl:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {items
                  .filter((item) => item.type === "badge")
                  .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
                  .slice(0, 4)
                  .map((item) => (
                    <CarouselItem
                      key={item._id as string}
                      className="sm:basis-1/2"
                    >
                      <div className="p-1">
                        <CardShopItem
                          image={item.imageUrl as string}
                          name={item.name}
                          width={172}
                          height={172}
                          price={item.price}
                          description={item.description}
                          condition={item.metadata?.condition_text as string}
                          onClick={() => handlePurchase(item._id as string)}
                          type={item.type}
                        />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-12 mt-8 sm:mt-12">
                <CarouselPrevious className="static xl:absolute translate-y-0 h-10 w-10 sm:h-12 sm:w-12 xl:-left-16 xl:top-[40%] xl:-translate-y-1/2" />
                <CarouselNext className="static xl:absolute translate-y-0 h-10 w-10 sm:h-12 sm:w-12 xl:-right-16 xl:top-[40%] xl:-translate-y-1/2" />
              </div>
            </Carousel>
            <Carousel className="w-full">
              <CarouselContent>
                {items
                  .filter((item) => item.type === "badge")
                  .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
                  .slice(4, 8)
                  .map((item) => (
                    <CarouselItem
                      key={item._id as string}
                      className="sm:basis-1/2"
                    >
                      <div className="p-1">
                        <CardShopItem
                          image={item.imageUrl as string}
                          name={item.name}
                          width={172}
                          height={172}
                          price={item.price}
                          description={item.description}
                          condition={item.metadata?.condition_text as string}
                          onClick={() => handlePurchase(item._id as string)}
                          type={item.type}
                        />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-12 mt-8 sm:mt-12">
                <CarouselPrevious className="static xl:absolute translate-y-0 h-10 w-10 sm:h-12 sm:w-12 xl:-left-16 xl:top-[40%] xl:-translate-y-1/2" />
                <CarouselNext className="static xl:absolute translate-y-0 h-10 w-10 sm:h-12 sm:w-12 xl:-right-16 xl:top-[40%] xl:-translate-y-1/2" />
              </div>
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
}
