import PageNotCreatedYet from "@/components/global/PageNotCreatedYet";
import Link from "next/link";
import React from "react";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Qui sommes-nous ?",
  "Découvrez l'histoire de MeloVib's. La vision de la plateforme, les idées futures, l'équipe et bien plus encore...",
  [
    "histoire",
    "melovib's",
    "création",
    "plateforme",
    "idée",
    "mise en place",
    "vision",
    "idées futures",
    "équipe",
    "communauté",
    "discord"
  ],
);

export default function Histoire() {
  return (
    <div>
      <PageNotCreatedYet
        note={
          <p>
            Cette page abordera{" "}
            <span className="text-greenColorSecondary">
              l&apos;histoire de la plateforme
            </span>
            , comment son créateur en a eu l&apos;idée, l&apos;a mise en place, mais
            surtout la{" "}
            <span className="text-greenColorSecondary">
              vision de la plateforme
            </span>
            ,{" "}
            <span className="text-greenColorSecondary">les idées futures</span>,
            l&apos;équipe et{" "}
            <span className="text-greenColorSecondary">
              bien plus encore...
            </span>{" "}
            <br /> <br />
            En attendant, nous vous invitons à rejoindre{" "}
            <Link
              className="text-blueColorTertiary underline"
              href={"https://discord.gg/StTxKe7DwY"}
            >
              ce Discord
            </Link>{" "}
            <span className="text-sm text-gray-400">
              (lui-même en cours de création)
            </span>{" "}
            pour faire partie de la{" "}
            <span className="text-greenColorSecondary">
              communauté sur Discord
            </span>
            .
          </p>
        }
      />
    </div>
  );
}
