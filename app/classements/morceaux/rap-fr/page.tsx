import RapFrContent from "@/components/classements/ContentForTracks/RapFrContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement morceaux Rap Français",
  "Découvrez les meilleurs morceaux Rap Français. Votez pour vos morceaux préférés et suivez les tendances de la musique rap français.",
  [
    "rap fr",
    "musique rap fr",
    "top rap fr",
    "classement rap fr",
    "meilleurs morceaux rap fr",
    "rap fr pop",
    "hits rap fr",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function RapFr() {
  return <RapFrContent />;
}