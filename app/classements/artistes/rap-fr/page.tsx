import RapFrContent from "@/components/classements/ContentForArtists/RapFrContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Artistes Rap Français",
  "Découvrez les meilleurs artistes Rap Français. Votez pour vos artistes préférés et suivez les tendances de la musique Rap Français.",
  [
    "rap français",
    "musique rap français",
    "top rap français",
    "classement rap français",
    "meilleurs artistes rap français",
    "rap français pop",
    "hits rap français",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
);

export default function RapFr() {
  return <RapFrContent />;
}