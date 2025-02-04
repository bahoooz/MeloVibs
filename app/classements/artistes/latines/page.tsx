import LatinesContent from "@/components/classements/ContentForArtists/LatinesContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Artistes Latines",
  "Découvrez les meilleurs artistes Latines. Votez pour vos artistes préférés et suivez les tendances de la musique latine.",
  [
    "latines",
    "musique latine",
    "top latines",
    "classement latines",
    "meilleurs artistes latines",
    "latines pop",
    "hits latines",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
);

export default function Latines() {
  return <LatinesContent />;
}