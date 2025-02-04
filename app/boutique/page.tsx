import React from "react";
import { generateMetadata } from "@/lib/metadata";
import BoutiqueContent from "@/components/BoutiquePage/BoutiqueContent";

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
    <BoutiqueContent />
  );
}
