import JazzContent from "@/components/classements/ContentForArtists/JazzContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Artistes Jazz",
  "Découvrez les meilleurs artistes Jazz. Votez pour vos artistes préférés et suivez les tendances de la musique jazz.",
  [
    "jazz",
    "musique jazz",
    "top jazz",
    "classement jazz",
    "meilleurs artistes jazz",
    "jazz pop",
    "hits jazz",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Jazz() {
  return <JazzContent />;
}