import AfroBeatsContent from "@/components/classements/ContentForArtists/AfroBeatsContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement artistes Afrobeats",
  "Découvrez les meilleurs artistes Afrobeats. Votez pour vos artistes préférés et suivez les tendances de la musique africaine moderne.",
  [
    "afrobeats",
    "musique africaine",
    "top afrobeats",
    "classement afrobeats",
    "meilleurs artistes afro",
    "afro pop",
    "hits africains",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function AfroBeats() {
  return <AfroBeatsContent />;
}