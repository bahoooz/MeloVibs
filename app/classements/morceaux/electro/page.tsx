import ElectroContent from "@/components/classements/ContentForTracks/ElectroContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Morceaux Electro",
  "Découvrez les meilleurs morceaux Electro. Votez pour vos morceaux préférés et suivez les tendances de la musique électronique.",
  [
    "electro",
    "musique électronique",
    "top electro",
    "classement electro",
    "meilleurs morceaux electro",
    "electro pop",
    "hits electro",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Electro() {
  return <ElectroContent />;
}