import LatinesContent from "@/components/classements/ContentForTracks/LatinesContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement morceaux Latines",
  "Découvrez les meilleurs morceaux Latines. Votez pour vos morceaux préférés et suivez les tendances de la musique latine.",
  [
    "latines",
    "musique latines",
    "top latines",
    "classement latines",
    "meilleurs morceaux latines",
    "latines pop",
    "hits latines",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Latines() {
  return <LatinesContent />;
}