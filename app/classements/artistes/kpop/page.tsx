import KpopContent from "@/components/classements/ContentForArtists/KpopContent";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(
  "Artistes Kpop",
  "Découvrez les meilleurs artistes Kpop. Votez pour vos artistes préférés et suivez les tendances de la musique kpop.",
  [
    "jazz",
    "musique jazz",
    "top kpop",
    "classement kpop",
    "meilleurs artistes kpop",
    "kpop pop",
    "hits kpop",
    "classement artistes",
    "top artistes",
    "meilleurs artistes",
    "melovib's",
    "best music tracks"
  ],
);

export default function Kpop() {
  return <KpopContent />;
}