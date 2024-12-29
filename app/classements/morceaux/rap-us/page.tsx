import RapUsContent from "@/components/classements/ContentForTracks/RapUsContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Classement morceaux Rap US",
  "Découvrez les meilleurs morceaux Rap US. Votez pour vos morceaux préférés et suivez les tendances de la musique rap us.",
  [
    "rap us",
    "musique rap us",
    "top rap us",
    "classement rap us",
    "meilleurs morceaux rap us",
    "rap us pop",
    "hits rap us",
    "classement morceaux",
    "top morceaux",
    "meilleurs morceaux",
    "melovib's",
    "best music tracks"
  ],
  "/Logos/Logo-MeloVib's-1-1024x1024.png"
);

export default function RapUs() {
  return <RapUsContent />;
}