import RnBContent from "@/components/classements/ContentForTracks/R&BContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement morceaux R&B",
  "Découvrez les meilleurs morceaux R&B. Votez pour vos morceaux préférés et suivez les tendances de la musique r&b.",
  [
    "r&b",
    "musique r&b",
    "top r&b",
    "classement r&b",
    "meilleurs morceaux r&b",
    "r&b pop",
    "hits r&b",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function RnB() {
  return <RnBContent />;
}