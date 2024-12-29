import { generateMetadata } from "@/lib/metadata";
import AfroBeatsContent from "@/components/classements/ContentForTracks/AfroBeatsContent";

export const metadata = generateMetadata(
  "Classement morceaux Afrobeats",
  "Découvrez les meilleurs morceaux Afrobeats. Votez pour vos morceaux préférés et suivez les tendances de la musique africaine moderne.",
  [
    "afrobeats",
    "musique africaine",
    "top afrobeats",
    "classement afrobeats",
    "meilleurs morceaux afro",
    "afro pop",
    "hits africains",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function AfroBeats() {
  return <AfroBeatsContent />;
}
