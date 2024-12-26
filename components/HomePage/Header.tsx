import React from "react";
import { Button } from "../ui/button";
import MostPopularTracks from "./MostPopularTracks";
import Link from "next/link";
import MeloVibsTitle from "../global/MeloVibsTitle";

export default function Header() {
  return (
    <header className="mt-48 lg:mt-52 xl:mt-56">
      <div className="flex flex-col items-center xl:items-start gap-20 xl:gap-40 xl:flex-row xl:justify-between xl:max-w-[1200px] xl:mx-auto">
        <div className="flex flex-col gap-10 sm:w-[600px] lg:w-[700px] xl:w-[500px] xl:mt-12">
          <h1 className="font-[500] text-5xl title">
            <MeloVibsTitle />
          </h1>
          <div className="flex flex-col gap-5 sm:text-justify xl:text-lg">
            <p>
              La plateforme musicale{" "}
              <span className="text-greenColorSecondary">
                destinée aux fans de musique{" "}
              </span>
              qui vous permet de{" "}
              <span className="text-greenColorSecondary">
                voter pour vos morceaux préférés
              </span>{" "}
              ! 🎶
            </p>
            <p>
              <span className="text-greenColorSecondary">Découvre</span> et{" "}
              <span className="text-greenColorSecondary">vote</span> pour tes
              morceaux préférés dans différents genres musicaux. Suis les{" "}
              <span className="text-greenColorSecondary">
                classements évolutifs
              </span>{" "}
              et découvre les tendances qui font vibrer la communauté. À toi de{" "}
              <span className="text-greenColorSecondary">
                propulser tes artistes favoris
              </span>{" "}
              au sommet de MeloVib&apos;s et de participer à cette aventure musicale
              avec des votes qui{" "}
              <span className="text-greenColorSecondary">
                 soutiennent tes artistes préférés
              </span>{" "}
              ! 🎤✨
            </p>{" "}
            <p>
              Chaque mois, explore les classements et ajoute tes votes dans
              un{" "}
              <span className="text-greenColorSecondary">
                univers musical interactif et dynamique
              </span>
              . 🌟
            </p>
          </div>
          <Link href={"/inscription"} className="sm:w-fit">
            <Button className="w-full">Nous rejoindre</Button>
          </Link>
        </div>
        <MostPopularTracks />
      </div>
    </header>
  );
}
