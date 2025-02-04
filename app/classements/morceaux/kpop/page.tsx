import KpopContent from "@/components/classements/ContentForTracks/KpopContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Morceaux Kpop",
  "Découvrez les meilleurs morceaux Kpop. Votez pour vos morceaux préférés et suivez les tendances de la musique kpop.",
  [
    "kpop",
    "musique kpop",
    "top kpop",
    "classement kpop",
    "meilleurs morceaux kpop",
    "kpop pop",
    "hits kpop",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function Kpop() {
  return <KpopContent />;
}