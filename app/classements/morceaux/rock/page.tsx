import RockContent from "@/components/classements/ContentForTracks/RockContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Morceaux Rock",
  "Découvrez les meilleurs morceaux Rock. Votez pour vos morceaux préférés et suivez les tendances de la musique rock.",
  [
    "rock",
    "musique rock",
    "top rock",
    "classement rock",
    "meilleurs morceaux rock",
    "rock pop",
    "hits rock",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Rock() {
  return <RockContent />;
} 