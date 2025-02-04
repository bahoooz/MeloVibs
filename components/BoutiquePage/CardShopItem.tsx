import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { CheckCircle, Coins, Info, PlusCircle } from "@phosphor-icons/react";

interface CardShopItemProps {
  image: string;
  name: string;
  width: number;
  height: number;
  price: number;
  description: string;
  condition: string;
  onClick: () => void;
  type: string;
  userHasItem?: boolean;
}

const formatPrice = (price: number): string => {
  if (price >= 1000) {
    const priceInK = price / 1000;
    // Si le nombre est un entier en milliers (ex: 1000, 2000, etc.), on n'affiche pas le .0
    return Number.isInteger(priceInK)
      ? `${priceInK}k`
      : `${priceInK.toFixed(1)}k`;
  }
  return price.toString();
};

export default function CardShopItem({
  image,
  name,
  width,
  height,
  price,
  description,
  condition,
  onClick,
  userHasItem
}: CardShopItemProps) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex flex-col aspect-square items-center justify-center">
        <CardHeader className=" w-full h-full flex justify-center items-center bg-[#252639] bg-opacity-40 rounded-[10px] relative">
          <Image
            src={image}
            alt={name}
            width={width}
            height={height}
            className="object-cover w-[172px] sm:w-[150px] lg:w-[180px] xl:w-[165px]"
            unoptimized
          />
          <div className={`absolute bottom-2 lg:bottom-3 xl:bottom-2 ${!condition ? "w-fit right-0" : "w-full"} flex justify-between items-center px-3 lg:px-4 xl:px-2`}>
            {condition && (
              <p className="text-xs flex items-center text-yellowColorOthers gap-1 sm:gap-2 xl:gap-1">
                <Info
                  size={18}
                  className="lg:min-w-7 lg:min-h-7 xl:min-w-6 xl:min-h-6"
                />{" "}
                {condition}
              </p>
            )}

            <span className="text-xl sm:text-lg flex items-center gap-[6px] lg:gap-2 font-medium text-yellowColorOthers">
              {formatPrice(price)}{" "}
              <Coins
                size={28}
                className="xl:min-w-7 xl:min-h-7"
                weight="duotone"
              />
            </span>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-row items-start justify-between mt-6 xl:mt-5 gap-8 sm:gap-6 lg:gap-8 xl:gap-5">
          <div className="flex flex-col gap-3 sm:w-[80%] xl:w-full">
            <h3 className="text-lg sm:text-xl">{name}</h3>
            <p className="text-xs">{description}</p>
          </div>
          <Button
            className="min-w-14 h-14 p-0 flex items-center justify-center gap-2 rounded-xl"
            onClick={onClick}
            disabled={userHasItem}
          >
            {userHasItem ? (
              <CheckCircle className="min-w-8 sm:min-w-9 min-h-8 sm:min-h-9" />
            ) : (
              <PlusCircle className="min-w-8 sm:min-w-9 min-h-8 sm:min-h-9" />
            )}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
