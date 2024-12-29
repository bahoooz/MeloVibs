import RockContent from "@/components/classements/ContentForArtists/RockContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement artistes Rock",
  "Découvrez les meilleurs artistes Rock. Votez pour vos artistes préférés et suivez les tendances de la musique Rock.",
  [
    "rock",
    "musique rock",
    "top rock",
    "classement rock",
    "meilleurs artistes rock",
    "rock pop",
    "hits rock",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
);

export default function Rock() {
  return <RockContent />;
}