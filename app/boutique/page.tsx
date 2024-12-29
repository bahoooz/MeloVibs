import PageNotCreatedYet from "@/components/global/PageNotCreatedYet";
import React from "react";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Boutique",
  "Découvrez la boutique MeloVib's. Vous pourrez bientôt bénéficier de récompenses avec vos points.",
  [
    "boutique",
    "melovib's",
    "shop",
    "points",
    "récompenses"
  ],
);

export default function Boutique() {
  return (
    <div>
      <PageNotCreatedYet
        note={
          <p className="text">
            Cette page accueillera la boutique pour permettre à nos utilisateurs
            de{" "}
            <span className="text-greenColorSecondary">
              bénéficier de récompenses
            </span>{" "}
            en{" "}
            <span className="text-greenColorSecondary">
              fonction de leurs votes
            </span>
            . <br /> <br /> Nous vous demandons de{" "}
            <span className="text-greenColorSecondary">
              partager cette plateforme
            </span>{" "}
            avec toute personne passionnée de musique ou qui pourrait être
            intéressée par l’utilisation de notre plateforme, afin de permettre
            à MeloVib’s{" "}
            <span className="text-greenColorSecondary">
              d’obtenir des partenariats et des sponsors
            </span>{" "}
            avec des marques pour vous proposer une{" "}
            <span className="text-greenColorSecondary">
              boutique à la hauteur
            </span>{" "}
            de nos attentes, et de{" "}
            <span className="text-greenColorSecondary">
              celles de la communauté
            </span>
            . <br /> <br /> Nous vous remercions d’avance et nous continuons
            chaque jour de tenter d’améliorer MeloVib’s pour nous satisfaire et,
            surtout,{" "}
            <span className="text-greenColorSecondary">
              vous satisfaire, nos utilisateurs
            </span>
            .
          </p>
        }
      />
    </div>
  );
}
