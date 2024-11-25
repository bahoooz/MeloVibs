import React from "react";
import { Button } from "../ui/button";
import MostPopularTracks from "./MostPopularTracks";

export default function Header() {
  return (
    <header className="mt-48">
      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-5xl">WazyUp</h1>
          <div className="flex flex-col  gap-5">
            <p>
              La plateforme musicale ultime où{" "}
              <span className="text-[#28CB62]">
                tu as le pouvoir de décider quelle musique règne chaque mois
              </span>{" "}
              ! 🎶{" "}
            </p>
            <p>
              <span className="text-[#28CB62]">Découvre</span>,{" "}
              <span className="text-[#28CB62]">écoute</span> et{" "}
              <span className="text-[#28CB62]">vote</span> pour tes morceaux
              préférés dans différents genres musicaux. Suis les{" "}
              <span className="text-[#28CB62]">classements évolutifs</span> et
              découvre les hits qui font vibrer la communauté. À toi de{" "}
              <span className="text-[#28CB62]">
                propulser tes artistes favoris au sommet
              </span>{" "}
              et de participer à l'aventure musicale avec des{" "}
              <span className="text-[#28CB62]">
                votes qui comptent vraiment
              </span>{" "}
              ! 🎤✨
            </p>{" "}
            <p>
              Chaque mois, explore les tendances et fais entendre ta voix dans
              un{" "}
              <span className="text-[#28CB62]">
                univers musical interactif et dynamique
              </span>
              . 🌟
            </p>
          </div>
          <Button>Nous rejoindre</Button>
        </div>
        <MostPopularTracks />
      </div>
    </header>
  );
}
