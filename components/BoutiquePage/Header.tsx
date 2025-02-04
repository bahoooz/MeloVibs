"use client";

import { Button } from "../ui/button";
import React from "react";
import Link from "next/link";
import { Gift } from "@phosphor-icons/react";
import RecommendedShopItems from "./RecommendedShopItems";

export default function Header() {
  return (
    <header className="mt-48 lg:mt-52 xl:mt-56">
      <div className="flex flex-col items-center xl:items-start gap-20 xl:gap-40 xl:flex-row xl:justify-between xl:max-w-[1200px] xl:mx-auto">
        <div className="flex flex-col gap-10 sm:w-[600px] lg:w-[700px] xl:w-[500px] mt-12">
          <div className="flex items-end gap-5">
            <Gift className="text-greenColorSecondary min-w-[60px] min-h-[60px] -mb-[6px]" />
            <h1 className="text-5xl">Boutique</h1>
          </div>
          <div className="flex flex-col gap-5 sm:text-justify xl:text-lg">
            <p>
              Bienvenue dans la boutique MeloVib&apos;s, l&apos;endroit où vous pouvez
              acheter des{" "}
              <span className="text-greenColorSecondary">
                récompenses uniques
              </span>{" "}
              avec vos{" "}
              <span className="text-greenColorSecondary">
                points acquis grâce à vos votes
              </span>{" "}
              ! 🎁
            </p>
            <p>
              Profitez de{" "}
              <span className="text-greenColorSecondary">
                cadeaux exclusifs
              </span>{" "}
              et d&apos;objets uniques spécialement pensés pour les fans de musique. Plus
              vous{" "}
              <span className="text-greenColorSecondary">
                participez et votez
              </span>
              , plus vous{" "}
              <span className="text-greenColorSecondary">
                débloquez du contenu
              </span>{" "}
              pour vivre une expérience encore plus enrichissante sur MeloVib&apos;s.
            </p>
            <p>
              ➡️ Découvrez tout ce que votre passion pour la musique peut vous{" "}
              <span className="text-greenColorSecondary">offrir</span> !
            </p>
          </div>
          <Link href={"#badges"} className="sm:w-fit">
            <Button className="w-full">Découvrir la boutique</Button>
          </Link>
        </div>
        <RecommendedShopItems />
      </div>
    </header>
  );
}
