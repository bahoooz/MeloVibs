import JazzContent from "@/components/classements/ContentForTracks/JazzContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Morceaux Jazz",
  "Découvrez les meilleurs morceaux Jazz. Votez pour vos morceaux préférés et suivez les tendances de la musique jazz.",
  [
    "jazz",
    "musique jazz",
    "top jazz",
    "classement jazz",
    "meilleurs morceaux jazz",
    "jazz pop",
    "hits jazz",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Jazz() {
  return <JazzContent />;
}