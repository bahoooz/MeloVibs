import PopContent from "@/components/classements/ContentForTracks/PopContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement morceaux Pop",
  "Découvrez les meilleurs morceaux Pop. Votez pour vos morceaux préférés et suivez les tendances de la musique pop.",
  [
    "pop",
    "musique pop",
    "top pop",
    "classement pop",
    "meilleurs morceaux pop",
    "pop pop",
    "hits pop",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Pop() {
  return <PopContent />;
}