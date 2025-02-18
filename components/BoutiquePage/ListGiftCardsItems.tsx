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

export default function ListGiftCardsItems() {
  const { items, purchaseItem } = useShopStore();
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, update } = useSession();

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

  return (
    <div className="mt-40 sm:max-w-[600px] lg:max-w-fit lg:w-[700px] xl:w-[1200px] sm:mx-auto">
      <div className="flex items-center gap-8 mb-20 xl:mb-32">
        <h2 className="text-xl text-greenColorSecondary shrink-0">cartes cadeaux</h2>
        <div className="bg-greenColorSecondary flex-1 xl:min-w-[1026.09px] h-[3px] rounded-full"></div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center min-w-full h-[500px] xl:h-[250px]">
          <Spiral
            className="animate-spin text-greenColorSecondary"
            size={80}
          />
        </div>
      ) : (
        <>
          <div className="hidden xl:grid w-[1200px] grid-cols-4 gap-7">
            {items
              .filter(item => item.type === 'giftcard')
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
              />
            </div>
          ))}
      </div>
      <div className="xl:hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {items.filter(item => item.type === 'giftcard').slice(0, 4).map((item) => (
              <CarouselItem
                key={item._id as string}
                className="sm:basis-1/2"
              >
                <div className="p-1">
                  <CardShopItem
                    image={item.imageUrl as string}
                    name={item.name}
                    width={item.metadata?.width_image || 172}
                    height={item.metadata?.height_image || 172}
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
